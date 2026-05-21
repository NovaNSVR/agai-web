/**
 * Fix specific bad (transliterated) translation keys in cs.json and sk.json.
 * These keys had diacritical marks stripped in a previous translation run.
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const LOCALES_DIR = join(ROOT, "locales");

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error("ERROR: ANTHROPIC_API_KEY not set.");
  process.exit(1);
}

// Keys confirmed bad (transliterated without proper diacritics)
const BAD_KEYS = {
  cs: [
    "footer.tagline",
    "home.heroBody",
    "home.archetypesHeading",
    "home.archetypesBody",
  ],
  sk: [
    "home.archetypesHeading",
    "home.heroBody",
    "home.archetypesBody",
  ],
};

// English originals (source of truth)
const EN_ORIGINALS = {
  "footer.tagline": "The creator economy platform that knows you.",
  "home.heroBody": "AlphaGlow is the creator economy platform where wellness creators publish AI-powered sessions, build a Digital Twin with Nova, and earn NSVX when their audience grows.",
  "home.archetypesHeading": "Every creator type. One platform.",
  "home.archetypesBody": "From breathwork to biohacking, AlphaGlow gives creators the tools to build sessions, journeys, and a Digital Twin that works for their audience around the clock.",
};

const LANGUAGE_NAMES = { cs: "Czech", sk: "Slovak" };

function flatten(obj, prefix = "") {
  const result = {};
  for (const key in obj) {
    const path = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      Object.assign(result, flatten(val, path));
    } else {
      result[path] = String(val);
    }
  }
  return result;
}

function unflatten(flat) {
  const result = {};
  for (const [path, value] of Object.entries(flat)) {
    const parts = path.split(".");
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }
  return result;
}

async function translateKeys(texts, targetLanguage) {
  const prompt = `You are a professional translator. Translate the following UI strings from English to ${targetLanguage}.

Rules:
- Keep brand names untranslated: AlphaGlow, Nova, NSVX, Digital Twin, Nova Whisper, Nova Local, Nova Studio.
- Preserve {variable} placeholders exactly as they appear.
- CRITICAL: Use proper ${targetLanguage} diacritical marks — accented characters MUST be present wherever grammatically required.
- Match the tone: premium, calm, professional.
- Return ONLY a JSON object mapping the key to the translated text. No commentary.

Texts to translate (key: english text):
${JSON.stringify(texts, null, 2)}

Return format: { "key": "translated text", ... }`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text = data.content[0].text.trim();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON in response: " + text.slice(0, 200));
  return JSON.parse(jsonMatch[0]);
}

async function fixLocale(locale) {
  console.log(`\n── Fixing ${LANGUAGE_NAMES[locale]} (${locale}) ──`);

  const raw = JSON.parse(readFileSync(join(LOCALES_DIR, `${locale}.json`), "utf8"));
  const flat = flatten(raw);

  const keysToFix = BAD_KEYS[locale];
  const textsToTranslate = {};
  for (const key of keysToFix) {
    textsToTranslate[key] = EN_ORIGINALS[key];
    console.log(`  Will fix: ${key}`);
    console.log(`    Current: ${flat[key]}`);
  }

  console.log(`  Translating ${keysToFix.length} keys via Haiku...`);
  const translated = await translateKeys(textsToTranslate, LANGUAGE_NAMES[locale]);

  let fixed = 0;
  for (const key of keysToFix) {
    if (translated[key]) {
      console.log(`  Fixed [${key}]: ${translated[key]}`);
      flat[key] = translated[key];
      fixed++;
    } else {
      console.warn(`  [WARN] No translation returned for ${key}`);
    }
  }

  // Read en.json key order and rebuild
  const en = flatten(JSON.parse(readFileSync(join(LOCALES_DIR, "en.json"), "utf8")));
  const ordered = {};
  for (const k of Object.keys(en)) {
    ordered[k] = flat[k] ?? en[k];
  }
  for (const [k, v] of Object.entries(flat)) {
    if (!ordered[k]) ordered[k] = v;
  }

  const output = unflatten(ordered);
  writeFileSync(join(LOCALES_DIR, `${locale}.json`), JSON.stringify(output, null, 2), "utf8");
  console.log(`  Written: ${fixed} keys fixed in ${locale}.json`);
}

async function main() {
  console.log("Fixing bad translations in cs.json and sk.json...");
  for (const locale of Object.keys(BAD_KEYS)) {
    await fixLocale(locale);
  }
  console.log("\nDone.");
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
