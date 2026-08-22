# Assets to collect before this site goes live

Without items 1 to 4 the site cannot launch. Everything below maps to a
clearly-marked placeholder in the running site — search `lib/studio.ts` for
`pending(` to see every one, or just open the site and look for the gold
**To confirm** and **Client input** markers.

To preview the site as it will look once everything is confirmed, run it with
`NEXT_PUBLIC_HIDE_PENDING=true npm run build && npm start`. That hides the
markers — it does **not** make the placeholder content true, so never deploy
with that flag set until the real content is in.

---

## Blocking — the site cannot launch without these

### 1. Photographs of the actual work — 24 to 40, high resolution
The single most important item, and the exact point where the current site
fails. Every photograph on vastrabharanam.com today is stock imagery of
unrelated shops and garments.

Needed:
- **Tight close-ups of embroidery detail**, not only full garments. Thread
  texture, zari, the depth of the hand work. This is what sells the price.
- A spread across the six categories the portfolio filters by: bridal blouses,
  maggam work, lehengas, sarees, indo-western, gowns.
- One hero image: a very close crop of hand embroidery, shot vertical.
- One image of work in progress on the maggam frame, for the Craft section.
- One 1200×630 crop for the link preview card. This is what renders when the
  link is shared on WhatsApp, so it must show embroidery, not a logo on white.

Drop them into `public/images/portfolio/`, then update the `portfolio` array in
`lib/studio.ts` — each entry needs a title, technique, alt text and dimensions.

### 2. Real pricing bands
Minimum and typical for each of: designer blouse, bridal maggam blouse, custom
lehenga, full bridal set. Ranges, not exact quotes.

The bands currently on the site are layout placeholders and are marked as such.
Nothing here was invented as a real figure.

### 3. Real turnaround times
Per garment type, plus the minimum lead time before a wedding date. Seven rows
in the turnaround table and six stepper durations are waiting on this.

### 4. A business email, or confirmation to omit it
The current site ships an unreplaced placeholder address. This rebuild omits
the field entirely rather than inventing one — say the word and it stays
omitted, or supply a real address and it appears in the footer.

---

## Needed to finish the page properly

### 5. Four Google reviews, copied verbatim
Reviewer first name and month with each. Nothing was written for you — the four
review slots render as empty marked placeholders until you paste real copy in.

Pick reviews that answer the three things a hesitant bride actually worries
about, plus one on the work itself:
- perfect fit
- being kept informed while the work was happening
- ordering remotely without visiting the studio
- the finish and detail of the piece

### 6. The Google Maps place link and embed URL
From your listing: Share → Copy link (for the reviews section), and
Share → Embed a map (for the Visit section). Right now both point at a search
rather than your actual pin.

### 7. The year the studio was founded
Appears twice in the hero.

### 8. Answers to five FAQ questions
Each is a policy, so none of them was written for you:
- How many fittings will I need?
- What if the fit is not right? (alteration policy, and how it works remotely)
- Do you take rush orders? (and any rush charge)
- Do you ship internationally? (couriers, transit times, who pays duty)
- What advance is required? (and accepted payment methods)

### 9. Do you teach maggam work classes?
Your Google listing is categorised partly as an educational institution. The
FAQ item is written but **switched off** until you confirm.

If you do teach, it deserves far more than one FAQ line — format, duration,
batch size and fees, and probably its own section on the page. Tell us and we
will build it.

### 10. Confirmation of which social accounts are live
Only Instagram (@vastrabharanamstudio) is linked right now. If there is a live
Facebook page, send the direct URL. Nothing else gets linked — no placeholder
profiles, no platform homepages.

---

## Nice to have, and worth having

### 11. Studio interior photos, and a portrait of Nirosha
A founder's face converts hard in bespoke work. If you are willing, one good
portrait would earn its place on this page.

### 12. Your logo, vector or high-resolution PNG
The site currently sets the name in type. A real mark would replace it in the
nav and footer.

---

## The domain

vastrabharanam.com runs WordPress with Elementor and WooCommerce. Migrating
means repointing DNS at Vercel — you keep the domain and its existing search
history.

Two things to settle before any launch date is promised:

1. **Do you have registrar access?** If whoever built the current site holds
   the domain, that needs resolving first. It is much easier to ask now than at
   handover.
2. **Repoint vastrabharanam.com, or start on a fresh domain?** Repointing keeps
   the search history you have already built.
