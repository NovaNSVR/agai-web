import { readFileSync, writeFileSync } from "fs";

const path = "C:/ai-tools/agai-web/locales/en.json";
const d = JSON.parse(readFileSync(path, "utf8"));

// ── Nav additions ──────────────────────────────────────────────────────────────
d.nav.forUsers = "For Users";
d.nav.advertisers = "Advertisers";
d.nav.nova = "Nova";
d.nav.nsvx = "NSVX";

// ── Footer additions ───────────────────────────────────────────────────────────
d.footer.company = "Company";
d.footer.investors = "Investors";
d.footer.press = "Press";
d.footer.blog = "Journal";

// ── For Creators additions ─────────────────────────────────────────────────────
d.forCreators.payoutHeading = "85% of NSVX flows back to you";
d.forCreators.payoutBody =
  "When a listener spends NSVX in your program — unlocking a session, accessing your Digital Twin, tipping after a journey — 85% of that value returns to you directly. AlphaGlow keeps 15% to fund the platform and the reward pool. No middlemen. No platform cuts on top of cuts.";
d.forCreators.payoutStat = "of all NSVX spent in your program returns directly to you";
d.forCreators.dtCreatorBadge = "Digital Twin";
d.forCreators.dtCreatorHeading = "Your Digital Twin";
d.forCreators.dtCreatorBody =
  "A Digital Twin is an AI-powered interactive version of you — trained on your content, delivered in your voice, available to your audience 24 hours a day. Listeners can ask it questions, work through challenges, and receive guidance that sounds and thinks like you. Your Digital Twin is built in Nova Studio. It earns NSVX while you sleep.";
d.forCreators.novaStudioBadge = "Nova Studio";
d.forCreators.novaStudioHeading = "Nova grows your studio";
d.forCreators.novaStudioBody =
  "Nova learns each listener's goals, patterns, and responses. She recommends your program to the listeners most likely to benefit — and schedules your sessions for the moments when they are most likely to engage. You build the program once. Nova does the delivery, the timing, and the matching.";

