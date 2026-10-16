const TRANSFORMERS_URL = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1";
const MODEL_ID = "onnx-community/Qwen3.5-4B-ONNX-OPT";
const REVISION = "57b13b4dce7be073be0df3eaf1c842a6bbb2e0a7";

let tokenizerPromise = null;

function progressLabel(event) {
  if (!event || typeof event !== "object") return "Loading tokenizer assets…";
  const file = event.file ? String(event.file).split("/").pop() : "tokenizer assets";
  if (Number.isFinite(event.progress)) return `Loading ${file} · ${Math.round(event.progress)}%`;
  if (event.status === "ready") return "Tokenizer ready";
  return `Loading ${file}…`;
}

async function loadTokenizer(requestId) {
  if (!tokenizerPromise) {
    tokenizerPromise = import(TRANSFORMERS_URL)
      .then(({ AutoTokenizer }) => AutoTokenizer.from_pretrained(MODEL_ID, {
        revision: REVISION,
        progress_callback: event => self.postMessage({ type: "progress", requestId, message: progressLabel(event) }),
      }))
      .catch(error => {
        tokenizerPromise = null;
        throw error;
      });
  }
  return tokenizerPromise;
}

self.onmessage = async event => {
  const { type, requestId, text = "" } = event.data || {};
  if (type !== "measure") return;
  try {
    self.postMessage({ type: "progress", requestId, message: "Preparing exact Qwen tokenizer…" });
    const tokenizer = await loadTokenizer(requestId);
    const ids = tokenizer.encode(String(text), { add_special_tokens: false });
    self.postMessage({
      type: "result",
      requestId,
      count: ids.length,
      modelId: MODEL_ID,
      revision: REVISION,
      specialTokens: false,
    });
  } catch (error) {
    self.postMessage({ type: "error", requestId, message: error instanceof Error ? error.message : String(error) });
  }
};

