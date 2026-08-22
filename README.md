# VASTRABHARANAM Design Studio

Marketing site for a bespoke bridal couture studio in KPHB, Hyderabad —
hand-embroidered maggam work blouses, custom bridal lehengas and made-to-measure
traditional wear.

Replaces vastrabharanam.com (WordPress / Elementor / WooCommerce).

## What this site is

There is no cart, no checkout and no database, because nothing here is bought
off a shelf — every piece is measured, discussed and quoted. The site's only job
is to make a bride confident enough to start a WhatsApp conversation.

Every call to action ends in a `wa.me` deep link with the message already
written. The enquiry form does not post anywhere: it composes a message from the
fields and hands it to WhatsApp. No data is stored, sent or logged by this site.

## Stack

- Next.js 14 (App Router) · TypeScript · Tailwind CSS · `lucide-react`
- One static page, prerendered. Deploys to Vercel with zero configuration.
- No database, cart, auth, analytics, cookie banner or localStorage.

```
app/         layout.tsx (fonts, metadata, Open Graph, JSON-LD) · page.tsx (composes sections)
components/  Nav Hero Portfolio Lightbox Craft Pricing Timeline RemoteOrdering
             Reviews EnquiryForm Visit FAQ Footer WhatsAppFab
             + Section, Reveal, ToConfirm, MeasurementDiagram
lib/         studio.ts (ALL content) · blur.ts (generated)
scripts/     placeholder image, blur and PDF generators
public/      images/ · downloads/
```

## All content lives in `lib/studio.ts`

No component hardcodes a string, price, phone number or duration. To change
copy, prices, timelines or the portfolio, edit that one file.

### The placeholder policy

No price, founding year, review or policy on this site was invented. Anything
still waiting on the client is typed as `Pending<T>`:

```ts
range: pending('₹15,000 – ₹35,000', 'Real minimum and typical band for a bridal maggam blouse.'),
```

It carries an illustrative value so the layout can be reviewed, plus a note
saying exactly what has to be collected. Components render pending values behind
a visible gold **To confirm** marker, and content that is missing entirely (the
four Google reviews, five FAQ answers) renders as a marked **Client input**
block. Nothing unconfirmed can ship looking like fact.

To confirm a value, swap `pending(...)` for `confirmed(...)`:

```ts
range: confirmed('₹18,000 – ₹40,000'),
```

The marker disappears. `CLIENT-CHECKLIST.md` lists everything outstanding.

To preview the site as it will look once everything is confirmed:

```bash
NEXT_PUBLIC_HIDE_PENDING=true npm run build && npm start
```

That hides the markers. It does not make the content true — never deploy with
that flag set until the real content is in.

## Placeholder images

`public/images/` currently holds generated placeholder panels: flat colour
fields in the studio palette, each stamped with the word PLACEHOLDER and a
description of the photograph that must replace it.

They are deliberately not photographs and deliberately not stock imagery. The
site being replaced fails precisely because it ships stock photos of unrelated
shops; an obviously-fake panel is the honest stand-in until real work arrives.

```bash
npm run assets     # regenerate every placeholder, blur preview and the PDF
```

Individually: `assets:spec` (derives the image list from `lib/studio.ts`),
`assets:images`, `assets:blur`, `assets:pdf`. The Python scripts need
`pillow` and `reportlab`.

When real photographs arrive, drop them into `public/images/portfolio/`, update
the `portfolio` array in `lib/studio.ts`, then run `npm run assets:blur` to
regenerate the blur previews.

## Design system

| Token   | Hex       | Use |
|---------|-----------|-----|
| ivory   | `#FBF7F1` | page background |
| ink     | `#211B1A` | body text |
| wine    | `#6B1F2E` | headings, buttons, primary |
| gold    | `#B08D4F` | hairlines, stars, flourishes, and text on the dark hero |
| goldink | `#796137` | gold-toned **text** on light grounds |
| blush   | `#EFE0DC` | section tints |
| muted   | `#6E635F` | secondary text, captions |

Two colours differ from the original spec, both for contrast. `#B08D4F` reaches
only 2.9:1 on ivory and `#8A7C77` only 3.76:1 — both fail WCAG AA for text.
`goldink` is the same gold darkened to 5.5:1, and `muted` was darkened to
5.45:1. The bright gold is unchanged and still carries every hairline, star and
flourish, and still sets the hero eyebrow where it sits on ink at 5.5:1.

Type is Cormorant Garamond 500 for display (never below 20px) and Karla 400 for
body at 1.75 line-height. Radius is 4px, buttons are pills, shadows are
essentially absent — sections separate with 1px gold-at-20% hairlines. Fade-up
is 500ms ease-out and is disabled under `prefers-reduced-motion`.

## Verified

- `npm run build` — clean, no warnings.
- Lighthouse (mobile): **Performance 99 · Accessibility 97 · Best Practices 100 · SEO 100**.
- axe-core: **0 violations** at 375/1280, with the lightbox open, and with the
  mobile nav drawer open.
- No horizontal overflow at 375 / 768 / 1280.
- WhatsApp deep links verified end to end in a real browser, including the
  URL-encoded enquiry message and the per-piece "Enquire about this piece" link.
- Lightbox: keyboard arrows, Escape, trapped focus, focus restored on close,
  touch swipe both directions with a threshold.

The Accessibility 97 rather than 100 is Lighthouse never scrolling: below-fold
elements are still mid-fade-in when it samples, so it reads their contrast
against a partly-transparent element. axe reports 0 violations on the settled
page.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Deployment

Import the repository into Vercel. No environment variables and no build
configuration are required. See `CLIENT-CHECKLIST.md` for the domain migration
notes before promising a launch date.
