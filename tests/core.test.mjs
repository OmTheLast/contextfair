import test from "node:test";
import assert from "node:assert/strict";
import { PROFILES, analyze, classIndex, composition, estimate, significantScripts } from "../dist/core.mjs";

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

