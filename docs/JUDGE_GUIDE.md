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

## Video outline (target 3:35)

| Time | Show | Explain |
| --- | --- | --- |
| 0:00–0:25 | Hero and language buttons | A conversation has limited space; token-count mistakes can affect retained history. |
| 0:25–0:45 | Hindi input and five estimates | All five rows are estimates, not model-quality rankings. |
| 0:45–1:15 | Qwen estimate | Count script buckets, apply profile weights, add and round up: 32.342 becomes 33. |
| 1:15–1:40 | Context and reply controls | A 4,096 window minus a 1,024 reply reserve leaves 3,072 input tokens. This is a hypothetical shared budget. |
| 1:40–2:20 | Exact Qwen panel | Explain the measured count, its difference from the estimate, and the budget consequence. |
| 2:20–2:45 | Change reserve, then edit text | Remaining space updates; changing text invalidates the previous measurement. |
| 2:45–3:15 | Method/privacy and README | Counts run in the browser; one pinned tokenizer is supported. Chat formatting is excluded. |
| 3:15–3:35 | App and next steps | Close on the combined estimate/budget/verification workflow. More exact tokenizers and chat-format budgeting are future work. |

## Claims to keep precise

- “Helps inspect a context budget” does not mean it prevents all truncation.
- There is one exact Qwen tokenizer and five estimate profiles.
- Illustrative language examples do not establish a fairness benchmark.
- The 35-versus-43 reference result checks integration, not general accuracy.
  It is deliberately not a product demo example.
- Text stays in browser memory; third-party asset downloads make network
  requests. Do not describe the entire hosted page as offline.

## Submission status — checked October 20, 2026

The [official overview](https://eurekadev.devpost.com/) requires public source
with setup/use instructions, a written description including technologies, and
a video no longer than four minutes. A live demo is recommended. The
[rules](https://eurekadev.devpost.com/rules) equally weight innovation, impact,
technical quality, and presentation. AI development assistance is allowed.

- Source: https://github.com/OmTheLast/contextfair (public visibility verified
  through GitHub's unauthenticated API).
- Track/category proposal: Coding / Computer Science + AI.
- Hosted demo: https://ompatnaik.com/contextfair/ (GitHub Pages; public, no sign-in
  required; anonymous HTTPS access verified October 20).
- Devpost description is ready to copy after final review; the recording script
  includes estimator logic and a product-focused close.
- Still needed: video recording/upload, final review, and submission.
  Source visibility and live-demo public access have been verified.
- Registration, eligibility, Discord membership, and final submission remain
  participant actions; this guide does not assert they are complete.

Organizer deadline: October 20, 2026, 5:00 PM CDT = October 21, 3:30 AM IST.
Internal target: October 20, 9:00 PM IST.
