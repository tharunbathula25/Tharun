# Lovable Prompt — Tharun AI Studio

Copy everything inside the code block below into a new [Lovable.dev](https://lovable.dev) project.

## ⚠️ Fill these in before pasting

| Placeholder | Where it appears |
|---|---|
| `[WHATSAPP_NUMBER]` | Floating WhatsApp button, contact section |
| `[BOOKING_LINK]` | Every "Book a call" CTA |
| `[INSTAGRAM_HANDLE]` | Nav, footer — assumed `@tharunaistudio` |
| `[CITY]` | Footer, "serving local businesses in …" |
| Proof numbers | Section 6 — the three before/after cards use placeholder client results |

Everything else is derived from the confirmed brand system (matte black, chrome T+A monogram, crimson/champagne-gold headline rules).

---

````
// LOVABLE WEBSITE PROMPT
// Business: Tharun AI Studio
// Notes: Brand system taken from confirmed Instagram carousel posts — matte black
// background, brushed-chrome T+A monogram, Bebas Neue condensed caps headlines,
// strict three-colour word rule (silver = fact, crimson = problem, gold = solution).
// Placeholders in [BRACKETS] must be replaced before launch.

---

## PROJECT OVERVIEW

Build a complete, responsive, production-ready website for **Tharun AI Studio** — an AI systems studio that builds smart websites, WhatsApp automation, online reservations, review engines and AI support for local businesses (cafés, restaurants, salons, gyms, clinics).

**The core idea: the audit IS the website.** The homepage is not a pitch — it is a working diagnostic tool. A visitor types their own business name and, in a few seconds, gets a scored breakdown of what customers see before they choose. The scorecard is the lead magnet, the case study and the sales deck in one screen.

**Design aesthetic:** Premium, cinematic, nocturnal. Pure matte black (#0A0A0A) throughout — no light mode, ever. Brushed-chrome metal gradients on the logo and statement words. Champagne gold as the only warm accent. Feels like a luxury product launch, not an agency brochure.

**Tone:** Blunt, confident, billboard-short. Headlines are all-caps and never full sentences. Body copy is punchy — short. one idea per line. Never corporate, never "we are passionate about."

**Primary CTA:** Run the free audit → then book the call.

---

## PAGES & SECTIONS

### 1. STICKY NAV
- Fixed top, black at 80% opacity with backdrop blur, thin `#232326` bottom border
- Left: the Tharun AI Studio logo lockup (see DESIGN SYSTEM → Logo)
- Right: text links "Systems", "Proof", "Live demo" (hidden below 768px) + a gold-outlined pill button "Book a call" → [BOOKING_LINK]

### 2. HERO — THE AUDIT TOOL (this is the whole site)
- Full-viewport, vertically centred, pure black with a very soft champagne-gold radial glow bleeding behind the content (blur ~140px, 10% opacity)
- Eyebrow, small letter-spaced caps, grey: `FREE · 20 SECONDS · NO SIGNUP`
- Headline, huge condensed caps, centred, two colours:
  `FIND OUT WHY THEY CHOSE` in brushed chrome silver
  `SOMEONE ELSE.` in crimson (#E74C3C)
- Subline, grey, max 2 lines: "Type your business name. We'll score exactly what a customer sees before they decide — and what it's costing you."
- **The input row** — a large dark rounded card (radius 16px, border #232326) containing a borderless text input (placeholder: `Brew Haven Café, Hyderabad`) and a solid gold button reading `Run the audit →`. On focus, the card border turns gold. Stacks vertically on mobile.
- While scanning: replace the button label with "Scanning…", and show rotating status lines in gold below the input — "Finding your listing…", "Reading your reviews…", "Checking your website and booking…", "Comparing you to businesses nearby…". Hold the scan for ~1.6s minimum so it feels like real work.

### 3. THE SCORECARD (appears below the input after the scan, auto-scrolls into view)
A dark rounded card, split two columns on desktop, stacked on mobile.

**Left panel — the verdict:**
- Small grey caps label: `VISIBILITY SCORE`
- Enormous gold metallic number that counts up from 0 (e.g. `34`), with `/100` in grey beside it
- Below it, a one-word status in condensed caps: `CRITICAL` (crimson) under 50, `LEAKING CUSTOMERS` (gold) 50–74, `STRONG` (silver) 75+
- Grey line: "Scored for **[their business name]**"

**Right panel — five metric rows**, each with a thin divider between:
| Row | Value styling |
|---|---|
| Google rating | crimson if under 4.0, gold if under 4.5, silver if good |
| Reviews in last 90 days | same thresholds |
| Website | "None found" in crimson / "Found" in silver |
| Online booking | "Not available" in crimson / "Available" in silver |
| Avg. reply to enquiries | "Never" in crimson / "48h" in gold / "1h" in silver |

Each row has the metric name in white, a one-line grey explanation beneath it ("Happy customers stay silent unless you ask them. Unhappy ones never need reminding."), and the value on the right in large condensed caps.

**Verdict bar across the bottom of the card**, gold text, larger: "You're losing roughly 52 customers a month to the café 600m away with 4.6 stars."

**Below the card — "START HERE" block:** a gold-tinted panel that names the ONE system fixing their worst-scoring metric, with its promise line, description, three bullets, and a solid gold button: `Show me what fixing this looks like →` → [BOOKING_LINK]

### 4. SYSTEMS — "We don't sell websites. We install systems."
- Headline: `WE DON'T SELL WEBSITES.` in chrome silver / `WE INSTALL SYSTEMS.` in gold metallic
- Sub: "Each one fixes a specific line on your scorecard. Most businesses need two. Nobody needs all four on day one."
- 2×2 card grid, dark cards, thin borders that turn gold on hover
- Each card: a thin gold **line icon** (SVG stroke, NOT emoji), the system name in condensed caps chrome, a gold promise line, a grey paragraph, then three bullets above a divider with gold `→` markers

The four systems:
1. **Review Engine** — "Your rating grows while you sleep." AI sends one WhatsApp after every visit asking for a review. One tap, no forms. Unhappy customers get routed privately to you instead of to Google.
2. **WhatsApp Automation** — "Nobody waits. Nobody leaves." An AI agent trained on your menu, hours and pricing answers every enquiry in seconds — at 2am, on a Sunday, during your busiest hour.
3. **Reservations** — "Tables fill without a phone call." Booking from your Google listing, your site, and inside the chat, with confirmations and reminders that cut no-shows.
4. **Smart Websites** — "A site that sells, not a brochure." Fast, mobile-first, built around one action.

### 5. LIVE DEMO — the chatbot wearing THEIR brand
Two columns. Left: headline `THIS IS YOUR` (silver) `STAFF` (gold) `AT 2AM.` (silver), plus copy: "Trained on your menu, your hours, your prices. It answers in under ten seconds, books the table, and hands you the conversation the moment it actually needs you." Then: "Try it — tap a question a real customer would send."

Right: a **realistic floating WhatsApp mockup** — white rounded card, radius 24px, heavy drop shadow, on the black background:
- Header bar in WhatsApp green (#075E54): circular avatar initials, "Your Business ✓", status text that switches between "online" and "typing…"
- Chat body with WhatsApp's beige (#ECE5DD) background. Business bubbles white on the left, customer bubbles #DCF8C6 on the right, timestamps bottom-right of each bubble in 10px grey
- Opening message: "Hi 👋 This is your business, answering on WhatsApp. Ask it something a customer would ask."
- Below the chat, tappable quick-reply pills the visitor clicks:
  - "Table for two at 7pm tonight?" → "7pm works — I have two tables left 👍 Booking under your number now. Want the window seat or the courtyard?"
  - "Are you open on Sunday?" → "Yes — Sunday we're open 8am to 11pm, kitchen closes at 10:30pm. Want me to hold a table?"
  - "Do you have anything vegan?" → "Nine dishes, yes 🌱 The mushroom bowl and the harissa flatbread are what regulars order most. Should I send the full vegan menu?"
  - "How much for a party of 12?" → "Groups of 10+ run ₹850 per head on the set menu, and we hold the mezzanine for you. I'll ask the owner to confirm the date — what day were you thinking?"
- Show a three-dot typing indicator for ~1.2s before each reply. Used pills disappear. When all are used, show: "That's the whole product. It never sleeps."

### 6. PROOF — before / after
- Headline: `SAME BUSINESS.` (silver) `DIFFERENT NUMBERS.` (gold)
- Three dark cards. Each: client label, category + city in grey, metric name in small caps, then the before number **in crimson with a strikethrough**, a grey arrow, and the after number **large in gold metallic**. Footer line: "In 90 days."
- ⚠️ Placeholder data — replace with real results:
  - Café client · Google rating · 3.6 → 4.5 · 90 days
  - Restaurant client · Reviews per month · 4 → 38 · 60 days
  - Salon client · Missed enquiries per week · 12 → 0 · 30 days

### 7. CTA
- Centred on pure black. Headline: `READY TO BUILD YOUR` (silver) `5-STAR` (gold metallic, largest) `REPUTATION?` (silver)
- Copy: "Bring your score to the call. Twenty minutes, no deck — we go through what's leaking and what it takes to close it."
- Gold-outlined pill button "Book the audit call" → [BOOKING_LINK], plus a quiet grey text link "or message on WhatsApp →"
- **The full logo lockup repeated large and centred beneath the buttons**

### 8. FOOTER
- A thin service bar across the top: `🌐 Smart Websites · 💬 WhatsApp Automation · 📅 Online Reservations · 🤖 AI Support`
- Below: tagline "Be discoverable. Be chosen. Be remembered." on the left; Instagram link and "THARUN AI STUDIO" in gold letter-spaced caps on the right

### 9. FLOATING WHATSAPP BUTTON
Fixed bottom-right, z-index 9999, visible on every scroll position including mobile → `https://wa.me/[WHATSAPP_NUMBER]?text=Hi%20Tharun%20—%20I%20ran%20the%20audit%20and%20want%20to%20talk%20about%20the%20fix.`

---

## DESIGN SYSTEM

```
Colors:
  Background:      #0A0A0A   (matte black — the whole site)
  Raised surface:  #111111   (cards, panels)
  Border:          #232326
  Chrome / text:   #E9E9EC
  Muted text:      #8E8E96
  Gold:            #C9A84C   (solutions, benefits, exciting numbers)
  Gold bright:     #E3C777   (hover)
  Crimson:         #C0392B / #E74C3C  (problems, pain, loss)

Typography:
  Headlines: Bebas Neue — ALL CAPS, line-height 0.88, letter-spacing 0.01em, very large
  Body:      DM Sans regular
  Eyebrows:  DM Sans, 11–12px, uppercase, letter-spacing 0.3em, muted grey

  STRICT WORD-COLOUR RULE — every headline mixes colours by meaning:
    silver  = neutral statement words
    crimson = problems, losses, danger
    gold    = solutions, benefits, numbers that excite
  Never render a headline in a single colour.

Metal gradients (apply as background-clip: text):
  Chrome: linear-gradient(180deg, #fff 0%, #cfcfd6 38%, #8b8b94 52%, #e6e6ec 68%, #a3a3ad 100%)
  Gold:   linear-gradient(180deg, #f0dda2 0%, #c9a84c 48%, #9c7f2f 62%, #e3c777 100%)

Logo lockup (build in SVG, no image file):
  A brushed-chrome T+A ligature — a capital T whose crossbar extends right into a
  stylised A — filled with the chrome gradient, floating directly on the black with
  no box or circle. Beneath it, stacked and left-aligned:
    "THARUN"                            chrome gradient, wide tracking
    "— AI STUDIO —"                     champagne gold, small caps
    "AI SYSTEMS FOR MODERN BUSINESSES"  tiny white tracked caps

Spacing:      Section padding 96px desktop / 64px mobile
Radius:       16px cards, 24px the WhatsApp mockup, 999px pill buttons
Shadows:      Only on the white WhatsApp card — 0 24px 80px rgba(0,0,0,0.6)
Motion:       Sections fade up 18px on scroll-in (IntersectionObserver, once).
              The score counts up from zero with an ease-out cubic.
              Respect prefers-reduced-motion everywhere.
```

---

## COMPONENTS TO BUILD

- [ ] Sticky blurred navbar with SVG logo lockup
- [ ] Audit input with scanning states and rotating status lines
- [ ] Scorecard with count-up score, five severity-coloured metric rows, verdict bar
- [ ] Score-driven "Start here" panel that surfaces the worst-scoring system
- [ ] 2×2 systems grid with gold SVG line icons and hover borders
- [ ] Interactive WhatsApp mockup with quick replies and typing indicator
- [ ] Before/after proof cards
- [ ] Centred CTA with repeated large logo
- [ ] Service-bar footer
- [ ] Floating WhatsApp button (fixed, z-9999)
- [ ] Scroll-reveal wrapper used across all sections
- [ ] Meta tags: title, description, Open Graph image

---

## TECHNICAL REQUIREMENTS

- React + Tailwind CSS
- Mobile-first; verify at 375px, 768px, 1280px. No horizontal overflow at any width.
- **The audit backend:** start with a mock. Hash the typed business name into a seeded generator so the same input always returns the same score — demos must be repeatable. Keep the scoring thresholds in one module so the real data source drops in without touching the UI.
- **Real data later:** Google Places API — `places:searchText` to resolve a place ID, then Place Details with field mask `rating,userRatingCount,websiteUri,reviews,regularOpeningHours,primaryTypeDisplayName`. Cache by place ID. **The audit must return in under four seconds or the whole premise collapses.**
- Google Fonts: import Bebas Neue and DM Sans
- WhatsApp: standard `wa.me` link, no API needed
- No images required — the entire site is type, gradients and SVG
- Accessibility: `aria-live` on the scanning status, a real `<label>` on the audit input, visible focus rings on gold

---

## LOVABLE-SPECIFIC INSTRUCTIONS

After pasting:
1. "Use the design system colours and fonts exactly as specified. The background is #0A0A0A everywhere — do not add a light mode."
2. "Make the hero full-viewport height with the audit input vertically centred, and make sure the scorecard scrolls into view automatically after the scan."
3. "Use thin gold SVG stroke icons in the systems grid — no emoji. Emoji fight the chrome-and-gold palette."
4. "Enforce the headline colour rule: every headline must mix chrome silver with either crimson or gold by word meaning, never one flat colour."
5. "Do a mobile audit at 375px — check the audit input stacks, headlines don't clip, and the WhatsApp mockup fits."
````

---

## What to do next

1. Replace every `[BRACKETED]` placeholder above — especially the WhatsApp number and booking link.
2. Paste into a fresh Lovable project and let it do the first render.
3. Send follow-up instruction #2 (hero height + auto-scroll) — Lovable usually gets the scorecard reveal wrong on the first pass.
4. Swap the placeholder proof numbers for real client results before you send the link to anyone.
5. When you're ready for live data, add the Google Places key and replace the mock scorer.