// ── For Users ──────────────────────────────────────────────────────────────────
d.forUsers = {
  badge: "For Users",
  heroHeading: "Wellness that grows with you.",
  heroBody:
    "AlphaGlow connects you with expert-designed sessions, AI-powered journeys, and a companion that learns what actually works for you.",
  heroCta: "Start for free",
  whatHeading: "What AlphaGlow is",
  sessionsTitle: "Sessions",
  sessionsBody:
    "Guided audio and video experiences from vetted wellness creators — breathwork, meditation, movement, nutrition, sleep, and more.",
  journeysTitle: "Journeys",
  journeysBody:
    "Multi-week programs that build on each other. Nova schedules them around your life and adapts based on how you are progressing.",
  dtTitle: "Digital Twin",
  dtBody:
    "Some creators have built an AI version of themselves. Chat with a creator's Digital Twin any time — ask questions, get guidance, work through challenges.",
  novaHeading: "Meet Nova — your AI companion",
  novaBody:
    "Nova is not a chatbot. She learns your goals, tracks your progress, notices your patterns, and connects you with the right creator programs at the right moment. The longer you use AlphaGlow, the better she gets at supporting you.",
  novaLearnMore: "Learn more about Nova",
  novaFeature1Title: "She remembers",
  novaFeature1Body:
    "Every check-in, every session, every signal you give her. Nova builds a picture of you over time.",
  novaFeature2Title: "She adapts",
  novaFeature2Body:
    "Programs change based on how you are doing — not a fixed schedule. Nova notices if you are off and adjusts.",
  novaFeature3Title: "She advocates for you",
  novaFeature3Body:
    "Nova recommends creators based on your profile, not on who paid for placement. Your growth is her goal.",
  earnHeading: "Progress that pays back",
  earnBody:
    "Every session you complete earns NSVX — AlphaGlow's utility token. Spend it on premium content, unlock creator Digital Twins, or hold it.",
  earn1Title: "Complete sessions",
  earn1Body: "Finish any guided session and earn NSVX automatically.",
  earn2Title: "Hit milestones",
  earn2Body: "Streaks, personal bests, and journey completions earn bonus NSVX.",
  earn3Title: "Engage with creators",
  earn3Body: "Deep engagement — rated sessions, completed journeys — earns more.",
  nsvxLearnMore: "How NSVX works",
  featuresHeading: "Everything you get",
  memoryTitle: "A companion who remembers",
  memoryBody:
    "Nova tracks your history, your mood, your milestones. Every conversation builds on the last.",
  programsTitle: "Programs from real experts",
  programsBody:
    "Every creator on AlphaGlow is vetted. You get specialist depth, not generalist platitudes.",
  nsvxFeatureTitle: "NSVX for real progress",
  nsvxFeatureBody:
    "Earn tokens for consistency and completion — then spend them on premium content, or hold them.",
  noNoiseTitle: "No algorithm noise",
  noNoiseBody: "No endless feed. Nova surfaces what you need when you need it.",
  modalitiesTitle: "Multiple modalities",
  modalitiesBody:
    "Meditation, breathwork, movement, nutrition, sleep, sound healing — all coordinated by Nova.",
  offlineTitle: "Offline-first",
  offlineBody:
    "Download sessions for use anywhere. Your wellness practice does not stop when the signal does.",
  pricingHeading: "Free to start. Depth when you are ready.",
  pricingBody:
    "The free tier gives you Nova, three creator programs, and daily NSVX earning. Upgrade to Core for unlimited access.",
  pricingLink: "See full pricing",
  faqHeading: "Common questions",
  faq1Q: "Is AlphaGlow really free to start?",
  faq1A:
    "Yes. The Starter tier is free forever. You get Nova AI (up to 20 messages per day), access to three creator programs, and NSVX earning from day one. No credit card required.",
  faq2Q: "What is NSVX and what can I do with it?",
  faq2A:
    "NSVX is AlphaGlow's utility token earned through consistent practice. You can spend it on premium creator content, unlock Digital Twin sessions, or hold it as the platform grows. It is not a financial instrument.",
  faq3Q: "How is this different from YouTube or Insight Timer?",
  faq3A:
    "AlphaGlow is not a content feed. Nova learns your patterns and delivers the right program at the right moment. Creators earn based on the depth of your engagement, not passive views.",
  faq4Q: "What is a Digital Twin?",
  faq4A:
    "Some creators have built an AI-powered interactive version of themselves. You can have a real conversation — ask questions, work through challenges — and receive responses in their voice and style.",
  faq5Q: "Is my data private?",
  faq5A:
    "Nova learns from what you share with her. Your data is never sold to advertisers. You can see everything Nova knows about you in your account dashboard, and delete it at any time.",
  ctaHeading: "Ready to begin?",
  ctaBody: "Join free. Meet Nova. Start earning NSVX for the work you are already doing.",
  ctaButton: "Open the app",
};

