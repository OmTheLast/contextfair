# Devpost submission copy

Updated October 20, 2026 for the conversation planner. Video and final submission
remain participant actions. The operator notes at the end are not project prose.
The name, pitch, About text, technology tags, live/repository links and track/category
have been saved in the existing Devpost draft and verified by reopening the forms.

## Project name

ContextFair

## Elevator pitch

See which AI chat messages fit—and which get dropped. Plan multilingual conversation budgets, compare estimates with Qwen token counts, and export retained messages in your browser.

## About the project

### Inspiration

I was working on a JEE learning model intended to run in the browser. That made
me think beyond the model itself: tokenizer files also add download weight, and
an interactive application needs to manage the limited space available for
conversation history and replies.

I started investigating how token counts vary with models, tokenizers, and
writing systems. A lightweight estimate seemed useful for immediate feedback,
but a number on its own did not answer the practical question: which parts of
a student's conversation would the application actually keep?

ContextFair turns that question into an application. The tokenizer investigation
remains a separate study; this project lets someone inspect and export a
conversation-retention plan.

### What it does

[Open the live app](https://ompatnaik.com/contextfair/) in a normal browser.
No account, installation, API key, or running local server is needed.

Start with an illustrative JEE tutoring conversation, edit individual messages,
or import JSON. Set a context window, reserve space for the reply, and choose
allowances for message formatting. The planner protects the system instruction
and newest exchange, then removes the oldest complete user-led exchanges until
the remaining recent history fits. Each message is labelled kept, dropped, or
protected, with its token cost and the reason for the decision.

Quick estimates are available for five model-family profiles. On demand, a
pinned Qwen tokenizer measures each message's content locally. The planner
compares the resulting retention decisions with the estimate. Changing the
budget updates the plan immediately; editing a message invalidates the old
measurement.

If even the protected content cannot fit, the app shows a blocked plan instead
of silently dropping the newest question. Otherwise, export downloads the
retained messages as JSON, including the budget assumptions. The original
conversation remains in the editor.

The separate token lab explains the estimator with illustrative multilingual
examples and measured-versus-estimated counts.

### How we built it

The application uses HTML, CSS, JavaScript modules, and Web Workers, deployed
through GitHub Pages. There is no inference backend.

The fast estimator groups Unicode code points into script buckets, multiplies
their counts by model-specific weights, sums the results, and rounds up. The
classifier and weights are adapted from MIT-licensed LocalMind, not presented
as a newly invented tokenizer. A worked calculation and reproducible source
check are included in the repository.

Exact content counting uses Transformers.js 3.8.1 with a fixed Qwen tokenizer
revision. A background worker downloads tokenizer assets on demand without
loading language-model weights. The retention algorithm is a separate pure
function: account for system content and allowances, group user-led exchanges,
and remove an oldest-first prefix until the budget is met or protected content
prevents a valid plan.

The editor validates imports, uses text-only rendering for message contents,
rejects stale worker results, and supports export without uploading the
conversation. Fonts, library code, and tokenizer assets still require external
network requests.

### Challenges we ran into

The biggest product challenge was moving beyond a token counter. A developer
can already download a tokenizer; the useful extra layer is seeing which
messages a retention policy would remove and being able to export that plan.

Correctness also required handling boundary cases: preserving a question with
its answers, never discarding the newest exchange silently, refusing an
impossible budget, and clearing measurements when text changes.

Another challenge was being precise about “exact.” A tokenizer can measure
message content exactly, but summing that content is not the same as tokenizing
a provider's complete chat template. Formatting allowances are therefore
adjustable and explicitly labelled as estimates.

### Accomplishments that we're proud of

The application now links token counting to a visible, inspectable decision.
In our illustrative JEE example, with a 256-token window, 64-token reply reserve,
and the displayed allowances, the Qwen estimate retains three messages while
the measured-content plan retains one. Increasing the window to 320 retains
three in both plans. This is one reproducible demonstration, not a general
accuracy or user-impact claim.

Seventeen automated tests cover the original estimator and the new planner,
including exact boundaries, protected-content overflow, complete-exchange
trimming, invalid inputs, and JSON imports. Browser checks verified measured
retention, budget changes, stale-result handling, blocked export, downloaded
JSON, and a narrow-screen layout.

### What we learned

A token count is useful when it changes a decision someone can inspect.
Small count differences can cross a whole-exchange retention boundary.
Keeping complete exchanges can deliberately leave unused space; filling every
last token is not the same as preserving a coherent recent conversation.

The lightweight estimate is a convenience, not a replacement for the correct
tokenizer. The planner makes its assumptions visible so developers can examine
the tradeoff rather than mistake an approximation for a guarantee.

### What's next for ContextFair

Model-specific chat-template accounting, more exact tokenizers, optional pinned
older messages, and additional retention strategies. The current policy is
oldest-first, not semantic importance or summarization. We would also like to
evaluate the workflow with people building multilingual tutoring applications.

### Scope and sources

Qwen measurement covers each message's plain-text content with special tokens
disabled. Total budgets add user-specified formatting allowances; they are not
exact serialized provider prompts, billing estimates, or guarantees of model
acceptance. The app does not run a tutor model, assess answer quality, or send
messages to an AI service. Examples are illustrative, not real student records.

Application work by Om Patnaik, with AI development assistance. LocalMind's
script classifier and weights are credited under MIT; the independent
Tokenizer Estimation Study is not submitted as this application.

[Source and method evidence](https://github.com/OmTheLast/contextfair) ·
[LocalMind](https://github.com/NakliTechie/LocalMind) ·
[Transformers.js](https://huggingface.co/docs/transformers.js/api/tokenizers) ·
[Pinned tokenizer](https://huggingface.co/onnx-community/Qwen3.5-4B-ONNX-OPT/tree/57b13b4dce7be073be0df3eaf1c842a6bbb2e0a7)

## Built with

JavaScript, HTML5, CSS3, Web Workers, Hugging Face Transformers.js, Qwen tokenizer,
Node.js (tests), GitHub, GitHub Pages.

## Submission operator notes — do not paste into About

- Track/category: Coding / Computer Science + AI (Technology).
- Source: https://github.com/OmTheLast/contextfair
- Live app: https://ompatnaik.com/contextfair/
- Video: user will supply; do not invent a URL. Maximum four minutes.
- User-provided contact email has been saved on Devpost; optional Discord is blank.
- Optional gallery upload was blocked by the browser extension's file-URL
  permission. Screenshot available at screenshots/conversation-planner-live.jpg.
- Record the conversation planner, not just the earlier token-count walkthrough.
- Registration, eligibility, Discord membership and final submission require
  participant review. Do not infer answers or accept rules on the user's behalf.
- Official deadline: October 20, 2026, 5:00 PM CDT / October 21, 3:30 AM IST.
- Source: https://eurekadev.devpost.com/ and https://eurekadev.devpost.com/rules
  (checked October 20).
