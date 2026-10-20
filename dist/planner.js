import { PROFILES, formatNumber as fmt } from "./core.mjs";
import { SAMPLE, MAX_MESSAGES, validateConversation, parseConversation, estimatedCounts, planConversation } from "./conversation.mjs";

const $ = selector => document.querySelector(selector);
let messages = SAMPLE.messages.map(message => ({ ...message }));
let worker = null;
let requestId = 0;
let pendingKey = null;
let measured = null;
let loading = false;
let exportPlan = null;
let exportMode = "";
const key = () => JSON.stringify([$("#system-prompt").value, messages]);
const node = (tag, text, className) => {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
};

for (const profile of PROFILES) $("#plan-profile").append(new Option(profile.name, profile.id));
$("#system-prompt").value = SAMPLE.system;

function invalidate() {
  measured = null;
  pendingKey = null;
  requestId += 1;
  loading = false;
  $("#conversation-measure-status").textContent = "Conversation changed. Measure again; the plan below uses estimates.";
  $("#export-status").textContent = "";
}

function drawEditor() {
  const container = $("#conversation-messages");
  container.replaceChildren();
  messages.forEach((message, index) => {
    const card = node("div", undefined, "message-editor");
    const header = node("div", undefined, "planner-toolbar");
    const select = document.createElement("select");
    select.setAttribute("aria-label", `Role for message ${index + 1}`);
    select.append(new Option("User", "user"), new Option("Assistant", "assistant"));
    select.value = message.role;
    select.addEventListener("change", () => { message.role = select.value; invalidate(); render(); });
    const remove = node("button", "Remove");
    remove.type = "button";
    remove.setAttribute("aria-label", `Remove message ${index + 1}`);
    remove.addEventListener("click", () => { messages.splice(index, 1); invalidate(); drawEditor(); render(); });
    header.append(node("strong", `Message ${index + 1}`), select, remove);
    const text = document.createElement("textarea");
    text.rows = 3;
    text.maxLength = 100000;
    text.value = message.content;
    text.setAttribute("aria-label", `Text for message ${index + 1}`);
    text.addEventListener("input", () => { message.content = text.value; invalidate(); render(); });
    card.append(header, text);
    container.append(card);
  });
  $("#add-message").disabled = messages.length >= MAX_MESSAGES;
}

function settings() {
  const value = id => {
    const input = $(id);
    if (!input.value.trim()) throw new Error("Fill every budget field with a whole number.");
    return Number(input.value);
  };
  return {
    system: $("#system-prompt").value, messages,
    contextWindow: value("#plan-window"), replyReserve: value("#plan-reserve"),
    perMessageOverhead: value("#plan-message-overhead"), fixedOverhead: value("#plan-fixed-overhead"),
  };
}

function summaryCard(title, plan) {
  const card = node("article", undefined, `plan-card${plan.blocked ? " blocked" : ""}`);
  card.append(node("h4", title));
  card.append(node("strong", plan.blocked ? `Blocked · ${fmt(plan.overflow)} tokens over` : `${plan.keptCount} kept · ${plan.droppedCount} dropped`));
  card.append(node("p", `${fmt(plan.total)} before trimming → ${fmt(plan.used)} planned / ${fmt(plan.available)} input tokens. ${fmt(plan.remaining)} left.`));
  card.append(node("p", `System + allowance: ${fmt(plan.systemCost)}. Fixed allowance: ${fmt(plan.fixedOverhead)}. ${plan.droppedExchanges} oldest exchange(s) removed.`));
  if (plan.blocked) card.append(node("p", "The protected system instruction and newest exchange cannot fit. Increase the window, reduce the reserve/allowance, or shorten that content. No valid export."));
  return card;
}

function render() {
  exportPlan = null;
  $("#export-conversation").disabled = true;
  $("#measure-conversation").disabled = loading;
  $("#measure-conversation").textContent = loading ? "Measuring…" : "Measure Qwen messages";
  $("#plan-error").hidden = true;
  $("#plan-summary").replaceChildren();
  $("#plan-decisions").replaceChildren();
  try {
    const options = settings();
    validateConversation(options.system, messages);
    const estimatePlan = planConversation({ ...options, counts: estimatedCounts(options.system, messages, $("#plan-profile").value) });
    const hasMeasured = measured?.key === key();
    const measuredPlan = hasMeasured ? planConversation({ ...options, counts: measured.counts }) : null;
    const active = measuredPlan || estimatePlan;
    exportPlan = active.blocked ? null : active;
    exportMode = measuredPlan ? "measured-qwen-content-plus-allowances" : `estimated-${$("#plan-profile").value}-plus-allowances`;
    $("#export-conversation").disabled = !exportPlan;
    $("#plan-summary").append(summaryCard(`${PROFILES.find(p => p.id === $("#plan-profile").value).name} estimate + allowances`, estimatePlan));
    if (measuredPlan) {
      $("#plan-summary").append(summaryCard("Measured Qwen content + allowances", measuredPlan));
      const changed = estimatePlan.rows.filter((row, i) => (row.status === "dropped") !== (measuredPlan.rows[i].status === "dropped")).length;
      $("#plan-summary").append(node("p", `${changed} message retention decision(s) differ from the selected estimate. ${$("#plan-profile").value !== "qwen" ? "Different tokenizer families: this is not an accuracy comparison for that other model." : "Same Qwen profile: compare estimated versus measured content."}`, "plan-comparison"));
    }
    const list = node("ol", undefined, "decision-list");
    active.rows.forEach((row, index) => {
      const item = node("li", undefined, `decision ${row.status}`);
      const title = node("div", undefined, "decision-title");
      title.append(node("strong", `${index + 1} · ${row.role}`), node("span", row.status === "dropped" ? "DROPPED" : row.status === "protected" ? "PROTECTED" : "KEPT", "decision-badge"));
      item.append(title, node("p", row.content, "message-preview"));
      item.append(node("p", `Content: ${fmt(estimatePlan.rows[index].contentTokens)} estimated${measuredPlan ? ` / ${fmt(measuredPlan.rows[index].contentTokens)} Qwen measured` : ""} · +${options.perMessageOverhead} allowance. ${row.reason}`, "decision-detail"));
      if (measuredPlan && (estimatePlan.rows[index].status === "dropped") !== (row.status === "dropped")) {
        item.append(node("p", `Estimate would ${estimatePlan.rows[index].status === "dropped" ? "drop" : "keep"} this message; measured-content plan would ${row.status === "dropped" ? "drop" : "keep"} it.`, "decision-change"));
      }
      list.append(item);
    });
    $("#plan-decisions").append(node("h4", `${measuredPlan ? "Measured-content" : "Estimated"} retention plan${active.blocked ? " · blocked, not sendable" : ""}`), list);
  } catch (error) {
    $("#plan-error").textContent = error.message;
    $("#plan-error").hidden = false;
    $("#measure-conversation").disabled = true;
  }
}

