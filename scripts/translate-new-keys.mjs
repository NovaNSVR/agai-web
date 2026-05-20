/**
 * Auto-translate missing locale keys using Claude Haiku.
 * Finds keys present in en.json but missing in each locale file,
 * then translates them in batches via the Anthropic API.
 *
 * Usage: node scripts/translate-new-keys.mjs [--locale cs] [--dry-run]
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const LOCALES_DIR = join(ROOT, "locales");

const SUPPORTED_LOCALES = ["cs", "sk", "de", "es", "fr", "pt", "it", "pl", "nl"];

const LOCALE_NAMES = {
  cs: "Czech",
  sk: "Slovak",
  de: "German",
  es: "Spanish",
  fr: "French",
  pt: "Portuguese",
  it: "Italian",
  pl: "Polish",
  nl: "Dutch",
};

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error("ERROR: ANTHROPIC_API_KEY not set in environment.");
  process.exit(1);
}

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const onlyLocale = args.includes("--locale") ? args[args.indexOf("--locale") + 1] : null;

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

async function translateBatch(texts, targetLanguage) {
  const prompt = `You are a professional translator. Translate the following UI strings from English to ${targetLanguage}.

Rules:
- Keep brand names untranslated: AlphaGlow, Nova, NSVX, Digital Twin, Nova Whisper, Nova Local, Nova Studio, Pulse, Solana, Moonpay, HeyGen, ElevenLabs.
- Preserve {variable} placeholders exactly as they appear.
- Preserve \\n newlines exactly.
- Match the tone: premium, calm, professional. Not casual, not stiff.
- Return ONLY a JSON object mapping English text to translated text. No commentary.

Texts to translate:
${JSON.stringify(texts, null, 2)}

Return format: { "english text": "translated text", ... }`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text = data.content[0].text.trim();

  // Extract JSON from the response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON found in response: " + text.slice(0, 200));

  return JSON.parse(jsonMatch[0]);
}

async function processLocale(locale) {
  console.log(`\n── Processing ${LOCALE_NAMES[locale]} (${locale}) ──`);

  const enRaw = JSON.parse(readFileSync(join(LOCALES_DIR, "en.json"), "utf8"));
  const localeRaw = JSON.parse(readFileSync(join(LOCALES_DIR, `${locale}.json`), "utf8"));

  const enFlat = flatten(enRaw);
  const localeFlat = flatten(localeRaw);

  // Find missing keys
  const missing = {};
  for (const [key, value] of Object.entries(enFlat)) {
    if (!localeFlat[key]) {
      missing[key] = value;
    }
  }

  const missingCount = Object.keys(missing).length;
  console.log(`  Missing keys: ${missingCount}`);

  if (missingCount === 0) {
    console.log(`  Nothing to do.`);
    return;
  }

  if (dryRun) {
    console.log(`  [DRY RUN] Would translate ${missingCount} keys.`);
    console.log(`  Sample:`, Object.entries(missing).slice(0, 3).map(([k]) => k).join(", "));
    return;
  }

  // Batch into groups of 40 to stay within token limits
  const BATCH_SIZE = 40;
  const keys = Object.keys(missing);
  const translated = {};

  for (let i = 0; i < keys.length; i += BATCH_SIZE) {
    const batchKeys = keys.slice(i, i + BATCH_SIZE);
    const batchTexts = {};
    for (const k of batchKeys) batchTexts[k] = missing[k];

    process.stdout.write(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(keys.length / BATCH_SIZE)}... `);

    try {
      const result = await translateBatch(batchTexts, LOCALE_NAMES[locale]);
      // Map by key (the API returns english→translation, but we keyed by flatKey→englishText)
      for (const key of batchKeys) {
        const englishText = missing[key];
        if (result[key]) {
          translated[key] = result[key];
        } else if (result[englishText]) {
          translated[key] = result[englishText];
        } else {
          // Fallback: keep English
          translated[key] = englishText;
          console.warn(`  [WARN] No translation for key: ${key}`);
        }
      }
      console.log("done");
    } catch (err) {
      console.error(`  [ERROR] Batch failed: ${err.message}`);
      // Keep English for this batch
      for (const k of batchKeys) translated[k] = missing[k];
    }

    // Rate limit: small pause between batches
    if (i + BATCH_SIZE < keys.length) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  // Merge translations back into locale object
  const merged = { ...localeFlat, ...translated };

  // Build back to nested structure matching en.json shape
  const enKeys = Object.keys(enFlat);
  const ordered = {};
  for (const k of enKeys) {
    ordered[k] = merged[k] ?? enFlat[k];
  }
  // Add any locale-only keys
  for (const [k, v] of Object.entries(localeFlat)) {
    if (!ordered[k]) ordered[k] = v;
  }

  // Write back as nested JSON matching original locale structure
  const output = unflatten(ordered);
  const outPath = join(LOCALES_DIR, `${locale}.json`);
  writeFileSync(outPath, JSON.stringify(output, null, 2), "utf8");
  console.log(`  Written: ${outPath} (+${Object.keys(translated).length} keys)`);
}

async function main() {
  const locales = onlyLocale ? [onlyLocale] : SUPPORTED_LOCALES;
  console.log(`Translating to: ${locales.join(", ")}${dryRun ? " [DRY RUN]" : ""}`);

  for (const locale of locales) {
    await processLocale(locale);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
