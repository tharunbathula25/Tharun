# Tharun AI Studio

The studio's own site, built on one idea: **the audit is the website.**

The homepage isn't a pitch — it's a working diagnostic. A visitor types their business
name and gets a scored breakdown of what a customer sees before they choose, plus what
it's costing them. The scorecard is the lead magnet, the case study and the sales deck
in one screen, and it demos the product by *being* the product.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## How the audit works

`lib/audit.ts` is the whole engine. Today it runs on `mockAudit` — a seeded generator
keyed off a hash of the typed business name, so the same input always returns the same
score and demos are repeatable.

To go live, set `GOOGLE_PLACES_API_KEY` (see `.env.example`) and fill in
`fetchPlacesAudit`. The scoring thresholds live alongside it, so the real data source
drops in without touching a single component.

**The audit must return in under four seconds.** Cache by place ID — if the scan drags,
the premise of the homepage collapses.

## Brand system

Locked, taken from the Instagram carousel system. Tokens live in `app/globals.css`.

| | |
|---|---|
| Background | `#0A0A0A` matte black — no light mode |
| Chrome | `#E9E9EC`, with a brushed-metal gradient via `.text-metal` |
| Gold | `#C9A84C` — solutions, benefits, numbers that excite |
| Crimson | `#E74C3C` — problems, losses, danger |
| Headlines | Bebas Neue, all caps, `line-height: 0.88` |
| Body | DM Sans |

Every headline mixes colours **by word meaning**. Never render one in a single colour.

## Before launch

- [ ] `WHATSAPP_NUMBER` in `lib/content.ts` — currently a placeholder
- [ ] `BOOKING_LINK` — points at a Cal.com handle that doesn't exist yet
- [ ] `PROOF` in `lib/content.ts` — placeholder client numbers
- [ ] `metadataBase` in `app/layout.tsx` — set to the real domain
- [ ] Open Graph image

## Also here

`LOVABLE_PROMPT.md` — the same concept as a copy-paste [Lovable.dev](https://lovable.dev)
prompt, if you'd rather build it there.
