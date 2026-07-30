import fs from "fs";

const UPDATES = {
  en: {
    "investors.team1Name": "Petr Kaplan",
    "investors.visionHeading": "Personalised expertise at scale",
    "investors.visionBody": "A world where every person has access to personalised creator expertise — not just those who can afford private coaching. AlphaGlow makes this possible at scale through AI, creator partnerships, and a token economy that aligns incentives across the platform.",
  },
  cs: {
    "investors.team1Name": "Petr Kaplan",
    "investors.visionHeading": "Personalizovaná odbornost ve velkém měřítku",
    "investors.visionBody": "Svět, kde má každý přístup k personalizované odbornosti tvůrců — nejen ti, kteří si mohou dovolit soukromé koučování. AlphaGlow to umožňuje ve velkém měřítku díky AI, partnerstvím s tvůrci a tokenové ekonomice, která sladí zájmy napříč platformou.",
  },
  sk: {
    "investors.team1Name": "Petr Kaplan",
    "investors.visionHeading": "Personalizovaná odbornosť vo veľkom rozsahu",
    "investors.visionBody": "Svet, kde má každý prístup k personalizovanej odbornosti tvorcov — nielen tí, ktorí si môžu dovoliť súkromný koučing. AlphaGlow to umožňuje vo veľkom rozsahu vďaka AI, partnerstvám s tvorcami a tokenovej ekonomike, ktorá zosúlaďuje záujmy naprieč platformou.",
  },
  es: {
    "investors.team1Name": "Petr Kaplan",
    "investors.visionHeading": "Experiencia personalizada a escala",
    "investors.visionBody": "Un mundo en el que todas las personas tienen acceso a la experiencia personalizada de creadores, no solo quienes pueden permitirse coaching privado. AlphaGlow lo hace posible a escala mediante IA, alianzas con creadores y una economía de tokens que alinea los incentivos en toda la plataforma.",
  },
  de: {
    "investors.team1Name": "Petr Kaplan",
    "investors.visionHeading": "Personalisierte Expertise im großen Maßstab",
    "investors.visionBody": "Eine Welt, in der jeder Zugang zu personalisierter Expertise von Creators hat — nicht nur jene, die sich privates Coaching leisten können. AlphaGlow macht dies im großen Maßstab möglich, durch KI, Creator-Partnerschaften und eine Token-Ökonomie, die die Anreize auf der gesamten Plattform aufeinander abstimmt.",
  },
  fr: {
    "investors.team1Name": "Petr Kaplan",
    "investors.visionHeading": "L'expertise personnalisée à grande échelle",
    "investors.visionBody": "Un monde où chacun a accès à l'expertise personnalisée de créateurs — pas seulement ceux qui peuvent se permettre un coaching privé. AlphaGlow rend cela possible à grande échelle grâce à l'IA, aux partenariats avec les créateurs et à une économie de tokens qui aligne les incitations sur l'ensemble de la plateforme.",
  },
  pt: {
    "investors.team1Name": "Petr Kaplan",
    "investors.visionHeading": "Especialização personalizada em escala",
    "investors.visionBody": "Um mundo em que todas as pessoas têm acesso à especialização personalizada de criadores — não apenas quem pode pagar por coaching privado. A AlphaGlow torna isso possível em escala através de IA, parcerias com criadores e uma economia de tokens que alinha os incentivos em toda a plataforma.",
  },
  it: {
    "investors.team1Name": "Petr Kaplan",
    "investors.visionHeading": "Competenza personalizzata su larga scala",
    "investors.visionBody": "Un mondo in cui chiunque ha accesso a competenza personalizzata da parte dei creator — non solo chi può permettersi un coaching privato. AlphaGlow rende tutto ciò possibile su larga scala grazie all'IA, alle partnership con i creator e a un'economia di token che allinea gli incentivi in tutta la piattaforma.",
  },
  pl: {
    "investors.team1Name": "Petr Kaplan",
    "investors.visionHeading": "Spersonalizowana ekspertyza na dużą skalę",
    "investors.visionBody": "Świat, w którym każdy ma dostęp do spersonalizowanej wiedzy eksperckiej twórców — nie tylko ci, których stać na prywatny coaching. AlphaGlow umożliwia to na dużą skalę dzięki AI, partnerstwom z twórcami i ekonomii tokenów, która spaja interesy w całej platformie.",
  },
  nl: {
    "investors.team1Name": "Petr Kaplan",
    "investors.visionHeading": "Gepersonaliseerde expertise op schaal",
    "investors.visionBody": "Een wereld waarin iedereen toegang heeft tot gepersonaliseerde expertise van creators — niet alleen zij die zich privécoaching kunnen veroorloven. AlphaGlow maakt dit op schaal mogelijk dankzij AI, samenwerkingen met creators en een token-economie die de belangen binnen het hele platform op elkaar afstemt.",
  },
};

function setNestedKey(obj, dotPath, value) {
  const parts = dotPath.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (typeof cur[parts[i]] !== "object" || cur[parts[i]] === null) cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

for (const [locale, keys] of Object.entries(UPDATES)) {
  const filePath = `locales/${locale}.json`;
  const raw = fs.readFileSync(filePath, "utf-8").replace(/^﻿/, "");
  const data = JSON.parse(raw);
  for (const [dotPath, value] of Object.entries(keys)) {
    setNestedKey(data, dotPath, value);
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
  console.log(`Updated ${locale}.json`);
}

console.log("Done.");
