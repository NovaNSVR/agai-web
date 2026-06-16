/**
 * update-for-creators-examples.mjs
 * Adds the examples + open invitation section (from preview-creators-c)
 * to the forCreators locale keys in all 10 locale files.
 */
import fs from "fs";
import path from "path";

const LOCALES_DIR = path.resolve("locales");

const UPDATES = {
  en: {
    "forCreators.examplesLabel": "A few examples",
    "forCreators.example1Label": "Musician",
    "forCreators.example1Headline": "A guitarist who teaches jazz theory",
    "forCreators.example1Body": "Publishes technique sessions and ear-training programmes. Fans unlock full courses with NSVX; his Digital Twin answers theory questions live.",
    "forCreators.example2Label": "Coach",
    "forCreators.example2Headline": "An executive coach with a proprietary framework",
    "forCreators.example2Body": "Packages her methodology into a 12-week journey. Clients work through modules at their own pace; her Digital Twin holds them accountable between live calls.",
    "forCreators.example3Label": "Podcaster",
    "forCreators.example3Headline": "A true-crime host building a paid archive",
    "forCreators.example3Body": "Unlockable episodes, bonus deep-dives, and a Digital Twin that discusses case evidence with superfans — available long after the episode drops.",
    "forCreators.openInviteHeading": "Any creator is welcome",
    "forCreators.openInviteBody": "Whatever your expertise, there is a category for it — and if one does not exist yet, the platform builds one around you — no follower minimum to qualify, and no review process to pass. If you have something worth teaching, performing, or discussing — you can publish it here, set your price, and let your Digital Twin work on your behalf while you sleep.",
  },
  cs: {
    "forCreators.examplesLabel": "Pár příkladů",
    "forCreators.example1Label": "Hudebník",
    "forCreators.example1Headline": "Kytarista, který učí jazzovou teorii",
    "forCreators.example1Body": "Zveřejňuje technické lekce a programy pro trénink sluchu. Fanoušci odemykají celé kurzy pomocí NSVX; jeho Digital Twin odpovídá na otázky z teorie živě.",
    "forCreators.example2Label": "Kouč",
    "forCreators.example2Headline": "Výkonný kouč s vlastní metodikou",
    "forCreators.example2Body": "Svou metodiku zabalila do 12týdenní cesty. Klienti procházejí moduly vlastním tempem; její Digital Twin je drží zodpovědné mezi živými hovory.",
    "forCreators.example3Label": "Podcastér",
    "forCreators.example3Headline": "Moderátor true crime podcastu budující placený archiv",
    "forCreators.example3Body": "Odemykatelné epizody, bonusové hloubkové rozbory a Digital Twin, který diskutuje o důkazech případů se superfanoušky — k dispozici dlouho po vydání epizody.",
    "forCreators.openInviteHeading": "Každý tvůrce je vítán",
    "forCreators.openInviteBody": "Ať je vaše odbornost jakákoli, existuje pro ni kategorie — a pokud ještě neexistuje, platforma ji vytvoří kolem vás — žádné minimální počty sledujících pro kvalifikaci, žádný schvalovací proces. Máte-li co učit, předvádět nebo o čem diskutovat — zveřejněte to zde, nastavte svou cenu a nechte svého Digital Twin pracovat za vás, i když spíte.",
  },
  sk: {
    "forCreators.examplesLabel": "Niekoľko príkladov",
    "forCreators.example1Label": "Hudobník",
    "forCreators.example1Headline": "Gitarista, ktorý učí jazzovú teóriu",
    "forCreators.example1Body": "Zverejňuje technické lekcie a programy na tréning sluchu. Fanúšikovia odomykajú celé kurzy pomocou NSVX; jeho Digital Twin odpovedá na otázky z teórie naživo.",
    "forCreators.example2Label": "Kouč",
    "forCreators.example2Headline": "Manažérsky kouč s vlastnou metodikou",
    "forCreators.example2Body": "Svoju metodiku zabalila do 12-týždňovej cesty. Klienti prechádzajú modulmi vlastným tempom; jej Digital Twin ich drží zodpovednými medzi živými hovormi.",
    "forCreators.example3Label": "Podcastér",
    "forCreators.example3Headline": "Moderátor true crime podcastu budujúci platený archív",
    "forCreators.example3Body": "Odomykateľné epizódy, bonusové hĺbkové rozbory a Digital Twin, ktorý diskutuje o dôkazoch prípadov so superfanúšikmi — k dispozícii dlho po vydaní epizódy.",
    "forCreators.openInviteHeading": "Každý tvorca je vítaný",
    "forCreators.openInviteBody": "Nech je vaša odbornosť akákoľvek, existuje pre ňu kategória — a ak ešte neexistuje, platforma ju vytvorí okolo vás — žiadne minimálne počty sledovateľov na kvalifikáciu, žiadny schvaľovací proces. Ak máte čo učiť, predvádzať alebo o čom diskutovať — zverejnite to tu, nastavte svoju cenu a nechajte svojho Digital Twina pracovať za vás, aj keď spíte.",
  },
  de: {
    "forCreators.examplesLabel": "Ein paar Beispiele",
    "forCreators.example1Label": "Musiker",
    "forCreators.example1Headline": "Ein Gitarrist, der Jazztheorie unterrichtet",
    "forCreators.example1Body": "Veröffentlicht Technik-Sessions und Gehörtrainingsprogramme. Fans schalten ganze Kurse mit NSVX frei; sein Digital Twin beantwortet Theoriefragen live.",
    "forCreators.example2Label": "Coach",
    "forCreators.example2Headline": "Ein Executive Coach mit einer eigenen Methodik",
    "forCreators.example2Body": "Sie hat ihre Methodik in eine 12-wöchige Journey verpackt. Kunden arbeiten die Module in ihrem eigenen Tempo durch; ihr Digital Twin hält sie zwischen Live-Calls accountable.",
    "forCreators.example3Label": "Podcaster",
    "forCreators.example3Headline": "Ein True-Crime-Moderator, der ein kostenpflichtiges Archiv aufbaut",
    "forCreators.example3Body": "Freischaltbare Episoden, Bonus-Tiefenanalysen und ein Digital Twin, der mit Superfans über Fallbeweise diskutiert — noch lange nach dem Erscheinen der Episode verfügbar.",
    "forCreators.openInviteHeading": "Jeder Creator ist willkommen",
    "forCreators.openInviteBody": "Was auch immer deine Expertise ist, es gibt eine Kategorie dafür — und wenn es noch keine gibt, baut die Plattform eine um dich herum — keine Mindestanzahl an Followern zur Qualifizierung, kein Genehmigungsverfahren. Wenn du etwas zu lehren, vorzuführen oder zu besprechen hast — veröffentliche es hier, lege deinen Preis fest und lass deinen Digital Twin für dich arbeiten, während du schläfst.",
  },
  es: {
    "forCreators.examplesLabel": "Algunos ejemplos",
    "forCreators.example1Label": "Músico",
    "forCreators.example1Headline": "Un guitarrista que enseña teoría del jazz",
    "forCreators.example1Body": "Publica sesiones de técnica y programas de entrenamiento auditivo. Los fans desbloquean cursos completos con NSVX; su Digital Twin responde preguntas de teoría en directo.",
    "forCreators.example2Label": "Coach",
    "forCreators.example2Headline": "Una coach ejecutiva con una metodología propia",
    "forCreators.example2Body": "Ha empaquetado su metodología en un viaje de 12 semanas. Los clientes avanzan por los módulos a su propio ritmo; su Digital Twin los mantiene responsables entre las llamadas en vivo.",
    "forCreators.example3Label": "Podcaster",
    "forCreators.example3Headline": "Un presentador de true crime construyendo un archivo de pago",
    "forCreators.example3Body": "Episodios desbloqueables, análisis profundos de bonificación y un Digital Twin que debate las pruebas de los casos con los superfans — disponible mucho después de que salga el episodio.",
    "forCreators.openInviteHeading": "Todo creador es bienvenido",
    "forCreators.openInviteBody": "Sea cual sea tu área de especialización, existe una categoría para ella — y si aún no existe, la plataforma crea una a tu alrededor — sin mínimo de seguidores para calificar, sin proceso de revisión. Si tienes algo que enseñar, mostrar o de lo que hablar — publícalo aquí, pon tu precio y deja que tu Digital Twin trabaje en tu nombre mientras duermes.",
  },
  fr: {
    "forCreators.examplesLabel": "Quelques exemples",
    "forCreators.example1Label": "Musicien",
    "forCreators.example1Headline": "Un guitariste qui enseigne la théorie du jazz",
    "forCreators.example1Body": "Publie des sessions de technique et des programmes d'entraînement de l'oreille. Les fans débloquent des cours complets avec des NSVX ; son Digital Twin répond aux questions de théorie en direct.",
    "forCreators.example2Label": "Coach",
    "forCreators.example2Headline": "Une coach exécutive avec une méthodologie propriétaire",
    "forCreators.example2Body": "Elle a packagé sa méthodologie en un parcours de 12 semaines. Les clients avancent dans les modules à leur propre rythme ; son Digital Twin les tient responsables entre les appels en direct.",
    "forCreators.example3Label": "Podcasteur",
    "forCreators.example3Headline": "Un animateur de true crime qui construit une archive payante",
    "forCreators.example3Body": "Des épisodes déverrouillables, des analyses approfondies en bonus et un Digital Twin qui discute des preuves des affaires avec les superfans — disponible bien après la sortie de l'épisode.",
    "forCreators.openInviteHeading": "Tout créateur est le bienvenu",
    "forCreators.openInviteBody": "Quelle que soit votre expertise, il existe une catégorie pour elle — et si elle n'existe pas encore, la plateforme en crée une autour de vous — aucun minimum d'abonnés pour se qualifier, aucun processus d'approbation. Si vous avez quelque chose à enseigner, à montrer ou à discuter — publiez-le ici, fixez votre prix et laissez votre Digital Twin travailler pour vous pendant que vous dormez.",
  },
  pt: {
    "forCreators.examplesLabel": "Alguns exemplos",
    "forCreators.example1Label": "Músico",
    "forCreators.example1Headline": "Um guitarrista que ensina teoria do jazz",
    "forCreators.example1Body": "Publica sessões de técnica e programas de treino auditivo. Os fãs desbloqueiam cursos completos com NSVX; o seu Digital Twin responde a questões de teoria ao vivo.",
    "forCreators.example2Label": "Coach",
    "forCreators.example2Headline": "Uma coach executiva com uma metodologia própria",
    "forCreators.example2Body": "Embalou a sua metodologia numa jornada de 12 semanas. Os clientes percorrem os módulos ao seu próprio ritmo; o seu Digital Twin mantém-nos responsáveis entre as chamadas ao vivo.",
    "forCreators.example3Label": "Podcaster",
    "forCreators.example3Headline": "Um apresentador de true crime a construir um arquivo pago",
    "forCreators.example3Body": "Episódios desbloqueáveis, análises aprofundadas de bónus e um Digital Twin que discute evidências de casos com superfãs — disponível muito depois de o episódio ser lançado.",
    "forCreators.openInviteHeading": "Todo criador é bem-vindo",
    "forCreators.openInviteBody": "Seja qual for a sua área de especialização, existe uma categoria para ela — e se ainda não existir, a plataforma cria uma à sua volta — sem mínimo de seguidores para qualificar, sem processo de revisão. Se tiver algo para ensinar, mostrar ou discutir — publique aqui, defina o seu preço e deixe o seu Digital Twin trabalhar em seu nome enquanto dorme.",
  },
  nl: {
    "forCreators.examplesLabel": "Een paar voorbeelden",
    "forCreators.example1Label": "Muzikant",
    "forCreators.example1Headline": "Een gitarist die jazztheorie doceert",
    "forCreators.example1Body": "Publiceert techniekessies en gehoortreiningsprogramma's. Fans ontgrendelen volledige cursussen met NSVX; zijn Digital Twin beantwoordt theorievragen live.",
    "forCreators.example2Label": "Coach",
    "forCreators.example2Headline": "Een executive coach met een eigen methodologie",
    "forCreators.example2Body": "Ze heeft haar methodologie verpakt in een 12-weekse journey. Klanten werken de modules in hun eigen tempo door; haar Digital Twin houdt ze verantwoordelijk tussen live-sessies.",
    "forCreators.example3Label": "Podcaster",
    "forCreators.example3Headline": "Een true crime-host die een betaald archief opbouwt",
    "forCreators.example3Body": "Ontgrendelbare afleveringen, diepgaande bonusanalyses en een Digital Twin die met superfans de bewijzen van zaken bespreekt — beschikbaar lang nadat de aflevering is uitgebracht.",
    "forCreators.openInviteHeading": "Elke creator is welkom",
    "forCreators.openInviteBody": "Wat je expertise ook is, er is een categorie voor — en als die er nog niet is, bouwt het platform er een rondom jou — geen minimaal aantal volgers om te kwalificeren, geen goedkeuringsproces. Als je iets te leren, te laten zien of te bespreken hebt — publiceer het hier, stel je prijs in en laat je Digital Twin voor je werken terwijl jij slaapt.",
  },
  pl: {
    "forCreators.examplesLabel": "Kilka przykładów",
    "forCreators.example1Label": "Muzyk",
    "forCreators.example1Headline": "Gitarzysta uczący teorii jazzu",
    "forCreators.example1Body": "Publikuje sesje techniczne i programy treningu słuchu. Fani odblokowują pełne kursy za pomocą NSVX; jego Digital Twin odpowiada na pytania z teorii na żywo.",
    "forCreators.example2Label": "Coach",
    "forCreators.example2Headline": "Coach wykonawczy z własną metodologią",
    "forCreators.example2Body": "Zapakowała swoją metodologię w 12-tygodniową podróż. Klienci przechodzą przez moduły we własnym tempie; jej Digital Twin utrzymuje ich odpowiedzialnymi między sesjami na żywo.",
    "forCreators.example3Label": "Podcaster",
    "forCreators.example3Headline": "Prowadzący true crime budujący płatne archiwum",
    "forCreators.example3Body": "Odblokowane odcinki, dogłębne analizy bonusowe i Digital Twin omawiający dowody spraw z superfanami — dostępny długo po premierze odcinka.",
    "forCreators.openInviteHeading": "Każdy twórca jest mile widziany",
    "forCreators.openInviteBody": "Cokolwiek jest twoją specjalnością, istnieje dla niej kategoria — a jeśli jeszcze nie istnieje, platforma tworzy ją wokół ciebie — żadnego minimalnego progu obserwujących, żadnego procesu zatwierdzania. Jeśli masz coś do nauczania, pokazania lub omówienia — opublikuj to tutaj, ustal swoją cenę i pozwól swojemu Digital Twinowi pracować w twoim imieniu, gdy śpisz.",
  },
  it: {
    "forCreators.examplesLabel": "Alcuni esempi",
    "forCreators.example1Label": "Musicista",
    "forCreators.example1Headline": "Un chitarrista che insegna teoria del jazz",
    "forCreators.example1Body": "Pubblica sessioni di tecnica e programmi di ear training. I fan sbloccano corsi completi con NSVX; il suo Digital Twin risponde alle domande di teoria in diretta.",
    "forCreators.example2Label": "Coach",
    "forCreators.example2Headline": "Una coach esecutiva con una metodologia proprietaria",
    "forCreators.example2Body": "Ha racchiuso la sua metodologia in un percorso di 12 settimane. I clienti avanzano attraverso i moduli al proprio ritmo; il suo Digital Twin li mantiene responsabili tra le sessioni dal vivo.",
    "forCreators.example3Label": "Podcaster",
    "forCreators.example3Headline": "Un conduttore true crime che costruisce un archivio a pagamento",
    "forCreators.example3Body": "Episodi sbloccabili, approfondimenti bonus e un Digital Twin che discute le prove dei casi con i superfan — disponibile molto tempo dopo l'uscita dell'episodio.",
    "forCreators.openInviteHeading": "Ogni creator è il benvenuto",
    "forCreators.openInviteBody": "Qualunque sia la tua area di competenza, esiste una categoria per essa — e se non esiste ancora, la piattaforma ne crea una intorno a te — nessun minimo di follower per qualificarsi, nessun processo di approvazione. Se hai qualcosa da insegnare, mostrare o di cui discutere — pubblicalo qui, imposta il tuo prezzo e lascia che il tuo Digital Twin lavori per te mentre dormi.",
  },
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

for (const [locale, updates] of Object.entries(UPDATES)) {
  const filePath = path.join(LOCALES_DIR, `${locale}.json`);
  const raw = fs.readFileSync(filePath, "utf8").replace(/^﻿/, "");
  const data = JSON.parse(raw);
  for (const [dotKey, value] of Object.entries(updates)) {
    setNestedKey(data, dotKey, value);
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`Updated ${locale}.json`);
}
console.log("Done.");
