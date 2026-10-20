# ContextFair demo script

Draft for Om's review. English narration; target about 3:30 including clicks and
short pauses. The event maximum is four minutes. Time a rehearsal before recording.
Only quoted paragraphs are spoken; directions and headings are not narration.

## Before recording

- Use screen plus your own voice; a webcam and slides are optional. Target 3:30,
  with a buffer below the [four-minute maximum](https://eurekadev.devpost.com/).
- On Mac, press Shift–Command–5, choose Record Selected Portion, frame only the
  app, then choose your microphone under Options. Stop with Command–Control–Esc
  or the menu-bar Stop button. See [Apple's recording guide](https://support.apple.com/en-au/102618).
- Make a ten-second test and play it back before the full take. Confirm audible
  speech and readable text. Keep this script on a phone or outside the capture area.
- Have the GitHub README open in another tab before starting. Keep the browser
  content area in the same recording region when switching to it.

- Open the deployed app in the owner's session or run locally using the README.
- Use a desktop browser. Hide unrelated tabs, notifications, and account details.
- Choose हिन्दी, set window 4,096 and reply reserve 1,024, and measure once to
  warm the tokenizer. Return to the top before starting. Mention first-use loading.
- Confirm the result remains 36 measured versus 33 estimated. If it differs,
  investigate the input/settings rather than reading numbers that disagree.
- Keep the actual measurement and screen actions visible. Record the finished
  video under four minutes; trim pauses, not disclosures or evidence.
- Do not describe the script chart as detected languages: its Latin bucket
  includes spaces. Focus the demo on estimates, measurement, and budget.
- Timing marks below are guides, not measured recording durations. If a take is
  too long, shorten pauses or retake; do not rush the evidence.

## 0:00–0:30 — The problem

**Show:** hero, then click “Try the one-minute walkthrough.”

> Hi, I'm Om, and this is ContextFair. AI conversations have limited space.
> Models count that space in tokens—pieces
> of text, rather than simply words. If a chat app estimates too high, it may
> remove useful history early. If it estimates too low, it may admit more text
> than fits. ContextFair helps people building multilingual AI tools inspect
> that tradeoff.

## 0:30–1:00 — Compare estimates

**Show:** select हिन्दी. Point to the input and five estimated rows.

> Here is an illustrative Hindi message. ContextFair gives five quick estimates
> for the same text, from twenty-one to ninety-six tokens. These are model-family
> profiles, and every row is labelled as an estimate. That difference is a reason
> to verify a count, not proof that one model gives better answers.

## 1:00–1:25 — Set the budget

**Show:** context window 4,096; reply reserve 1,024.

> I am choosing a hypothetical window of four thousand and ninety-six tokens,
> and reserving one thousand and twenty-four for the reply. That leaves three
> thousand and seventy-two for input. The rows show how much of that space each
> estimate would use. This shared setting is a scenario, not every model's
> advertised limit.

## 1:25–2:05 — Measure and explain

**Show:** click “Measure exact Qwen count” or “Measure again.” Scroll to the
measured panel and pause. On first use, allow loading to finish.

> Now I can check Qwen with a real tokenizer. On first use, the browser downloads
> about nineteen megabytes of tokenizer files plus the library. I have loaded
> those for this recording. The entered text is processed here in the browser.
>
> For this message, the estimate is thirty-three tokens and the measured count
> is thirty-six. The estimate misses three tokens, about eight point three
> percent. The explanation turns that into a budget decision: this message leaves
> three thousand and thirty-six input tokens available.

## 2:05–2:30 — Change the decision

**Show:** change reply reserve to 2,048. Point to the updated explanation, then
edit the input to “एक नया संदेश।” and show the old result disappearing.

> If I reserve more space for the reply, the available input budget shrinks and
> the explanation updates. Now two thousand and twelve tokens remain after this
> message. If I change the text, the old measurement disappears. I need a new
> measurement before relying on that result.

## 2:30–3:05 — Explain the implementation and limits

**Show:** Method & privacy, then the README's architecture.

> The application uses HTML, CSS, and JavaScript. Exact counting runs in a browser
> worker using Transformers.js and a pinned Qwen tokenizer. It needs no inference
> API key. The worker keeps tokenization off the main interface thread.
> The code does not upload entered text, although downloading fonts and
> tokenizer assets still makes network requests.
>
> These counts cover the entered text. Chat formatting, system instructions, and
> provider billing are excluded. Only Qwen has exact measurement in this version.

## 3:05–3:25 — Next steps and close

**Show:** Return to the app.

> ContextFair brings estimates, budget planning, and exact verification into one
> application. Next, I want to support more exact tokenizers and account for chat
> formatting and system instructions. The goal is to help developers check how
> much conversation space their text actually needs.

## Recording handoff

Save the final video, confirm its duration and audio, upload it to a location
judges can access, and use that URL in the Devpost video field. No video has been
recorded or uploaded by preparing this script. See DEVPOST_DRAFT.md for text.

Before upload, watch the complete take. Check that spoken numbers match the
visible results, the result is readable for a few seconds, no private information
appears, and the closing narration is audible. After upload, test the viewing link
while logged out; an owner-visible preview is not sufficient.

If measurement fails during rehearsal, stop and troubleshoot before the final
take. Do not narrate an expected count over an error or pass a saved screenshot
off as a successful live measurement.
