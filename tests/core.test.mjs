import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PROFILES, analyze, classIndex, compareExact, composition, estimate, measuredBudgetCopy, significantScripts } from "../dist/core.mjs";
import { SAMPLE, estimatedCounts, parseConversation, planConversation } from "../dist/conversation.mjs";

test("script classifier distinguishes representative writing systems", () => {
  assert.equal(classIndex("A".codePointAt(0)), 0);
  assert.equal(classIndex("ह".codePointAt(0)), 2);
  assert.equal(classIndex("த".codePointAt(0)), 7);
  assert.equal(classIndex("界".codePointAt(0)), 13);
});

test("estimates are deterministic and empty-safe", () => {
  assert.equal(estimate("", PROFILES[0]), 0);
  assert.equal(estimate("hello", PROFILES[0]), estimate("hello", PROFILES[0]));
  assert.ok(estimate("hello", PROFILES[0]) > 0);
});

test("composition counts Unicode code points rather than UTF-16 units", () => {
  assert.equal(composition("A😀").reduce((a, b) => a + b, 0), 2);
});

test("context analysis reserves output and reports overflow", () => {
  const normal = analyze("hello", 4096, 1024);
  assert.equal(normal.available, 3072);
  assert.equal(normal.results.length, 5);
  const tiny = analyze("தமிழ்".repeat(100), 10, 9);
  assert.ok(tiny.results.some(result => result.overflow > 0));
});

test("significant scripts are sorted by observed share", () => {
  const scripts = significantScripts("hello नमस्ते");
  assert.equal(scripts[0].name, "latin");
  assert.ok(scripts.some(script => script.name === "devanagari"));
});

test("exact comparison reports direction and percentage", () => {
  const over = compareExact(43, 35);
  assert.equal(over.delta, 8);
  assert.equal(over.absoluteDelta, 8);
  assert.equal(over.direction, "over");
  assert.equal(over.percent.toFixed(1), "22.9");
  assert.equal(compareExact(35, 35).direction, "match");
  assert.equal(compareExact(30, 35).direction, "under");
});

test("exact worker pins the tokenizer implementation and revision", async () => {
  const source = await readFile(new URL("../dist/exact-tokenizer-worker.js", import.meta.url), "utf8");
  assert.match(source, /@huggingface\/transformers@3\.8\.1/);
  assert.match(source, /57b13b4dce7be073be0df3eaf1c842a6bbb2e0a7/);
  assert.match(source, /add_special_tokens:\s*false/);
});

test("measured explanation uses the real count for remaining space and overflow", () => {
  assert.match(measuredBudgetCopy(43, 35, 3072), /8 more tokens.*3,037 of your 3,072/s);
  assert.match(measuredBudgetCopy(30, 35, 32), /misses 5 tokens.*exceeds.*by 3 tokens/s);
  assert.match(measuredBudgetCopy(35, 35, 35), /matches.*leaves 0/s);
  assert.match(measuredBudgetCopy(43, 35, 0), /exceeds your 0-token input budget by 35/);
});

const conversationOptions = (overrides = {}) => ({
  system: "System",
  messages: [
    { role: "user", content: "Old question" },
    { role: "assistant", content: "Old answer" },
    { role: "user", content: "New question" },
  ],
  counts: { system: 10, messages: [20, 30, 40] },
  contextWindow: 200, replyReserve: 50, perMessageOverhead: 5, fixedOverhead: 10,
  ...overrides,
});

test("conversation keeps everything when it fits, counting system and allowances", () => {
  const plan = planConversation(conversationOptions());
  assert.equal(plan.used, 130);
  assert.equal(plan.remaining, 20);
  assert.equal(plan.keptCount, 3);
  assert.equal(plan.retained[0].role, "system");
});

