/**
 * june16-content-fixes.mjs
 * Applies all 10 content fixes + legal review fixes across all 10 locales.
 * Run: node scripts/june16-content-fixes.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const BASE = new URL("../locales/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const LOCALES = ["en","cs","sk","de","es","fr","pt","nl","pl","it"];

function read(lang) {
  const p = join(BASE, `${lang}.json`);
  let raw = readFileSync(p, "utf8");
  if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1); // strip BOM
  return JSON.parse(raw);
}

function write(lang, data) {
  const p = join(BASE, `${lang}.json`);
  writeFileSync(p, JSON.stringify(data, null, 2) + "\n", "utf8");
}

// ─── Translations for each fix per locale ─────────────────────────────────────

// FIX 1: Founder name (team1Name, team1Role, team1Bio)
// team1Name & team1Role are locale-agnostic (proper noun / short phrase)
// team1Bio needs natural translation

const TEAM1_BIO = {
  en: "Building the infrastructure that lets any creator turn their expertise into a sustainable AI-powered business reaching a global audience, backed by a token economy designed for genuine usage, not speculation.",
  cs: "Budování infrastruktury, která umožňuje každému tvůrci proměnit svou odbornost v udržitelný byznys poháněný umělou inteligencí s globálním dosahem, podpořený tokenovou ekonomikou navrženou pro skutečné využití, nikoli spekulaci.",
  sk: "Budovanie infraštruktúry, ktorá umožňuje každému tvorcovi premeniť svoju odbornosť na udržateľný biznis poháňaný umelou inteligenciou s globálnym dosahom, podporený tokenovou ekonomikou navrhnutou pre skutočné využitie, nie špekuláciu.",
  de: "Aufbau der Infrastruktur, die es jedem Creator ermöglicht, seine Expertise in ein nachhaltiges, KI-gestütztes Unternehmen zu verwandeln, das ein globales Publikum erreicht – gestützt auf eine Token-Ökonomie, die für echte Nutzung und nicht für Spekulation konzipiert ist.",
  es: "Construyendo la infraestructura que permite a cualquier creador convertir su experiencia en un negocio sostenible impulsado por IA con alcance global, respaldado por una economía de tokens diseñada para el uso genuino, no la especulación.",
  fr: "Construction de l'infrastructure qui permet à tout créateur de transformer son expertise en une entreprise durable propulsée par l'IA et atteignant un public mondial, soutenue par une économie de tokens conçue pour un usage authentique, et non la spéculation.",
  pt: "Construindo a infraestrutura que permite a qualquer criador transformar sua expertise em um negócio sustentável impulsionado por IA que alcança um público global, apoiado por uma economia de tokens projetada para uso genuíno, não especulação.",
  nl: "Het bouwen van de infrastructuur waarmee elke creator zijn expertise kan omzetten in een duurzame, AI-gestuurde business die een wereldwijd publiek bereikt, ondersteund door een tokeneconomie die is ontworpen voor echt gebruik, niet voor speculatie.",
  pl: "Budowanie infrastruktury, która umożliwia każdemu twórcy przekształcenie swojej wiedzy w zrównoważony biznes oparty na AI, docierający do globalnej publiczności, wspierany przez gospodarkę tokenową zaprojektowaną do autentycznego użytkowania, nie spekulacji.",
  it: "Costruire l'infrastruttura che permette a qualsiasi creator di trasformare la propria competenza in un'azienda sostenibile basata sull'AI, raggiungendo un pubblico globale, supportata da un'economia di token progettata per un utilizzo autentico, non per la speculazione.",
};

// FIX 2: Roadmap fixes — roadmap2Body (Q3: HeyGen→LiveAvatar), roadmap3Body (Q4: Moonpay→NSVX DEX listing)

const ROADMAP2_BODY = {
  en: "Creator Digital Twins in production. LiveAvatar video composition pipeline. Advertiser platform live.",
  cs: "Creator Digital Twins v produkci. Pipeline tvorby videí LiveAvatar. Platforma pro inzerenty v provozu.",
  sk: "Creator Digital Twins v produkcii. Pipeline tvorby videí LiveAvatar. Platforma pre inzerentov spustená.",
  de: "Creator Digital Twins in der Produktion. LiveAvatar-Video-Kompositions-Pipeline. Advertiser-Plattform live.",
  es: "Creator Digital Twins en producción. Pipeline de composición de vídeo LiveAvatar. Plataforma de anunciantes activa.",
  fr: "Digital Twins de créateurs en production. Pipeline de composition vidéo LiveAvatar. Plateforme publicitaire en ligne.",
  pt: "Creator Digital Twins em produção. Pipeline de composição de vídeo LiveAvatar. Plataforma de anunciantes ao vivo.",
  nl: "Creator Digital Twins in productie. LiveAvatar videocomposition pipeline. Adverteerderplatform live.",
  pl: "Creator Digital Twins w produkcji. Pipeline kompozycji wideo LiveAvatar. Platforma reklamodawców uruchomiona.",
  it: "Creator Digital Twin in produzione. Pipeline di composizione video LiveAvatar. Piattaforma per inserzionisti attiva.",
};

const ROADMAP3_BODY = {
  en: "NSVX DEX listing. Withdrawal to Solana wallet. Cross-platform NSVX spend.",
  cs: "Listování NSVX na DEX. Výběr do Solana peněženky. Cross-platformní výdaje NSVX.",
  sk: "Listovanie NSVX na DEX. Výber do Solana peňaženky. Cross-platformové výdavky NSVX.",
  de: "NSVX DEX-Listing. Abhebung in die Solana-Wallet. Plattformübergreifende NSVX-Ausgaben.",
  es: "Listado de NSVX en DEX. Retiro a billetera Solana. Gasto de NSVX entre plataformas.",
  fr: "Inscription NSVX sur un DEX. Retrait vers un portefeuille Solana. Dépenses NSVX multiplateformes.",
  pt: "Listagem NSVX em DEX. Retirada para carteira Solana. Gasto de NSVX entre plataformas.",
  nl: "NSVX DEX-notering. Opname naar Solana-wallet. Platform-overschrijdende NSVX-uitgaven.",
  pl: "Listing NSVX na DEX. Wypłata do portfela Solana. Cross-platformowe wydatki NSVX.",
  it: "Listing NSVX su DEX. Prelievo su wallet Solana. Spesa NSVX cross-platform.",
};

// FIX 3: how-nsvx-works page — FAQ 1 & 2 corrected NSVX description

const NSVX_FAQ1_A = {
  en: "NSVX is a real Solana-based utility token. It is not yet listed on a public exchange, so it cannot currently be bought or sold outside the platform. It lives on-chain in your own Solana wallet like any other Solana token. A DEX listing is planned.",
  cs: "NSVX je skutečný utility token na bázi Solana. Zatím není kotován na veřejné burze, takže ho momentálně nelze koupit ani prodat mimo platformu. Žije on-chain ve vaší vlastní Solana peněžence jako jakýkoli jiný Solana token. Plánujeme listing na DEX.",
  sk: "NSVX je skutočný utility token na báze Solana. Zatiaľ nie je kótovaný na verejnej burze, takže ho momentálne nie je možné kúpiť ani predať mimo platformu. Žije on-chain vo vašej vlastnej Solana peňaženke ako každý iný token Solana. Plánuje sa listing na DEX.",
  de: "NSVX ist ein echter Solana-basierter Utility-Token. Er ist noch nicht an einer öffentlichen Börse gelistet, sodass er derzeit außerhalb der Plattform weder gekauft noch verkauft werden kann. Er lebt on-chain in deiner eigenen Solana-Wallet wie jeder andere Solana-Token. Ein DEX-Listing ist geplant.",
  es: "NSVX es un token de utilidad real basado en Solana. Aún no está listado en un exchange público, por lo que actualmente no se puede comprar ni vender fuera de la plataforma. Vive on-chain en tu propia wallet de Solana como cualquier otro token de Solana. Está planeado un listing en un DEX.",
  fr: "NSVX est un vrai token utilitaire basé sur Solana. Il n'est pas encore listé sur une bourse publique, il ne peut donc pas être acheté ou vendu en dehors de la plateforme pour l'instant. Il vit on-chain dans votre propre portefeuille Solana comme n'importe quel autre token Solana. Un listing sur un DEX est prévu.",
  pt: "NSVX é um token de utilidade real baseado em Solana. Ainda não está listado em uma exchange pública, portanto não pode ser comprado ou vendido fora da plataforma no momento. Ele vive on-chain na sua própria carteira Solana como qualquer outro token Solana. Um listing em DEX está planejado.",
  nl: "NSVX is een echte, op Solana gebaseerde utility-token. Hij is nog niet genoteerd op een openbare exchange, dus hij kan momenteel niet buiten het platform worden gekocht of verkocht. Hij leeft on-chain in je eigen Solana-wallet zoals elke andere Solana-token. Een DEX-notering is gepland.",
  pl: "NSVX jest prawdziwym tokenem użytkowym opartym na Solana. Nie jest jeszcze notowany na publicznej giełdzie, więc obecnie nie można go kupić ani sprzedać poza platformą. Żyje on-chain w Twoim własnym portfelu Solana jak każdy inny token Solana. Planowane jest listing na DEX.",
  it: "NSVX è un vero token di utilità basato su Solana. Non è ancora quotato su un exchange pubblico, quindi attualmente non può essere acquistato o venduto al di fuori della piattaforma. Vive on-chain nel tuo portafoglio Solana come qualsiasi altro token Solana. È previsto un listing su un DEX.",
};

const NSVX_FAQ2_A = {
  en: "NSVX is a real Solana token. It is not yet listed on a public exchange, so you cannot currently sell it outside the platform. Once a DEX listing goes live, peer-to-peer trading will be possible. Until then, NSVX earned on the platform can be withdrawn to your Solana wallet.",
  cs: "NSVX je skutečný Solana token. Zatím není kotován na veřejné burze, takže ho momentálně nemůžete prodat mimo platformu. Jakmile bude spuštěn listing na DEX, bude možné peer-to-peer obchodování. Do té doby lze NSVX vydělané na platformě převést do vaší Solana peněženky.",
  sk: "NSVX je skutočný token Solana. Zatiaľ nie je kótovaný na verejnej burze, takže ho momentálne nemôžete predať mimo platformu. Po spustení listingu na DEX bude možné peer-to-peer obchodovanie. Dovtedy je možné vybrať NSVX zarobené na platforme do vašej Solana peňaženky.",
  de: "NSVX ist ein echter Solana-Token. Er ist noch nicht an einer öffentlichen Börse gelistet, sodass du ihn derzeit außerhalb der Plattform nicht verkaufen kannst. Sobald ein DEX-Listing live geht, wird Peer-to-Peer-Handel möglich sein. Bis dahin können verdiente NSVX in deine Solana-Wallet abgehoben werden.",
  es: "NSVX es un token Solana real. Aún no está listado en un exchange público, por lo que actualmente no puedes venderlo fuera de la plataforma. Una vez que el listing en un DEX esté activo, será posible el trading entre pares. Hasta entonces, los NSVX ganados en la plataforma pueden retirarse a tu wallet de Solana.",
  fr: "NSVX est un vrai token Solana. Il n'est pas encore listé sur une bourse publique, vous ne pouvez donc pas le vendre en dehors de la plateforme pour l'instant. Une fois le listing sur un DEX actif, les échanges peer-to-peer seront possibles. En attendant, les NSVX gagnés sur la plateforme peuvent être retirés vers votre portefeuille Solana.",
  pt: "NSVX é um token Solana real. Ainda não está listado em uma exchange pública, portanto você não pode vendê-lo fora da plataforma no momento. Assim que um listing em DEX entrar em vigor, a negociação peer-to-peer será possível. Até lá, os NSVX ganhos na plataforma podem ser retirados para sua carteira Solana.",
  nl: "NSVX is een echte Solana-token. Hij is nog niet genoteerd op een openbare exchange, dus je kunt hem momenteel niet buiten het platform verkopen. Zodra een DEX-notering live gaat, is peer-to-peer handel mogelijk. Tot die tijd kunnen verdiende NSVX worden opgenomen naar je Solana-wallet.",
  pl: "NSVX jest prawdziwym tokenem Solana. Nie jest jeszcze notowany na publicznej giełdzie, więc obecnie nie możesz go sprzedać poza platformą. Po uruchomieniu listingu na DEX możliwy będzie handel peer-to-peer. Do tego czasu zarobione NSVX można wypłacić do portfela Solana.",
  it: "NSVX è un vero token Solana. Non è ancora quotato su un exchange pubblico, quindi attualmente non puoi venderlo al di fuori della piattaforma. Una volta che un listing su un DEX sarà attivo, sarà possibile il trading peer-to-peer. Nel frattempo, gli NSVX guadagnati sulla piattaforma possono essere prelevati nel tuo wallet Solana.",
};

// FIX 4: for-users page — creator vetting claim (forUsers.programsBody + forListeners.expertsBody)

const VETTING_BODY = {
  en: "Every creator on AlphaGlow is reviewed by Nova before they go live, and anything Nova flags gets a second look from our team.",
  cs: "Každý tvůrce na AlphaGlow je před spuštěním přezkoumán Novou, a vše, co Nova označí příznakem, dostane druhý pohled od našeho týmu.",
  sk: "Každý tvorca na AlphaGlow je pred spustením preskúmaný Novou, a všetko, čo Nova označí, dostane druhý pohľad od nášho tímu.",
  de: "Jeder Creator auf AlphaGlow wird von Nova überprüft, bevor er live geht. Alles, was Nova markiert, wird von unserem Team noch einmal geprüft.",
  es: "Cada creador en AlphaGlow es revisado por Nova antes de publicarse, y cualquier cosa que Nova marque recibe una segunda revisión de nuestro equipo.",
  fr: "Chaque créateur sur AlphaGlow est examiné par Nova avant d'être mis en ligne, et tout ce que Nova signale fait l'objet d'une deuxième vérification par notre équipe.",
  pt: "Cada criador no AlphaGlow é revisado pela Nova antes de entrar ao vivo, e qualquer coisa que a Nova sinalize recebe uma segunda análise da nossa equipe.",
  nl: "Elke creator op AlphaGlow wordt door Nova beoordeeld voordat ze live gaan, en alles wat Nova markeert wordt nogmaals bekeken door ons team.",
  pl: "Każdy twórca na AlphaGlow jest weryfikowany przez Novę przed opublikowaniem, a wszystko, co Nova oznaczy, zostaje ponownie sprawdzone przez nasz zespół.",
  it: "Ogni creator su AlphaGlow viene esaminato da Nova prima di andare live, e tutto ciò che Nova segnala riceve un secondo sguardo dal nostro team.",
};

// FIX 5: advertisers page — stats disclaimer paragraph

const ADVERTISER_DISCLAIMER = {
  en: "Completion rates, pricing tiers, and reward amounts shown are current estimates based on early testing and may change as the platform onboards its first advertiser partners.",
  cs: "Zobrazené míry dokončení, cenové úrovně a výše odměn jsou aktuální odhady na základě raného testování a mohou se změnit, jakmile platforma získá první inzertní partnery.",
  sk: "Zobrazené miery dokončenia, cenové úrovne a výšky odmien sú aktuálne odhady na základe skorého testovania a môžu sa zmeniť, keď platforma získa prvých inzertných partnerov.",
  de: "Die angezeigten Abschlussraten, Preisniveaus und Vergütungsbeträge sind aktuelle Schätzungen auf Basis früher Tests und können sich ändern, wenn die Plattform ihre ersten Werbepartner onboardet.",
  es: "Las tasas de finalización, niveles de precios y montos de recompensa mostrados son estimaciones actuales basadas en pruebas tempranas y pueden cambiar a medida que la plataforma incorpore sus primeros socios publicitarios.",
  fr: "Les taux de complétion, les niveaux de tarification et les montants de récompense affichés sont des estimations actuelles basées sur des tests préliminaires et peuvent évoluer au fur et à mesure que la plateforme intègre ses premiers partenaires publicitaires.",
  pt: "As taxas de conclusão, faixas de preços e valores de recompensa mostrados são estimativas atuais com base em testes iniciais e podem mudar à medida que a plataforma integra seus primeiros parceiros anunciantes.",
  nl: "De weergegeven voltooiingspercentages, prijsniveaus en beloningsbedragen zijn huidige schattingen op basis van vroeg testen en kunnen veranderen naarmate het platform zijn eerste advertentiepartners onboardt.",
  pl: "Wyświetlane wskaźniki ukończenia, poziomy cenowe i kwoty nagród są aktualnymi szacunkami opartymi na wczesnych testach i mogą się zmienić, gdy platforma onboarduje pierwszych partnerów reklamodawców.",
  it: "I tassi di completamento, le fasce di prezzo e gli importi dei premi mostrati sono stime attuali basate su test preliminari e potrebbero cambiare man mano che la piattaforma acquisisce i suoi primi partner pubblicitari.",
};

// FIX 6: home page — replace 6 archetype IDs with 3 new ones
// New IDs: musician, podcaster, yogaTeacher
// Keep same structure: {id}Category, {id}Title, {id}Desc

const NEW_ARCHETYPES = {
  en: {
    musicianCategory: "Music",
    musicianTitle: "The Musician",
    musicianDesc: "Publish technique sessions, ear-training tracks, and original soundscapes — then let your Digital Twin answer theory questions live, day or night.",
    podcasterCategory: "Podcasting",
    podcasterTitle: "The Podcaster",
    podcasterDesc: "Publish episodes with bonus unlockable segments, group them into seasons, and let your Digital Twin field listener questions long after each episode airs.",
    yogaTeacherCategory: "Yoga",
    yogaTeacherTitle: "The Yoga Teacher",
    yogaTeacherDesc: "Publish flow sequences as sessions, structure them into multi-week journeys, and let your Digital Twin answer alignment questions between classes.",
    archetypesSeeAll: "See all creator types",
  },
  cs: {
    musicianCategory: "Hudba",
    musicianTitle: "Hudebník",
    musicianDesc: "Zveřejňujte technické lekce, ear-trainningové nahrávky a originální zvukové kulisy — a nechte svůj Digital Twin odpovídat na otázky z teorie živě, ve dne i v noci.",
    podcasterCategory: "Podcast",
    podcasterTitle: "Podcastér",
    podcasterDesc: "Zveřejňujte epizody s bonusovými odemykatelnými segmenty, seskupujte je do sezón a nechte svůj Digital Twin odpovídat na dotazy posluchačů dlouho po odvysílání.",
    yogaTeacherCategory: "Jóga",
    yogaTeacherTitle: "Učitelka jógy",
    yogaTeacherDesc: "Zveřejňujte flowové sekvence jako lekce, strukturujte je do vícetydenních cest a nechte svůj Digital Twin odpovídat na otázky zarovnání mezi hodinami.",
    archetypesSeeAll: "Zobrazit všechny typy tvůrců",
  },
  sk: {
    musicianCategory: "Hudba",
    musicianTitle: "Hudobník",
    musicianDesc: "Zverejňujte technické lekcie, ear-tréningové nahrávky a originálne zvukové kulisy — a nechajte svojho Digital Twin odpovedať na otázky z teórie naživo, vo dne i v noci.",
    podcasterCategory: "Podcast",
    podcasterTitle: "Podcaster",
    podcasterDesc: "Zverejňujte epizódy s bonusovými odomknuteľnými segmentmi, skupinujte ich do sezón a nechajte svojho Digital Twin odpovedať na otázky poslucháčov dlho po odvysielaní.",
    yogaTeacherCategory: "Jóga",
    yogaTeacherTitle: "Učiteľka jógy",
    yogaTeacherDesc: "Zverejňujte flowové sekvencie ako lekcie, štruktúrujte ich do viactyždenných ciest a nechajte svojho Digital Twin odpovedať na otázky zarovnania medzi hodinami.",
    archetypesSeeAll: "Zobraziť všetky typy tvorcov",
  },
  de: {
    musicianCategory: "Musik",
    musicianTitle: "Der Musiker",
    musicianDesc: "Veröffentliche Technik-Sessions, Gehörtraining-Tracks und originale Soundscapes – und lass deinen Digital Twin rund um die Uhr Theoriefragen beantworten.",
    podcasterCategory: "Podcast",
    podcasterTitle: "Der Podcaster",
    podcasterDesc: "Veröffentliche Episoden mit bonusfähigen Segmenten, gruppiere sie in Staffeln und lass deinen Digital Twin Zuhörerfragen noch lange nach der Ausstrahlung beantworten.",
    yogaTeacherCategory: "Yoga",
    yogaTeacherTitle: "Die Yogalehrerin",
    yogaTeacherDesc: "Veröffentliche Flow-Sequenzen als Sessions, strukturiere sie in mehrwöchige Journeys und lass deinen Digital Twin Fragen zur Ausrichtung zwischen den Stunden beantworten.",
    archetypesSeeAll: "Alle Creator-Typen ansehen",
  },
  es: {
    musicianCategory: "Música",
    musicianTitle: "El Músico",
    musicianDesc: "Publica sesiones de técnica, pistas de entrenamiento auditivo y soundscapes originales, y deja que tu Digital Twin responda preguntas de teoría en vivo, de día o de noche.",
    podcasterCategory: "Podcast",
    podcasterTitle: "El Podcaster",
    podcasterDesc: "Publica episodios con segmentos desbloqueables, agrúpalos en temporadas y deja que tu Digital Twin responda preguntas de oyentes mucho después de emitirse.",
    yogaTeacherCategory: "Yoga",
    yogaTeacherTitle: "La Profesora de Yoga",
    yogaTeacherDesc: "Publica secuencias de flow como sesiones, estructúralas en journeys de varias semanas y deja que tu Digital Twin responda preguntas de alineación entre clases.",
    archetypesSeeAll: "Ver todos los tipos de creadores",
  },
  fr: {
    musicianCategory: "Musique",
    musicianTitle: "Le Musicien",
    musicianDesc: "Publiez des sessions de technique, des pistes de formation auditive et des soundscapes originaux, et laissez votre Digital Twin répondre aux questions de théorie en direct, jour et nuit.",
    podcasterCategory: "Podcast",
    podcasterTitle: "Le Podcasteur",
    podcasterDesc: "Publiez des épisodes avec des segments bonus déverrouillables, regroupez-les en saisons et laissez votre Digital Twin répondre aux questions des auditeurs longtemps après la diffusion.",
    yogaTeacherCategory: "Yoga",
    yogaTeacherTitle: "La Professeure de Yoga",
    yogaTeacherDesc: "Publiez des séquences de flow comme sessions, structurez-les en parcours de plusieurs semaines et laissez votre Digital Twin répondre aux questions d'alignement entre les cours.",
    archetypesSeeAll: "Voir tous les types de créateurs",
  },
  pt: {
    musicianCategory: "Música",
    musicianTitle: "O Músico",
    musicianDesc: "Publique sessões de técnica, trilhas de treinamento auditivo e soundscapes originais — e deixe seu Digital Twin responder perguntas de teoria ao vivo, dia e noite.",
    podcasterCategory: "Podcast",
    podcasterTitle: "O Podcaster",
    podcasterDesc: "Publique episódios com segmentos desbloqueáveis, agrupe-os em temporadas e deixe seu Digital Twin responder perguntas de ouvintes muito depois de cada episódio ir ao ar.",
    yogaTeacherCategory: "Yoga",
    yogaTeacherTitle: "A Professora de Yoga",
    yogaTeacherDesc: "Publique sequências de flow como sessões, estruture-as em jornadas de várias semanas e deixe seu Digital Twin responder perguntas de alinhamento entre as aulas.",
    archetypesSeeAll: "Ver todos os tipos de criadores",
  },
  nl: {
    musicianCategory: "Muziek",
    musicianTitle: "De Muzikant",
    musicianDesc: "Publiceer techniek-sessies, gehoortrainingsnummers en originele soundscapes — en laat je Digital Twin dag en nacht theorievragen live beantwoorden.",
    podcasterCategory: "Podcast",
    podcasterTitle: "De Podcaster",
    podcasterDesc: "Publiceer afleveringen met bonussegmenten, groepeer ze in seizoenen en laat je Digital Twin luistervragen beantwoorden lang nadat elke aflevering is uitgezonden.",
    yogaTeacherCategory: "Yoga",
    yogaTeacherTitle: "De Yogadocente",
    yogaTeacherDesc: "Publiceer flow-sequenties als sessies, structureer ze in meerwekse journeys en laat je Digital Twin uitlijningsvragen beantwoorden tussen de lessen door.",
    archetypesSeeAll: "Bekijk alle creator-typen",
  },
  pl: {
    musicianCategory: "Muzyka",
    musicianTitle: "Muzyk",
    musicianDesc: "Publikuj sesje techniki, ścieżki treningu słuchowego i oryginalne soundscapes — i pozwól swojemu Digital Twin odpowiadać na pytania z teorii na żywo, w dzień i w nocy.",
    podcasterCategory: "Podcast",
    podcasterTitle: "Podcaster",
    podcasterDesc: "Publikuj odcinki z odblokowywalnymi segmentami bonusowymi, grupuj je w sezony i pozwól swojemu Digital Twin odpowiadać na pytania słuchaczy długo po emisji.",
    yogaTeacherCategory: "Joga",
    yogaTeacherTitle: "Nauczycielka jogi",
    yogaTeacherDesc: "Publikuj sekwencje flow jako sesje, strukturuj je w wielotygodniowe podróże i pozwól swojemu Digital Twin odpowiadać na pytania dotyczące wyrównania między zajęciami.",
    archetypesSeeAll: "Zobacz wszystkie typy twórców",
  },
  it: {
    musicianCategory: "Musica",
    musicianTitle: "Il Musicista",
    musicianDesc: "Pubblica sessioni di tecnica, tracce di ear-training e soundscape originali — e lascia che il tuo Digital Twin risponda a domande di teoria in tempo reale, giorno e notte.",
    podcasterCategory: "Podcast",
    podcasterTitle: "Il Podcaster",
    podcasterDesc: "Pubblica episodi con segmenti bonus sbloccabili, raggruppali in stagioni e lascia che il tuo Digital Twin risponda alle domande degli ascoltatori molto dopo la messa in onda.",
    yogaTeacherCategory: "Yoga",
    yogaTeacherTitle: "L'Insegnante di Yoga",
    yogaTeacherDesc: "Pubblica sequenze di flow come sessioni, strutturale in percorsi di più settimane e lascia che il tuo Digital Twin risponda alle domande di allineamento tra le lezioni.",
    archetypesSeeAll: "Vedi tutti i tipi di creator",
  },
};

// FIX 7: Brand name — first mention must be "AlphaGlow AI"
// Affected keys:
//   pressPage.boilerplateBody — must use "AlphaGlow AI" throughout (already does in EN; verify/fix per locale)
//   pressPage.heroBody — first mention
//   investors.heroBody — first mention
//   forUsers.heroBody — first mention
//   home.heroBody — first mention

// For this fix we check and enforce in the script inline below.

// FIX 8: Roadmap entry 4 — remove NSVR / metaverse, replace

const ROADMAP4_TITLE = {
  en: "Growth and CEX",
  cs: "Růst a CEX",
  sk: "Rast a CEX",
  de: "Wachstum und CEX",
  es: "Crecimiento y CEX",
  fr: "Croissance et CEX",
  pt: "Crescimento e CEX",
  nl: "Groei en CEX",
  pl: "Wzrost i CEX",
  it: "Crescita e CEX",
};

const ROADMAP4_BODY = {
  en: "Beyond 2026, expanding the platform's reach, with a CEX listing targeted for 2027, and new product lines currently in development.",
  cs: "Po roce 2026 rozšíření dosahu platformy, s cílem listování na CEX v roce 2027 a nových produktových linií, které jsou v současné době ve vývoji.",
  sk: "Po roku 2026 rozšírenie dosahu platformy, s cieľom listingu na CEX v roku 2027 a nových produktových línií, ktoré sú momentálne vo vývoji.",
  de: "Nach 2026 Ausbau der Reichweite der Plattform, mit einem CEX-Listing für 2027 und neuen Produktlinien, die sich derzeit in der Entwicklung befinden.",
  es: "Más allá de 2026, ampliando el alcance de la plataforma, con un listing en CEX previsto para 2027 y nuevas líneas de productos actualmente en desarrollo.",
  fr: "Au-delà de 2026, expansion de la portée de la plateforme, avec un listing sur un CEX prévu pour 2027 et de nouvelles lignes de produits en cours de développement.",
  pt: "Além de 2026, expandindo o alcance da plataforma, com um listing em CEX previsto para 2027 e novas linhas de produtos atualmente em desenvolvimento.",
  nl: "Na 2026 de reikwijdte van het platform uitbreiden, met een CEX-notering gepland voor 2027 en nieuwe productlijnen die momenteel in ontwikkeling zijn.",
  pl: "Po 2026 roku rozszerzenie zasięgu platformy, z docelowym listingiem na CEX w 2027 roku i nowymi liniami produktów w trakcie opracowywania.",
  it: "Oltre il 2026, espandendo la portata della piattaforma, con un listing su CEX previsto per il 2027 e nuove linee di prodotto attualmente in fase di sviluppo.",
};

// FIX 9: NSVX Disclaimer page — correct NSVX description
// Fix nsvxDisc.s1p, s2i4 (not eligible for trading), s3p (no monetary value), s4p (non-transferable)

const NSVXDISC_S1P = {
  en: "NSVX is a real Solana-based utility token issued by AlphaGlow AI. It is designed to reward consistent platform engagement and enable access to premium platform content. NSVX is not yet listed on any public exchange, so it cannot currently be bought or sold outside the platform.",
  cs: "NSVX je skutečný utility token na bázi Solana vydaný AlphaGlow AI. Je navržen tak, aby odměňoval konzistentní zapojení na platformě a umožňoval přístup k prémiovému obsahu. NSVX zatím není kotován na žádné veřejné burze, takže ho momentálně nelze koupit ani prodat mimo platformu.",
  sk: "NSVX je skutočný utility token na báze Solana vydaný AlphaGlow AI. Je navrhnutý tak, aby odmeňoval konzistentné zapojenie na platforme a umožňoval prístup k prémiovému obsahu. NSVX zatiaľ nie je kótovaný na žiadnej verejnej burze, takže ho momentálne nie je možné kúpiť ani predať mimo platformu.",
  de: "NSVX ist ein echter Solana-basierter Utility-Token, der von AlphaGlow AI ausgegeben wird. Er ist darauf ausgelegt, konsequentes Plattformengagement zu belohnen und den Zugang zu Premium-Plattforminhalten zu ermöglichen. NSVX ist noch nicht an einer öffentlichen Börse gelistet und kann daher derzeit außerhalb der Plattform weder gekauft noch verkauft werden.",
  es: "NSVX es un token de utilidad real basado en Solana emitido por AlphaGlow AI. Está diseñado para recompensar el compromiso constante con la plataforma y permitir el acceso a contenido premium. NSVX aún no está listado en ningún exchange público, por lo que actualmente no puede comprarse ni venderse fuera de la plataforma.",
  fr: "NSVX est un vrai token utilitaire basé sur Solana émis par AlphaGlow AI. Il est conçu pour récompenser l'engagement constant sur la plateforme et permettre l'accès à du contenu premium. NSVX n'est pas encore listé sur une bourse publique, il ne peut donc pas être acheté ou vendu en dehors de la plateforme pour l'instant.",
  pt: "NSVX é um token de utilidade real baseado em Solana emitido pela AlphaGlow AI. Ele é projetado para recompensar o engajamento consistente na plataforma e permitir acesso a conteúdo premium. O NSVX ainda não está listado em nenhuma exchange pública, portanto não pode ser comprado ou vendido fora da plataforma no momento.",
  nl: "NSVX is een echte, op Solana gebaseerde utility-token uitgegeven door AlphaGlow AI. Hij is ontworpen om consistent platformengagement te belonen en toegang te bieden tot premiumcontent. NSVX is nog niet genoteerd op een openbare exchange en kan momenteel niet buiten het platform worden gekocht of verkocht.",
  pl: "NSVX to prawdziwy token użytkowy oparty na Solana, wydany przez AlphaGlow AI. Został zaprojektowany, aby nagradzać spójne zaangażowanie na platformie i umożliwiać dostęp do treści premium. NSVX nie jest jeszcze notowany na żadnej publicznej giełdzie, więc obecnie nie można go kupić ani sprzedać poza platformą.",
  it: "NSVX è un vero token di utilità basato su Solana emesso da AlphaGlow AI. È progettato per premiare il coinvolgimento costante sulla piattaforma e consentire l'accesso ai contenuti premium. NSVX non è ancora quotato su alcun exchange pubblico, quindi attualmente non può essere acquistato o venduto al di fuori della piattaforma.",
};

const NSVXDISC_S2I4 = {
  en: "Currently listed on any public exchange or marketplace (a DEX listing is planned)",
  cs: "Aktuálně kotován na jakékoli veřejné burze nebo trhu (listing na DEX je v plánu)",
  sk: "Aktuálne kótovaný na akejkoľvek verejnej burze alebo trhu (listing na DEX je v pláne)",
  de: "Derzeit an einer öffentlichen Börse oder einem Marktplatz gelistet (ein DEX-Listing ist geplant)",
  es: "Actualmente listado en ningún exchange o mercado público (se planea un listing en DEX)",
  fr: "Actuellement listé sur une bourse ou un marché public (un listing sur un DEX est prévu)",
  pt: "Atualmente listado em nenhuma exchange ou mercado público (um listing em DEX está planejado)",
  nl: "Momenteel genoteerd op een openbare exchange of marktplaats (een DEX-notering is gepland)",
  pl: "Aktualnie notowany na żadnej publicznej giełdzie lub rynku (planowany jest listing na DEX)",
  it: "Attualmente quotato su alcun exchange o mercato pubblico (è previsto un listing su un DEX)",
};

const NSVXDISC_S3P = {
  en: "NSVX is a real Solana-based token that lives on-chain in your own wallet. It is not yet listed on a public exchange, so it cannot currently be sold or traded for fiat currency or other assets outside the platform. Any third-party service claiming to exchange NSVX for money is unauthorized and potentially fraudulent. A DEX listing is planned — at that point peer-to-peer trading will be possible.",
  cs: "NSVX je skutečný token na bázi Solana, který žije on-chain ve vaší vlastní peněžence. Zatím není kotován na veřejné burze, takže ho momentálně nelze prodat ani obchodovat za fiat měnu nebo jiná aktiva mimo platformu. Jakákoli služba třetí strany, která tvrdí, že vyměňuje NSVX za peníze, je neoprávněná a potenciálně podvodná. Plánujeme listing na DEX — v tu chvíli bude možné peer-to-peer obchodování.",
  sk: "NSVX je skutočný token na báze Solana, ktorý žije on-chain vo vašej vlastnej peňaženke. Zatiaľ nie je kótovaný na verejnej burze, takže ho momentálne nie je možné predať ani obchodovať za fiat menu alebo iné aktíva mimo platformu. Akákoľvek služba tretej strany tvrdiacej, že vymieňa NSVX za peniaze, je neoprávnená a potenciálne podvodná. Plánuje sa listing na DEX — v tom okamihu bude možné peer-to-peer obchodovanie.",
  de: "NSVX ist ein echter Solana-basierter Token, der on-chain in deiner eigenen Wallet lebt. Er ist noch nicht an einer öffentlichen Börse gelistet, sodass er derzeit außerhalb der Plattform nicht für Fiat-Währung oder andere Vermögenswerte verkauft oder gehandelt werden kann. Jeder Drittanbieter, der behauptet, NSVX gegen Geld zu tauschen, ist nicht autorisiert und möglicherweise betrügerisch. Ein DEX-Listing ist geplant – zu diesem Zeitpunkt wird Peer-to-Peer-Handel möglich sein.",
  es: "NSVX es un token real basado en Solana que vive on-chain en tu propia wallet. Aún no está listado en un exchange público, por lo que actualmente no puede venderse ni intercambiarse por moneda fiat u otros activos fuera de la plataforma. Cualquier servicio de terceros que afirme intercambiar NSVX por dinero no está autorizado y es potencialmente fraudulento. Está planeado un listing en un DEX — en ese momento será posible el trading entre pares.",
  fr: "NSVX est un vrai token basé sur Solana qui vit on-chain dans votre propre portefeuille. Il n'est pas encore listé sur une bourse publique, il ne peut donc pas être vendu ou échangé contre de la monnaie fiduciaire ou d'autres actifs en dehors de la plateforme pour l'instant. Tout service tiers prétendant échanger des NSVX contre de l'argent est non autorisé et potentiellement frauduleux. Un listing sur un DEX est prévu — à ce moment-là, les échanges peer-to-peer seront possibles.",
  pt: "NSVX é um token real baseado em Solana que vive on-chain na sua própria carteira. Ainda não está listado em uma exchange pública, portanto não pode ser vendido ou trocado por moeda fiduciária ou outros ativos fora da plataforma no momento. Qualquer serviço de terceiros que afirme trocar NSVX por dinheiro é não autorizado e potencialmente fraudulento. Um listing em DEX está planejado — nesse ponto o trading peer-to-peer será possível.",
  nl: "NSVX is een echte Solana-gebaseerde token die on-chain in je eigen wallet leeft. Hij is nog niet genoteerd op een openbare exchange, dus hij kan momenteel niet worden verkocht of verhandeld voor fiat valuta of andere activa buiten het platform. Elke derde partij die beweert NSVX voor geld te wisselen, is onbevoegd en mogelijk frauduleus. Een DEX-notering is gepland — op dat moment zal peer-to-peer handel mogelijk zijn.",
  pl: "NSVX to prawdziwy token oparty na Solana, który żyje on-chain w Twoim własnym portfelu. Nie jest jeszcze notowany na publicznej giełdzie, więc obecnie nie można go sprzedać ani wymienić na walutę fiduciarne lub inne aktywa poza platformą. Każda usługa strony trzeciej twierdząca, że wymienia NSVX na pieniądze, jest nieautoryzowana i potencjalnie nieuczciwia. Planowany jest listing na DEX — w tym momencie handel peer-to-peer będzie możliwy.",
  it: "NSVX è un vero token basato su Solana che vive on-chain nel tuo portafoglio. Non è ancora quotato su un exchange pubblico, quindi attualmente non può essere venduto o scambiato con valuta fiat o altri asset al di fuori della piattaforma. Qualsiasi servizio di terze parti che afferma di scambiare NSVX per denaro è non autorizzato e potenzialmente fraudolento. È previsto un listing su un DEX — in quel momento il trading peer-to-peer sarà possibile.",
};

const NSVXDISC_S4P = {
  en: "NSVX tokens live on-chain in your own Solana wallet and are bound to your AlphaGlow account for platform spending purposes. Attempts to sell or transfer NSVX outside authorized platform mechanics before a DEX listing will result in account suspension.",
  cs: "NSVX tokeny žijí on-chain ve vaší vlastní Solana peněžence a jsou vázány na váš účet AlphaGlow pro účely výdajů na platformě. Pokusy o prodej nebo převod NSVX mimo autorizované mechaniky platformy před listingem na DEX mají za následek pozastavení účtu.",
  sk: "NSVX tokeny žijú on-chain vo vašej vlastnej Solana peňaženke a sú viazané na váš účet AlphaGlow na účely výdavkov na platforme. Pokusy o predaj alebo prevod NSVX mimo autorizovaných mechaník platformy pred listingom na DEX majú za následok pozastavenie účtu.",
  de: "NSVX-Token leben on-chain in deiner eigenen Solana-Wallet und sind für Plattformausgaben an dein AlphaGlow-Konto gebunden. Versuche, NSVX vor einem DEX-Listing außerhalb autorisierter Plattformmechanismen zu verkaufen oder zu übertragen, führen zur Sperrung des Kontos.",
  es: "Los tokens NSVX viven on-chain en tu propia wallet de Solana y están vinculados a tu cuenta de AlphaGlow para gastos en la plataforma. Los intentos de vender o transferir NSVX fuera de los mecanismos autorizados de la plataforma antes de un listing en DEX resultarán en la suspensión de la cuenta.",
  fr: "Les tokens NSVX vivent on-chain dans votre propre portefeuille Solana et sont liés à votre compte AlphaGlow pour les dépenses sur la plateforme. Les tentatives de vendre ou de transférer des NSVX en dehors des mécaniques autorisées de la plateforme avant un listing sur un DEX entraîneront la suspension du compte.",
  pt: "Os tokens NSVX vivem on-chain na sua própria carteira Solana e estão vinculados à sua conta AlphaGlow para gastos na plataforma. Tentativas de vender ou transferir NSVX fora dos mecanismos autorizados da plataforma antes de um listing em DEX resultarão em suspensão da conta.",
  nl: "NSVX-tokens leven on-chain in je eigen Solana-wallet en zijn gebonden aan je AlphaGlow-account voor platformuitgaven. Pogingen om NSVX buiten geautoriseerde platformmechanieken te verkopen of over te dragen vóór een DEX-notering resulteren in accountopschorting.",
  pl: "Tokeny NSVX żyją on-chain w Twoim własnym portfelu Solana i są powiązane z Twoim kontem AlphaGlow na potrzeby wydatków na platformie. Próby sprzedaży lub transferu NSVX poza autoryzowanymi mechanikami platformy przed listingiem na DEX skutkują zawieszeniem konta.",
  it: "I token NSVX vivono on-chain nel tuo portafoglio Solana e sono legati al tuo account AlphaGlow per le spese sulla piattaforma. I tentativi di vendere o trasferire NSVX al di fuori dei meccanismi autorizzati della piattaforma prima di un listing su un DEX comporteranno la sospensione dell'account.",
};

// FIX 10: Creator Agreement section 5 — rewrite
const CA_S5H = {
  en: "5. Session Generation and Digital Twin",
  cs: "5. Generování relací a Digital Twin",
  sk: "5. Generovanie relácií a Digital Twin",
  de: "5. Session-Generierung und Digital Twin",
  es: "5. Generación de sesiones y Digital Twin",
  fr: "5. Génération de sessions et Digital Twin",
  pt: "5. Geração de sessões e Digital Twin",
  nl: "5. Sessiegeneratie en Digital Twin",
  pl: "5. Generowanie sesji i Digital Twin",
  it: "5. Generazione di sessioni e Digital Twin",
};

const CA_S5P = {
  en: "AlphaGlow AI supports two publishing paths. Path 1 — AI-narrated sessions: you provide a script and your cloned voice narrates it through the session generation pipeline. You grant AlphaGlow AI permission to use your voice clone for this purpose. Path 2 — Digital Twin sessions: you build your avatar on LiveAvatar (liveavatar.com) and connect it to your AlphaGlow AI Studio by providing your Avatar ID and Access Token. Your Digital Twin can then stream live and run autonomous sessions in your likeness and cloned voice. You grant AlphaGlow AI permission to use your voice clone and likeness for both paths. You are responsible for reviewing and approving your Digital Twin configuration before it is published.",
  cs: "AlphaGlow AI podporuje dvě cesty publikování. Cesta 1 — Relace s AI narací: poskytnete skript a váš klonovaný hlas ho přednese prostřednictvím pipeline generování relací. Udělujete AlphaGlow AI svolení k použití vašeho hlasového klonu pro tento účel. Cesta 2 — Lekce Digital Twin: vytvořte svůj avatar na LiveAvatar (liveavatar.com) a propojte ho se svým AlphaGlow AI Studiem poskytnutím Avatar ID a Access Tokenu. Váš Digital Twin pak může streamovat živě a spouštět autonomní relace ve vaší podobě a klonovaném hlase. Udělujete AlphaGlow AI svolení k použití vašeho hlasového klonu a podoby pro obě cesty. Jste zodpovědní za přezkum a schválení konfigurace Digital Twin před jejím publikováním.",
  sk: "AlphaGlow AI podporuje dve cesty publikovania. Cesta 1 — Relácie s AI naráciou: poskytnete skript a váš klonovaný hlas ho prednáša prostredníctvom pipeline generovania relácií. Udeľujete AlphaGlow AI súhlas na použitie vášho hlasového klonu na tento účel. Cesta 2 — Relácie Digital Twin: vytvorte si avatar na LiveAvatar (liveavatar.com) a prepojte ho so svojím AlphaGlow AI Štúdiom poskytnutím Avatar ID a Access Token. Váš Digital Twin potom môže streamovať naživo a spúšťať autonómne relácie vo vašej podobe a klonovanom hlase. Udeľujete AlphaGlow AI súhlas na použitie vášho hlasového klonu a podoby pre obe cesty. Ste zodpovedný za preskúmanie a schválenie konfigurácie Digital Twin pred jej zverejnením.",
  de: "AlphaGlow AI unterstützt zwei Veröffentlichungswege. Weg 1 — KI-erzählte Sessions: Du lieferst ein Skript, und deine geklonte Stimme spricht es über die Session-Generierungs-Pipeline ein. Du erteilst AlphaGlow AI die Erlaubnis, deinen Stimmklon für diesen Zweck zu verwenden. Weg 2 — Digital Twin Sessions: Du erstellst deinen Avatar auf LiveAvatar (liveavatar.com) und verbindest ihn mit deinem AlphaGlow AI Studio, indem du deine Avatar-ID und deinen Access Token angibst. Dein Digital Twin kann dann live streamen und autonome Sessions in deiner Erscheinung und geklonten Stimme durchführen. Du erteilst AlphaGlow AI die Erlaubnis, deinen Stimmklon und dein Erscheinungsbild für beide Wege zu verwenden. Du bist dafür verantwortlich, die Konfiguration deines Digital Twins vor der Veröffentlichung zu prüfen und zu genehmigen.",
  es: "AlphaGlow AI admite dos vías de publicación. Vía 1 — Sesiones con narración de IA: proporcionas un guion y tu voz clonada lo narra a través del pipeline de generación de sesiones. Otorgas a AlphaGlow AI permiso para usar tu clon de voz con este fin. Vía 2 — Sesiones de Digital Twin: creas tu avatar en LiveAvatar (liveavatar.com) y lo conectas a tu AlphaGlow AI Studio proporcionando tu Avatar ID y Access Token. Tu Digital Twin puede entonces transmitir en vivo y ejecutar sesiones autónomas con tu imagen y voz clonada. Otorgas a AlphaGlow AI permiso para usar tu clon de voz y tu imagen para ambas vías. Eres responsable de revisar y aprobar la configuración de tu Digital Twin antes de que se publique.",
  fr: "AlphaGlow AI prend en charge deux voies de publication. Voie 1 — Sessions narrées par IA : vous fournissez un script et votre voix clonée le narre via le pipeline de génération de sessions. Vous accordez à AlphaGlow AI l'autorisation d'utiliser votre clone vocal à cet effet. Voie 2 — Sessions Digital Twin : vous créez votre avatar sur LiveAvatar (liveavatar.com) et le connectez à votre AlphaGlow AI Studio en fournissant votre Avatar ID et votre Access Token. Votre Digital Twin peut ensuite diffuser en direct et exécuter des sessions autonomes à votre image et avec votre voix clonée. Vous accordez à AlphaGlow AI l'autorisation d'utiliser votre clone vocal et votre image pour les deux voies. Vous êtes responsable de la révision et de l'approbation de la configuration de votre Digital Twin avant sa publication.",
  pt: "A AlphaGlow AI suporta dois caminhos de publicação. Caminho 1 — Sessões narradas por IA: você fornece um roteiro e sua voz clonada o narra pelo pipeline de geração de sessões. Você concede à AlphaGlow AI permissão para usar seu clone de voz para essa finalidade. Caminho 2 — Sessões de Digital Twin: você cria seu avatar no LiveAvatar (liveavatar.com) e o conecta ao seu AlphaGlow AI Studio fornecendo seu Avatar ID e Access Token. Seu Digital Twin pode então transmitir ao vivo e executar sessões autônomas com sua imagem e voz clonada. Você concede à AlphaGlow AI permissão para usar seu clone de voz e imagem para ambos os caminhos. Você é responsável por revisar e aprovar a configuração do seu Digital Twin antes que seja publicado.",
  nl: "AlphaGlow AI ondersteunt twee publicatieroutes. Route 1 — AI-vertelde sessies: je levert een script en je gekloonde stem vertelt het via de sessiegeneratie-pipeline. Je verleent AlphaGlow AI toestemming om je stemkloon voor dit doel te gebruiken. Route 2 — Digital Twin sessies: je maakt je avatar aan op LiveAvatar (liveavatar.com) en verbindt deze met je AlphaGlow AI Studio door je Avatar ID en Access Token op te geven. Je Digital Twin kan dan live streamen en autonome sessies uitvoeren in jouw gelijkenis en gekloonide stem. Je verleent AlphaGlow AI toestemming om je stemkloon en gelijkenis voor beide routes te gebruiken. Je bent verantwoordelijk voor het beoordelen en goedkeuren van de configuratie van je Digital Twin voordat deze wordt gepubliceerd.",
  pl: "AlphaGlow AI obsługuje dwie ścieżki publikowania. Ścieżka 1 — Sesje z narracją AI: dostarczasz skrypt, a Twój sklonowany głos go narratuje przez pipeline generowania sesji. Udzielasz AlphaGlow AI zgody na wykorzystanie Twojego klona głosu w tym celu. Ścieżka 2 — Sesje Digital Twin: tworzysz swój avatar na LiveAvatar (liveavatar.com) i łączysz go z AlphaGlow AI Studio, podając swój Avatar ID i Access Token. Twój Digital Twin może następnie streamować na żywo i prowadzić autonomiczne sesje w Twojej postaci i sklonowanym głosie. Udzielasz AlphaGlow AI zgody na wykorzystanie Twojego klona głosu i wizerunku dla obu ścieżek. Jesteś odpowiedzialny za przegląd i zatwierdzenie konfiguracji swojego Digital Twin przed jej opublikowaniem.",
  it: "AlphaGlow AI supporta due percorsi di pubblicazione. Percorso 1 — Sessioni narrate dall'IA: fornisci uno script e la tua voce clonata lo narra attraverso il pipeline di generazione delle sessioni. Concedi ad AlphaGlow AI il permesso di utilizzare il tuo clone vocale per questo scopo. Percorso 2 — Sessioni Digital Twin: crei il tuo avatar su LiveAvatar (liveavatar.com) e lo colleghi al tuo AlphaGlow AI Studio fornendo il tuo Avatar ID e Access Token. Il tuo Digital Twin può quindi trasmettere in diretta ed eseguire sessioni autonome con la tua sembianza e voce clonata. Concedi ad AlphaGlow AI il permesso di utilizzare il tuo clone vocale e la tua sembianza per entrambi i percorsi. Sei responsabile della revisione e dell'approvazione della configurazione del tuo Digital Twin prima della pubblicazione.",
};

// LEGAL REVIEW — terms.s6p (NSVX non-transferable statement), privacy.s5i4 (Moonpay)
// Also fix various "wellness companion", "AI companion", "wellbeing" in brand descriptions

// terms.s6p — remove "cannot be sold, transferred, or exchanged for fiat currency"
const TERMS_S6P = {
  en: "NSVX tokens are Solana-based platform utility tokens. They are not yet listed on a public exchange. AlphaGlow AI reserves the right to modify token earning rates, spending values, and program availability at any time. See our NSVX Disclaimer for full details.",
  cs: "NSVX tokeny jsou platformové utility tokeny na bázi Solana. Zatím nejsou kotovány na veřejné burze. AlphaGlow AI si vyhrazuje právo kdykoli upravit míry získávání tokenů, výdajové hodnoty a dostupnost programů. Podrobnosti najdete v našem Prohlášení o NSVX.",
  sk: "NSVX tokeny sú platformové utility tokeny na báze Solana. Zatiaľ nie sú kótované na verejnej burze. AlphaGlow AI si vyhradzuje právo kedykoľvek upraviť miery získavania tokenov, výdavkové hodnoty a dostupnosť programov. Podrobnosti nájdete v našom Vyhlásení o NSVX.",
  de: "NSVX-Token sind Solana-basierte Plattform-Utility-Token. Sie sind noch nicht an einer öffentlichen Börse gelistet. AlphaGlow AI behält sich das Recht vor, Token-Verdiensraten, Ausgabewerte und Programmverfügbarkeit jederzeit zu ändern. Weitere Details findest du in unserem NSVX-Haftungsausschluss.",
  es: "Los tokens NSVX son tokens de utilidad de plataforma basados en Solana. Aún no están listados en un exchange público. AlphaGlow AI se reserva el derecho de modificar las tasas de obtención de tokens, los valores de gasto y la disponibilidad del programa en cualquier momento. Consulta nuestro Aviso de NSVX para obtener más información.",
  fr: "Les tokens NSVX sont des tokens utilitaires de plateforme basés sur Solana. Ils ne sont pas encore listés sur une bourse publique. AlphaGlow AI se réserve le droit de modifier les taux de gain des tokens, les valeurs de dépense et la disponibilité des programmes à tout moment. Consultez notre Avertissement NSVX pour plus de détails.",
  pt: "Os tokens NSVX são tokens de utilidade de plataforma baseados em Solana. Ainda não estão listados em uma exchange pública. A AlphaGlow AI reserva o direito de modificar as taxas de ganho de tokens, valores de gasto e disponibilidade de programas a qualquer momento. Consulte o nosso Aviso de NSVX para mais detalhes.",
  nl: "NSVX-tokens zijn Solana-gebaseerde platform utility-tokens. Ze zijn nog niet genoteerd op een openbare exchange. AlphaGlow AI behoudt zich het recht voor om op elk moment tokenverdienstpercentages, bestedingswaarden en programmatilgankelijkheid te wijzigen. Zie onze NSVX-disclaimer voor alle details.",
  pl: "Tokeny NSVX są opartymi na Solana tokenami użytkowymi platformy. Nie są jeszcze notowane na publicznej giełdzie. AlphaGlow AI zastrzega sobie prawo do modyfikowania stawek zarabiania tokenów, wartości wydatków i dostępności programów w dowolnym momencie. Pełne szczegóły znajdziesz w naszym Zastrzeżeniu NSVX.",
  it: "I token NSVX sono token di utilità della piattaforma basati su Solana. Non sono ancora quotati su un exchange pubblico. AlphaGlow AI si riserva il diritto di modificare i tassi di guadagno dei token, i valori di spesa e la disponibilità dei programmi in qualsiasi momento. Consulta il nostro Avviso NSVX per tutti i dettagli.",
};

// privacy.s5i4 — remove Moonpay reference
const PRIVACY_S5I4 = {
  en: "Payment processors — for NSVX token purchases and subscription payments. Processors are subject to their own KYC/AML obligations.",
  cs: "Zpracovatelé plateb — pro nákupy NSVX tokenů a platby předplatného. Zpracovatelé podléhají vlastním povinnostem KYC/AML.",
  sk: "Spracovatelia platieb — pre nákupy tokenov NSVX a platby predplatného. Spracovatelia podliehajú vlastným povinnostiam KYC/AML.",
  de: "Zahlungsabwickler — für NSVX-Token-Käufe und Abonnementzahlungen. Abwickler unterliegen ihren eigenen KYC/AML-Verpflichtungen.",
  es: "Procesadores de pago — para compras de tokens NSVX y pagos de suscripción. Los procesadores están sujetos a sus propias obligaciones KYC/AML.",
  fr: "Prestataires de services de paiement — pour les achats de tokens NSVX et les paiements d'abonnement. Les prestataires sont soumis à leurs propres obligations KYC/AML.",
  pt: "Processadores de pagamento — para compras de tokens NSVX e pagamentos de assinatura. Os processadores estão sujeitos às suas próprias obrigações KYC/AML.",
  nl: "Betalingsverwerkers — voor NSVX-tokenaankopen en abonnementsbetalingen. Verwerkers zijn onderworpen aan hun eigen KYC/AML-verplichtingen.",
  pl: "Procesory płatności — do zakupów tokenów NSVX i płatności abonamentowych. Procesory podlegają własnym obowiązkom KYC/AML.",
  it: "Elaboratori di pagamento — per gli acquisti di token NSVX e i pagamenti in abbonamento. I processori sono soggetti alle proprie obbligazioni KYC/AML.",
};

// ─── APPLY ALL FIXES ───────────────────────────────────────────────────────────

for (const lang of LOCALES) {
  const d = read(lang);

  // ── FIX 1: Founder name + bio ─────────────────────────────────────────────
  d.investors.team1Name = "Petr Kaplan";
  d.investors.team1Role = lang === "en" ? "Founder and CEO"
    : lang === "cs" ? "Zakladatel a CEO"
    : lang === "sk" ? "Zakladateľ a CEO"
    : lang === "de" ? "Gründer und CEO"
    : lang === "es" ? "Fundador y CEO"
    : lang === "fr" ? "Fondateur et CEO"
    : lang === "pt" ? "Fundador e CEO"
    : lang === "nl" ? "Oprichter en CEO"
    : lang === "pl" ? "Założyciel i CEO"
    : "Fondatore e CEO";
  d.investors.team1Bio = TEAM1_BIO[lang];

  // ── FIX 2: Roadmap Q3 + Q4 ───────────────────────────────────────────────
  d.investors.roadmap2Body = ROADMAP2_BODY[lang];
  d.investors.roadmap3Body = ROADMAP3_BODY[lang];

  // ── FIX 3: how-nsvx-works NSVX description ───────────────────────────────
  d.howNsvx.faq1A = NSVX_FAQ1_A[lang];
  d.howNsvx.faq2A = NSVX_FAQ2_A[lang];

  // ── FIX 4: for-users creator vetting claim ────────────────────────────────
  // forUsers page uses key: forUsers.programsBody
  d.forUsers.programsBody = VETTING_BODY[lang];
  // forListeners page uses key: forListeners.expertsBody
  if (d.forListeners) {
    d.forListeners.expertsBody = VETTING_BODY[lang];
  }

  // ── FIX 5: advertisers stats disclaimer ───────────────────────────────────
  d.advertisers.statsDisclaimer = ADVERTISER_DISCLAIMER[lang];

  // ── FIX 6: Home page — replace 6 archetypes with 3 ──────────────────────
  // Remove old 6 archetype keys
  const oldIds = ["movement", "meditation", "nutrition", "sleep", "resilience", "sound"];
  for (const id of oldIds) {
    delete d.home[`${id}Category`];
    delete d.home[`${id}Title`];
    delete d.home[`${id}Desc`];
  }
  // Add new 3 archetype keys
  const newA = NEW_ARCHETYPES[lang];
  Object.assign(d.home, newA);

  // ── FIX 7: Brand name — "AlphaGlow AI" first mention ────────────────────
  // For EN: check and ensure correct first mention in affected keys
  // home.heroBody — just ensure first "AlphaGlow" is "AlphaGlow AI"
  // We apply a targeted replacement for the specific strings we know
  // pressPage.boilerplateBody — must use "AlphaGlow AI" throughout (already correct in EN)
  // For non-EN, the translations already use full "AlphaGlow AI" or "AlphaGlow" — we fix the first mention
  // We do a safe targeted fix: replace bare "AlphaGlow " at start of these fields with "AlphaGlow AI "
  // Only change the FIRST occurrence in each key
  function firstMentionFix(str) {
    if (!str) return str;
    // Replace first occurrence of "AlphaGlow " (not followed by "AI") with "AlphaGlow AI "
    return str.replace(/AlphaGlow(?!\s+AI)(\s+)/, "AlphaGlow AI$1");
  }
  // Apply to first-mention fields:
  d.investors.heroBody = firstMentionFix(d.investors.heroBody);
  d.forUsers.heroBody = firstMentionFix(d.forUsers.heroBody);
  d.home.heroBody = firstMentionFix(d.home.heroBody);
  // pressPage.boilerplateBody — must use "AlphaGlow AI" throughout
  if (d.pressPage && d.pressPage.boilerplateBody) {
    d.pressPage.boilerplateBody = d.pressPage.boilerplateBody
      .replace(/AlphaGlow(?!\s+AI)/g, "AlphaGlow AI");
  }
  // pressPage.heroBody — first mention
  if (d.pressPage && d.pressPage.heroBody) {
    d.pressPage.heroBody = firstMentionFix(d.pressPage.heroBody);
  }

  // ── FIX 8: Roadmap 2027 entry ─────────────────────────────────────────────
  d.investors.roadmap4Num = "2027+";
  d.investors.roadmap4Title = ROADMAP4_TITLE[lang];
  d.investors.roadmap4Body = ROADMAP4_BODY[lang];

  // ── FIX 9: NSVX Disclaimer corrections ───────────────────────────────────
  d.nsvxDisc.s1p = NSVXDISC_S1P[lang];
  d.nsvxDisc.s2i4 = NSVXDISC_S2I4[lang];
  d.nsvxDisc.s3p = NSVXDISC_S3P[lang];
  d.nsvxDisc.s4p = NSVXDISC_S4P[lang];
  // Remove stray s2i5 if present
  if (d.nsvxDisc.s2i5 !== undefined) {
    delete d.nsvxDisc.s2i5;
  }

  // ── FIX 10: Creator Agreement section 5 ──────────────────────────────────
  d.creatorAgreement.s5h = CA_S5H[lang];
  d.creatorAgreement.s5p = CA_S5P[lang];

  // ── LEGAL REVIEW fixes ───────────────────────────────────────────────────
  // terms.s6p — correct NSVX language
  d.terms.s6p = TERMS_S6P[lang];
  // privacy.s5i4 — remove Moonpay reference
  if (d.privacy.s5i4 !== undefined) {
    d.privacy.s5i4 = PRIVACY_S5I4[lang];
  }
  // aiDisc.s2p1 — remove "wellness companion" if present
  if (d.aiDisc && d.aiDisc.s2p1) {
    d.aiDisc.s2p1 = d.aiDisc.s2p1
      .replace(/wellness companion/gi, "AI guide")
      .replace(/AI companion/gi, "AI guide")
      .replace(/wellbeing companion/gi, "AI guide");
  }
  // Remove "wellness companion" from any aiDisc keys
  if (d.aiDisc) {
    for (const key of Object.keys(d.aiDisc)) {
      if (typeof d.aiDisc[key] === "string") {
        d.aiDisc[key] = d.aiDisc[key]
          .replace(/wellness companion/gi, "AI guide")
          .replace(/AI companion/gi, "AI guide")
          .replace(/wellbeing companion/gi, "AI guide");
      }
    }
  }
  // terms: remove "wellness companion" / "AI companion" language
  for (const key of Object.keys(d.terms)) {
    if (typeof d.terms[key] === "string") {
      d.terms[key] = d.terms[key]
        .replace(/wellness companion/gi, "AI guide")
        .replace(/AI companion/gi, "AI guide")
        .replace(/Nova, your AI companion/gi, "Nova, your AI guide")
        .replace(/AI wellness companion/gi, "AI guide")
        .replace(/AI wellness platform/gi, "creator economy platform");
    }
  }
  // Also fix terms.s2p which says "wellbeing cesty" / "wellness cesty" (CS/SK have "wellbeing cesty" in s2p)
  // In EN terms.s2p has "guided meditation sessions" which is fine; check and fix wellness language
  if (d.terms.s2p) {
    d.terms.s2p = d.terms.s2p
      .replace(/AI wellness companion/gi, "Nova AI")
      .replace(/AI companion Nova/gi, "Nova AI");
  }

  write(lang, d);
  console.log(`✓ ${lang}.json updated`);
}

console.log("\nAll locales updated.");
