from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os
import math
import random

# Ensure directory exists
os.makedirs('public/images', exist_ok=True)

def create_gradient(width, height, start_color, end_color):
    base = Image.new('RGB', (width, height), start_color)
    top = Image.new('RGB', (width, height), end_color)
    mask = Image.new('L', (width, height))
    mask_data = []
    for y in range(height):
        for x in range(width):
            mask_data.append(int(255 * (y / height)))
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

def draw_grid(img, spacing=50, color=(255, 255, 255, 30)):
    draw = ImageDraw.Draw(img)
    width, height = img.size
    for x in range(0, width, spacing):
        draw.line([(x, 0), (x, height)], fill=color, width=1)
    for y in range(0, height, spacing):
        draw.line([(0, y), (width, y)], fill=color, width=1)
    return img

def draw_circles(img, count=10, color=(255, 255, 255, 20)):
    draw = ImageDraw.Draw(img, 'RGBA')
    width, height = img.size
    for _ in range(count):
        x = random.randint(0, width)
        y = random.randint(0, height)
        r = random.randint(20, 100)
        draw.ellipse([(x-r, y-r), (x+r, y+r)], fill=color)
    return img

def create_hero_bg():
    # Blue to Emerald Gradient with Grid
    img = create_gradient(1920, 1080, (30, 58, 138), (16, 185, 129)) # Blue-900 to Emerald-500
    img = draw_grid(img, spacing=60, color=(255, 255, 255, 20))
    img = draw_circles(img, count=15, color=(255, 255, 255, 15))
    img.save('public/images/hero_bg.png')
    print("Created hero_bg.png")

def create_cta_bg():
    # Bright Blue Sky Gradient
    img = create_gradient(1920, 600, (59, 130, 246), (147, 197, 253)) # Blue-500 to Blue-300
    # Add some "cloud-like" soft circles
    img = draw_circles(img, count=20, color=(255, 255, 255, 40))
    img.save('public/images/cta_bg.png')
    print("Created cta_bg.png")

def create_about_bg():
    # Dark Tech Blue
    img = create_gradient(1920, 600, (17, 24, 39), (79, 70, 229)) # Gray-900 to Indigo-600
    img = draw_grid(img, spacing=40, color=(255, 255, 255, 15))
    # Add connecting lines (network effect simulation)
    draw = ImageDraw.Draw(img)
    width, height = img.size
    points = [(random.randint(0, width), random.randint(0, height)) for _ in range(20)]
    for i in range(len(points)-1):
        draw.line([points[i], points[i+1]], fill=(255, 255, 255, 30), width=2)
    img.save('public/images/about_hero_bg.png')
    print("Created about_hero_bg.png")

def create_category_bg(filename, color_start, color_end):
    img = create_gradient(600, 400, color_start, color_end)
    img = draw_circles(img, count=5, color=(255, 255, 255, 30))
    img.save(f'public/images/{filename}')
    print(f"Created {filename}")

def create_measurement_thumb(filename, color):
    img = Image.new('RGB', (400, 300), color=(243, 244, 246)) # Gray-100 background
    draw = ImageDraw.Draw(img)
    # Draw a simple colored shape in center
    w, h = img.size
    draw.rectangle([(w//4, h//4), (w*3//4, h*3//4)], fill=color)
    img.save(f'public/images/{filename}')
    print(f"Created {filename}")

# Generate all images
create_hero_bg()
create_cta_bg()
create_about_bg()

# Categories
create_category_bg("cat_cardio.png", (239, 68, 68), (244, 114, 182)) # Red to Pink
create_category_bg("cat_strength.png", (59, 130, 246), (99, 102, 241)) # Blue to Indigo
create_category_bg("cat_endurance.png", (16, 185, 129), (20, 184, 166)) # Emerald to Teal
create_category_bg("cat_flexibility.png", (139, 92, 246), (167, 139, 250)) # Purple to Violet
create_category_bg("cat_power.png", (245, 158, 11), (251, 191, 36)) # Amber

# Measurements (Simple icons)
create_measurement_thumb("measure_grip.png", (59, 130, 246))
create_measurement_thumb("measure_situp.png", (16, 185, 129))
create_measurement_thumb("measure_flexibility.png", (139, 92, 246))
create_measurement_thumb("measure_jump.png", (245, 158, 11))

print("All procedural images generated.")
