import { estimate, PROFILES } from "./core.mjs";

export const MAX_MESSAGES = 100;
export const MAX_CHARACTERS = 100000;
export const SAMPLE = {
  system: "You are a JEE mathematics tutor. Explain reasoning step by step, keep the student's constraints in mind, and ask a short check question.",
  messages: [
    { role: "user", content: "I am preparing for JEE. Please use simple English with some Hindi. I struggle with algebra, so do not skip the intermediate steps." },
    { role: "assistant", content: "Understood. We will build from basic algebra, explain each transformation, and check your understanding before moving on." },
    { role: "user", content: "Explain how to solve x squared minus 5x plus 6 equals zero by factorisation. How do I choose the two numbers?" },
    { role: "assistant", content: "Find two numbers whose product is 6 and whose sum is -5. They are -2 and -3, so the expression is (x - 2)(x - 3). Setting each factor to zero gives x = 2 or x = 3." },
    { role: "user", content: "अगर मुझे ऐसे दो नंबर नहीं मिलते तो क्या करूँ? मुझे quadratic formula समझाइए और बताइए कि discriminant का मतलब क्या है।" },
    { role: "assistant", content: "For ax² + bx + c = 0, use x = (-b ± √(b² - 4ac))/(2a), with a nonzero. The discriminant b² - 4ac tells us whether there are two distinct real roots, one repeated real root, or no real roots." },
    { role: "user", content: "Now solve 2x² - 4x - 3 = 0. Please remember how I asked you to explain things at the start." },
  ],
};

export function validateConversation(system, messages) {
  if (typeof system !== "string" || !Array.isArray(messages)) throw new Error("Use a system string and an array of messages.");
  if (!messages.length || messages.length > MAX_MESSAGES) throw new Error(`Add between 1 and ${MAX_MESSAGES} messages.`);
  for (const message of messages) {
    if (!message || !["user", "assistant"].includes(message.role) || typeof message.content !== "string" || !message.content.trim()) {
      throw new Error("Every message needs a user or assistant role and non-empty text.");
    }
  }
  if (messages[0].role !== "user") throw new Error("Start with a user message so each exchange has a user request.");
  if (system.length + messages.reduce((sum, message) => sum + message.content.length, 0) > MAX_CHARACTERS) {
    throw new Error(`Keep the conversation under ${MAX_CHARACTERS.toLocaleString()} characters.`);
  }
}

export function parseConversation(value) {
  const data = JSON.parse(value);
  let system = "";
  let messages;
  if (Array.isArray(data)) {
    messages = [...data];
    if (messages[0]?.role === "system") system = messages.shift().content;
  } else if (data && typeof data === "object") {
    system = data.system ?? "";
    messages = Array.isArray(data.messages) ? [...data.messages] : data.messages;
    if (messages?.[0]?.role === "system" && !system) system = messages.shift().content;
  }
  validateConversation(system, messages);
  return { system, messages: messages.map(({ role, content }) => ({ role, content })) };
}

export function estimatedCounts(system, messages, profileId = "qwen") {
  const profile = PROFILES.find(profile => profile.id === profileId);
  if (!profile) throw new Error("Unknown estimate profile.");
  return { system: estimate(system, profile), messages: messages.map(message => estimate(message.content, profile)) };
}

// Counts are content tokens. Caller-supplied allowances approximate formatting.
// Drop a prefix of user-led exchanges; never skip a large recent exchange to
// retain unrelated older text, and never leave an assistant reply orphaned.
export function planConversation({ system = "", messages, counts, contextWindow, replyReserve, perMessageOverhead = 8, fixedOverhead = 16 }) {
  validateConversation(system, messages);
  for (const value of [contextWindow, replyReserve, perMessageOverhead, fixedOverhead]) {
    if (!Number.isSafeInteger(value) || value < 0) throw new Error("Budgets and allowances must be non-negative whole numbers.");
  }
  if (contextWindow < 1 || contextWindow > 10000000 || replyReserve > contextWindow) throw new Error("Reply reserve must not exceed a positive context window (maximum 10,000,000).");
  if (!counts || counts.messages?.length !== messages.length || ![counts.system, ...counts.messages].every(value => Number.isSafeInteger(value) && value >= 0)) {
    throw new Error("Each message needs a valid matching token count.");
  }
  const available = contextWindow - replyReserve;
  const systemCost = system.trim() ? counts.system + perMessageOverhead : 0;
  const base = fixedOverhead + systemCost;
  const groups = [];
  messages.forEach((message, index) => {
    if (message.role === "user") groups.push({ indices: [], cost: 0 });
    const group = groups[groups.length - 1];
    group.indices.push(index);
    group.cost += counts.messages[index] + perMessageOverhead;
  });
  const total = base + groups.reduce((sum, group) => sum + group.cost, 0);
  let used = total;
  let removedGroups = 0;
  while (used > available && removedGroups < groups.length - 1) {
    used -= groups[removedGroups].cost;
    removedGroups += 1;
  }
  const dropped = new Set(groups.slice(0, removedGroups).flatMap(group => group.indices));
  const newest = new Set(groups[groups.length - 1].indices);
  const blocked = used > available;
  const rows = messages.map((message, index) => ({
    index, ...message, contentTokens: counts.messages[index],
    cost: counts.messages[index] + perMessageOverhead,
    status: dropped.has(index) ? "dropped" : newest.has(index) ? "protected" : "kept",
    reason: dropped.has(index) ? "Oldest exchange removed to meet the budget." : newest.has(index) ? "Newest exchange is protected." : "Fits in the retained recent history.",
  }));
  return {
    available, total, used, systemCost, fixedOverhead, blocked,
    remaining: Math.max(0, available - used), overflow: Math.max(0, used - available),
    droppedCount: dropped.size, droppedExchanges: removedGroups,
    keptCount: messages.length - dropped.size, rows,
    retained: blocked ? null : [
      ...(system.trim() ? [{ role: "system", content: system }] : []),
      ...rows.filter(row => row.status !== "dropped").map(({ role, content }) => ({ role, content })),
    ],
  };
}
