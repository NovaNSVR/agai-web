"""
Replace all wellness-platform language across all locale JSON files.
AlphaGlow is a creator economy platform + AI companion — not a wellness platform.
"""
import json, re, os, glob

LOCALES_DIR = r"C:\ai-tools\agai-web\locales"

# Ordered replacements — longest/most-specific first to avoid partial matches
REPLACEMENTS = [
    # Platform/app identity
    ("wellness platform",           "creator economy platform"),
    ("wellness app",                "creator economy app"),
    ("wellness creators",           "creators"),
    ("wellness creator",            "creator"),
    ("wellness experts",            "creators and experts"),
    ("wellness expert",             "creator and expert"),
    ("wellness expertise",          "expertise"),
    ("wellness engagement",         "platform engagement"),
    ("wellness practice",           "practice"),
    ("wellness growth",             "personal growth"),
    ("wellness motivation",         "growth motivation"),
    ("wellness companion",          "AI companion"),
    ("wellness metaverse",          "metaverse"),
    ("wellness experiences",        "experiences"),
    ("wellness outcomes",           "outcomes"),
    ("wellness technology",         "platform technology"),
    ("wellness reminders",          "session reminders"),
    ("wellness notifications",      "session notifications"),
    ("wellness support tools",      "personal growth tools"),
    ("wellness audience",           "general audience"),
    ("wellness category",           "creator category"),
    ("wellness content",            "creator content"),
    ("wellness advice",             "advice"),
    ("wellness token",              "utility token"),
    ("wellness feel",               "growth feel"),
    ("wellness investment",         "investment"),
    ("wellness journeys",           "creator journeys"),
    ("wellness goals",              "personal goals"),
    ("wellness profile",            "personal profile"),
    ("wellness practice",           "practice"),
    ("wellness activity",           "session activity"),
    ("wellness purposes",           "informational purposes"),
    ("wellness program",            "creator program"),
    ("wellness programmes",         "creator programmes"),
    ("general wellness",            "general wellbeing"),
    # Sentence-level rewrites (case-insensitive handled below)
    ("AlphaGlow is the creator economy platform where creators publish AI-powered sessions, build a Digital Twin with Nova, and earn NSVX when their audience grows.",
     "AlphaGlow is the creator economy platform where creators publish AI-powered sessions, build a Digital Twin with Nova, and earn NSVX when their audience grows."),
    # Catch remaining bare "wellness" in context
    ("wellness",                    "wellbeing"),
]

def replace_all(text):
    for old, new in REPLACEMENTS:
        # case-sensitive
        text = text.replace(old, new)
        # Title case
        text = text.replace(old.title(), new.title())
        # ALL CAPS
        text = text.replace(old.upper(), new.upper())
        # Sentence case (first letter capital)
        text = text.replace(old[0].upper() + old[1:], new[0].upper() + new[1:])
    return text

files = glob.glob(os.path.join(LOCALES_DIR, "*.json"))
total_changes = 0

for filepath in sorted(files):
    lang = os.path.basename(filepath)
    with open(filepath, "r", encoding="utf-8") as f:
        original = f.read()

    updated = replace_all(original)

    if updated != original:
        changes = sum(1 for a, b in zip(original.split(), updated.split()) if a != b)
        total_changes += changes
        with open(filepath, "w", encoding="utf-8", newline="\n") as f:
            f.write(updated)
        print(f"  [{lang}] updated (~{changes} word changes)")
    else:
        print(f"  [{lang}] no changes")

print(f"\nDone. Total word changes across all locales: ~{total_changes}")
