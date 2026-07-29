import type { WeaknessId } from "./audit";

export interface SystemCard {
  id: WeaknessId;
  name: string;
  promise: string;
  detail: string;
  bullets: string[];
}

/** The four systems, keyed to the audit weakness each one fixes. */
export const SYSTEMS: SystemCard[] = [
  {
    id: "reviews",
    name: "Review Engine",
    promise: "Your rating grows while you sleep.",
    detail:
      "After every visit, AI sends one WhatsApp asking for a review. One tap, no forms, no app. Unhappy customers get routed to you privately instead of to Google.",
    bullets: [
      "Automatic ask after every visit",
      "Negative feedback intercepted before it's public",
      "Rating and velocity tracked weekly",
    ],
  },
  {
    id: "response",
    name: "WhatsApp Automation",
    promise: "Nobody waits. Nobody leaves.",
    detail:
      "An AI agent trained on your menu, hours, and pricing answers every enquiry in seconds — at 2am, on a Sunday, during your busiest hour.",
    bullets: [
      "Replies in under 10 seconds, 24/7",
      "Knows your menu, prices and hours",
      "Hands off to you the moment it matters",
    ],
  },
  {
    id: "booking",
    name: "Reservations",
    promise: "Tables fill without a phone call.",
    detail:
      "Booking that works from your Google listing, your website, and inside the WhatsApp chat — with confirmations and reminders that cut no-shows.",
    bullets: [
      "Book from search, site, or chat",
      "Automatic confirmations and reminders",
      "No-shows down, covers up",
    ],
  },
  {
    id: "website",
    name: "Smart Websites",
    promise: "A site that sells, not a brochure.",
    detail:
      "Fast, mobile-first, and built around one action. Every section earns its place, and everything above ties straight into it.",
    bullets: [
      "Loads in under a second on mobile",
      "Built around one conversion, not ten",
      "Wired to your reviews, chat and bookings",
    ],
  },
];

export interface ProofCard {
  business: string;
  category: string;
  window: string;
  before: string;
  after: string;
  metric: string;
}

/** ⚠️ REPLACE with real client numbers before launch. */
export const PROOF: ProofCard[] = [
  {
    business: "Café client",
    category: "Specialty café · Hyderabad",
    window: "90 days",
    metric: "Google rating",
    before: "3.6",
    after: "4.5",
  },
  {
    business: "Restaurant client",
    category: "Casual dining · Bengaluru",
    window: "60 days",
    metric: "Reviews per month",
    before: "4",
    after: "38",
  },
  {
    business: "Salon client",
    category: "Hair & beauty · Chennai",
    window: "30 days",
    metric: "Missed enquiries per week",
    before: "12",
    after: "0",
  },
];

export const SERVICE_BAR = [
  "🌐 Smart Websites",
  "💬 WhatsApp Automation",
  "📅 Online Reservations",
  "🤖 AI Support",
];

export const TAGLINE = "Be discoverable. Be chosen. Be remembered.";

/** ⚠️ REPLACE with the real WhatsApp business number in international format. */
export const WHATSAPP_NUMBER = "91XXXXXXXXXX";

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Tharun — I ran the audit on your site and want to talk about the fix.",
)}`;

/** ⚠️ REPLACE with the real Cal.com / Calendly handle. */
export const BOOKING_LINK = "https://cal.com/tharun-ai-studio/audit-call";

export const INSTAGRAM_LINK = "https://instagram.com/tharunaistudio";
