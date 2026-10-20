# ContextFair

**See which messages fit in an AI conversation—and which get dropped.**

ContextFair helps people building multilingual AI tools plan retained message
history, compare token estimates with actual Qwen content counts, and export a
budgeted conversation—all in the browser. A token is a piece of text counted by
a model; the context window is the space available for its input and response.

Built for **EurekaDev 2026 · Coding Track · Computer Science + AI**.

[Live application](https://ompatnaik.com/contextfair/) ·
[Demo and pitch guide](docs/JUDGE_GUIDE.md) · [Attribution](NOTICE.md) · [MIT license](LICENSE)

[Spoken demo script](docs/DEMO_SCRIPT.md) · [Devpost draft](docs/DEVPOST_DRAFT.md) ·
[Page review and screenshots](docs/PAGE_REVIEW.md)

**Demo access:** the app is hosted independently on GitHub Pages at
**https://ompatnaik.com/contextfair/** and requires no sign-in. Open the demo URL
in a modern browser. Anonymous HTTPS access was verified on October 20, 2026.
Local setup remains available below.

## Deployment

[The Pages workflow](.github/workflows/pages.yml) runs the application tests
and publishes only `dist/` after changes to application files on `main`. It can
also be started manually from GitHub Actions. No backend server or ChatGPT hosting
is needed. The domain is inherited from the account's existing GitHub Pages
configuration; no DNS settings were changed for this deployment.

## Why it matters

Chat applications work within a finite token budget. If an app overestimates
message size, it may remove history that could fit. If it underestimates, it may
send more text than the available space allows. Writing systems and tokenizer
choices can affect these counts, so multilingual products need more than one
rule of thumb.

ContextFair brings three steps into one interface: plan retained messages,
inspect how estimates change that decision, and measure Qwen on demand.
It can export a trimmed conversation but does not send it to a model or change
the model's context window.

## Conversation planner

The planner takes a system instruction plus user/assistant messages, a context
window, reply reserve, per-message allowance and fixed prompt allowance.
It groups each user message with following assistant replies up to the next
user message. It protects the newest group and system instruction, then removes
the oldest groups until the retained suffix fits. It does not skip a large
recent group to pack unrelated older messages, split an exchange, summarize
content or rank semantic importance.

If protected content alone exceeds the input budget, the plan is blocked and
export is disabled. Otherwise exported JSON contains the retained messages and
explicit budget assumptions. It can be reimported. Export never deletes editor
contents. A limit of 100 messages and 100,000 characters bounds input size.
No automatic persistence is used.

Each Qwen content count is measured separately with special tokens disabled.
System content is included. The total is **content + per-message allowances
(including the system message if present) + fixed allowance**. Defaults of 8 per
message and 16 fixed are adjustable placeholders, not measurements of Qwen's
template. Tools, full chat-template tokenization and provider billing remain
unsupported. A fitting plan is therefore not a guarantee of provider acceptance.

The illustrative JEE sample at window 256/reserve 64/allowances 8 and 16 keeps
3 messages under the Qwen estimate and 1 under measured Qwen content. At window
320 both keep 3, and the measured-content plan uses 209/256 input tokens.
These are a reproducible example, not general accuracy or user-impact evidence.

## Try it locally

Requirements: Git, Python 3, and a modern browser with JavaScript, ES modules,
and module Web Workers. Node.js 18+ is needed only for the tests.

```bash
git clone https://github.com/OmTheLast/contextfair.git
cd contextfair
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open **http://127.0.0.1:4173/**. Stop the server with Ctrl+C. If the port is in
use, replace `4173` with `4174` and open that port instead.

No package installation, API key, paid inference, or build step is required.
Serve the app over HTTP; opening `index.html` as a file will not reliably load
its modules and worker. First-time exact measurement requires internet access
to jsDelivr and Hugging Face and downloads roughly 19 MB of tokenizer files
plus library code. Only tokenizer files are loaded, not model weights.

## A one-minute walkthrough

1. Choose **हिन्दी**. Read the five estimated counts for the same message.
2. Select a **4,096** context window and **1,024** reply reserve. This leaves
   **3,072** input tokens. Each row shows estimated space used and remaining.
3. Click **Measure exact Qwen count**. After the initial download, the panel
   reports the measured count, Qwen estimate, difference, and tokenizer revision.
4. Read the explanation beneath the result. Change the reserve to **2,048**:
   the input budget becomes **2,048**, and the measured budget explanation updates.
5. Edit the text. The old exact result disappears until you measure again.
   Open **Method & privacy** for the scope and limitations of these counts.

The language buttons contain illustrative messages, not evaluation data. Their
wording and lengths differ; comparing them is not a controlled fairness study.

## What works today

| Capability | Scope |
| --- | --- |
| Instant estimates | Qwen, Gemma, LFM, Bonsai, and MiniCPM family profiles |
| Exact measurement | One pinned Qwen tokenizer, explicitly requested by the user |
| Budget exploration | Shared hypothetical context window minus reserved response space |
| Result explanation | Estimate error and remaining space based on the measured Qwen count |
| Script composition | Counts Unicode code points in coarse script classes |
| Browser interaction | Loading, error/retry, empty input, and stale-result handling |

## How it works

The app is buildless HTML, CSS, and JavaScript. All text analysis runs in the
visitor's browser. The exact tokenizer runs in a Web Worker, a background browser
task that keeps its work off the main interface thread.

```text
Entered text → script classification → five weighted estimates → budget rows
     └─ on request → browser worker → pinned Qwen tokenizer → measured result
Context window − reply reserve → input budget → remaining space / overflow
```

- `dist/core.mjs`: script classification, estimator weights, arithmetic, and
  measured-result explanation. Each estimate rounds up the sum of script-class
  counts multiplied by profile weights.
- `dist/app.js`: input handling, display updates, and worker messages.
  Changing the text invalidates its previous exact result.
- `dist/conversation.mjs`: validated JSON import, estimated message counts and
  pure whole-exchange retention planning.
- `dist/planner.js`: conversation editor, budget comparison, stale batch-result
  rejection and browser-local JSON export.
- `dist/exact-tokenizer-worker.js`: loads the tokenizer on demand and counts
  `encode(text, { add_special_tokens: false })` output IDs.
- `dist/index.html` and `dist/styles.css`: interface, walkthrough, method dialog,
  responsive layout, and reduced-motion support.
- `tests/core.test.mjs`: dependency-free Node tests.

Exact runtime: **Transformers.js 3.8.1**. Tokenizer:
[`onnx-community/Qwen3.5-4B-ONNX-OPT`](https://huggingface.co/onnx-community/Qwen3.5-4B-ONNX-OPT/tree/57b13b4dce7be073be0df3eaf1c842a6bbb2e0a7),
revision `57b13b4dce7be073be0df3eaf1c842a6bbb2e0a7`.
Pinning a revision fixes which tokenizer files are requested, making the count
reproducible. See the [Transformers.js tokenizer API](https://huggingface.co/docs/transformers.js/api/tokenizers).

## Estimator calculation and evidence

The estimate is a weighted character count, not a tokenizer:
`ceil(sum(character count in each bucket × profile weight for that bucket))`.
Weights represent approximate tokens per Unicode code point. They are fixed
numbers in the app, not learned from the visitor's text.

For the built-in Hindi message and Qwen profile:

| Character bucket | Code points | Weight | Contribution |
| --- | ---: | ---: | ---: |
| Latin bucket (all spaces in this example) | 15 | 0.196 | 2.940 |
| Symbols | 1 | 0.549 | 0.549 |
| Devanagari | 61 | 0.473 | 28.853 |

The total is **32.342**, rounded up to **33 estimated tokens**. The previously
observed exact Qwen count was **36**; this arithmetic check does not rerun it.
Character buckets lose word order and word identity, so equal bucket counts
produce equal estimates even when an actual tokenizer could produce different
counts. Code points are also not always the same as visible characters.

The [pinned upstream source](https://github.com/NakliTechie/LocalMind/blob/b39f0bc145a0c0926ba22247ee31cd369e0445b6/index.html#L8986-L9058)
contains these coefficients and classification rules. Its comments describe
coordinate-descent fitting: repeatedly adjusting one coefficient at a time to
reduce error against tokenizer counts. That describes upstream's stated method,
not a fitting run reproduced by ContextFair. The comment refers to 42 samples,
while the saved fixture module contains 38; do not present either as an
independent accuracy benchmark.

An optional source check verifies the upstream file hashes, all 75 reused
coefficients, classification for all 1,114,112 code-point values, and the Hindi
calculation. Run it against a checkout of the pinned LocalMind revision:

```bash
node scripts/verify-estimator-source.mjs /path/to/LocalMind
```

This check passed on October 20, 2026. It establishes reuse and arithmetic,
not general prediction accuracy. The app itself does not require that checkout.
The separate study's [reproduction report](https://github.com/OmTheLast/Tokenizer-estimation-study/blob/main/docs/PHASE0_RESULTS.md)
documents tokenizer checks and special-token discrepancies on familiar fixtures;
its research evidence remains separate from the application.

## Verification and limits of the evidence

```bash
node --test tests/core.test.mjs
```

The 17 tests cover representative script classification, Unicode code points,
budget arithmetic, estimate comparison, measured-result explanations, protected
content, whole-exchange trimming, boundary budgets, invalid input and JSON import. The
worker configuration check verifies pinned settings; it does not download
the tokenizer or replace a browser check.

On October 16, 2026, local and deployed browser checks reproduced a public
LocalMind reference result: **35 measured tokens versus 43 estimated**,
an overestimate of **8 tokens / 22.9%**. This is an integration check against a
known reference, not an unseen benchmark or general accuracy score. Round
records under `recovery/` document checks and their limitations.

On October 18, the deployed Hindi demo measured **36 tokens versus 33 estimated**.
Desktop and mobile review verified the revised result explanation, reserve changes,
stale-result behavior, and the method dialog. See the [review record](docs/PAGE_REVIEW.md)
for exact settings, screenshots, and the script-bucket wording issue.

On October 20, the public demo repeated **36 measured versus 33 estimated** in
Chrome with **3,036** input tokens remaining at the recording budget. Anonymous
requests to the page and application scripts returned HTTP 200 without cookies
or authorization headers. GitHub's unauthenticated API also confirmed the source
repository is public.

The October 20 conversation-planner release additionally verified the JEE
sample's 3-versus-1 retention comparison in Chrome on the public domain,
increasing the window, blocked export, stale results, and a real downloaded JSON
file containing the system instruction plus three retained messages. That file
reimported successfully. A narrow-screen check showed no horizontal overflow.
Public release `570dc1c` includes versioned assets to avoid mixed old/new browser
caches. Screenshot: [live planner](docs/screenshots/conversation-planner-live.jpg).

## Privacy and network use

ContextFair's application code does not upload entered text, save it between
visits, or send it to an inference API. Text is passed locally to the worker.
There are no application analytics or account features. The hosted demo allows
public access without sign-in.

The page requests Google Fonts. Exact measurement requests library code from
jsDelivr and tokenizer assets from Hugging Face. These services and the host see
normal network metadata. Browser caching depends on settings and storage;
offline operation is not guaranteed. If an exact download fails, estimates
remain usable and the measurement can be retried.

## Limitations

- Exact means individual content counts for this tokenizer and settings.
  The planner includes system content but uses estimated formatting allowances.
  Full chat templates, special tokens, tools, and provider billing are not measured.
- Five comparison rows always show estimates; measuring Qwen does not replace
  them. Profile names do not promise accuracy for every release in a model family.
- The context window is a user-selected scenario, not a verified model limit.
  The planner imports text-only chat JSON and exports an oldest-first retained
  suffix; it does not alter an actual running chat or invoke a model.
- Script classes are coarse Unicode ranges, not language detection. Mixed text,
  emoji, code, or unrepresented scripts can expose estimator weaknesses.
- Smaller token counts do not establish better answers, cultural understanding,
  or fairness. No broad accuracy result or user-impact study is claimed.
  Large inputs and slow devices may take longer to measure.

## Original work, research boundary, and attribution

ContextFair began as an application on October 11, 2026. Its interface, budget
workflow, worker integration, explanatory copy, and product tests are application
work. The script classifier and fitted profile weights are adapted from the
MIT-licensed [LocalMind](https://github.com/NakliTechie/LocalMind) estimator by
Chirag Patnaik, revision `b39f0bc145a0c0926ba22247ee31cd369e0445b6`.

The independent [Tokenizer Estimation Study](https://github.com/OmTheLast/Tokenizer-estimation-study)
informed the project; its datasets, experiments, and research claims remain
separate. Running ContextFair does not require a study checkout. See
[the product/research boundary](docs/PRODUCT_BOUNDARY.md) and [third-party notice](NOTICE.md).

Development and documentation were assisted by OpenAI Codex. The repository
records implementation and verification work; AI assistance does not establish
correctness or originality of upstream components.

Application license: [MIT](LICENSE). Third-party components retain their own
licenses and attribution.

## Next steps

Rehearse the prepared script, record the video, and review the submission draft.
The hosted demo is public. Potential future product work includes additional
exact tokenizers and explicit chat-template budgeting; those features are not
part of this prototype.
