import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PROFILES, analyze, classIndex, compareExact, composition, estimate, measuredBudgetCopy, significantScripts } from "../dist/core.mjs";

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

