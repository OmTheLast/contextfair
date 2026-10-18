# Page review, demo script, and Devpost preparation

Date: 2026-10-18 (Asia/Kolkata)

## Request

Review the page together, then prepare the demo script and Devpost description.
Keep Om informed. Draft/save/push project documents; do not submit or change access.

## Checkpoint — review and writing complete

- Started from clean commit 3264b5a.
- The user-open deployed HTTPS tab was accessible this round. Prior localhost
  browser rejection was not bypassed. Reviewed the current published presentation.
- Desktop 1280x900: hero, lab, exact-result panel inspected visually.
- Built-in Hindi sample: estimates Qwen 33, Gemma 21, LFM 96, Bonsai 72,
  MiniCPM 60; Qwen measured 36, under by 3 / 8.3%.
- Window 4096, reserve 1024: available 3072, measured remaining 3036.
- Reserve 2048: available 2048, measured remaining 2012.
- Editing text hid the old exact result and explanation, state stale.
- Mobile 390x844: measured panel and method dialog inspected; no horizontal
  overflow. No captured browser warnings/errors. Temporary viewport reset.
- Screenshots saved to docs/screenshots/hindi-measured-desktop.jpg and
  docs/screenshots/hindi-measured-mobile.jpg. No user private input captured.
- Finding: the Hindi sample shows Latin 19% because spaces belong to the
  estimator's Latin bucket. Record as a wording issue; do not call it language
  detection. Application code changes were not part of this review request.

Saved docs/PAGE_REVIEW.md, docs/DEMO_SCRIPT.md, and docs/DEVPOST_DRAFT.md.
README and JUDGE_GUIDE link to these deliverables. Narration is 404 words, about
2:53 at 140 words/minute before screen actions; target 3:30 with pauses. English
is the default; an optional preference question was offered during work.

Markdown links and whitespace checks passed. No runtime code changed, so existing
automated tests were not repeated. This round's verification was the deployed
browser flow and document checks. Commit/push the reviewed artifacts as the final
checkpoint. No background job remains.

Next: owner reviews/rehearses, considers the script-bucket label clarification,
records/uploads video, and finalizes submission. Video remains unrecorded and
submission remains unsent. Site audience and estimator study are unchanged.