function measure() {
  const options = settings();
  validateConversation(options.system, messages);
  if (!worker) {
    try { worker = new Worker("./exact-tokenizer-worker.js?v=planner-1", { type: "module" }); }
    catch { $("#conversation-measure-status").textContent = "Worker unavailable. Estimates still work."; return; }
    worker.addEventListener("message", event => {
      const data = event.data || {};
      if (data.requestId !== requestId || pendingKey !== key()) return;
      if (data.type === "progress") $("#conversation-measure-status").textContent = data.message;
      if (data.type === "error") {
        loading = false;
        $("#conversation-measure-status").textContent = "Tokenizer could not load or measure. Check your connection and retry. Showing estimates.";
        render();
      }
      if (data.type === "batch-result") {
        measured = { key: pendingKey, counts: { system: data.counts[0], messages: data.counts.slice(1) } };
        loading = false;
        $("#conversation-measure-status").textContent = `Qwen content measured locally · revision ${data.revision.slice(0, 9)} · special tokens off. Formatting allowances are still estimates.`;
        render();
      }
    });
    worker.addEventListener("error", () => {
      worker?.terminate();
      worker = null;
      measured = null;
      loading = false;
      $("#conversation-measure-status").textContent = "Tokenizer worker failed. Retry measurement; estimates remain available.";
      render();
    });
  }
  measured = null;
  pendingKey = key();
  requestId += 1;
  loading = true;
  $("#conversation-measure-status").textContent = "Preparing Qwen tokenizer…";
  render();
  worker.postMessage({ type: "measure-batch", requestId, texts: [options.system, ...messages.map(message => message.content)] });
}

$("#measure-conversation").addEventListener("click", measure);
$("#system-prompt").addEventListener("input", () => { invalidate(); render(); });
document.querySelectorAll(".planner-controls input, .planner-controls select").forEach(input => input.addEventListener("input", () => { $("#export-status").textContent = ""; render(); }));
$("#add-message").addEventListener("click", () => {
  if (messages.length >= MAX_MESSAGES) return;
  messages.push({ role: messages.at(-1)?.role === "user" ? "assistant" : "user", content: "" });
  invalidate(); drawEditor(); render();
  $("#conversation-messages").lastElementChild.querySelector("textarea").focus();
});
$("#load-conversation-sample").addEventListener("click", () => {
  messages = SAMPLE.messages.map(message => ({ ...message }));
  $("#system-prompt").value = SAMPLE.system;
  invalidate(); drawEditor(); render();
});
$("#import-conversation").addEventListener("click", () => {
  try {
    const data = parseConversation($("#conversation-json").value);
    messages = data.messages;
    $("#system-prompt").value = data.system;
    invalidate(); drawEditor(); render();
    $("#import-status").textContent = `Loaded ${messages.length} messages.`;
  } catch (error) { $("#import-status").textContent = `Not imported: ${error.message}`; }
});
$("#export-conversation").addEventListener("click", () => {
  if (!exportPlan) return;
  const options = settings();
  const payload = {
    messages: exportPlan.retained,
    budget: { basis: exportMode, contextWindow: options.contextWindow, replyReserve: options.replyReserve, perMessageOverhead: options.perMessageOverhead, fixedOverhead: options.fixedOverhead, plannedInputTokens: exportPlan.used },
    warning: "Content counts plus estimated formatting allowances, not a tokenized chat template. Validate with your target model before sending.",
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = node("a");
  link.href = url; link.download = "contextfair-retained-conversation.json"; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  $("#export-status").textContent = `Downloaded ${exportPlan.keptCount} conversation messages${options.system.trim() ? " plus the system instruction" : ""}. Your editor still contains all messages.`;
});
drawEditor();
render();
