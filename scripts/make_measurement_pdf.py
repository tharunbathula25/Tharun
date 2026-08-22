"""
Builds the downloadable measurement guide handed to remote and NRI customers.

Content is mirrored from `remote.measurements` in lib/studio.ts. If that list
changes, change it here too and re-run: python3 scripts/make_measurement_pdf.py
"""
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas

IVORY = HexColor("#FBF7F1")
INK = HexColor("#211B1A")
WINE = HexColor("#6B1F2E")
GOLD = HexColor("#B08D4F")
MUTED = HexColor("#8A7C77")

OUT = "public/downloads/vastrabharanam-measurement-guide.pdf"

MEASUREMENTS = [
    ("Bust", "Around the fullest part, tape level all the way round, not pulled tight."),
    ("Waist", "Around the narrowest part of your waist, where you would tie a saree."),
    ("Shoulder", "Across the back, from the tip of one shoulder to the tip of the other."),
    ("Sleeve length", "From the shoulder tip down the arm to where you want the sleeve to end."),
    ("Blouse length", "From the shoulder at the neck, straight down the front, to where the blouse should end."),
    ("Armhole", "Around the arm at the underarm, over the shoulder and back again."),
]

W, H = A4


def hairline(c, y, x0=20 * mm, x1=W - 20 * mm):
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.5)
    c.setFillColor(GOLD)
    c.setStrokeAlpha(0.35)
    c.line(x0, y, x1, y)
    c.setStrokeAlpha(1)


def wrap(c, text, font, size, max_w):
    c.setFont(font, size)
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if c.stringWidth(trial, font, size) <= max_w:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


# Diagram is drawn in the same 220 x 200 unit space as MeasurementDiagram.tsx,
# then scaled. UNIT is points-per-unit.
DIAGRAM_UNITS_W = 300.0
DIAGRAM_UNITS_H = 215.0


def blouse(c, cx, cy, s):
    """Blouse outline with the measurement lines marked, mirrored from
    components/MeasurementDiagram.tsx. (cx, cy) is the centre of the figure;
    `s` is points per diagram unit."""

    def P(x, y):
        return (cx + x * s, cy - y * s)

    c.setStrokeColor(WINE)
    c.setLineWidth(1.1)

    p = c.beginPath()
    p.moveTo(*P(-48, -79))
    p.lineTo(*P(-48, 79))
    p.lineTo(*P(48, 79))
    p.lineTo(*P(48, -79))
    c.drawPath(p)

    p = c.beginPath()
    p.moveTo(*P(-28, -79))
    p.curveTo(*P(-14, -55), *P(14, -55), *P(28, -79))
    c.drawPath(p)

    for sign in (-1, 1):
        p = c.beginPath()
        p.moveTo(*P(48 * sign, -79))
        p.lineTo(*P(64 * sign, -87))
        p.lineTo(*P(86 * sign, -39))
        p.lineTo(*P(56 * sign, -25))
        p.lineTo(*P(48 * sign, -49))
        c.drawPath(p)
        p = c.beginPath()
        p.moveTo(*P(64 * sign, -87))
        p.lineTo(*P(28 * sign, -79))
        c.drawPath(p)

    c.setStrokeColor(GOLD)
    c.setDash(2, 2)
    for y, label in ((-11, "Bust"), (43, "Waist")):
        p = c.beginPath()
        p.moveTo(*P(-48, y))
        p.lineTo(*P(48, y))
        c.drawPath(p)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 6.5)
        c.drawCentredString(cx, cy - (y - 5) * s, label)
    c.setDash()

    p = c.beginPath()
    p.moveTo(*P(-60, -101))
    p.lineTo(*P(60, -101))
    c.drawPath(p)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 6.5)
    c.drawCentredString(cx, cy - (-110) * s, "Shoulder")

    p = c.beginPath()
    p.moveTo(*P(106, -79))
    p.lineTo(*P(106, 79))
    c.drawPath(p)
    c.drawString(cx + 112 * s, cy, "Blouse length")

    p = c.beginPath()
    p.moveTo(*P(-68, -95))
    p.lineTo(*P(-100, -31))
    c.drawPath(p)
    c.drawRightString(cx - 104 * s, cy - (-25) * s, "Sleeve length")

    c.setDash(2, 2)
    c.ellipse(*P(-59, -71), *P(-37, -23))
    # Leader into the body, where no other dimension line crosses it.
    p = c.beginPath()
    p.moveTo(*P(-36, -37))
    p.lineTo(*P(-18, -29))
    c.drawPath(p)
    c.setDash()
    c.drawString(cx - 14 * s, cy - (-25) * s, "Armhole")


