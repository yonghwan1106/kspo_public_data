from PIL import Image, ImageDraw, ImageFont
import os

# Ensure directory exists
os.makedirs('public/images', exist_ok=True)

def create_placeholder(filename, text, size=(800, 600), color=(70, 130, 180)):
    img = Image.new('RGB', size, color=color)
    d = ImageDraw.Draw(img)
    
    # Try to load a font, fallback to default
    try:
        font = ImageFont.truetype("arial.ttf", 40)
    except IOError:
        font = ImageFont.load_default()

    # Calculate text position
    bbox = d.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    position = ((size[0]-text_width)/2, (size[1]-text_height)/2)
    
    d.text(position, text, fill=(255, 255, 255), font=font)
    img.save(f'public/images/{filename}')
    print(f"Created {filename}")

# List of images to generate
images = [
    ("hero_bg.png", "Hero Background", (1920, 1080), (37, 99, 235)), # Blue-600
    ("cta_bg.png", "CTA Background", (1920, 600), (16, 185, 129)), # Emerald-500
    ("about_hero_bg.png", "About Hero", (1920, 600), (79, 70, 229)), # Indigo-600
    ("measure_grip.png", "Grip Strength", (400, 300), (255, 255, 255)), # White (will add border in CSS)
    ("measure_situp.png", "Sit-up", (400, 300), (255, 255, 255)),
    ("measure_flexibility.png", "Flexibility", (400, 300), (255, 255, 255)),
    ("measure_jump.png", "Standing Jump", (400, 300), (255, 255, 255)),
    ("cat_cardio.png", "Cardio", (600, 400), (239, 68, 68)), # Red-500
    ("cat_strength.png", "Strength", (600, 400), (59, 130, 246)), # Blue-500
    ("cat_endurance.png", "Endurance", (600, 400), (16, 185, 129)), # Emerald-500
    ("cat_flexibility.png", "Flexibility", (600, 400), (139, 92, 246)), # Purple-500
    ("cat_power.png", "Power", (600, 400), (245, 158, 11)), # Amber-500
]

for img in images:
    create_placeholder(img[0], img[1], img[2], img[3])
