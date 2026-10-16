# Product and research boundary

## ContextFair application

ContextFair answers a product question: **what does a token-count difference mean
for a person's usable AI context?** It turns counts or estimates into visible
budget, retained-history, and overflow-risk scenarios.

Its responsibilities are interaction design, transparent labels, context-budget
arithmetic, application testing, accessibility, privacy, and the EurekaDev demo.

## Tokenizer estimation study

The tokenizer study answers research questions about estimator accuracy,
tokenizer parity, multilingual behavior, browser feasibility, and generalization.
It retains its own data restrictions, splits, experiment logs, correction history,
and standards of evidence.

## Allowed connection

ContextFair may consume a versioned, released artifact from the study as an
external dependency. It must identify the artifact and version, preserve license
and provenance, and reproduce only claims supported by that release.

The application may also run a pinned public tokenizer directly in the browser.
That output is an application measurement, not a new study result; the interface
must identify the tokenizer revision and whether special tokens are enabled.

ContextFair must not:

- change research data or study conclusions;
- use protected evaluation text as application demo content;
- describe approximate counts as exact;
- present smoke tests or fitted fixtures as unseen multilingual evaluation;
- imply that language token count measures model quality.

