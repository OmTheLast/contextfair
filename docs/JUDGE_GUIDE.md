# ContextFair demo and submission guide

Prepared drafts: [spoken demo script](DEMO_SCRIPT.md),
[Devpost description](DEVPOST_DRAFT.md), and
[deployed-page review with screenshots](PAGE_REVIEW.md).

## One-sentence pitch

ContextFair helps people building multilingual AI tools see how much conversation
space their text uses, compare quick estimates, and verify Qwen counts locally.

## One-minute live demo

Start the app using the README. Choose Hindi, set the window to 4,096, and
reserve 1,024 for the reply. Explain that 3,072 tokens remain for input. Point out
that the five rows are estimates for the same text. Measure Qwen and read the
measured-versus-estimated result. Increase the reply reserve to 2,048; show the
new remaining-space explanation. Edit the input to show its old count disappears.

Use built-in examples for the public demo. Let the first download finish before
recording, and explain that the tokenizer is downloaded on first use. This is
tokenization, not model inference; there is no generated answer.

## Video outline (target 3:30)

| Time | Show | Explain |
| --- | --- | --- |
| 0:00–0:25 | Hero and language buttons | A conversation has limited space; token-count mistakes can affect retained history. |
| 0:25–1:05 | Hindi input and five estimates | Writing systems and tokenizers can produce different counts. All five rows are estimates. |
| 1:05–1:40 | Context and reply controls | A 4,096 window minus a 1,024 reply reserve leaves 3,072 input tokens. This is a hypothetical shared budget. |
| 1:40–2:20 | Exact Qwen panel | Explain the measured count, its difference from the estimate, and the budget consequence. |
| 2:20–2:45 | Edit text; measure again | The previous count becomes stale. Results must belong to the current input. |
| 2:45–3:10 | Method/privacy and README | Counts run in the browser; one pinned tokenizer is supported. Chat formatting is excluded. |
| 3:10–3:30 | Attribution and next steps | Identify LocalMind reuse, the separate study, and Codex assistance. More exact tokenizers are future work. |

## Claims to keep precise

- “Helps inspect a context budget” does not mean it prevents all truncation.
- There is one exact Qwen tokenizer and five estimate profiles.
- Illustrative language examples do not establish a fairness benchmark.
- The 35-versus-43 reference result checks integration, not general accuracy.
  It is deliberately not a product demo example.
- Text stays in browser memory; third-party asset downloads make network
  requests. Do not describe the entire hosted page as offline.

## Submission status — checked October 18, 2026

The [official overview](https://eurekadev.devpost.com/) requires public source
with setup/use instructions, a written description including technologies, and
a video no longer than four minutes. A live demo is recommended. The
[rules](https://eurekadev.devpost.com/rules) equally weight innovation, impact,
technical quality, and presentation. AI development assistance is allowed.

- Source: https://github.com/OmTheLast/contextfair
- Track/category proposal: Coding / Computer Science + AI.
- Hosted prototype: https://contextfair.om-exp99.chatgpt.site (owner-private).
- Devpost description and spoken script are drafted; owner review is pending.
- Still needed: video recording/upload, approval of the Devpost wording, verification
  of public repository access, and a decision on opening the optional live demo.
- Registration, eligibility, Discord membership, and final submission remain
  participant actions; this guide does not assert they are complete.

Organizer deadline: October 20, 2026, 5:00 PM CDT = October 21, 3:30 AM IST.
Internal target: October 20, 9:00 PM IST.