// ── Advertisers ────────────────────────────────────────────────────────────────
d.advertisers = {
  badge: "For Advertisers",
  heroHeading: "Reach the most focused audience on the internet.",
  heroBody:
    "AlphaGlow users are mid-session — breathing, moving, reflecting. Nova Whisper delivers your message in the moments that matter, with full user consent and verifiable attention.",
  heroCta: "Contact sales",
  whisperHeading: "What is Nova Whisper?",
  whisperBody:
    "Nova Whisper is AlphaGlow's privacy-first advertising layer. Instead of interrupting users with banner ads, Nova surfaces brand messages in contextually appropriate moments — when a user completes a session, opens the Pulse feed, or asks Nova for a recommendation. Every impression is user-consented and attention-verified.",
  whisperStat:
    "Average verified completion rate: 78%. Users choose to watch in exchange for NSVX — which means they are actually paying attention.",
  adClassesHeading: "Three ways to reach your audience",
  preSessName: "Pre-Session",
  preSessDesc:
    "A brief brand message shown before a session begins. Users opt in to ads in exchange for NSVX rewards. Completion is tracked and verified.",
  whisperName: "Nova Whisper",
  whisperDesc:
    "Nova delivers a short, voiced brand message to users who have opted in to notifications. Contextually timed — never during a session, never during distress moments.",
  pulseName: "Pulse Feed",
  pulseDesc:
    "Sponsored posts in the AlphaGlow Pulse social feed. Indistinguishable in format from creator content — clearly labelled as sponsored.",
  localBadge: "Nova Local",
  localHeading: "Geo-targeted delivery",
  localBody:
    "Target users within a radius of your location. A yoga studio in Berlin. A supplement brand at a conference. Nova Local matches your campaign to users within the distance you set — no third-party cookies, just GPS consent.",
  attentionBadge: "Proof of Attention",
  attentionHeading: "You pay for completions, not impressions",
  attentionBody:
    "AlphaGlow tracks verified completion — not impressions, not reach. You pay only when a user watches, listens, or engages with your message to the end. Completion rates average 78% because users choose to watch in exchange for NSVX.",
  pricingHeading: "Transparent pricing",
  pricingBody:
    "All campaigns are priced on a cost-per-completion basis. No minimum spend for self-serve. Enterprise campaigns include dedicated account management.",
  selfServeName: "Self-Serve",
  selfServeDesc:
    "Launch a campaign in minutes. Set your budget, target by category or location, and pay per completion. Minimum budget $100.",
  managedName: "Managed",
  managedDesc:
    "Dedicated account manager, creative review, and weekly reporting. Starting from $2,500 per month.",
  enterpriseName: "Enterprise",
  enterpriseDesc:
    "Custom creative, audience segments, multi-market deployment, and co-marketing options. Contact sales.",
  faqHeading: "Advertiser FAQ",
  faq1Q: "How does user consent work?",
  faq1A:
    "Users explicitly opt in to ads on each surface — sessions, notifications, and Pulse independently. They can withdraw consent at any time. AlphaGlow never shows ads to users who have not opted in.",
  faq2Q: "What is a completion and how is it verified?",
  faq2A:
    "A completion is a full watch-through of a pre-session ad, a full listen of a Nova Whisper notification, or a Pulse interaction of at least 5 seconds. Completions are tracked in real time and reported in your dashboard.",
  faq3Q: "Can I target by wellness category?",
  faq3A:
    "Yes. You can target by creator category and by location radius. Sensitive categories — mental health, grief, anxiety — are excluded from ad delivery by platform policy.",
  contactHeading: "Start a conversation",
  contactBody:
    "Tell us about your brand and campaign goals. Our team responds within one business day.",
  formName: "Your name",
  formEmail: "Email address",
  formCompany: "Company",
  formBudget: "Monthly budget",
  budgetOpt1: "Under $500",
  budgetOpt2: "$500 – $2,500",
  budgetOpt3: "$2,500 – $10,000",
  budgetOpt4: "$10,000+",
  formMessage: "Tell us about your campaign",
  formSubmit: "Send enquiry",
  formSuccess:
    "Thank you. We will be in touch within one business day.",
};

