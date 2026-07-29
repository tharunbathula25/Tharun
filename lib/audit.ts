/**
 * The audit engine.
 *
 * This is the product on the homepage: a visitor types their business name and
 * gets a scored diagnosis of their online presence in under four seconds.
 *
 * Right now it runs on `mockAudit` — deterministic, seeded off the query string,
 * so the same business always gets the same numbers and demos are repeatable.
 * See `fetchPlacesAudit` at the bottom for the real Google Places swap-in.
 */

export type Severity = "critical" | "warning" | "good";

export type WeaknessId = "reviews" | "website" | "booking" | "response";

export interface AuditMetric {
  id: WeaknessId | "rating";
  label: string;
  value: string;
  detail: string;
  severity: Severity;
}

export interface AuditResult {
  /** Business name as we resolved it. */
  business: string;
  /** Category we matched, used in the copy. */
  category: string;
  /** 0–100. Under 50 is the pitch. */
  score: number;
  /** The gold one-liner under the scorecard. */
  verdict: string;
  /** Estimated walk-ins lost per month to better-ranked competitors. */
  lostPerMonth: number;
  metrics: AuditMetric[];
  /** Drives which system we lead with on the fix page. */
  topWeakness: WeaknessId;
  source: "mock" | "google-places";
}

const CATEGORIES = [
  "café",
  "restaurant",
  "salon",
  "gym",
  "bakery",
  "clinic",
] as const;

/** Stable 32-bit hash so every render of a given query matches. */
function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Seeded generator — one hash, many independent-looking draws. */
function seeded(seed: number) {
  let state = seed || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return ((state >>> 0) % 10000) / 10000;
  };
}

function severityFor(ok: boolean, borderline: boolean): Severity {
  if (ok) return "good";
  return borderline ? "warning" : "critical";
}

export function mockAudit(query: string): AuditResult {
  const cleaned = query.trim().replace(/\s+/g, " ");
  const rand = seeded(hash(cleaned.toLowerCase()));

  const category = CATEGORIES[Math.floor(rand() * CATEGORIES.length)];

  // Most local businesses that need us sit between 3.2 and 4.6.
  const rating = Number((3.2 + rand() * 1.4).toFixed(1));
  const reviews90d = Math.floor(rand() * 26);
  const hasWebsite = rand() > 0.62;
  const hasBooking = hasWebsite && rand() > 0.55;
  const replyHours = Math.floor(rand() * 72);
  const replies = rand() > 0.35;

  const metrics: AuditMetric[] = [
    {
      id: "rating",
      label: "Google rating",
      value: rating.toFixed(1),
      detail:
        rating >= 4.5
          ? "Strong. This is an asset — protect it."
          : `Customers filter at 4.0. You're showing up below the ${category} next door.`,
      severity: severityFor(rating >= 4.5, rating >= 4.0),
    },
    {
      id: "reviews",
      label: "Reviews in last 90 days",
      value: String(reviews90d),
      detail:
        reviews90d >= 20
          ? "Healthy velocity. Google reads this as an active business."
          : "Happy customers stay silent unless you ask them. Unhappy ones never need reminding.",
      severity: severityFor(reviews90d >= 20, reviews90d >= 8),
    },
    {
      id: "website",
      label: "Website",
      value: hasWebsite ? "Found" : "None found",
      detail: hasWebsite
        ? "Live — but is it loading fast and converting on mobile?"
        : "Every search for you ends at a Google listing with no next step.",
      severity: severityFor(hasWebsite, false),
    },
    {
      id: "booking",
      label: "Online booking",
      value: hasBooking ? "Available" : "Not available",
      detail: hasBooking
        ? "Bookings can land while you're closed. Good."
        : "Every reservation costs you a phone call you have to be free to answer.",
      severity: severityFor(hasBooking, false),
    },
    {
      id: "response",
      label: "Avg. reply to enquiries",
      value: replies ? `${replyHours}h` : "Never",
      detail: replies
        ? replyHours <= 2
          ? "Fast enough to win the booking."
          : "Most enquiries book elsewhere within the hour."
        : "Messages arrive. Nobody answers. That's revenue leaving quietly.",
      severity: severityFor(replies && replyHours <= 2, replies && replyHours <= 12),
    },
  ];

  const weights: Record<Severity, number> = { good: 20, warning: 11, critical: 3 };
  const score = metrics.reduce((total, m) => total + weights[m.severity], 0);

  // Rank the fixable weaknesses so the fix page leads with the worst one.
  const order: WeaknessId[] = ["reviews", "response", "booking", "website"];
  const topWeakness =
    order.find(
      (id) => metrics.find((m) => m.id === id)?.severity === "critical",
    ) ??
    order.find((id) => metrics.find((m) => m.id === id)?.severity === "warning") ??
    "reviews";

  const competitorRating = Math.min(4.9, Number((rating + 0.6 + rand() * 0.3).toFixed(1)));
  const distance = 200 + Math.floor(rand() * 8) * 100;
  const lostPerMonth = Math.max(8, Math.round((100 - score) * 0.85));

  return {
    business: cleaned,
    category,
    score,
    verdict: `You're losing roughly ${lostPerMonth} customers a month to the ${category} ${distance}m away with ${competitorRating} stars.`,
    lostPerMonth,
    metrics,
    topWeakness,
    source: "mock",
  };
}

/**
 * Real implementation — swap this in when the Places key is set.
 *
 * 1. Text Search (`places:searchText`) with the raw query → resolve a place id.
 * 2. Place Details with a field mask of
 *    `rating,userRatingCount,websiteUri,reviews,regularOpeningHours,primaryTypeDisplayName`.
 * 3. Map the response onto `AuditMetric[]` using the same severity thresholds above,
 *    so the scoring stays identical whichever source the data came from.
 *
 * Cache by place id — the audit has to return in under four seconds or the
 * whole premise of the homepage falls apart.
 */
export async function fetchPlacesAudit(query: string): Promise<AuditResult> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return mockAudit(query);

  // TODO: implement against https://places.googleapis.com/v1/places:searchText
  return mockAudit(query);
}

export const SEVERITY_CLASS: Record<Severity, string> = {
  critical: "text-crimson-bright",
  warning: "text-gold",
  good: "text-chrome",
};
