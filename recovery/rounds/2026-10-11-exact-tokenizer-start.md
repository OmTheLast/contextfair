# Round: exact tokenizer application milestone

Date: 2026-10-11 (Asia/Kolkata)

## Request

Continue ContextFair with on-demand exact tokenizer verification while keeping
the tokenizer estimation study independent and the existing Site private.

## Proposed work

- Add one pinned, on-demand Qwen tokenizer using the browser-supported
  Transformers.js tokenizer API.
- Preserve instant estimates for all five profiles.
- Label idle, loading, measured, stale, and error states explicitly.
- Validate a known public LocalMind fixture against its independently verified
  Qwen reference count without adding that fixture to the product demo.
- Keep public repository publication and hackathon submission out of scope.

## Completed and verified

- Added an on-demand Web Worker using Transformers.js 3.8.1 and the pinned Qwen
  tokenizer revision `57b13b4dce7be073be0df3eaf1c842a6bbb2e0a7`.
- Added explicit idle, loading, measured, stale, and error states.
- Added a changed-text guard and fixed a browser-discovered CSS rule that made a
  hidden result grid visible before measurement.
- Extended the deterministic test suite from five to seven tests.
- Verified the public reference text in the browser: exact 35, estimate 43,
  difference 8 / 22.9% over, special tokens disabled.
- Verified no browser warnings/errors and no horizontal overflow at 390x844.
- Kept the Site private and made no tokenizer-study changes.

## Deployment

- GitHub milestone commit: `fb7e821fc230f7d850d2f47350c8622229808029`.
- Private Site deployment succeeded as
  `appgdep_6ad253e548648191a4cf627bedad1eb7`.
- Live URL remains `https://contextfair.om-exp99.chatgpt.site`.
- A post-deployment browser check reproduced 35 measured versus 43 estimated
  with no browser warnings or errors.

## Next action

Begin the hackathon presentation pass: judge-facing story, README polish,
screenshots, and the four-minute demo outline.

