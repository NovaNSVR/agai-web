/**
 * update-home-hero-subhead.mjs
 * Replaces home.heroBody in all 10 locale files with plain-language copy
 * that avoids unexplained branded terms (Nova, Digital Twin, NSVX) on first read.
 */
import fs from "fs";
import path from "path";

const LOCALES_DIR = path.resolve("locales");

const UPDATES = {
  en: "Creators publish AI-powered sessions and build an AI version of themselves that works for their audience around the clock. Users get personalised content that gets sharper the more they use it. Everyone earns or saves through AlphaGlow AI's built-in rewards as the platform grows.",
  cs: "Tvůrci zveřejňují relace s umělou inteligencí a budují AI verzi sebe sama, která pracuje pro jejich publikum nepřetržitě. Uživatelé získávají personalizovaný obsah, který se s každým použitím zdokonaluje. Každý vydělává nebo šetří prostřednictvím vestavěných odměn AlphaGlow AI, jak platforma roste.",
  sk: "Tvorcovia zverejňujú relácie s umelou inteligenciou a budujú AI verziu seba samých, ktorá pracuje pre ich publikum nepretržite. Používatelia získavajú personalizovaný obsah, ktorý sa s každým použitím zdokonaľuje. Každý zarába alebo šetrí prostredníctvom vstavaných odmien AlphaGlow AI, ako platforma rastie.",
  de: "Creator veröffentlichen KI-gestützte Sessions und bauen eine KI-Version von sich selbst, die rund um die Uhr für ihr Publikum arbeitet. Nutzer erhalten personalisierte Inhalte, die mit jeder Nutzung präziser werden. Alle verdienen oder sparen durch die integrierten Belohnungen von AlphaGlow AI, während die Plattform wächst.",
  es: "Los creadores publican sesiones impulsadas por IA y construyen una versión de sí mismos con IA que trabaja para su audiencia las 24 horas del día. Los usuarios reciben contenido personalizado que se vuelve más preciso cuanto más lo usan. Todos ganan o ahorran a través de las recompensas integradas de AlphaGlow AI a medida que la plataforma crece.",
  fr: "Les créateurs publient des sessions propulsées par l'IA et construisent une version d'eux-mêmes par IA qui travaille pour leur audience en permanence. Les utilisateurs reçoivent du contenu personnalisé qui s'affine à chaque utilisation. Tout le monde gagne ou économise grâce aux récompenses intégrées d'AlphaGlow AI, à mesure que la plateforme se développe.",
  pt: "Os criadores publicam sessões com inteligência artificial e constroem uma versão de si mesmos com IA que trabalha para o seu público a qualquer hora do dia. Os utilizadores recebem conteúdo personalizado que se torna mais preciso a cada utilização. Todos ganham ou poupam através das recompensas integradas da AlphaGlow AI à medida que a plataforma cresce.",
  nl: "Creators publiceren AI-gedreven sessies en bouwen een AI-versie van zichzelf die dag en nacht voor hun publiek werkt. Gebruikers ontvangen gepersonaliseerde content die scherper wordt naarmate ze het meer gebruiken. Iedereen verdient of bespaart via de ingebouwde beloningen van AlphaGlow AI terwijl het platform groeit.",
  pl: "Twórcy publikują sesje oparte na sztucznej inteligencji i budują wersję AI siebie, która działa dla ich odbiorców przez całą dobę. Użytkownicy otrzymują spersonalizowane treści, które stają się dokładniejsze im częściej z nich korzystają. Wszyscy zarabiają lub oszczędzają dzięki wbudowanemu systemowi nagród AlphaGlow AI w miarę rozwoju platformy.",
  it: "I creator pubblicano sessioni basate sull'IA e costruiscono una versione AI di se stessi che lavora per il loro pubblico senza sosta. Gli utenti ricevono contenuti personalizzati che diventano più precisi man mano che li utilizzano. Tutti guadagnano o risparmiano grazie alle ricompense integrate di AlphaGlow AI mentre la piattaforma cresce.",
};

function setNestedKey(obj, dotPath, value) {
  const parts = dotPath.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]]) cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

for (const [locale, value] of Object.entries(UPDATES)) {
  const filePath = path.join(LOCALES_DIR, `${locale}.json`);
  const raw = fs.readFileSync(filePath, "utf8").replace(/^﻿/, "");
  const data = JSON.parse(raw);
  setNestedKey(data, "home.heroBody", value);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`Updated ${locale}.json`);
}
console.log("Done.");
