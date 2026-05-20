import json

translations = {
    "cs": {
        "footer.tagline": "Platforma kreativni ekonomiky, ktera vas zna.",
        "home.heroHeading": "Kde tvurci budují\npropojení pohánena AI.",
        "home.heroBody": "AlphaGlow je platforma kreativni ekonomiky, kde wellness tvurci publikují relace s AI, budují Digitálního Dvojníka s Novou a získávají NSVX, kdyz jejich publikum roste.",
        "home.archetypesHeading": "Kazdy typ tvurce. Jedna platforma.",
        "home.archetypesBody": "Od dechovych cvicení po biohacking, AlphaGlow dává tvurcum nastroje k budovaní relací, cest a Digitálního Dvojníka, ktery pracuje pro jejich publikum nonstop.",
    },
    "sk": {
        "footer.tagline": "Platforma kreatívnej ekonomiky, ktorá vás pozná.",
        "home.heroHeading": "Kde tvorcovia budujú\nAI-podporené spojenia.",
        "home.heroBody": "AlphaGlow je platforma kreatívnej ekonomiky, kde wellness tvorcovia publikujú AI relácie, budujú Digitálneho Dvojníka s Novou a získavajú NSVX, ked ich publikum rastie.",
        "home.archetypesHeading": "Kazdy typ tvorcu. Jedna platforma.",
        "home.archetypesBody": "Od dychových cvicení po biohacking, AlphaGlow dáva tvorcom nástroje na budovanie relácií, ciest a Digitálneho Dvojníka, ktorý pracuje pre ich publikum nonstop.",
    },
    "de": {
        "footer.tagline": "Die Creator-Economy-Plattform, die dich kennt.",
        "home.heroHeading": "Wo Creators\nKI-gestützte Verbindungen aufbauen.",
        "home.heroBody": "AlphaGlow ist die Creator-Economy-Plattform, auf der Wellness-Creators KI-gestützte Sessions veröffentlichen, einen Digitalen Zwilling mit Nova aufbauen und NSVX verdienen, wenn ihr Publikum wächst.",
        "home.archetypesHeading": "Jeder Creator-Typ. Eine Plattform.",
        "home.archetypesBody": "Von Atemarbeit bis Biohacking — AlphaGlow gibt Creators die Werkzeuge, um Sessions, Journeys und einen Digitalen Zwilling zu erstellen, der rund um die Uhr für ihr Publikum arbeitet.",
    },
    "es": {
        "footer.tagline": "La plataforma de economía creativa que te conoce.",
        "home.heroHeading": "Donde los creadores construyen\nconexiones impulsadas por IA.",
        "home.heroBody": "AlphaGlow es la plataforma de economía creativa donde los creadores de bienestar publican sesiones con IA, construyen un Gemelo Digital con Nova y ganan NSVX a medida que su audiencia crece.",
        "home.archetypesHeading": "Cada tipo de creador. Una plataforma.",
        "home.archetypesBody": "Desde la respiración hasta el biohacking, AlphaGlow da a los creadores las herramientas para crear sesiones, viajes y un Gemelo Digital que trabaja para su audiencia las 24 horas.",
    },
    "fr": {
        "footer.tagline": "La plateforme d'économie créative qui vous connaît.",
        "home.heroHeading": "Là où les créateurs tissent\ndes connexions propulsées par l'IA.",
        "home.heroBody": "AlphaGlow est la plateforme d'économie créative où les créateurs wellness publient des sessions IA, construisent un Jumeau Numérique avec Nova et gagnent des NSVX au fil de la croissance de leur audience.",
        "home.archetypesHeading": "Chaque type de créateur. Une seule plateforme.",
        "home.archetypesBody": "Du breathwork au biohacking, AlphaGlow donne aux créateurs les outils pour créer des sessions, des parcours et un Jumeau Numérique qui travaille pour leur audience en permanence.",
    },
    "pt": {
        "footer.tagline": "A plataforma de economia criativa que te conhece.",
        "home.heroHeading": "Onde os criadores constroem\nligações potenciadas por IA.",
        "home.heroBody": "AlphaGlow é a plataforma de economia criativa onde criadores de bem-estar publicam sessões com IA, constroem um Gémeo Digital com Nova e ganham NSVX à medida que a sua audiência cresce.",
        "home.archetypesHeading": "Cada tipo de criador. Uma plataforma.",
        "home.archetypesBody": "Da respiração ao biohacking, AlphaGlow dá aos criadores as ferramentas para construir sessões, jornadas e um Gémeo Digital que trabalha para a sua audiência a toda a hora.",
    },
    "it": {
        "footer.tagline": "La piattaforma di creator economy che ti conosce.",
        "home.heroHeading": "Dove i creator costruiscono\nconnessioni potenziate dall'AI.",
        "home.heroBody": "AlphaGlow è la piattaforma di creator economy dove i creator del benessere pubblicano sessioni con AI, costruiscono un Gemello Digitale con Nova e guadagnano NSVX man mano che il loro pubblico cresce.",
        "home.archetypesHeading": "Ogni tipo di creator. Una piattaforma.",
        "home.archetypesBody": "Dal breathwork al biohacking, AlphaGlow offre ai creator gli strumenti per creare sessioni, percorsi e un Gemello Digitale che lavora per il loro pubblico 24 ore su 24.",
    },
    "pl": {
        "footer.tagline": "Platforma gospodarki twórców, która cię zna.",
        "home.heroHeading": "Gdzie twórcy budują\npowiązania napędzane przez AI.",
        "home.heroBody": "AlphaGlow to platforma gospodarki twórców, gdzie twórcy wellness publikują sesje z AI, budują Cyfrowego Bliźniaka z Nową i zarabiają NSVX w miarę wzrostu swojej publiczności.",
        "home.archetypesHeading": "Kazdy typ twórcy. Jedna platforma.",
        "home.archetypesBody": "Od ćwiczeń oddechowych po biohacking, AlphaGlow daje twórcom narzędzia do tworzenia sesji, podróży i Cyfrowego Bliźniaka, który pracuje dla ich publiczności przez całą dobę.",
    },
    "nl": {
        "footer.tagline": "Het creator economy platform dat jou kent.",
        "home.heroHeading": "Waar creators\nAI-gestuurde verbindingen bouwen.",
        "home.heroBody": "AlphaGlow is het creator economy platform waar wellness creators AI-gestuurde sessies publiceren, een Digitale Tweeling met Nova bouwen en NSVX verdienen naarmate hun publiek groeit.",
        "home.archetypesHeading": "Elk type creator. Één platform.",
        "home.archetypesBody": "Van ademwerk tot biohacking — AlphaGlow geeft creators de tools om sessies, journeys en een Digitale Tweeling te bouwen die dag en nacht voor hun publiek werkt.",
    },
}

import os
base = r"C:\ai-tools\agai-web\locales"

for locale, trans in translations.items():
    path = os.path.join(base, f"{locale}.json")
    with open(path, encoding="utf-8") as f:
        data = json.load(f)

    data["footer"]["tagline"] = trans["footer.tagline"]
    data["home"]["heroHeading"] = trans["home.heroHeading"]
    data["home"]["heroBody"] = trans["home.heroBody"]
    data["home"]["archetypesHeading"] = trans["home.archetypesHeading"]
    data["home"]["archetypesBody"] = trans["home.archetypesBody"]

    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Updated {locale}.json OK")

print("All locales updated.")
