import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const localesDir = join(__dirname, "..", "locales");

const translations = {
  en: {
    buyBody: "NSVX is not yet listed on a public exchange. Once it is, you will be able to purchase it directly by debit or credit card through a regulated onramp partner — the same way you would buy any other token. A self-custody Solana wallet will be created for you automatically if you do not already have one.",
    buyNote: "The purchase widget will appear here when NSVX is listed. Register your interest below to be notified first.",
  },
  cs: {
    buyBody: "NSVX zatím není kótován na veřejné burze. Jakmile bude, budete si ho moci zakoupit přímo debetní nebo kreditní kartou prostřednictvím regulovaného onramp partnera — stejně jako byste kupovali jakýkoli jiný token. Pokud ještě nemáte peněženku, bude vám automaticky vytvořena Solana peněženka pro vlastní úschovu.",
    buyNote: "Widget pro nákup se zobrazí zde, až bude NSVX kótován. Zaregistrujte svůj zájem níže a buďte mezi prvními.",
  },
  sk: {
    buyBody: "NSVX zatiaľ nie je kótovaný na verejnej burze. Keď bude, budete si ho môcť kúpiť priamo debetnou alebo kreditnou kartou cez regulovaného onramp partnera — rovnako ako by ste kúpili akýkoľvek iný token. Ak ešte nemáte peňaženku, automaticky vám bude vytvorená Solana peňaženka pre vlastnú úschovu.",
    buyNote: "Widget na nákup sa tu zobrazí, keď bude NSVX kótovaný. Zaregistrujte záujem nižšie a budete medzi prvými.",
  },
  de: {
    buyBody: "NSVX ist noch nicht an einer öffentlichen Börse notiert. Sobald er es ist, können Sie ihn direkt per Debit- oder Kreditkarte über einen regulierten Onramp-Partner kaufen — genauso wie Sie jedes andere Token kaufen würden. Wenn Sie noch keine Wallet haben, wird automatisch eine selbstverwaltete Solana-Wallet für Sie erstellt.",
    buyNote: "Das Kauf-Widget erscheint hier, sobald NSVX notiert ist. Registrieren Sie Ihr Interesse unten, um als Erster benachrichtigt zu werden.",
  },
  es: {
    buyBody: "NSVX aún no está listado en un intercambio público. Una vez que lo esté, podrás comprarlo directamente con tarjeta de débito o crédito a través de un socio onramp regulado — igual que comprarías cualquier otro token. Si aún no tienes una billetera, se creará automáticamente una billetera Solana de autocustodia para ti.",
    buyNote: "El widget de compra aparecerá aquí cuando NSVX esté listado. Registra tu interés a continuación para ser notificado primero.",
  },
  fr: {
    buyBody: "NSVX n'est pas encore coté sur un échange public. Une fois que ce sera le cas, vous pourrez l'acheter directement par carte de débit ou de crédit via un partenaire onramp réglementé — de la même façon que vous achèteriez n'importe quel autre token. Si vous n'avez pas encore de portefeuille, un portefeuille Solana en auto-garde sera créé automatiquement pour vous.",
    buyNote: "Le widget d'achat apparaîtra ici lorsque NSVX sera coté. Enregistrez votre intérêt ci-dessous pour être notifié en premier.",
  },
  pt: {
    buyBody: "O NSVX ainda não está listado numa bolsa pública. Quando estiver, poderá comprá-lo diretamente com cartão de débito ou crédito através de um parceiro onramp regulado — da mesma forma que compraria qualquer outro token. Se ainda não tiver uma carteira, será criada automaticamente uma carteira Solana de autocustódia para si.",
    buyNote: "O widget de compra aparecerá aqui quando o NSVX estiver listado. Registe o seu interesse abaixo para ser notificado primeiro.",
  },
  nl: {
    buyBody: "NSVX is nog niet genoteerd op een openbare beurs. Zodra dat het geval is, kunt u het rechtstreeks kopen met debet- of creditcard via een gereguleerde onramp-partner — op dezelfde manier als u elk ander token zou kopen. Als u nog geen wallet heeft, wordt er automatisch een zelf-bewaargevende Solana-wallet voor u aangemaakt.",
    buyNote: "De aankoopwidget verschijnt hier wanneer NSVX genoteerd is. Registreer uw interesse hieronder om als eerste op de hoogte te worden gesteld.",
  },
  pl: {
    buyBody: "NSVX nie jest jeszcze notowany na publicznej giełdzie. Gdy już będzie, będziesz mógł go kupić bezpośrednio kartą debetową lub kredytową za pośrednictwem regulowanego partnera onramp — tak samo jak kupiłbyś każdy inny token. Jeśli nie masz jeszcze portfela, zostanie dla Ciebie automatycznie utworzony portfel Solana w trybie samodzielnej opieki.",
    buyNote: "Widget zakupu pojawi się tutaj, gdy NSVX zostanie notowany. Zarejestruj swoje zainteresowanie poniżej, aby być powiadomionym jako pierwszy.",
  },
  it: {
    buyBody: "NSVX non è ancora quotato su un exchange pubblico. Una volta che lo sarà, potrai acquistarlo direttamente con carta di debito o credito tramite un partner onramp regolamentato — allo stesso modo in cui acquisteresti qualsiasi altro token. Se non hai ancora un portafoglio, ne verrà creato automaticamente uno Solana in auto-custodia.",
    buyNote: "Il widget di acquisto apparirà qui quando NSVX sarà quotato. Registra il tuo interesse qui sotto per essere notificato per primo.",
  },
};

for (const [lang, vals] of Object.entries(translations)) {
  const file = join(localesDir, `${lang}.json`);
  if (!existsSync(file)) { console.log("SKIP", lang); continue; }
  const raw = readFileSync(file, "utf8").replace(/^﻿/, "");
  const d = JSON.parse(raw);
  if (!d.nsvxPage) { console.log("NO nsvxPage in", lang); continue; }
  d.nsvxPage.buyBody = vals.buyBody;
  d.nsvxPage.buyNote = vals.buyNote;
  writeFileSync(file, JSON.stringify(d, null, 2) + "\n", "utf8");
  console.log("Updated", lang);
}
console.log("Done.");
