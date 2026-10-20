# Devpost submission copy

Updated October 20, 2026. Ready for final review and copying into Devpost; nothing
has been submitted. The About section below is project prose; the final
section contains operator notes and is not part of the project description.

## Project name

ContextFair

## Elevator pitch

See how much room your message leaves for an AI conversation: compare multilingual
token estimates, plan your context budget, and verify Qwen counts in your browser.

## About the project

### Inspiration

AI conversations have limited space, measured in tokens. When a chat application
relies on an inaccurate estimate, it can either remove useful earlier messages
too soon or admit text that exceeds its budget. Different writing systems and
tokenizers make a single character-count rule an unreliable design assumption.

ContextFair grew out of work examining token estimation in a separate research
study. The application asks a practical question: what does a count difference
mean for the space left in an AI conversation?

### What it does

[Try the public demo](https://ompatnaik.com/contextfair/)—no sign-in or
installation required.

ContextFair lets a user paste text or choose an illustrative multilingual example,
compare five model-family estimates, set a hypothetical context window, and
reserve space for a reply. Each row shows estimated usage and remaining space.

The user can then request an exact count from a pinned Qwen tokenizer. The app
shows the measured count beside the estimate and explains its budget consequence.
Changing the reply reserve updates that explanation. Editing the text hides the
previous measurement until the new text is measured.

In the built-in Hindi demonstration, Qwen estimates 33 tokens while the pinned
tokenizer measures 36: an underestimate of three tokens, or 8.3%. With a
4,096-token window and 1,024 reserved for the reply, that measured input leaves
3,036 tokens available. This illustrates the workflow; it is not a general
accuracy score or a controlled comparison between languages.

### How it was built

The application uses buildless HTML, CSS, and JavaScript. Instant estimates use
script-aware profile weights adapted from the MIT-licensed LocalMind estimator.
The estimator counts Unicode code points by script bucket, multiplies each
count by a model-profile weight, adds the results, and rounds up. The
[worked calculation and source check](https://github.com/OmTheLast/contextfair/blob/main/README-DETAILS.md#estimator-calculation-and-evidence)
explain the Hindi estimate of 33; the actual tokenizer measured 36 in our demo
review.

Exact counting runs in a browser Web Worker using Transformers.js 3.8.1 and the
Qwen tokenizer at a fixed repository revision. It downloads tokenizer assets on
demand without loading model weights or calling an inference API.

ContextFair adds the interface, shared-budget workflow, measured-versus-estimated
explanation, and handling for loading, errors, retries, and stale results. The
application code processes entered text locally. Font, library, and tokenizer
downloads still involve requests to external services.

### Challenges

The main design challenge was explaining an estimate without making it look like
an exact measurement. The comparison rows and verification panel are separated
and explicitly labelled. Another challenge was keeping results attached to the
text they describe: a previous measurement must disappear when input changes.

Browser validation also caught a styling rule that made hidden result boxes
visible during loading. Correcting that behavior made the download and result
states clearer. The roughly 19 MB tokenizer download made on-demand loading and
an understandable progress state important.

### Accomplishments

The application connects a token-count difference to a concrete budget decision
in one browser workflow. Its distinctive feature is the path from quick estimate
to actual measurement to remaining conversation space, rather than a new
tokenization algorithm.

Eight automated tests pass. Desktop and mobile checks on
the deployed app confirmed measurement, reserve changes, stale-result handling,
and access to the method dialog. The source includes setup instructions,
attribution, and limitations. On October 20, anonymous access to the public page
and its application assets succeeded, and the Hindi measurement was repeated in
Chrome outside the development environment.

### Lessons learned

A count becomes useful when a person can understand what decision it changes.
For this application, that means showing how much room remains and explaining
what the count excludes. Verification also needs a precise scope: matching one
example does not establish accuracy across languages or model families.

### What's next for ContextFair

Future work includes more exact tokenizers, explicit budgeting for chat templates
and system instructions, and evaluating how people use the tool when designing
multilingual applications. The current prototype supports one exact tokenizer
and does not automatically prune conversations.

### Credits and scope

The application began on October 11, 2026. The script classifier and fitted
weights reuse LocalMind work by Chirag Patnaik under MIT; they are not claimed
as a new estimator. The Tokenizer Estimation Study remains an independent project.
OpenAI Codex assisted implementation and documentation.

Exact counts apply to the selected tokenizer with special tokens disabled. They
exclude chat formatting, system prompts, tools, and provider-specific billing.
Token count does not measure model quality or establish fairness. No user-impact
or cost-saving result is claimed.

Sources: [ContextFair code and README](https://github.com/OmTheLast/contextfair),
[LocalMind](https://github.com/NakliTechie/LocalMind),
[Tokenizer Estimation Study](https://github.com/OmTheLast/Tokenizer-estimation-study),
[Transformers.js](https://huggingface.co/docs/transformers.js/api/tokenizers),
[pinned Qwen tokenizer](https://huggingface.co/onnx-community/Qwen3.5-4B-ONNX-OPT/tree/57b13b4dce7be073be0df3eaf1c842a6bbb2e0a7).

## Built with

JavaScript, HTML5, CSS3, Web Workers, Hugging Face Transformers.js, Qwen tokenizer,
Node.js (tests), GitHub, GitHub Pages (hosting). Codex was development assistance,
not an inference dependency of the running application.

## Submission operator notes — do not paste into About

- Track: Coding. Category: Computer Science + AI (Technology).
- Source URL: https://github.com/OmTheLast/contextfair
- Video: record using DEMO_SCRIPT.md, check duration <=4 minutes, and supply the
  actual accessible video URL. No video link exists yet in this draft.
- Hosted demo: https://ompatnaik.com/contextfair/ — GitHub Pages, public as of
  October 20. Anonymous HTTPS access was verified without cookies or authorization
  headers. Runs in a normal browser. The README also includes local setup.
- Source visibility: GitHub's unauthenticated API confirmed the repository is
  public on October 20. Verify the final uploaded video link while logged out.
- Paste the elevator pitch, About section, and Built with items into their
  matching fields. Do not paste these operator notes into the project story.
- No participant eligibility or completed registration is asserted here.
- Confirm participant registration, age/student eligibility, and Discord
  membership separately. No submissions or external messages were sent.
- Requirements: https://eurekadev.devpost.com/ and
  https://eurekadev.devpost.com/rules (checked October 20, 2026).
