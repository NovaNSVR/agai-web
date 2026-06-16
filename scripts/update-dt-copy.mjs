/**
 * update-dt-copy.mjs
 * Updates the Digital Twin section copy in all 10 locale files to accurately
 * describe the LiveAvatar integration flow.
 */
import fs from "fs";
import path from "path";

const LOCALES_DIR = path.resolve("locales");

const UPDATES = {
  en: {
    "forCreators.dtCreatorHeading": "Your Digital Twin, live in your studio",
    "forCreators.dtCreatorBody": "Create your Digital Twin on LiveAvatar (liveavatar.com), then connect it to your AlphaGlow AI studio by pasting your Avatar ID and Access Token into your Studio settings. From that moment, your Digital Twin streams live to every visitor in your studio, powers AI-narrated sessions, and runs fully autonomous sessions in your likeness and cloned voice — available to your audience around the clock.",
    "forCreators.step2Title": "Connect your Digital Twin",
    "forCreators.step2Body": "Create your avatar on LiveAvatar (liveavatar.com), then paste your Avatar ID and Access Token into your AlphaGlow AI Studio settings. Your Digital Twin goes live instantly.",
  },
  cs: {
    "forCreators.dtCreatorHeading": "Váš Digital Twin živě ve vašem studiu",
    "forCreators.dtCreatorBody": "Vytvořte svůj Digital Twin na LiveAvatar (liveavatar.com), poté ho propojte se svým AlphaGlow AI studiem vložením Avatar ID a Access Token do nastavení studia. Od toho okamžiku váš Digital Twin streamuje živě každému návštěvníkovi vašeho studia, pohání relace s AI narací a spouští plně autonomní relace ve vaší podobě a klonovaném hlase — dostupné vašemu publiku nepřetržitě.",
    "forCreators.step2Title": "Připojte svůj Digital Twin",
    "forCreators.step2Body": "Vytvořte svůj avatar na LiveAvatar (liveavatar.com), poté vložte Avatar ID a Access Token do nastavení AlphaGlow AI Studia. Váš Digital Twin okamžitě začne fungovat.",
  },
  sk: {
    "forCreators.dtCreatorHeading": "Váš Digital Twin živý vo vašom štúdiu",
    "forCreators.dtCreatorBody": "Vytvorte si Digital Twin na LiveAvatar (liveavatar.com), potom ho prepojte so svojím AlphaGlow AI štúdiom vložením Avatar ID a Access Token do nastavení štúdia. Od tohto momentu váš Digital Twin streamuje naživo každému návštevníkovi vášho štúdia, poháňa relácie s AI naráciou a spúšťa plne autonómne relácie vo vašej podobe a klonovanom hlase — dostupné vášmu publiku nepretržite.",
    "forCreators.step2Title": "Prepojte svoj Digital Twin",
    "forCreators.step2Body": "Vytvorte si avatar na LiveAvatar (liveavatar.com), potom vložte Avatar ID a Access Token do nastavení AlphaGlow AI Štúdia. Váš Digital Twin sa okamžite spustí.",
  },
  de: {
    "forCreators.dtCreatorHeading": "Dein Digital Twin, live in deinem Studio",
    "forCreators.dtCreatorBody": "Erstelle deinen Digital Twin auf LiveAvatar (liveavatar.com) und verbinde ihn dann mit deinem AlphaGlow AI Studio, indem du deine Avatar-ID und dein Access Token in die Studio-Einstellungen eingibst. Ab diesem Moment streamt dein Digital Twin live zu jedem Besucher deines Studios, unterstützt KI-kommentierte Sessions und führt vollständig autonome Sessions in deiner Gestalt und mit deiner geklonten Stimme durch — rund um die Uhr für dein Publikum verfügbar.",
    "forCreators.step2Title": "Digital Twin verbinden",
    "forCreators.step2Body": "Erstelle deinen Avatar auf LiveAvatar (liveavatar.com) und füge dann deine Avatar-ID und dein Access Token in die Einstellungen deines AlphaGlow AI Studios ein. Dein Digital Twin ist sofort einsatzbereit.",
  },
  es: {
    "forCreators.dtCreatorHeading": "Tu Digital Twin, en vivo en tu estudio",
    "forCreators.dtCreatorBody": "Crea tu Digital Twin en LiveAvatar (liveavatar.com), luego conéctalo a tu estudio de AlphaGlow AI pegando tu Avatar ID y Access Token en la configuración del estudio. Desde ese momento, tu Digital Twin hace streaming en vivo a cada visitante de tu estudio, potencia sesiones narradas por IA y ejecuta sesiones completamente autónomas con tu imagen y voz clonada — disponible para tu audiencia las 24 horas del día.",
    "forCreators.step2Title": "Conecta tu Digital Twin",
    "forCreators.step2Body": "Crea tu avatar en LiveAvatar (liveavatar.com), luego pega tu Avatar ID y Access Token en la configuración de tu AlphaGlow AI Studio. Tu Digital Twin se activa al instante.",
  },
  fr: {
    "forCreators.dtCreatorHeading": "Votre Digital Twin, en direct dans votre studio",
    "forCreators.dtCreatorBody": "Créez votre Digital Twin sur LiveAvatar (liveavatar.com), puis connectez-le à votre studio AlphaGlow AI en collant votre Avatar ID et votre Access Token dans les paramètres du studio. À partir de ce moment, votre Digital Twin diffuse en direct à chaque visiteur de votre studio, alimente des sessions narrées par IA et exécute des sessions entièrement autonomes à votre image et avec votre voix clonée — disponible pour votre audience en permanence.",
    "forCreators.step2Title": "Connectez votre Digital Twin",
    "forCreators.step2Body": "Créez votre avatar sur LiveAvatar (liveavatar.com), puis collez votre Avatar ID et votre Access Token dans les paramètres de votre AlphaGlow AI Studio. Votre Digital Twin est opérationnel instantanément.",
  },
  pt: {
    "forCreators.dtCreatorHeading": "Seu Digital Twin, ao vivo no seu estúdio",
    "forCreators.dtCreatorBody": "Crie seu Digital Twin no LiveAvatar (liveavatar.com), depois conecte-o ao seu estúdio AlphaGlow AI colando seu Avatar ID e Access Token nas configurações do estúdio. A partir desse momento, seu Digital Twin transmite ao vivo para cada visitante do seu estúdio, alimenta sessões narradas por IA e executa sessões totalmente autônomas à sua imagem e com sua voz clonada — disponível para seu público o tempo todo.",
    "forCreators.step2Title": "Conecte seu Digital Twin",
    "forCreators.step2Body": "Crie seu avatar no LiveAvatar (liveavatar.com), depois cole seu Avatar ID e Access Token nas configurações do seu AlphaGlow AI Studio. Seu Digital Twin entra em funcionamento instantaneamente.",
  },
  nl: {
    "forCreators.dtCreatorHeading": "Jouw Digital Twin, live in jouw studio",
    "forCreators.dtCreatorBody": "Maak je Digital Twin op LiveAvatar (liveavatar.com) en verbind hem vervolgens met je AlphaGlow AI studio door je Avatar ID en Access Token in de studio-instellingen te plakken. Vanaf dat moment streamt je Digital Twin live naar elke bezoeker van je studio, verzorgt hij AI-vertelde sessies en voert hij volledig autonome sessies uit in jouw gelijkenis en met jouw gekloonde stem — 24 uur per dag beschikbaar voor je publiek.",
    "forCreators.step2Title": "Verbind je Digital Twin",
    "forCreators.step2Body": "Maak je avatar op LiveAvatar (liveavatar.com) en plak dan je Avatar ID en Access Token in de instellingen van je AlphaGlow AI Studio. Je Digital Twin is direct actief.",
  },
  pl: {
    "forCreators.dtCreatorHeading": "Twój Digital Twin na żywo w Twoim studio",
    "forCreators.dtCreatorBody": "Stwórz swojego Digital Twina na LiveAvatar (liveavatar.com), a następnie połącz go ze swoim studiem AlphaGlow AI, wklejając swój Avatar ID i Access Token w ustawieniach studia. Od tej chwili Twój Digital Twin streamuje na żywo do każdego odwiedzającego Twoje studio, zasila sesje z narracją AI i prowadzi w pełni autonomiczne sesje w Twoim wizerunku i sklonowanym głosie — dostępny dla Twojej publiczności przez całą dobę.",
    "forCreators.step2Title": "Połącz swojego Digital Twina",
    "forCreators.step2Body": "Stwórz swój awatar na LiveAvatar (liveavatar.com), a następnie wklej swój Avatar ID i Access Token w ustawieniach AlphaGlow AI Studio. Twój Digital Twin jest gotowy do działania natychmiast.",
  },
  it: {
    "forCreators.dtCreatorHeading": "Il tuo Digital Twin, live nel tuo studio",
    "forCreators.dtCreatorBody": "Crea il tuo Digital Twin su LiveAvatar (liveavatar.com), poi collegalo al tuo studio AlphaGlow AI incollando il tuo Avatar ID e Access Token nelle impostazioni dello studio. Da quel momento, il tuo Digital Twin va in streaming live per ogni visitatore del tuo studio, alimenta sessioni con narrazione AI ed esegue sessioni completamente autonome con la tua immagine e la tua voce clonata — disponibile per il tuo pubblico 24 ore su 24.",
    "forCreators.step2Title": "Collega il tuo Digital Twin",
    "forCreators.step2Body": "Crea il tuo avatar su LiveAvatar (liveavatar.com), poi incolla il tuo Avatar ID e Access Token nelle impostazioni del tuo AlphaGlow AI Studio. Il tuo Digital Twin è subito operativo.",
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
