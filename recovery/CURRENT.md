# ContextFair recovery checkpoint

Updated: 2026-10-18 (Asia/Kolkata)

Status: **presentation and README complete; private deployment pending**

## Request

Build ContextFair as a new application while keeping the tokenizer estimation
study an independent research project.

## Decisions

- Created independent root `contextfair/`; do not place application work in
  `tokenizer-study/`.
- Product name is provisional: ContextFair.
- Initial prototype is a buildless static web app with browser-local analysis.
- Current model values are estimates and must be labelled as such.
- Exact tokenizer verification is on demand and separately labelled.
- No research dataset, protected evaluation text, tokenizer assets, credentials,
  or model weights are copied into the app.
- Reuse of the LocalMind estimator requires MIT attribution and is documented.

## Site

- Sites project ID is stored in `.openai/hosting.json`.
- New Site starts private.
- First private deployment succeeded at
  `https://contextfair.om-exp99.chatgpt.site`.
- First deployed source commit: `27738dffc9b433162b03db0c91606854bda6b86d`.
- The standalone GitHub repository is
  `https://github.com/OmTheLast/contextfair`; local and remote histories were
  merged without a force push. Stable baseline pushed at `b6be215`.

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
- Added an on-demand Web Worker using Transformers.js 3.8.1 and the pinned Qwen
  tokenizer revision `57b13b4dce7be073be0df3eaf1c842a6bbb2e0a7`.
- Added idle, loading, measured, stale, and error presentation states.
- Added a changed-text safeguard so an old measurement cannot be displayed for
  newly edited input.
- Added responsive exact-result styling and corrected the hidden-state rule
  found during browser validation.

## Checks

- `node --test tests/core.test.mjs`: 7/7 passed.
- Local page loaded successfully at `http://127.0.0.1:4173/`.
- Browser interaction check: switching to the Hindi example updated the displayed
  range to 21–96 estimated tokens and 77 Unicode characters.
- Method dialog opened successfully.
- Browser console contained no warnings or errors during the checked flow.
- Desktop visual inspection passed; responsive CSS exists but a separate mobile
  screenshot was not available in the current browser capability.
- Browser reference validation: Qwen measured 35 tokens, the ContextFair
  estimate was 43, and the UI reported 8 tokens / 22.9% over at pinned revision
  `57b13b4dc…`, with special tokens disabled.
- Browser console: no warnings or errors during exact measurement.
- Changed-text safeguard: stale state shown and old result hidden.
- Mobile check at 390x844: two-column result grid, no horizontal overflow.
- Exact-tokenizer Site deployment succeeded from commit
  `fb7e821fc230f7d850d2f47350c8622229808029`.
- Saved Site version:
  `appgprj_6acb864b26b08191b2c87a336a6b9cfd~appgver_0d855e60ba24819192ef5baf8f15e5c4`.
- Deployment: `appgdep_6ad253e548648191a4cf627bedad1eb7`;
  private URL remains `https://contextfair.om-exp99.chatgpt.site`.
- Post-deployment production check repeated the reference result (35 measured,
  43 estimated, 8 / 22.9% over) with no browser warnings or errors.

## Exact next action

Package and deploy the October 18 presentation pass to the existing private Site.
README and docs/JUDGE_GUIDE.md are prepared. Eight tests, syntax, documentation
links, element references, and HTTP readiness passed. Browser review was blocked
by the browser tool URL security policy; new screenshots and visual/interactive
QA remain unverified. See recovery/rounds/2026-10-18-presentation.md.

After deployment, review the page manually, record the video, and finalize the
Devpost description. Site access changes and submission require user direction.
