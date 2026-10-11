export const CLASSES = [
  "latin", "symbols", "devanagari", "bengali", "gurmukhi", "gujarati",
  "odia", "tamil", "telugu", "kannada", "malayalam", "arabic",
  "cyrillic", "cjk", "other",
];

export const PROFILES = [
  { id: "qwen", name: "Qwen family", note: "Qwen 3.5 profile", color: "#7c5cff", weights: [0.196, 0.549, 0.473, 0.515, 0.933, 0.717, 1.011, 0.488, 0.644, 0.612, 0.615, 0.291, 0.236, 0.371, 2.845] },
  { id: "gemma", name: "Gemma family", note: "Gemma 4 profile", color: "#2f9f89", weights: [0.199, 0.618, 0.28, 0.237, 0.659, 0.424, 0.908, 0.25, 0.361, 0.34, 0.331, 0.352, 0.233, 0.412, 2.692] },
  { id: "lfm2", name: "LFM family", note: "LFM 2.5 profile", color: "#f06a47", weights: [0.206, 0.582, 1.5, 2.36, 2.978, 2.973, 2.98, 2.502, 2.972, 2.96, 2.987, 0.492, 0.364, 0.441, 5.918] },
  { id: "bonsai", name: "Bonsai family", note: "Ternary Bonsai 4B profile", color: "#d69b2d", weights: [0.203, 0.476, 1.114, 1.251, 1.796, 1.749, 2.372, 1.276, 1.703, 1.6, 1.539, 0.378, 0.329, 0.634, 0.593] },
  { id: "minicpm", name: "MiniCPM family", note: "MiniCPM 5 profile", color: "#d15478", weights: [0.217, 0.43, 0.908, 1.852, 3.188, 3.199, 3.133, 1.994, 2.134, 1.459, 2.393, 1.062, 0.284, 0.643, 0.01] },
];

export const EXAMPLES = {
  hinglish: { label: "Hinglish", text: "Agar token count galat ho, toh useful conversation history silently remove ho sakti hai." },
  hindi: { label: "हिन्दी", text: "यदि टोकन की गिनती गलत हो, तो उपयोगी बातचीत का इतिहास बिना चेतावनी हट सकता है।" },
  tamil: { label: "தமிழ்", text: "டோக்கன் எண்ணிக்கை தவறாக இருந்தால், பயனுள்ள உரையாடல் வரலாறு எச்சரிக்கையின்றி நீக்கப்படலாம்." },
  english: { label: "English", text: "If the token count is wrong, useful conversation history may be removed without warning." },
};

export function classIndex(cp) {
  if (cp < 0x80) return ((cp >= 65 && cp <= 90) || (cp >= 97 && cp <= 122) || cp === 32) ? 0 : 1;
  if (cp <= 0x24f) return 0;
  if (cp >= 0x0400 && cp <= 0x052f) return 12;
  if (cp >= 0x0600 && cp <= 0x06ff) return 11;
  if (cp >= 0x0900 && cp <= 0x097f) return 2;
  if (cp >= 0x0980 && cp <= 0x09ff) return 3;
  if (cp >= 0x0a00 && cp <= 0x0a7f) return 4;
  if (cp >= 0x0a80 && cp <= 0x0aff) return 5;
  if (cp >= 0x0b00 && cp <= 0x0b7f) return 6;
  if (cp >= 0x0b80 && cp <= 0x0bff) return 7;
  if (cp >= 0x0c00 && cp <= 0x0c7f) return 8;
  if (cp >= 0x0c80 && cp <= 0x0cff) return 9;
  if (cp >= 0x0d00 && cp <= 0x0d7f) return 10;
  if ((cp >= 0x3040 && cp <= 0x30ff) || (cp >= 0x3400 && cp <= 0x4dbf) || (cp >= 0x4e00 && cp <= 0x9fff) || (cp >= 0xac00 && cp <= 0xd7af)) return 13;
  return 14;
}

export function composition(text) {
  const counts = Array(CLASSES.length).fill(0);
  for (const symbol of String(text || "")) counts[classIndex(symbol.codePointAt(0))] += 1;
  return counts;
}

export function estimate(text, profile) {
  if (!text) return 0;
  const counts = composition(text);
  return Math.ceil(counts.reduce((sum, count, index) => sum + count * profile.weights[index], 0));
}

export function analyze(text, contextWindow = 8192, outputReserve = 1024) {
  const cleanWindow = Math.max(1, Number(contextWindow) || 1);
  const cleanReserve = Math.min(cleanWindow, Math.max(0, Number(outputReserve) || 0));
  const available = cleanWindow - cleanReserve;
  const results = PROFILES.map(profile => {
    const tokens = estimate(text, profile);
    return { ...profile, tokens, share: available ? tokens / available : 0, remaining: Math.max(0, available - tokens), overflow: Math.max(0, tokens - available) };
  });
  return { contextWindow: cleanWindow, outputReserve: cleanReserve, available, results };
}

export function significantScripts(text) {
  const counts = composition(text);
  const total = counts.reduce((a, b) => a + b, 0) || 1;
  return counts.map((count, index) => ({ name: CLASSES[index], count, share: count / total })).filter(item => item.count > 0).sort((a, b) => b.count - a.count);
}

export function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(value);
}