test("conversation removes oldest complete exchange without orphaning an answer", () => {
  const plan = planConversation(conversationOptions({ contextWindow: 150 }));
  assert.deepEqual(plan.rows.map(row => row.status), ["dropped", "dropped", "protected"]);
  assert.equal(plan.used, 70);
  assert.equal(plan.droppedExchanges, 1);
  assert.deepEqual(plan.retained.map(message => message.content), ["System", "New question"]);
});

test("exact budget boundary fits but one token less drops the oldest exchange", () => {
  assert.equal(planConversation(conversationOptions({ contextWindow: 180 })).droppedCount, 0);
  assert.equal(planConversation(conversationOptions({ contextWindow: 179 })).droppedCount, 2);
});

test("protected content overflow blocks export rather than dropping latest question", () => {
  const plan = planConversation(conversationOptions({ contextWindow: 100 }));
  assert.equal(plan.blocked, true);
  assert.equal(plan.overflow, 20);
  assert.equal(plan.retained, null);
  assert.equal(plan.rows.at(-1).status, "protected");
});

test("newest assistant belongs to protected exchange; oversized recent turns are not skipped", () => {
  const messages = [
    { role: "user", content: "a" }, { role: "assistant", content: "b" },
    { role: "user", content: "c" }, { role: "assistant", content: "d" },
    { role: "user", content: "e" }, { role: "assistant", content: "f" },
  ];
  const plan = planConversation(conversationOptions({
    system: "", messages, counts: { system: 0, messages: [1, 1, 60, 60, 10, 10] },
    contextWindow: 100, replyReserve: 0, perMessageOverhead: 0, fixedOverhead: 0,
  }));
  assert.deepEqual(plan.rows.map(row => row.status), ["dropped", "dropped", "dropped", "dropped", "protected", "protected"]);
});

test("empty system incurs no per-message allowance; all budget reserved is blocked", () => {
  const plan = planConversation(conversationOptions({ system: "", counts: { system: 0, messages: [20, 30, 40] } }));
  assert.equal(plan.systemCost, 0);
  assert.equal(plan.total, 115);
  assert.equal(planConversation(conversationOptions({ contextWindow: 50, replyReserve: 50 })).blocked, true);
});

test("invalid budgets, roles, counts and empty conversations fail explicitly", () => {
  for (const overrides of [
    { contextWindow: NaN }, { replyReserve: -1 }, { contextWindow: 1.5 },
    { replyReserve: 201 }, { fixedOverhead: Infinity }, { messages: [] },
    { counts: { system: 0, messages: [1] } },
    { messages: [{ role: "assistant", content: "orphan" }], counts: { system: 0, messages: [1] } },
  ]) assert.throws(() => planConversation(conversationOptions(overrides)));
});

test("JSON import supports arrays, object and exported system-prefix format", () => {
  const messages = [{ role: "system", content: "Tutor" }, { role: "user", content: "Hi" }];
  assert.deepEqual(parseConversation(JSON.stringify(messages)), { system: "Tutor", messages: messages.slice(1) });
  assert.deepEqual(parseConversation(JSON.stringify({ messages, budget: {} })), { system: "Tutor", messages: messages.slice(1) });
  assert.deepEqual(parseConversation(JSON.stringify(SAMPLE)), SAMPLE);
  for (const invalid of ["null", "{}", "[]", '[{"role":"tool","content":"x"}]', '[{"role":"user","content":""}]']) assert.throws(() => parseConversation(invalid));
});

test("sample estimate can be planned and different counts can change retention", () => {
  const counts = estimatedCounts(SAMPLE.system, SAMPLE.messages);
  const sample = planConversation({ ...SAMPLE, counts, contextWindow: 256, replyReserve: 64 });
  assert.ok(sample.droppedCount > 0);
  assert.equal(sample.blocked, false);
  const low = planConversation(conversationOptions({ counts: { system: 10, messages: [1, 1, 40] }, contextWindow: 150 }));
  const high = planConversation(conversationOptions({ contextWindow: 150 }));
  assert.notEqual(low.droppedCount, high.droppedCount);
});

