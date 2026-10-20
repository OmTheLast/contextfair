# ContextFair demo and submission guide

Project materials: [Devpost description](DEVPOST_DRAFT.md) and
[deployed-page review with screenshots](PAGE_REVIEW.md).

## One-sentence pitch

ContextFair shows which AI chat messages fit, which get dropped, and why, with
estimated-versus-measured content plans and exportable retained conversation JSON.

## One-minute live demo

Open https://ompatnaik.com/contextfair/#planner. No setup is needed.
Use the built-in JEE sample with window 256, reserve 64 and allowances 8/16.
The estimate keeps 3 messages. Measure Qwen: its content-based plan keeps 1.
Raise the window to 320: both retain 3; measured content plus allowances uses
209 of 256 input tokens. Show the dropped first message containing the student's
explanation preference. Export retained JSON. Set window 100 to demonstrate
blocked protected content, then restore 320. These small budgets are illustrative,
not actual model limits. Editing text invalidates measured results.

Use built-in examples for the public demo. Let the first download finish before
recording, and explain that the tokenizer is downloaded on first use. This is
tokenization, not model inference; there is no generated answer.

## Claims to keep precise

- “Helps inspect a context budget” does not mean it prevents all truncation.
- There is one exact Qwen tokenizer and five estimate profiles.
- Measured planner totals add estimated formatting allowances; not a provider
  acceptance guarantee. The app does not evaluate whether dropped information
  matters or run the tutor model.
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
- Devpost description has been saved in the submission draft for final review.
- Still needed: video recording/upload, final review, and submission.
  Source visibility and live-demo public access have been verified.
- Registration, eligibility, Discord membership, and final submission remain
  participant actions; this guide does not assert they are complete.

Organizer deadline: October 20, 2026, 5:00 PM CDT = October 21, 3:30 AM IST.
