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

The current build is a static, browser-local application. It provides:

- instant, model-specific token **estimates** for five tokenizer profiles;
- optional exact Qwen measurement using a pinned tokenizer revision, loaded only
  after the user requests it;
- a context-window simulator with reserved output space;
- script composition and cost/retention comparisons;
- clearly labelled illustrative language examples;
- no accounts, uploads, or server-side text processing.

Estimates and exact measurements are displayed separately. Exact measurement
uses `onnx-community/Qwen3.5-4B-ONNX-OPT` at revision
`57b13b4dce7be073be0df3eaf1c842a6bbb2e0a7`, with special tokens disabled.
The approximately 19 MB tokenizer is downloaded by the browser on demand and
then cached by the browser; entered text is tokenized locally.

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
separate tokenizer study. Exact measurement uses Hugging Face Transformers.js
and pinned tokenizer files from the Qwen model repository. See `NOTICE.md`.
ContextFair's interface and scenario logic are new application work.

