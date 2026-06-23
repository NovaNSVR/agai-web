import { readFileSync, writeFileSync } from "fs";

const LOCALES = ["en","cs","sk","de","es","fr","pt","nl","pl","it"];
const translations = JSON.parse(readFileSync("C:/ai-tools/agai-web/scripts/ambassador-translations.json", "utf8"));

for (const locale of LOCALES) {
  const path = "C:/ai-tools/agai-web/locales/" + locale + ".json";
  const raw = readFileSync(path, "utf8");
  const bom = raw.charCodeAt(0) === 0xfeff;
  const d = JSON.parse(bom ? raw.slice(1) : raw);
  d.ambassador = translations[locale];
  writeFileSync(path, (bom ? "﻿" : "") + JSON.stringify(d, null, 2), "utf8");
  console.log(locale + ".json updated");
}