// ── Investors ──────────────────────────────────────────────────────────────────
d.investors = {
  badge: "For Investors",
  heroHeading: "Building the infrastructure for the AI creator economy.",
  heroBody:
    "AlphaGlow is where creators, AI, and token economics converge. We are building the first platform where digital wellness expertise compounds into lasting economic value — for creators and for users.",
  visionBadge: "Vision",
  visionHeading: "Personalised wellness at scale",
  visionBody:
    "A world where every person has access to personalised wellness expertise — not just those who can afford private coaching. AlphaGlow makes this possible at scale through AI, creator partnerships, and a token economy that aligns incentives across the platform.",
  missionBadge: "Mission",
  missionHeading: "Infrastructure for depth",
  missionBody:
    "To give wellness creators the infrastructure to build sustainable income from their expertise, and to give users an AI companion that genuinely knows them.",
  roadmapHeading: "Roadmap",
  roadmap1Num: "Q2 2026",
  roadmap1Title: "Platform launch",
  roadmap1Body:
    "Core platform live. Creator onboarding. Nova AI companion. NSVX token system active.",
  roadmap2Num: "Q3 2026",
  roadmap2Title: "Digital Twin rollout",
  roadmap2Body:
    "Creator Digital Twins in production. HeyGen video composition pipeline. Advertiser platform live.",
  roadmap3Num: "Q4 2026",
  roadmap3Title: "NSVX liquidity",
  roadmap3Body:
    "Moonpay integration for NSVX purchase. Withdrawal to Solana wallet. Cross-platform NSVX spend.",
  roadmap4Num: "2027",
  roadmap4Title: "NSVR — the next layer",
  roadmap4Body:
    "NeuroScope VR: immersive wellness experiences. Full spatial computing integration. AlphaGlow becomes the identity layer for the wellness metaverse.",
  tokenomicsHeading: "NSVX tokenomics",
  tokenomicsBody:
    "NSVX is a Solana-based utility token that powers the AlphaGlow economy. Earned through engagement, spent on content and creator access, flowing back to creators through the platform's revenue share. Not a security. Not speculative. Built for utility.",
  allocPct1: "40%",
  allocLabel1: "Platform rewards pool",
  allocPct2: "25%",
  allocLabel2: "Creator incentives",
  allocPct3: "20%",
  allocLabel3: "Team and advisors (4yr vest)",
  allocPct4: "15%",
  allocLabel4: "Reserve",
  teamHeading: "Team",
  team1Name: "Petr Bam",
  team1Role: "Founder & CEO",
  team1Bio:
    "Creator economy architect. Wellness technology pioneer. Building AlphaGlow from deep conviction that AI can make expert wellness accessible to everyone.",
  whitepaperHeading: "Whitepaper",
  whitepaperBody:
    "Our full technical and economic whitepaper is in preparation. Register below to receive it when published.",
  whitepaperCta: "Coming soon",
  pressKitHeading: "Press kit",
  pressKitBody: "Brand assets, founder bio, and company boilerplate.",
  pressKitCta: "Coming soon",
  contactHeading: "Investor enquiries",
  contactBody:
    "We are in active conversations with strategic investors. If you are building in the wellness, AI, or creator economy space and see what we are building — reach out.",
  formName: "Your name",
  formEmail: "Email",
  formFund: "Fund or firm",
  formMessage: "Message",
  formSubmit: "Send",
  formSuccess:
    "Thank you. We will respond to serious enquiries within 48 hours.",
};

// ── Nova page ──────────────────────────────────────────────────────────────────
d.novaPage = {
  badge: "Nova",
  heroHeading: "Your AI companion for the long game.",
  heroBody:
    "Nova is not a chatbot. She is the intelligence layer of AlphaGlow — learning your patterns, connecting you with the right creators, and growing with you over time.",
  whatHeading: "What Nova is",
  whatBody:
    "Nova is an AI companion built specifically for wellness growth. She is powered by Claude, trained on behavioural science, and shaped by the creators on AlphaGlow. She exists to serve your growth — not to keep you on the platform longer.",
  whatCallout:
    "Nova is built on Anthropic's Claude — the same model trusted by enterprises for safe, honest AI. Her goal is your growth, not your engagement.",
  howHeading: "How she works",
  how1Title: "She listens",
  how1Body:
    "Every conversation, check-in, and session outcome is context for Nova. She builds a living model of where you are, what you need, and how you respond.",
  how2Title: "She recommends",
  how2Body:
    "Based on your profile, Nova surfaces creator programs that match your goals — not based on popularity or payment. The match is made on compatibility, not commerce.",
  how3Title: "She adapts",
  how3Body:
    "If you are struggling, she notices. If you are ready for more, she will challenge you. Nova's job is to keep you moving — not to repeat the same session indefinitely.",
  learnsHeading: "What Nova learns about you",
  learnsBody:
    "Nova builds her understanding from what you share with her, session data, and the patterns she observes. Here is what she tracks, and why.",
  learns1Title: "Your goals",
  learns1Body:
    "So she can match you with programs that are actually relevant, not just popular.",
  learns2Title: "Your mood and energy signals",
  learns2Body:
    "So she can adapt her recommendations to how you are doing right now.",
  learns3Title: "Your session history",
  learns3Body: "So she knows what works for you and what does not.",
  learns4Title: "Your engagement patterns",
  learns4Body:
    "So she knows when to push, when to back off, and when to check in.",
  learns5Title: "Your feedback",
  learns5Body: "Every rating and comment teaches her to serve you better.",
  privacyHeading: "Your data, explained plainly",
  privacy1Title: "Your data is never sold",
  privacy1Body:
    "Nova's knowledge of you is used only to serve you. We do not sell, share, or license your personal data to advertisers or third parties.",
  privacy2Title: "You can see everything",
  privacy2Body:
    "Every signal Nova holds about you is visible in your account dashboard. No hidden profiles. No opaque scoring.",
  privacy3Title: "You control deletion",
  privacy3Body:
    "Delete your Nova memory at any time, in full or selectively. Your account, your data.",
  privacy4Title: "Ads never use your Nova data",
  privacy4Body:
    "Ad matching is done by category and location preference only — never by your Nova conversation history or wellness profile.",
  dashboardHeading: "See what Nova knows about you",
  dashboardBody:
    "Your full Nova profile is visible in your account. Goals, signals, session history, engagement patterns — all there.",
  dashboardLink: "Open your Nova profile",
  disclaimerHeading: "Nova is a companion, not a clinician",
  disclaimerBody:
    "Nova is an AI tool for personal growth and wellness motivation. She is not a therapist, doctor, or licensed health professional. Nothing she says constitutes medical or psychological advice. If you are in crisis, please contact a mental health professional or emergency services.",
  ctaHeading: "Meet Nova",
  ctaBody: "Available inside the AlphaGlow app. Free to start.",
  ctaButton: "Open the app",
};

