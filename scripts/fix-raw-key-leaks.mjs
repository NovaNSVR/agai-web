import fs from "fs";

// advertisers.statsDisclaimer -- missing in ALL 10 locales including English.
// Content recovered from the old (never-applied) scripts/june16-content-fixes.mjs.
const STATS_DISCLAIMER = {
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

// privacy.s5i1-s5i6 -- English has 6 items (Supabase, Crossmint, ElevenLabs, Moonpay,
// Solana Blockchain, Anthropic). All 9 non-English locales still had the OLD 4-item
// structure (Supabase, Anthropic, ElevenLabs, generic payment processors) predating
// this restructure, which is why s5i5/s5i6 were missing. Retranslating all 6 to match
// current English content/order so the section reads consistently (no duplicate
// Anthropic entry, no missing Crossmint/Moonpay items).
const S5_ITEMS = {
  en: {
    s5i1: "Supabase — provides our authentication system and primary database infrastructure. Data is stored under Standard Contractual Clauses.",
    s5i2: "Crossmint — provisions and manages your Solana smart wallet for NSVX token storage. Crossmint processes your email and wallet address.",
    s5i3: "ElevenLabs — provides AI voice synthesis for Creator Digital Twin sessions. Audio generation requests are processed per ElevenLabs privacy terms.",
    s5i4: "Moonpay — enables fiat-to-NSVX token purchases. Moonpay is an independent regulated payment processor subject to its own KYC/AML obligations.",
    s5i5: "Solana Blockchain — NSVX token transactions are recorded on the Solana public blockchain. Blockchain data is publicly visible and cannot be deleted.",
    s5i6: "Anthropic — processes Nova AI conversation data to generate responses, per Anthropic API terms.",
  },
  cs: {
    s5i1: "Supabase — náš poskytovatel databáze a ověřování totožnosti. Data jsou uchovávána v souladu se standardními smluvními doložkami.",
    s5i2: "Crossmint — zajišťuje a spravuje vaši Solana peněženku pro uchování tokenů NSVX. Crossmint zpracovává váš e-mail a adresu peněženky.",
    s5i3: "ElevenLabs — poskytuje syntézu hlasu AI pro lekce Digital Twin tvůrců. Požadavky na generování zvuku jsou zpracovávány podle zásad ochrany soukromí ElevenLabs.",
    s5i4: "Moonpay — umožňuje nákup tokenů NSVX za fiat měnu. Moonpay je nezávislý regulovaný zpracovatel plateb podléhající vlastním povinnostem KYC/AML.",
    s5i5: "Solana Blockchain — transakce s tokeny NSVX jsou zaznamenávány na veřejném blockchainu Solana. Data na blockchainu jsou veřejně viditelná a nelze je smazat.",
    s5i6: "Anthropic — zpracovává data konverzací Nova AI za účelem generování odpovědí, v souladu s podmínkami API Anthropic.",
  },
  sk: {
    s5i1: "Supabase — náš poskytovateľ databázy a overovania totožnosti. Údaje sú uchovávané v súlade so štandardnými zmluvnými doložkami.",
    s5i2: "Crossmint — zabezpečuje a spravuje vašu Solana peňaženku na uchovávanie tokenov NSVX. Crossmint spracúva váš e-mail a adresu peňaženky.",
    s5i3: "ElevenLabs — poskytuje syntézu hlasu AI pre sedenia Digital Twin tvorcov. Požiadavky na generovanie zvuku sú spracúvané podľa zásad ochrany súkromia ElevenLabs.",
    s5i4: "Moonpay — umožňuje nákup tokenov NSVX za fiat menu. Moonpay je nezávislý regulovaný poskytovateľ platobných služieb podliehajúci vlastným povinnostiam KYC/AML.",
    s5i5: "Solana Blockchain — transakcie s tokenmi NSVX sú zaznamenávané na verejnom blockchaine Solana. Údaje na blockchaine sú verejne viditeľné a nemožno ich vymazať.",
    s5i6: "Anthropic — spracúva konverzačné údaje Nova AI na generovanie odpovedí, v súlade s podmienkami API Anthropic.",
  },
  es: {
    s5i1: "Supabase — nuestro proveedor de base de datos y autenticación. Los datos se almacenan conforme a las Cláusulas Contractuales Tipo.",
    s5i2: "Crossmint — aprovisiona y gestiona tu monedero inteligente de Solana para el almacenamiento de tokens NSVX. Crossmint procesa tu correo electrónico y la dirección del monedero.",
    s5i3: "ElevenLabs — proporciona síntesis de voz por IA para las sesiones de Digital Twin de los creadores. Las solicitudes de generación de audio se procesan conforme a los términos de privacidad de ElevenLabs.",
    s5i4: "Moonpay — permite comprar tokens NSVX con moneda fiduciaria. Moonpay es un procesador de pagos regulado e independiente sujeto a sus propias obligaciones KYC/AML.",
    s5i5: "Solana Blockchain — las transacciones de tokens NSVX se registran en la blockchain pública de Solana. Los datos de la blockchain son visibles públicamente y no se pueden eliminar.",
    s5i6: "Anthropic — procesa los datos de conversación de Nova IA para generar respuestas, conforme a los términos de la API de Anthropic.",
  },
  de: {
    s5i1: "Supabase — unser Datenbank- und Authentifizierungsanbieter. Daten werden gemäß den Standardvertragsklauseln gespeichert.",
    s5i2: "Crossmint — richtet deine Solana-Wallet zur Aufbewahrung von NSVX-Token ein und verwaltet sie. Crossmint verarbeitet deine E-Mail-Adresse und Wallet-Adresse.",
    s5i3: "ElevenLabs — bietet KI-Sprachsynthese für Creator-Digital-Twin-Sessions. Audioerzeugungsanfragen werden gemäß den Datenschutzbestimmungen von ElevenLabs verarbeitet.",
    s5i4: "Moonpay — ermöglicht den Kauf von NSVX-Token mit Fiat-Geld. Moonpay ist ein unabhängiger, regulierter Zahlungsdienstleister mit eigenen KYC/AML-Pflichten.",
    s5i5: "Solana Blockchain — NSVX-Token-Transaktionen werden auf der öffentlichen Solana-Blockchain erfasst. Blockchain-Daten sind öffentlich einsehbar und können nicht gelöscht werden.",
    s5i6: "Anthropic — verarbeitet Nova-KI-Gesprächsdaten zur Generierung von Antworten, gemäß den Anthropic-API-Bedingungen.",
  },
  fr: {
    s5i1: "Supabase — notre fournisseur de base de données et d'authentification. Les données sont conservées conformément aux clauses contractuelles types.",
    s5i2: "Crossmint — fournit et gère votre portefeuille Solana pour le stockage des tokens NSVX. Crossmint traite votre adresse e-mail et l'adresse de votre portefeuille.",
    s5i3: "ElevenLabs — fournit la synthèse vocale IA pour les séances Digital Twin des créateurs. Les demandes de génération audio sont traitées selon les conditions de confidentialité d'ElevenLabs.",
    s5i4: "Moonpay — permet l'achat de tokens NSVX en monnaie fiduciaire. Moonpay est un prestataire de paiement réglementé indépendant soumis à ses propres obligations KYC/AML.",
    s5i5: "Solana Blockchain — les transactions de tokens NSVX sont enregistrées sur la blockchain publique Solana. Les données de la blockchain sont visibles publiquement et ne peuvent pas être supprimées.",
    s5i6: "Anthropic — traite les données de conversation Nova IA pour générer des réponses, conformément aux conditions de l'API Anthropic.",
  },
  pt: {
    s5i1: "Supabase — o nosso fornecedor de base de dados e autenticação. Os dados são armazenados ao abrigo das Cláusulas Contratuais Padrão.",
    s5i2: "Crossmint — cria e gere a tua carteira Solana para armazenamento de tokens NSVX. A Crossmint processa o teu e-mail e endereço de carteira.",
    s5i3: "ElevenLabs — fornece síntese de voz por IA para as sessões de Digital Twin dos criadores. Os pedidos de geração de áudio são processados de acordo com os termos de privacidade da ElevenLabs.",
    s5i4: "Moonpay — permite a compra de tokens NSVX com moeda fiduciária. A Moonpay é um processador de pagamentos regulado e independente, sujeito às suas próprias obrigações de KYC/AML.",
    s5i5: "Solana Blockchain — as transações de tokens NSVX são registadas na blockchain pública Solana. Os dados da blockchain são publicamente visíveis e não podem ser eliminados.",
    s5i6: "Anthropic — processa os dados de conversa da Nova IA para gerar respostas, de acordo com os termos da API da Anthropic.",
  },
  it: {
    s5i1: "Supabase — il nostro fornitore di database e autenticazione. I dati sono conservati in conformità alle Clausole Contrattuali Standard.",
    s5i2: "Crossmint — predispone e gestisce il tuo wallet Solana per la conservazione dei token NSVX. Crossmint elabora la tua email e l'indirizzo del wallet.",
    s5i3: "ElevenLabs — fornisce la sintesi vocale AI per le sessioni Digital Twin dei creator. Le richieste di generazione audio vengono elaborate secondo i termini sulla privacy di ElevenLabs.",
    s5i4: "Moonpay — consente l'acquisto di token NSVX con valuta fiat. Moonpay è un fornitore di servizi di pagamento regolamentato e indipendente, soggetto ai propri obblighi KYC/AML.",
    s5i5: "Solana Blockchain — le transazioni di token NSVX sono registrate sulla blockchain pubblica di Solana. I dati della blockchain sono pubblicamente visibili e non possono essere eliminati.",
    s5i6: "Anthropic — elabora i dati delle conversazioni di Nova AI per generare risposte, in conformità con i termini API di Anthropic.",
  },
  pl: {
    s5i1: "Supabase — nasz dostawca bazy danych i uwierzytelniania. Dane są przechowywane zgodnie ze Standardowymi Klauzulami Umownymi.",
    s5i2: "Crossmint — zapewnia i zarządza Twoim portfelem Solana do przechowywania tokenów NSVX. Crossmint przetwarza Twój adres e-mail i adres portfela.",
    s5i3: "ElevenLabs — zapewnia syntezę mowy AI dla sesji Digital Twin twórców. Żądania generowania dźwięku są przetwarzane zgodnie z zasadami prywatności ElevenLabs.",
    s5i4: "Moonpay — umożliwia zakup tokenów NSVX za walutę fiducjarną. Moonpay to niezależny, regulowany dostawca usług płatniczych podlegający własnym obowiązkom KYC/AML.",
    s5i5: "Solana Blockchain — transakcje tokenów NSVX są rejestrowane w publicznym blockchainie Solana. Dane blockchain są publicznie widoczne i nie można ich usunąć.",
    s5i6: "Anthropic — przetwarza dane rozmów Nova AI w celu generowania odpowiedzi, zgodnie z warunkami API Anthropic.",
  },
  nl: {
    s5i1: "Supabase — onze database- en authenticatieprovider. Gegevens worden opgeslagen conform de Standaardcontractbepalingen.",
    s5i2: "Crossmint — voorziet en beheert jouw Solana-wallet voor de opslag van NSVX-tokens. Crossmint verwerkt jouw e-mailadres en walletadres.",
    s5i3: "ElevenLabs — levert AI-spraaksynthese voor Digital Twin-sessies van creators. Verzoeken tot audiogeneratie worden verwerkt conform de privacyvoorwaarden van ElevenLabs.",
    s5i4: "Moonpay — maakt de aankoop van NSVX-tokens met fiatgeld mogelijk. Moonpay is een onafhankelijke, gereguleerde betalingsverwerker die onderworpen is aan zijn eigen KYC/AML-verplichtingen.",
    s5i5: "Solana Blockchain — NSVX-tokentransacties worden vastgelegd op de openbare Solana-blockchain. Blockchaingegevens zijn openbaar zichtbaar en kunnen niet worden verwijderd.",
    s5i6: "Anthropic — verwerkt Nova AI-gespreksgegevens om reacties te genereren, conform de API-voorwaarden van Anthropic.",
  },
};

// privacy.s3i7, s12h, s12p -- present in English, missing from all 9 other locales.
const OTHER_PRIVACY = {
  cs: { s3i7: "Za účelem dodržování platných právních povinností a vymáhání našich Podmínek služby", s12h: "12. Kontaktujte nás", s12p: "Dotazy ohledně ochrany soukromí: admin@alphaglowai.com. NeuroScope Technologies LLC, 4055 Westminster Dr, Sarasota, Florida 34241." },
  sk: { s3i7: "Na účely dodržiavania platných právnych povinností a presadzovania našich Podmienok služby", s12h: "12. Kontaktujte nás", s12p: "Otázky týkajúce sa ochrany súkromia: admin@alphaglowai.com. NeuroScope Technologies LLC, 4055 Westminster Dr, Sarasota, Florida 34241." },
  es: { s3i7: "Para cumplir con las obligaciones legales aplicables y hacer cumplir nuestros Términos de Servicio", s12h: "12. Contáctanos", s12p: "Consultas sobre privacidad: admin@alphaglowai.com. NeuroScope Technologies LLC, 4055 Westminster Dr, Sarasota, Florida 34241." },
  de: { s3i7: "Um geltenden rechtlichen Verpflichtungen nachzukommen und unsere Nutzungsbedingungen durchzusetzen", s12h: "12. Kontaktieren Sie uns", s12p: "Datenschutzanfragen: admin@alphaglowai.com. NeuroScope Technologies LLC, 4055 Westminster Dr, Sarasota, Florida 34241." },
  fr: { s3i7: "Pour respecter les obligations légales applicables et faire respecter nos Conditions d'utilisation", s12h: "12. Nous contacter", s12p: "Demandes relatives à la confidentialité : admin@alphaglowai.com. NeuroScope Technologies LLC, 4055 Westminster Dr, Sarasota, Florida 34241." },
  pt: { s3i7: "Para cumprir as obrigações legais aplicáveis e fazer cumprir os nossos Termos de Serviço", s12h: "12. Contacte-nos", s12p: "Questões de privacidade: admin@alphaglowai.com. NeuroScope Technologies LLC, 4055 Westminster Dr, Sarasota, Florida 34241." },
  it: { s3i7: "Per rispettare gli obblighi legali applicabili e far rispettare i nostri Termini di Servizio", s12h: "12. Contattaci", s12p: "Richieste sulla privacy: admin@alphaglowai.com. NeuroScope Technologies LLC, 4055 Westminster Dr, Sarasota, Florida 34241." },
  pl: { s3i7: "Aby przestrzegać obowiązujących zobowiązań prawnych i egzekwować nasze Warunki korzystania z usługi", s12h: "12. Skontaktuj się z nami", s12p: "Zapytania dotyczące prywatności: admin@alphaglowai.com. NeuroScope Technologies LLC, 4055 Westminster Dr, Sarasota, Florida 34241." },
  nl: { s3i7: "Om te voldoen aan toepasselijke wettelijke verplichtingen en onze Servicevoorwaarden te handhaven", s12h: "12. Neem contact met ons op", s12p: "Privacyvragen: admin@alphaglowai.com. NeuroScope Technologies LLC, 4055 Westminster Dr, Sarasota, Florida 34241." },
};

const locales = ["en", "cs", "sk", "es", "de", "fr", "pt", "it", "pl", "nl"];

for (const loc of locales) {
  const filePath = `locales/${loc}.json`;
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8").replace(/^﻿/, ""));

  if (!data.advertisers) data.advertisers = {};
  data.advertisers.statsDisclaimer = STATS_DISCLAIMER[loc];

  if (!data.privacy) data.privacy = {};
  for (const [k, v] of Object.entries(S5_ITEMS[loc])) {
    data.privacy[k] = v;
  }
  if (loc !== "en") {
    data.privacy.s3i7 = OTHER_PRIVACY[loc].s3i7;
    data.privacy.s12h = OTHER_PRIVACY[loc].s12h;
    data.privacy.s12p = OTHER_PRIVACY[loc].s12p;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
  console.log(`Updated ${loc}.json`);
}

console.log("Done.");
