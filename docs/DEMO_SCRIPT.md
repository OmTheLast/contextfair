# ContextFair — final conversation-planner demo

Record the live app at **https://ompatnaik.com/contextfair/** in Chrome.
No local server, installation, account or API key is needed.
Target about 3:30, including clicks; event maximum four minutes. Time your take.
Only blockquotes below are spoken. No contribution/credits segment.

## Before recording

- Reload the live page. Use the built-in JEE sample, Qwen estimate, window 256,
  reply reserve 64, per-message allowance 8 and fixed allowance 16.
- Measure once to warm the tokenizer, then reload so the first screen shows
  estimates. First use downloads approximately 19 MB plus library code.
- Check the expected plan: estimate keeps 3/drops 4; measured content keeps
  1/drops 6. At window 320, both keep 3; measured plan uses 209/256 input tokens.
- Record the actual actions and results. If your numbers differ, check the
  sample/settings rather than narrating mismatched numbers.
- On Mac: Shift–Command–5 → Record Selected Portion → Options → microphone.
  Frame the browser and make a ten-second audio/readability test first.
- Keep unrelated tabs, account details and notifications out of the capture.
  Keep this script on a phone or outside the recording region.
- Do not claim the hypothetical 256-token demo window is Qwen's actual limit.

## 0:00–0:25 — Why I built it

**Show:** hero, then click “Plan a conversation.”

> Hi, I'm Om, and this is ContextFair.
>
> While working on a JEE learning model intended to run in the browser, I started
> looking at tokenizer download sizes and how token counts change across
> languages. But the practical question wasn't just how many tokens a message
> uses. It was: which parts of a student's conversation will the application keep?

## 0:25–1:00 — Make the problem visible

**Show:** JEE sample, system instruction, first user message, budget controls.

> Here is an illustrative tutoring conversation. At the start, the student asks
> for simple explanations without skipping steps. Later, they ask the tutor to
> remember that preference.
>
> I'll use a deliberately small window of 256 tokens and reserve 64 for the reply.
> The planner protects the system instruction and newest exchange, then removes
> older complete exchanges until the recent history fits. It doesn't separate
> a user's question from its assistant replies.

## 1:00–1:30 — Estimate, then verify

**Show:** estimated summary, then click “Measure Qwen messages.”

> The quick estimate keeps three messages. It counts characters by writing-system
> bucket, applies model-specific weights, adds them and rounds up.
>
> Now I'm checking with the actual Qwen tokenizer. It runs locally in a background
> worker, without loading the language model. With measured content, only one
> message remains under this policy. Two retention decisions changed.
>
> These results describe this example, not a general accuracy score.

## 1:30–2:05 — Explore the decision

**Show:** change window to 320. Point to both summaries, then scroll through the
dropped and kept message cards.

> Increasing the window to 320 lets both plans keep three messages.
> The measured-content plan uses 209 of the 256 input tokens available.
>
> Each card explains whether the message is kept, dropped or protected.
> Notice that the student's original explanation preference is in the dropped
> history. That makes the consequence visible before sending a conversation.
> This policy keeps recent exchanges, not whichever information is most important.

## 2:05–2:35 — Export and fail safely

**Show:** click “Export retained JSON.” Set window to 100; show blocked status.
Restore 320 afterward.

> I can export the retained messages and budget assumptions as JSON for use in
> my application. The original conversation stays in the editor.
>
> If I make the window too small, even the protected content cannot fit.
> ContextFair shows a blocked plan and disables export, instead of silently
> throwing away the newest question.

## 2:35–3:05 — Engineering and honest boundaries

**Show:** edit the final message; measured summary disappears.

> Editing a message clears the previous measurement so an old count cannot be
> mistaken for the new text.
>
> The application is plain JavaScript, with a separate tested retention algorithm
> and a Web Worker for tokenization. Conversations are processed in browser memory.
> Tokenizer and library downloads need internet access, but the app doesn't
> upload the conversation or call an inference service.

## 3:05–3:30 — Close

**Show:** formatting allowance controls and planner summary.

> The content counts are measured, but chat-formatting costs are still explicit,
> adjustable allowances—not an exact provider prompt or a guarantee it will fit.
>
> Next I want model-specific chat templates and more exact tokenizers.
> ContextFair turns a token count into something actionable: see what stays,
> see what gets dropped, and export a conversation plan you can inspect.

## After recording

Play the whole video, check readable numbers and audible speech, confirm it is
under four minutes, and upload it with viewer access enabled. Supply the real
video URL on Devpost. Do not substitute a placeholder link.