// ── NSVX page ──────────────────────────────────────────────────────────────────
d.nsvxPage = {
  badge: "NSVX Token",
  heroHeading: "The token economy powering AlphaGlow.",
  heroBody:
    "NSVX is the utility token that makes consistent wellness feel like an investment. Earn it through practice, spend it on depth, hold it as the platform grows.",
  whatHeading: "What is NSVX?",
  whatBody:
    "NSVX is a Solana-based utility token that powers the AlphaGlow creator economy. It is not speculative. It is not a financial instrument. It is the unit of value that aligns creators and users in a shared economy — the more you engage, the more the economy grows, and the more you benefit from it.",
  solanaBody:
    "NSVX runs on Solana — sub-second settlement, near-zero transaction fees, and the most active developer ecosystem in Web3. Every NSVX transaction settles in under a second at a fraction of a cent.",
  earnHeading: "How to earn NSVX",
  earn1Title: "Complete sessions",
  earn1Body:
    "Every guided session completed earns NSVX automatically. No minimums, no unlock required.",
  earn2Title: "Hit streaks",
  earn2Body: "Consecutive days of practice earn a streak multiplier on your NSVX.",
  earn3Title: "Complete journeys",
  earn3Body: "Finishing a full multi-week journey earns a bonus NSVX reward.",
  earn4Title: "Rate and engage",
  earn4Body:
    "Leaving session feedback and engaging with creator content adds to your earnings.",
  earn5Title: "Reach milestones",
  earn5Body:
    "Personal bests and long-term achievements unlock one-time NSVX rewards.",
  earn6Title: "Watch ads (opt-in)",
  earn6Body:
    "Users who opt in to Nova Whisper ads earn bonus NSVX for every verified completion.",
  buyHeading: "Buy NSVX",
  buyBody:
    "Purchase NSVX directly through AlphaGlow via Moonpay. Solana-native, non-custodial, and available in most countries.",
  buyNote:
    "The Moonpay widget will appear here when NSVX is available to purchase. Register your interest to be notified first.",
  buyNotifyLabel: "Email address",
  buyNotifyCta: "Notify me",
  buyNotifySuccess:
    "You are on the list. We will reach out when NSVX is available to purchase.",
  spendHeading: "How to spend NSVX",
  spend1Title: "Unlock premium content",
  spend1Body:
    "Access paid creator programs, exclusive soundscapes, and advanced journeys.",
  spend2Title: "Digital Twin sessions",
  spend2Body:
    "Spend NSVX to unlock access to a creator's Digital Twin for a session or month.",
  spend3Title: "Tip creators",
  spend3Body: "Send NSVX directly to creators whose work has helped you.",
  withdrawHeading: "Withdraw your NSVX",
  withdrawBody:
    "When you are ready, withdraw your NSVX to any Solana-compatible wallet. Minimum withdrawal: 100 NSVX. Withdrawals process within 24 hours.",
  withdrawComingSoon: "Coming Q4 2026",
  economicsHeading: "Token economics",
  economicsBody:
    "NSVX is designed for sustainability — not speculation. The reward pool is calibrated to the platform's engagement, and creator payouts are funded by user NSVX spending. The economy grows as the community grows.",
  faqHeading: "NSVX FAQ",
  faq1Q: "Is NSVX a cryptocurrency?",
  faq1A:
    "NSVX is a utility token on the Solana blockchain. It is designed for use within the AlphaGlow platform — not as a speculative investment. It should not be purchased with money you cannot afford to spend on platform content.",
  faq2Q: "Can I cash out my NSVX?",
  faq2A:
    "You can withdraw NSVX to a Solana wallet. AlphaGlow does not facilitate NSVX-to-fiat conversion. What you do with your NSVX after withdrawal is your own responsibility.",
  faq3Q: "Is there a NSVX whitepaper?",
  faq3A:
    "A full technical whitepaper is in preparation. Register on the Investors page to receive it when published.",
  faq4Q: "How is the NSVX reward pool funded?",
  faq4A:
    "The reward pool is funded by platform revenue — subscription fees, creator program fees, and advertiser spend. A fixed percentage of platform revenue is allocated to user and creator NSVX rewards each quarter.",
  faq5Q: "What happens to NSVX if I delete my account?",
  faq5A:
    "NSVX held in your platform wallet will be forfeited after a 30-day grace period if you do not withdraw it first. NSVX already in your Solana wallet is yours and unaffected.",
  legalNote:
    "NSVX is a utility token, not a financial instrument. It carries no guarantee of value and should not be treated as an investment.",
  legalLink: "Read the full NSVX disclaimer",
  ctaHeading: "Start earning today",
  ctaBody:
    "Join AlphaGlow free and earn your first NSVX within your first session.",
  ctaButton: "Open the app",
};

