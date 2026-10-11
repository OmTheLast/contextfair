# ContextFair

ContextFair is a browser application for exploring how tokenizer choice and
writing system affect an AI model's context budget. It is being built as a new
EurekaDev 2026 application.

## Boundary with the tokenizer study

ContextFair and `../tokenizer-study/` are independent projects:

- The tokenizer study owns research questions, experiments, datasets, frozen
  evaluations, findings, and research claims.
- ContextFair owns the user experience, context-budget scenarios, application
  code, product tests, and hackathon submission.
- ContextFair may cite a released study result or use a separately licensed
  estimator, but it must preserve provenance and must not present an estimate as
  an exact tokenizer count.
- Work on ContextFair does not modify the tokenizer study.

## Current prototype

The first build is an offline-friendly static application. It provides:

- instant, model-specific token **estimates** for five tokenizer profiles;
- a context-window simulator with reserved output space;
- script composition and cost/retention comparisons;
- clearly labelled illustrative language examples;
- no accounts, uploads, or server-side text processing.

Exact in-browser tokenizer verification is a planned, separately labelled next
milestone. The current prototype never calls an estimate “exact.”

## Run locally

```bash
python3 -m http.server 4173 --directory dist
```

Then open <http://localhost:4173>.

## Test

```bash
node --test tests/core.test.mjs
```

## Attribution

The initial estimator profiles are derived from the MIT-licensed LocalMind
token-count estimator by Chirag Patnaik, reproduced and investigated in the
separate tokenizer study. See `NOTICE.md`. ContextFair's interface and scenario
logic are new application work.

