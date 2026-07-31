from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630
DARK_BG = (6, 15, 15)        # --dark-bg #060F0F
DARK_INK = (245, 245, 242)   # --dark-ink #F5F5F2
DARK_MUTED = (176, 194, 194) # lightened muted for readability on dark bg
TERRACOTTA = (216, 139, 92)  # --terracotta #D88B5C

img = Image.new("RGB", (W, H), DARK_BG)
draw = ImageDraw.Draw(img)

# Subtle terracotta radial glow behind the logo
glow_size = 900
glow = Image.new("RGBA", (glow_size, glow_size), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow)
glow_draw.ellipse([0, 0, glow_size, glow_size], fill=(*TERRACOTTA, 70))
glow = glow.filter(ImageFilter.GaussianBlur(120))
img.paste(glow, (W // 2 - glow_size // 2, -260), glow)

draw = ImageDraw.Draw(img)

# Logo
logo = Image.open("public/icons/icon-512.png").convert("RGBA")
logo_target = 236
logo = logo.resize((logo_target, logo_target), Image.LANCZOS)
logo_x = (W - logo_target) // 2
logo_y = 92
img.paste(logo, (logo_x, logo_y), logo)

# Wordmark
wordmark_font = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 66)
wordmark_text = "AlphaGlow AI"
bbox = draw.textbbox((0, 0), wordmark_text, font=wordmark_font)
tw = bbox[2] - bbox[0]
draw.text(((W - tw) // 2, logo_y + logo_target + 34), wordmark_text, font=wordmark_font, fill=DARK_INK)

# Thin terracotta rule
rule_y = logo_y + logo_target + 34 + 84
rule_w = 90
draw.rectangle([(W - rule_w) // 2, rule_y, (W + rule_w) // 2, rule_y + 3], fill=TERRACOTTA)

# Tagline
tagline_font = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 30)
tagline_text = "The Creator Economy Platform"
bbox2 = draw.textbbox((0, 0), tagline_text, font=tagline_font)
tw2 = bbox2[2] - bbox2[0]
draw.text(((W - tw2) // 2, rule_y + 26), tagline_text, font=tagline_font, fill=TERRACOTTA)

img.save("public/og-image.png", "PNG", optimize=True)
print("Saved public/og-image.png")
print("Dimensions:", img.size)
