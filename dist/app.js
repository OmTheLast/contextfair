import { EXAMPLES, analyze, compareExact, formatNumber, significantScripts } from "./core.mjs";

const $ = selector => document.querySelector(selector);
const input = $("#text-input");
const windowInput = $("#context-window");
const reserveInput = $("#output-reserve");
const results = $("#model-results");
const scriptList = $("#script-list");
let exactWorker = null;
let exactRequest = 0;
let measuredText = null;
let pendingText = null;
let latestAnalysis = null;

function setExactState(state, detail = "") {
  const panel = $("#exact-panel");
  panel.dataset.state = state;
  $("#exact-status").textContent = detail;
  $("#verify-exact").disabled = state === "loading" || !input.value;
  $("#verify-exact").textContent = state === "loading" ? "Loading…" : state === "measured" ? "Measure again" : "Measure exact Qwen count";
}

function resetExactForChangedText() {
  if (measuredText !== null && measuredText !== input.value) {
    measuredText = null;
    $("#exact-result").hidden = true;
    setExactState("stale", "Text changed. Measure again for an exact count.");
  } else if (measuredText === null && $("#exact-panel").dataset.state !== "loading" && $("#exact-panel").dataset.state !== "error") {
    setExactState("idle", "Tokenizer downloads only when you ask. About 19 MB, then cached by your browser.");
  }
}

function render() {
  const text = input.value;
  const analysis = analyze(text, windowInput.value, reserveInput.value);
  latestAnalysis = analysis;
  const tokenValues = analysis.results.map(item => item.tokens);
  const min = Math.min(...tokenValues);
  const max = Math.max(...tokenValues);
  const maxScale = Math.max(1, max);

  $("#character-count").textContent = `${[...text].length} characters`;
  $("#available-copy").textContent = `${formatNumber(analysis.available)} tokens available after reserving output`;
  $("#min-max").textContent = text ? `${formatNumber(min)}–${formatNumber(max)} estimated tokens across profiles` : "Enter text to compare profiles";

  results.innerHTML = analysis.results.map((item, index) => {
    const width = item.tokens ? Math.max(4, (item.tokens / maxScale) * 100) : 0;
    const budgetWidth = Math.min(100, item.share * 100);
    const risk = item.overflow > 0 ? `<span class="risk risk-high">overflow +${formatNumber(item.overflow)}</span>` : `<span class="risk">${formatNumber(item.remaining)} left</span>`;
    return `<article class="model-row" style="--delay:${index * 45}ms">
      <div class="model-meta"><div><span class="model-dot" style="--model:${item.color}"></span><strong>${item.name}</strong></div><span>${item.note}</span></div>
      <div class="token-line"><div class="token-bar"><i style="width:${width}%;--model:${item.color}"></i></div><strong>${formatNumber(item.tokens)}</strong><small>est.</small></div>
      <div class="budget-line"><i style="width:${budgetWidth}%;--model:${item.color}"></i></div>
      <div class="row-foot"><span>${(item.share * 100).toFixed(item.share < 0.1 ? 1 : 0)}% of input budget</span>${risk}</div>
    </article>`;
  }).join("");

  const scripts = significantScripts(text).slice(0, 5);
  scriptList.innerHTML = scripts.length ? scripts.map(item => `<li><span>${item.name}</span><div><i style="width:${Math.max(3, item.share * 100)}%"></i></div><strong>${Math.round(item.share * 100)}%</strong></li>`).join("") : `<li class="empty">Script composition appears here.</li>`;

  const insight = $("#insight-copy");
  if (!text) insight.textContent = "Paste a message or choose an example to compare tokenizer-family estimates.";
  else if (max === min) insight.textContent = "These profiles happen to agree. Agreement between estimates is not proof of exact tokenization.";
  else {
    const low = analysis.results.find(item => item.tokens === min);
    const high = analysis.results.find(item => item.tokens === max);
    insight.innerHTML = `<strong>${high.name}</strong> estimates ${(max / Math.max(1, min)).toFixed(1)}× as many tokens as <strong>${low.name}</strong>. That changes how much earlier history can remain in the same context window.`;
  }
  resetExactForChangedText();
}

function measureExact() {
  if (!input.value) return;
  if (!window.Worker) {
    setExactState("error", "This browser does not support the worker needed for exact local tokenization.");
    return;
  }
  if (!exactWorker) {
    exactWorker = new Worker("./exact-tokenizer-worker.js", { type: "module" });
    exactWorker.addEventListener("message", event => {
      const data = event.data || {};
      if (data.requestId !== exactRequest) return;
      if (data.type === "progress") setExactState("loading", data.message);
      if (data.type === "error") {
        $("#exact-result").hidden = true;
        setExactState("error", "Exact tokenizer could not load. Check your connection and try again; estimates are still available.");
      }
      if (data.type === "result") {
        if (input.value !== pendingText) {
          measuredText = null;
          $("#exact-result").hidden = true;
          setExactState("stale", "Text changed while the tokenizer was loading. Measure the current text.");
          return;
        }
        measuredText = pendingText;
        const qwenEstimate = latestAnalysis.results.find(item => item.id === "qwen").tokens;
        const comparison = compareExact(qwenEstimate, data.count);
        $("#exact-count").textContent = formatNumber(data.count);
        $("#exact-estimate").textContent = formatNumber(qwenEstimate);
        $("#exact-delta").textContent = comparison.direction === "match" ? "matched" : `${comparison.direction} by ${formatNumber(comparison.absoluteDelta)} (${Math.abs(comparison.percent).toFixed(1)}%)`;
        $("#exact-revision").textContent = data.revision.slice(0, 9);
        $("#exact-result").hidden = false;
        setExactState("measured", "Measured locally with special tokens disabled. Your text was not uploaded by ContextFair.");
      }
    });
    exactWorker.addEventListener("error", () => {
      exactWorker?.terminate();
      exactWorker = null;
      $("#exact-result").hidden = true;
      setExactState("error", "Exact tokenizer could not start. Estimates remain available.");
    });
  }
  exactRequest += 1;
  measuredText = null;
  pendingText = input.value;
  $("#exact-result").hidden = true;
  setExactState("loading", "Preparing exact Qwen tokenizer…");
  exactWorker.postMessage({ type: "measure", requestId: exactRequest, text: pendingText });
}

document.querySelectorAll("[data-example]").forEach(button => button.addEventListener("click", () => {
  input.value = EXAMPLES[button.dataset.example].text;
  document.querySelectorAll("[data-example]").forEach(item => item.classList.toggle("active", item === button));
  render();
}));

document.querySelectorAll("input, textarea, select").forEach(element => element.addEventListener("input", render));
$("#clear-button").addEventListener("click", () => { input.value = ""; document.querySelectorAll("[data-example]").forEach(item => item.classList.remove("active")); input.focus(); render(); });
$("#method-button").addEventListener("click", () => $("#method-dialog").showModal());
$("#close-dialog").addEventListener("click", () => $("#method-dialog").close());
$("#verify-exact").addEventListener("click", measureExact);

input.value = EXAMPLES.hinglish.text;
render();
