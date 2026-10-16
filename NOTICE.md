# Third-party notice

The script-classification scheme and fitted tokenizer-profile weights in
`dist/core.mjs` are adapted from LocalMind:

- Source: <https://github.com/NakliTechie/LocalMind>
- Pinned study revision: `b39f0bc145a0c0926ba22247ee31cd369e0445b6c`
- Copyright (c) 2026 Chirag Patnaik
- License: MIT

The MIT license permits use, modification, and redistribution provided the
copyright and permission notice are retained. The complete license text is
available in the source repository.

The separate tokenizer study verified the estimator implementation and
investigated its saved reference counts. ContextFair does not claim ownership of
that upstream estimator or convert its fixture results into independent product
validation.

Exact in-browser measurement uses:

- `@huggingface/transformers` version `3.8.1`, distributed under the Apache-2.0
  license: <https://github.com/huggingface/transformers.js>
- tokenizer assets from `onnx-community/Qwen3.5-4B-ONNX-OPT`, pinned to revision
  `57b13b4dce7be073be0df3eaf1c842a6bbb2e0a7`:
  <https://huggingface.co/onnx-community/Qwen3.5-4B-ONNX-OPT>

These assets are fetched by the visitor's browser only after exact measurement
is requested. ContextFair does not redistribute model weights.

