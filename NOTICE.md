# Third-party notice

The script-classification scheme and fitted tokenizer-profile weights in
`dist/core.mjs` are adapted from LocalMind:

- Source: <https://github.com/NakliTechie/LocalMind>
- Pinned study revision: `b39f0bc145a0c0926ba22247ee31cd369e0445b6`
- Copyright (c) 2026 Chirag Patnaik
- License: MIT

The MIT notice for the adapted LocalMind code is retained below.

```text
MIT License

Copyright (c) 2026 Chirag Patnaik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

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

