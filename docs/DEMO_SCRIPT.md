# ContextFair demo script

Final recording script. English narration; target about 3:35 including clicks and
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

- Open [the live demo](https://ompatnaik.com/contextfair/) in a normal browser
  such as Chrome. This is hosted on GitHub Pages and requires no sign-in.
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

## 0:00–0:25 — The problem

**Show:** hero, then click “Try the one-minute walkthrough.”

> Hi, I'm Om, and this is ContextFair.
>
> AI conversations have limited space, measured in tokens—pieces of text.
> If an app overestimates a message's size, it might remove useful history too
> early. If it underestimates, the text might exceed its budget.
> ContextFair makes that tradeoff visible.

## 0:25–0:45 — Compare estimates

**Show:** select हिन्दी. Point to the input and five estimated rows.

> I'll choose this Hindi example. The same text produces five estimates,
> ranging from twenty-one to ninety-six tokens.
> These are estimates for different model-family profiles—not five exact
> measurements, and not a ranking of model quality.

## 0:45–1:15 — Explain the estimator

**Show:** Keep the Hindi input and Qwen's 33-token estimate visible. Point to the
Qwen row. The worked calculation is in README-DETAILS.md if needed for questions.

> How are these estimates calculated? The app groups characters by writing
> system, counts each group, and multiplies those counts by model-specific
> weights. It adds the results and rounds up.
>
> For this Hindi message, Qwen's weighted total is about thirty-two point three,
> giving an estimate of thirty-three. It's a lightweight approximation:
> it doesn't actually split the text into tokens.

## 1:15–1:40 — Set the budget

**Show:** context window 4,096; reply reserve 1,024.

> I'll set a hypothetical context window of four thousand and ninety-six tokens,
> reserving one thousand and twenty-four for the reply.
> That leaves three thousand and seventy-two for input.
> Each row shows estimated usage and remaining space. This is a shared scenario,
> not every model's actual context limit.

## 1:40–2:20 — Measure and explain

**Show:** click “Measure exact Qwen count” or “Measure again.” Scroll to the
measured panel and pause. On first use, allow loading to finish.

> Now I'll check the estimate with the actual Qwen tokenizer.
> First use downloads about nineteen megabytes of tokenizer files, plus library
> code. I've loaded those before recording. This is tokenization, not running
> the full AI model.
>
> The estimate is thirty-three; the measured count is thirty-six.
> That's an underestimate of three tokens, or eight point three percent.
> Using the measured count, this text leaves three thousand and thirty-six
> input tokens available. That's the practical consequence of checking.

## 2:20–2:45 — Change the budget and text

**Show:** change reply reserve to 2,048. Point to the updated explanation, then
edit the input to “एक नया संदेश।” and show the old result disappearing.

> Reserving more space for the reply reduces the input budget.
> Now two thousand and twelve tokens remain after this message.
>
> If I edit the text, the old measurement disappears.
> That prevents a result for the previous message from being mistaken for the
> current one.

## 2:45–3:15 — Explain the engineering and limits

**Show:** Method & privacy, then the README's architecture.

> The app uses HTML, CSS, and JavaScript.
> Transformers.js runs the tokenizer in a background browser worker,
> keeping tokenization off the interface thread.
> The tokenizer version is fixed so we know which version produced the count.
>
> Entered text is processed locally, although asset downloads use the internet.
> Exact measurement currently supports Qwen only and excludes chat formatting
> and system instructions.

## 3:15–3:35 — Close

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
