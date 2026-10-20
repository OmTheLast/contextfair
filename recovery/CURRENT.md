# ContextFair recovery checkpoint

Updated: 2026-10-20 (Asia/Kolkata)

Status: **independent GitHub Pages demo verified; submission documentation synchronized**

October 20 hosting correction: user rejects ChatGPT-branded hosting. Public
GitHub repository confirmed and Pages enabled in workflow mode. Workflow commit
1dfd3df40fd5d65b7c6f9382d8e5d4c828cbe0c1 was pushed; Actions run 39467444341
completed successfully, testing the app and publishing only dist.
New canonical demo: https://ompatnaik.com/contextfair/ (GitHub Pages behind the
existing domain configuration). All five public runtime files returned HTTPS
200 without authentication and matched local bytes. Normal Chrome verified
Hindi 36 measured versus 33 estimated, 3,036 remaining, and 2,012 remaining
after increasing reply reserve to 2,048. No captured warnings/errors.
Screenshot: docs/screenshots/github-pages-demo.jpg. GitHub's API reports an
inherited origin certificate bad_authz state, but direct public HTTPS and Chrome
work without certificate warnings through the existing Cloudflare endpoint.
No unrelated repository or DNS settings changed. Old hosting remains intact as
fallback; current submission docs now link only to the independent new demo.
Record: rounds/2026-10-20-github-pages.json.
Documentation commit d4e2276bfce2a6e3ccf467cad5da712bcc91ad99 was pushed and
matched remote main. The working tree was clean; 27 local document targets
resolved, no old-host link remained in active submission docs, and the repository
homepage now points to the new HTTPS domain.
Immediate next action: record on the new domain, supply the actual video URL
and perform final submission review. No video upload or Devpost submission
performed.

October 20 submission sync: fetched GitHub commit 05bce4b and reconciled its
compact README/detail-file layout with the latest public-access and evidence
changes. GitHub anonymous API confirms public visibility. Devpost prose, source
links and checklist updated. Eight tests and estimator source checks pass; 28
relative document links resolve; bounded credential scan found no matches.
Runtime files match deployed commit 0246b66 exactly. Merge b1ea15f was pushed
normally and its full SHA matched remote main. Five public GitHub files were
downloaded anonymously and matched local bytes. Live app content and all four
runtime assets matched; hosting adds a Cloudflare script to the HTML. No live
app changes or browser interaction while Om records.
Record: rounds/2026-10-20-submission-sync.json.

October 20 public release: user explicitly requested a normal-browser demo
without owner access. Sites access changed from custom owner-only to public,
policy revision 2. Anonymous curl (no cookies or auth headers) returned HTTP 200
at the unchanged demo URL, with app HTML and no sign-in redirect. Opened the
live app in Chrome and verified exact Qwen measurement: 36 measured, 33 estimated,
3,036 tokens remaining at the recording budget. Updated the footer and current
instructions to public access and deployed version 5 successfully from commit
0246b66a9ec43fd78784631aea3262c19c54130d, deployment
appgdep_6ad79aa3f0b88191ace3dbbb02f5251a. Post-deployment anonymous page, app.js
and worker requests returned HTTP 200; page includes "Public demo". Chrome
repeated the correct exact result after reloading. Screenshot:
docs/screenshots/public-chrome-demo.jpg. Eight tests passed. The Chrome demo
tab is retained for recording. Earlier private-state records below are historical.
Record: rounds/2026-10-20-public-release.json.

October 20 final narration: DEMO_SCRIPT now includes the plain-language weighted
character estimator explanation between comparison and budgeting. Product-only
close retained; no "My contribution" section. Target 3:35, pending timed rehearsal.
No app changes, recording or submission. GitHub synchronization remains pending.
Record: rounds/2026-10-20-final-demo-script.json.

October 20 provenance clarification: verified the reused LocalMind coefficients
and classifier against hash-checked upstream files. Added
scripts/verify-estimator-source.mjs and a worked Hindi calculation to README;
linked it from the Devpost draft. Corrected an extra trailing character in the
source SHA in README and NOTICE. All 75 weights and 1,114,112 code-point
classifications match; Hindi weighted sum 32.342 rounds to 33. Eight app tests
pass. Removed the obsolete credits segment from JUDGE_GUIDE's video outline;
DEMO_SCRIPT already has no contribution/credits speech. Written source notices
remain. Research files and deployed app unchanged. GitHub sync is still pending;
the new README anchor is local until pushed. Next: rehearse the product-focused
script; inspect remote changes before syncing submission evidence.
Record: rounds/2026-10-20-estimator-evidence.json.

October 20: recording guidance added to docs/DEMO_SCRIPT.md, including Mac
microphone/capture setup, an audio test, timing buffer and post-recording checks.
Current deployed page controls were inspected without changing UI state; exact
measurement was not rerun. Rehearsal counts remain the October 18 observations.
No recording, upload, submission or access change has been performed.
Record: rounds/2026-10-20-recording-preparation.json.
Recording notes are committed locally at c9b5ea4. Push was rejected because
remote main contains newer work; do not force push. Inspect remote changes
before syncing. Recording can proceed from the local script.

October 20 follow-up: at Om's request, removed the spoken contribution/credits
paragraph from DEMO_SCRIPT.md and replaced it with a product-focused close.
README, NOTICE and Devpost attribution/disclosure remain unchanged. Checked the
script diff; no runtime changes or tests needed. Next: rehearse and record.
Record: rounds/2026-10-20-script-close.json.

October 19: inspected the implementation to prepare a plain-English engineering
explanation for Om's judge rehearsal. No application or deployment changes;
tests were not rerun. Record: rounds/2026-10-19-judge-engineering-brief.json.
Submission tasks below remain unchanged.

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

Record using the public Chrome demo and current DEMO_SCRIPT.md; no owner login
or Codex browser is required. Final video and Devpost submission are still pending.
GitHub remote divergence is resolved. Public source and demo access are verified;
Devpost copy is at docs/DEVPOST_DRAFT.md. Wait for the actual video URL, check its
duration and viewer access, and complete final participant review/submission.
No video upload or Devpost submission was performed here.
The following describes the earlier review:

The October 18 presentation pass is deployed from commit
`33c32efa4a9604fbcd68207d90119c43937abc25`.
Deployment `appgdep_6ad444b387e08191b008c5e6ad67e4ca` succeeded at
`https://contextfair.om-exp99.chatgpt.site` with owner-private access preserved.
The subsequent HTTPS page review succeeded on October 18; the earlier localhost
restriction was not bypassed. Desktop/mobile measurement, reserve changes,
stale-result behavior, and mobile method access were verified. No horizontal
overflow or captured console warnings/errors appeared. Review notes and actual
screenshots are in docs/PAGE_REVIEW.md and docs/screenshots/.

docs/DEMO_SCRIPT.md contains the spoken narration and recording checklist;
target 3:30 including clicks and pauses, to be confirmed with a timed rehearsal.
docs/DEVPOST_DRAFT.md contains the prepared
description and separate submission operator notes. English is the current
narration default. Documents are linked from README and JUDGE_GUIDE.

Next: Om reviews wording and rehearses the script, then records/uploads a video
under four minutes. Consider clarifying the script chart's Latin bucket (it
includes spaces) before recording; review only, no app change made this round.
Public repo and hosted-demo access have since been verified on October 20.
Video upload and final Devpost submission remain pending.
