from pathlib import Path
import shutil

from PIL import Image, ImageDraw, ImageFont
from PIL import ImageFilter


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "produksjon_farrisbrua"
IMG_DIR = OUT / "08_bildepakke"
SOURCE_DIR = IMG_DIR / "kildebilder"
QA = OUT / "qa"


IMAGE_MAP = [
    (
        "Gemini_Generated_Image_dhs1qrdhs1qrdhs1.png",
        "bilde_1_farrisbrua.png",
        "Bilde 1 - initial oversikt fra melder",
    ),
    (
        "Gemini_Generated_Image_6dl0f36dl0f36dl0.png",
        "bilde_2_farrisbrua.png",
        "Bilde 2 - skadepunkt og røyk",
    ),
    (
        "Gemini_Generated_Image_i8sfv7i8sfv7i8sf.png",
        "bilde_3_farrisbrua.png",
        "Bilde 3 - trafikk og fremkommelighet",
    ),
    (
        "Gemini_Generated_Image_cgqh6hcgqh6hcgqh.png",
        "bilde_4_farrisbrua.png",
        "Bilde 4 - første ressurser fremme",
    ),
]


def crop_to_16x9(im: Image.Image) -> Image.Image:
    width, height = im.size
    target_ratio = 16 / 9
    ratio = width / height
    if ratio > target_ratio:
        new_width = round(height * target_ratio)
        left = 0
        return im.crop((left, 0, left + new_width, height))
    if ratio < target_ratio:
        new_height = round(width / target_ratio)
        top = max(0, round((height - new_height) / 2))
        return im.crop((0, top, width, top + new_height))
    return im


def soften_bottom_right_mark(im: Image.Image) -> Image.Image:
    # Generated images may include a small provider mark in the lower-right corner.
    # Replace that small corner with a softened neighboring patch so exercise media
    # looks like a neutral situational photo rather than an AI export.
    x0, y0, x1, y1 = 1420, 735, 1600, 900
    source = im.crop((1240, y0, 1420, y1)).filter(ImageFilter.GaussianBlur(10))
    im.paste(source, (x0, y0))
    return im


def install_images() -> list[Path]:
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    SOURCE_DIR.mkdir(parents=True, exist_ok=True)
    rendered = []

    for source_name, target_name, _caption in IMAGE_MAP:
        source = ROOT / source_name
        archived_source = SOURCE_DIR / source_name
        if not source.exists() and archived_source.exists():
            source = archived_source
        if not source.exists():
            raise FileNotFoundError(f"Mangler kildebilde: {source}")
        if source != archived_source:
            shutil.copy2(source, archived_source)
        with Image.open(source) as im:
            photo = crop_to_16x9(im.convert("RGB"))
            photo = photo.resize((1600, 900), Image.Resampling.LANCZOS)
            if target_name == "bilde_1_farrisbrua.png":
                photo = soften_bottom_right_mark(photo)
            target = IMG_DIR / target_name
            photo.save(target, "PNG", optimize=True)
            rendered.append(target)
    return rendered


def build_contact_sheet(images: list[Path]) -> Path:
    QA.mkdir(parents=True, exist_ok=True)
    thumb_w, thumb_h = 400, 225
    cols = 2
    gap = 28
    pad = 30
    label_h = 38
    rows = 2
    sheet = Image.new(
        "RGB",
        (cols * thumb_w + (cols - 1) * gap + pad * 2, rows * (thumb_h + label_h) + (rows - 1) * gap + pad * 2),
        (246, 247, 248),
    )
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default()

    for idx, img_path in enumerate(images):
        with Image.open(img_path) as im:
            thumb = im.convert("RGB").resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
        col = idx % cols
        row = idx // cols
        x = pad + col * (thumb_w + gap)
        y = pad + row * (thumb_h + label_h + gap)
        draw.rectangle((x - 4, y - 4, x + thumb_w + 4, y + thumb_h + 4), fill=(255, 255, 255), outline=(216, 222, 228))
        sheet.paste(thumb, (x, y))
        draw.text((x, y + thumb_h + 12), IMAGE_MAP[idx][2], font=font, fill=(23, 32, 38))

    out = QA / "bildepakke_contactsheet.png"
    sheet.save(out, "PNG", optimize=True)
    return out


def main():
    images = install_images()
    contact_sheet = build_contact_sheet(images)
    print(
        {
            "installed": [str(p.relative_to(ROOT)) for p in images],
            "sources": str(SOURCE_DIR.relative_to(ROOT)),
            "contact_sheet": str(contact_sheet.relative_to(ROOT)),
        }
    )


if __name__ == "__main__":
    main()
