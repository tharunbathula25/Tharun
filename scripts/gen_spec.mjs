// Derives the placeholder image spec straight from lib/studio.ts, so every
// image the site references has a panel and nothing is generated that is unused.
import { readFileSync, writeFileSync } from 'node:fs';

const src = readFileSync('lib/studio.ts', 'utf8');

const pieces = [];
const re = /id:\s*'([^']+)',\s*title:\s*'([^']+)',\s*category:[^]*?technique:\s*'([^']+)',[^]*?image:\s*'([^']+)',\s*width:\s*(\d+),\s*height:\s*(\d+),/g;
let m;
while ((m = re.exec(src))) {
  const [, , title, technique, image, width, height] = m;
  pieces.push({
    path: image.replace('/images/', ''),
    width: Number(width),
    height: Number(height),
    title,
    shot: `Replace with: ${technique}. Include at least one tight close-up of the embroidery.`,
  });
}

const spec = [
  {
    path: 'hero-embroidery-detail.jpg',
    width: 1600,
    height: 2000,
    title: 'Hero — embroidery detail',
    shot: 'Replace with: a very close crop of hand maggam work. Thread texture and zari, held-in-the-hand distance. Not a full garment, not a model.',
    tone: 2,
  },
  {
    path: 'craft-frame.jpg',
    width: 1200,
    height: 1500,
    title: 'Our Craft — the frame',
    shot: 'Replace with: fabric stretched on the maggam frame, needle and thread mid-stitch. Hands in shot are good.',
    tone: 1,
  },
  {
    path: 'og-embroidery.jpg',
    width: 1200,
    height: 630,
    title: 'Open Graph card',
    shot: 'Replace with: embroidery detail, 1200x630. This is what renders when the link is shared on WhatsApp — it must show thread, not a logo on white.',
    tone: 2,
  },
  ...pieces,
];

writeFileSync('scripts/placeholders.json', JSON.stringify(spec, null, 2));
console.log(`spec: ${spec.length} images (${pieces.length} portfolio)`);