// ── Press page ─────────────────────────────────────────────────────────────────
d.pressPage = {
  badge: "Press",
  heroHeading: "AlphaGlow in the media.",
  heroBody: "Media enquiries, brand assets, and company information.",
  assetsHeading: "Brand assets",
  assetsBody:
    "Download official AlphaGlow logos, wordmarks, and brand guidelines.",
  logoName: "AlphaGlow Wordmark",
  logoDesc: "Primary wordmark in dark and light variants. SVG and PNG.",
  logoCta: "Download (coming soon)",
  guidelinesName: "Brand Guidelines",
  guidelinesDesc:
    "Full brand guidelines including typography, colour, and usage rules.",
  guidelinesCta: "Download (coming soon)",
  boilerplateHeading: "About AlphaGlow",
  boilerplateBody:
    "AlphaGlow is the creator economy platform where wellness creators publish AI-powered sessions, build a Digital Twin with Nova, and earn NSVX when their audience grows. Founded in 2026, AlphaGlow combines expert-designed wellness programs with Nova — an AI companion that learns each user's patterns and delivers the right content at the right moment. The platform operates on a utility token model where engagement drives value for both creators and users. AlphaGlow is available at alphaglowai.app.",
  contactHeading: "Media contact",
  contactBody:
    "For press enquiries, interview requests, and media access, contact us at the address below. We aim to respond within 24 hours.",
  contactEmail: "press@alphaglowai.com",
  kitHeading: "Press kit",
  kitBody:
    "Full press kit including founder biography, product screenshots, and company background.",
  kitCta: "Download press kit (coming soon)",
};

// ── Blog ───────────────────────────────────────────────────────────────────────
d.blog = {
  heroHeading: "AlphaGlow Journal",
  heroBody: "Nova insights, platform updates, and creator spotlights.",
  categoryAll: "All",
  categoryNovaInsights: "Nova Insights",
  categoryPlatformUpdates: "Platform Updates",
  categoryCreatorSpotlights: "Creator Spotlights",
  readMore: "Read article",
  publishedOn: "Published",
  backToBlog: "Back to journal",
  noPostsHeading: "No posts yet",
  noPostsBody: "The first articles are coming soon.",
};

writeFileSync(path, JSON.stringify(d, null, 2), "utf8");

const newKeys =
  Object.keys(d.forUsers).length +
  Object.keys(d.advertisers).length +
  Object.keys(d.investors).length +
  Object.keys(d.novaPage).length +
  Object.keys(d.nsvxPage).length +
  Object.keys(d.pressPage).length +
  Object.keys(d.blog).length;
console.log("en.json updated. New keys added:", newKeys);