def main():
    c = canvas.Canvas(OUT, pagesize=A4)
    c.setTitle("Vastrabharanam — Measurement Guide")
    c.setAuthor("Vastrabharanam Design Studio")
    c.setSubject("How to take measurements for a remote or NRI order")

    c.setFillColor(IVORY)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    y = H - 26 * mm
    c.setFillColor(WINE)
    c.setFont("Times-Roman", 22)
    c.drawString(20 * mm, y, "V A S T R A B H A R A N A M")

    y -= 7 * mm
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8.5)
    c.drawString(20 * mm, y, "Design Studio  ·  KPHB, Kukatpally, Hyderabad  ·  WhatsApp +91 96182 49379")

    y -= 6 * mm
    hairline(c, y)

    y -= 12 * mm
    c.setFillColor(WINE)
    c.setFont("Times-Roman", 19)
    c.drawString(20 * mm, y, "Measurement guide")

    y -= 8 * mm
    c.setFillColor(INK)
    for line in wrap(
        c,
        "Take these six measurements over a blouse that already fits you well, not over loose "
        "clothing. Keep the tape level and snug, never pulled tight. Send them to us on WhatsApp "
        "along with a photograph of the design you have in mind.",
        "Helvetica",
        9.5,
        W - 40 * mm,
    ):
        c.setFont("Helvetica", 9.5)
        c.drawString(20 * mm, y, line)
        y -= 5.2 * mm

    # Fit the diagram into a fixed box so it can never overrun the text.
    box_w = 78 * mm
    box_h = 62 * mm
    scale = min(box_w / DIAGRAM_UNITS_W, box_h / DIAGRAM_UNITS_H)

    y -= 8 * mm
    blouse(c, W / 2, y - box_h / 2, scale)

    y -= box_h + 8 * mm
    hairline(c, y)
    y -= 10 * mm

    for i, (label, how) in enumerate(MEASUREMENTS, 1):
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(20 * mm, y, "%02d" % i)

        c.setFillColor(WINE)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(28 * mm, y, label)

        c.setFillColor(INK)
        for line in wrap(c, how, "Helvetica", 9, W - 40 * mm - 42 * mm):
            c.setFont("Helvetica", 9)
            c.drawString(70 * mm, y, line)
            y -= 4.6 * mm

        # Rule to write the measurement on, for anyone printing this.
        c.setStrokeColor(MUTED)
        c.setStrokeAlpha(0.35)
        c.setLineWidth(0.5)
        c.line(28 * mm, y + 0.5 * mm, 62 * mm, y + 0.5 * mm)
        c.setStrokeAlpha(1)

        y -= 8 * mm

    hairline(c, y + 3 * mm)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8)
    c.drawString(
        20 * mm,
        y - 4 * mm,
        "Not sure about a measurement? Send us a blouse that fits you well and we will take everything from it.",
    )
    c.drawString(20 * mm, y - 9 * mm, "vastrabharanam.com  ·  WhatsApp +91 96182 49379 / +91 81431 71111")

    c.showPage()
    c.save()
    print("wrote", OUT)


if __name__ == "__main__":
    main()
