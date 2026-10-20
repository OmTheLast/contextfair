// Optional provenance check, not a runtime dependency. Pass a LocalMind checkout.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { PROFILES, CLASSES, EXAMPLES, classIndex, composition, estimate } from "../dist/core.mjs";

const directory = process.argv[2];
assert.ok(directory, "Usage: node scripts/verify-estimator-source.mjs /path/to/LocalMind");
const source = await readFile(resolve(directory, "index.html"), "utf8");
const license = await readFile(resolve(directory, "LICENSE"), "utf8");
const sha256 = text => createHash("sha256").update(text).digest("hex");
// Verify the bytes before evaluating the small, inspected estimator block.
assert.equal(sha256(source), "62f05db5f11c37bdc0f8adbaae946530482f497f81a053d0d5ce2a1a7d8795a3");
assert.equal(sha256(license), "8d5bf298355c136fb57eac95af829c4cc06a8e144cb3f08dc9f6aa5f8a7356ad");
const start = source.indexOf("// TOKEN-COUNT-START");
const end = source.indexOf("// TOKEN-COUNT-END", start);
assert.ok(start >= 0 && end > start);
const upstream = new Function(`${source.slice(start, end)}\nreturn {TOKEN_WEIGHTS, tokenClassIndex};`)();
const upstreamIds = { qwen: "qwen", gemma: "gemma", lfm2: "lfm2", bonsai: "bonsai4b", minicpm: "minicpm5" };
for (const profile of PROFILES) {
  assert.deepEqual(profile.weights, upstream.TOKEN_WEIGHTS[upstreamIds[profile.id]], profile.id);
}
for (let cp = 0; cp <= 0x10ffff; cp++) {
  assert.equal(classIndex(cp), upstream.tokenClassIndex(cp), `classification at ${cp}`);
}
const qwen = PROFILES.find(profile => profile.id === "qwen");
const terms = composition(EXAMPLES.hindi.text).map((count, index) => ({
  bucket: CLASSES[index],
  codePoints: count,
  weight: qwen.weights[index],
  contribution: count * qwen.weights[index],
})).filter(term => term.codePoints);
console.log(JSON.stringify({
  sourceRevision: "b39f0bc145a0c0926ba22247ee31cd369e0445b6",
  verifiedWeights: 75,
  verifiedCodePointValues: 0x110000,
  hindiQwen: { terms, weightedSum: terms.reduce((sum, term) => sum + term.contribution, 0), estimate: estimate(EXAMPLES.hindi.text, qwen) },
  scope: "Source identity and estimator arithmetic only; not fitting reproduction, prediction accuracy or an exact-tokenizer run.",
}, null, 2));
