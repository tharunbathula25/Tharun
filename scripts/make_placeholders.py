"""
Generates clearly-marked placeholder images for VASTRABHARANAM.

These are NOT photographs and are NOT stock imagery. Each is a flat panel in the
studio palette, stamped with the word PLACEHOLDER and the exact shot that has to
replace it. The site this replaces failed by shipping stock photos of unrelated
shops; an obviously-fake panel is the honest stand-in until real work arrives.

Run: python3 scripts/make_placeholders.py
"""
import json
import os
import subprocess
from PIL import Image, ImageDraw, ImageFont

IVORY = (251, 247, 241)
INK = (33, 27, 26)
WINE = (107, 31, 46)
GOLD = (176, 141, 79)
BLUSH = (239, 224, 220)
MUTED = (138, 124, 119)

OUT = "public/images"


def font(size, bold=False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf" % ("-Bold" if bold else ""),
        "/usr/share/fonts/truetype/liberation/LiberationSans%s.ttf" % ("-Bold" if bold else "-Regular"),
    ]
    for c in candidates:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()


def wrap(draw, text, f, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=f) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def panel(path, w, h, title, shot, tone=0):
    """tone 0 = blush ground, 1 = wine ground, 2 = ink ground."""
    bg, fg, accent = [
        (BLUSH, WINE, GOLD),
        (WINE, IVORY, GOLD),
        (INK, IVORY, GOLD),
    ][tone]

    img = Image.new("RGB", (w, h), bg)
    d = ImageDraw.Draw(img)

    # A quiet lattice, so the panel reads as a deliberate placeholder, not a broken image.
    step = max(w, h) // 14
    for i in range(-h, w + h, step):
        d.line([(i, 0), (i + h, h)], fill=accent, width=1)
    img = Image.blend(Image.new("RGB", (w, h), bg), img, 0.10)
    d = ImageDraw.Draw(img)

    m = int(w * 0.075)
    d.rectangle([m, m, w - m, h - m], outline=accent, width=2)

    fs_label = max(11, int(w * 0.021))
    fs_title = max(17, int(w * 0.040))
    fs_shot = max(12, int(w * 0.024))

    f_label, f_title, f_shot = font(fs_label, True), font(fs_title), font(fs_shot)
    inner = w - 2 * m - int(w * 0.09)
    x = m + int(w * 0.045)

    title_lines = wrap(d, title, f_title, inner)
    shot_lines = wrap(d, shot, f_shot, inner)

    lh_t, lh_s = int(fs_title * 1.30), int(fs_shot * 1.55)
    block = fs_label * 2 + len(title_lines) * lh_t + int(fs_title * 0.9) + len(shot_lines) * lh_s
    y = (h - block) // 2

    d.text((x, y), "PLACEHOLDER", font=f_label, fill=accent)
    y += fs_label * 2
    for ln in title_lines:
        d.text((x, y), ln, font=f_title, fill=fg)
        y += lh_t
    y += int(fs_title * 0.55)
    d.line([(x, y), (x + int(inner * 0.18), y)], fill=accent, width=2)
    y += int(fs_title * 0.55)
    for ln in shot_lines:
        d.text((x, y), ln, font=f_shot, fill=fg)
        y += lh_s

    full = os.path.join(OUT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    img.save(full, "JPEG", quality=88, optimize=True, progressive=True)
    return full


def main():
    with open("scripts/placeholders.json") as fh:
        spec = json.load(fh)

    made = []
    for i, item in enumerate(spec):
        made.append(
            panel(
                item["path"],
                item["width"],
                item["height"],
                item["title"],
                item["shot"],
                tone=item.get("tone", i % 3),
            )
        )
    print("generated %d placeholder images" % len(made))


if __name__ == "__main__":
    main()
