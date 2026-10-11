# ContextFair recovery checkpoint

Updated: 2026-10-11 (Asia/Kolkata)

Status: **first application round completed and verified**

## Request

Build ContextFair as a new application while keeping the tokenizer estimation
study an independent research project.

## Decisions

- Created independent root `contextfair/`; do not place application work in
  `tokenizer-study/`.
- Product name is provisional: ContextFair.
- Initial prototype is a buildless static web app with browser-local analysis.
- Current model values are estimates and must be labelled as such.
- Exact tokenizer verification is a later, separately labelled feature.
- No research dataset, protected evaluation text, tokenizer assets, credentials,
  or model weights are copied into the app.
- Reuse of the LocalMind estimator requires MIT attribution and is documented.

## Site

- Sites project ID is stored in `.openai/hosting.json`.
- New Site starts private.

## Completed at checkpoint start

- Read workspace memory and EurekaDev rules.
- Reviewed public GitHub portfolio and selected ContextFair.
- Recorded the product/research boundary.

## Completed work

- Implemented the first buildless interactive prototype under `dist/`.
- Added five tokenizer-family estimate profiles, script composition, context and
  reply-reserve controls, overflow/retention arithmetic, illustrative language
  examples, method disclosure, privacy statement, and responsive layout.
- Added product/research boundary and third-party attribution documents.
- Added deterministic tests in `tests/core.test.mjs`.

## Checks

- `node --test tests/core.test.mjs`: 5/5 passed.
- Local page loaded successfully at `http://127.0.0.1:4173/`.
- Browser interaction check: switching to the Hindi example updated the displayed
  range to 21–96 estimated tokens and 77 Unicode characters.
- Method dialog opened successfully.
- Browser console contained no warnings or errors during the checked flow.
- Desktop visual inspection passed; responsive CSS exists but a separate mobile
  screenshot was not available in the current browser capability.

## Exact next action

Package and privately deploy this verified source revision. Then plan exact
on-demand tokenizer verification as a separate application milestone without
changing the tokenizer study.
