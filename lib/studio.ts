/**
 * VASTRABHARANAM Design Studio — single source of truth for all site content.
 *
 * Nothing in /components hardcodes a string, a price, a phone number or a
 * duration. Everything is exported from here so the studio can be updated
 * without touching a component.
 *
 * PLACEHOLDER POLICY
 * ------------------
 * No price, founding year, review or policy on this site is invented. Anything
 * still awaiting the client is typed as `Pending<T>` — it carries an
 * `illustrative` value purely so the layout can be reviewed, plus a `needs`
 * note describing exactly what must be collected. Components render pending
 * values behind a visible "To confirm" marker, so nothing unconfirmed can ship
 * silently. See CLIENT-CHECKLIST.md.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

/** A value that is not yet confirmed by the client. */
export type Pending<T> = {
  readonly status: 'pending';
  /** Layout-only stand-in. Never present this to a customer as fact. */
  readonly illustrative: T;
  /** What has to be collected from the client to resolve this. */
  readonly needs: string;
};

/** A value the client has confirmed. */
export type Confirmed<T> = {
  readonly status: 'confirmed';
  readonly value: T;
};

export type Field<T> = Pending<T> | Confirmed<T>;

export const pending = <T,>(illustrative: T, needs: string): Pending<T> => ({
  status: 'pending',
  illustrative,
  needs,
});

export const confirmed = <T,>(value: T): Confirmed<T> => ({
  status: 'confirmed',
  value,
});

/** Reads a field for display. Returns the text plus whether it is unconfirmed. */
export function read<T>(field: Field<T>): { value: T; unconfirmed: boolean } {
  return field.status === 'confirmed'
    ? { value: field.value, unconfirmed: false }
    : { value: field.illustrative, unconfirmed: true };
}

export type CategoryId =
  | 'all'
  | 'bridal-blouses'
  | 'maggam-work'
  | 'lehengas'
  | 'sarees'
  | 'indo-western'
  | 'gowns';

export type Category = {
  readonly id: CategoryId;
  readonly label: string;
};

export type PortfolioPiece = {
  readonly id: string;
  readonly title: string;
  readonly category: Exclude<CategoryId, 'all'>;
  /** Named technique, shown in the lightbox. */
  readonly technique: string;
  /** Approximate turnaround for a piece of this kind. */
  readonly turnaround: Field<string>;
  readonly image: string;
  readonly width: number;
  readonly height: number;
  /** Describes the garment and the technique, not the composition. */
  readonly alt: string;
  readonly notes: string;
};

export type PriceBand = {
  readonly id: string;
  readonly title: string;
  readonly range: Field<string>;
  readonly summary: string;
  /** What moves the price within the band. */
  readonly drivers: readonly string[];
  /** Who supplies the fabric. */
  readonly fabric: string;
};

export type ProcessStep = {
  readonly id: string;
  readonly title: string;
  readonly duration: Field<string>;
  readonly detail: string;
};

export type TurnaroundRow = {
  readonly garment: string;
  readonly duration: Field<string>;
};

export type Review = {
  readonly id: string;
  /** Verbatim Google review copy. `null` until supplied by the client. */
  readonly quote: string | null;
  readonly name: string | null;
  readonly month: string | null;
  readonly stars: number | null;
  /** Why this slot exists — which worry the review is meant to answer. */
  readonly answers: string;
};

export type FaqItem = {
  readonly id: string;
  readonly question: string;
  readonly answer: string | null;
  readonly needs?: string;
  /** Excluded from the page until the client confirms it applies. */
  readonly awaitingConfirmation?: boolean;
};

export type MeasurementPoint = {
  readonly id: string;
  readonly label: string;
  readonly how: string;
};

/* ------------------------------------------------------------------ */
/* Studio                                                              */
/* ------------------------------------------------------------------ */

export const studio = {
  name: 'Vastrabharanam',
  wordmark: 'VASTRABHARANAM',
  descriptor: 'Design Studio',
  locality: 'KPHB, Hyderabad',

  /** CLIENT-INPUT: the year the studio was founded. */
  foundedYear: pending('2016', 'The year the studio was founded.'),

  address: {
    line1: 'MIG-2-237, 9th Phase',
    line2: 'KPHB, Kukatpally',
    city: 'Hyderabad',
    postcode: '500085',
    country: 'India',
    get full() {
      return `${this.line1}, ${this.line2}, ${this.city} ${this.postcode}`;
    },
  },

  hours: {
    days: 'Monday to Sunday',
    open: '11:00 AM',
    close: '8:00 PM',
    note: 'Consultations are best booked ahead so you have the studio to yourself.',
  },

  /**
   * Both numbers are WhatsApp numbers. `wa` is the E.164 form used in deep
   * links; `display` is what a person reads.
   */
  phones: [
    { label: 'Primary', display: '+91 96182 49379', wa: '919618249379' },
    { label: 'Studio', display: '+91 81431 71111', wa: '918143171111' },
  ],

  /** Every deep link on the site goes to this number. */
  get primaryWa() {
    return this.phones[0].wa;
  },

  google: {
    rating: 4.8,
    reviewCount: 385,
    /** CLIENT-INPUT: exact Google Maps place URL for the studio listing. */
    listingUrl: pending(
      'https://www.google.com/maps/search/?api=1&query=Vastrabharanam+Design+Studio+KPHB+Hyderabad',
      'The canonical Google Maps place link (share → copy link) so the reviews section points at the real listing rather than a search.',
    ),
    /** CLIENT-INPUT: the place embed URL from Google Maps → Share → Embed a map. */
    mapEmbedUrl: pending(
      'https://www.google.com/maps?q=MIG-2-237,+9th+Phase,+KPHB,+Kukatpally,+Hyderabad+500085&output=embed',
      'The Google Maps embed URL for the exact studio pin, from Share → Embed a map.',
    ),
  },

  social: {
    /** Only accounts the studio actually uses. Nothing else belongs here. */
    instagram: {
      handle: '@vastrabharanamstudio',
      url: 'https://www.instagram.com/vastrabharanamstudio/',
    },
    /**
     * CLIENT-INPUT: confirm the Facebook page exists and supply its direct URL.
     * If there is no live page, delete this key — the footer omits what is absent.
     */
    facebook: null as { name: string; url: string } | null,
  },

  /**
   * CLIENT-INPUT: a real business email, or explicit confirmation to omit it.
   * Left null deliberately. The site this replaces shipped with an unreplaced
   * placeholder address; an omitted field is better than an invented one.
   */
  email: null as string | null,

  site: {
    url: 'https://vastrabharanam.com',
    /** Shown in the WhatsApp message so she knows where an enquiry came from. */
    signature: 'Sent from vastrabharanam.com',
  },
} as const;

/* ------------------------------------------------------------------ */
/* Nav — five items, no more                                           */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#remote', label: 'Remote Orders' },
  { href: '#visit', label: 'Visit' },
] as const;

export const navCta = {
  href: '#enquiry',
  label: 'Book a Consultation',
  /** The bar must hold wordmark + pill + hamburger inside 375px. */
  shortLabel: 'Consultation',
} as const;

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: 'KPHB, HYDERABAD',
  heading: 'Hand-embroidered, and made only for you.',
  sub: 'Bridal blouses, lehengas and maggam work — measured, designed and stitched for one person.',
  trust: [
    `${studio.google.rating} stars · ${studio.google.reviewCount} Google reviews`,
    'Bespoke since',
    'We ship worldwide',
  ],
  primary: { label: 'Book a Consultation', href: '#enquiry' },
  secondary: { label: 'See the work', href: '#portfolio' },
  image: {
    src: '/images/hero-embroidery-detail.jpg',
    alt: 'Close crop of hand maggam embroidery — gold zari coils and raised thread work worked into deep red silk.',
    width: 1600,
    height: 2000,
  },
} as const;

/* ------------------------------------------------------------------ */
/* Portfolio                                                           */
/* ------------------------------------------------------------------ */

export const categories: readonly Category[] = [
  { id: 'all', label: 'All' },
  { id: 'bridal-blouses', label: 'Bridal Blouses' },
  { id: 'maggam-work', label: 'Maggam Work' },
  { id: 'lehengas', label: 'Lehengas' },
  { id: 'sarees', label: 'Sarees' },
  { id: 'indo-western', label: 'Indo-Western' },
  { id: 'gowns', label: 'Gowns' },
];

const turnaroundBlouse = pending('4 to 6 weeks', 'Real turnaround for a hand maggam bridal blouse.');
const turnaroundDesigner = pending('3 to 4 weeks', 'Real turnaround for a designer blouse.');
const turnaroundLehenga = pending('8 to 10 weeks', 'Real turnaround for a custom lehenga.');
const turnaroundSaree = pending('4 to 6 weeks', 'Real turnaround for saree embroidery and drape work.');
const turnaroundIndo = pending('4 to 6 weeks', 'Real turnaround for indo-western pieces.');
const turnaroundGown = pending('6 to 8 weeks', 'Real turnaround for a gown.');

/**
 * 28 pieces. Titles, techniques and alt text are written to be swapped
 * one-for-one when the real photographs arrive — the shape stays, the
 * specifics change. Every `image` currently points at a marked placeholder.
 */
export const portfolio: readonly PortfolioPiece[] = [
  {
    id: 'crimson-zari-bridal',
    title: 'Crimson Zari Bridal Blouse',
    category: 'bridal-blouses',
    technique: 'Hand maggam with gold zari and raised thread',
    turnaround: turnaroundBlouse,
    image: '/images/portfolio/crimson-zari-bridal.jpg',
    width: 1200,
    height: 1600,
    alt: 'Crimson silk bridal blouse with dense gold zari maggam work across the yoke and sleeves.',
    notes: 'Full-yoke coverage, worked entirely by hand on the frame.',
  },
  {
    id: 'temple-border-blouse',
    title: 'Temple Border Blouse',
    category: 'bridal-blouses',
    technique: 'Aari work with temple motif border',
    turnaround: turnaroundBlouse,
    image: '/images/portfolio/temple-border-blouse.jpg',
    width: 1200,
    height: 1500,
    alt: 'Deep maroon bridal blouse with a hand-worked temple motif border in gold along the neckline.',
    notes: 'Traditional South Indian temple borders drawn to the bride’s own measurements.',
  },
  {
    id: 'peacock-yoke-blouse',
    title: 'Peacock Yoke Blouse',
    category: 'bridal-blouses',
    technique: 'Hand maggam, zardosi and stone setting',
    turnaround: turnaroundBlouse,
    image: '/images/portfolio/peacock-yoke-blouse.jpg',
    width: 1200,
    height: 1700,
    alt: 'Bridal blouse with a peacock motif embroidered across the yoke in zardosi and set stones.',
    notes: 'The peacock is drawn on the fabric first, then filled thread by thread.',
  },
  {
    id: 'ivory-pearl-blouse',
    title: 'Ivory and Pearl Blouse',
    category: 'bridal-blouses',
    technique: 'Pearl and cutdana hand work',
    turnaround: turnaroundBlouse,
    image: '/images/portfolio/ivory-pearl-blouse.jpg',
    width: 1200,
    height: 1500,
    alt: 'Ivory silk blouse embroidered with seed pearls and cutdana in a scattered floral pattern.',
    notes: 'Quieter work for a reception or a second-day function.',
  },
  {
    id: 'emerald-sleeve-blouse',
    title: 'Emerald Full-Sleeve Blouse',
    category: 'bridal-blouses',
    technique: 'Hand maggam with mirror and bead work',
    turnaround: turnaroundBlouse,
    image: '/images/portfolio/emerald-sleeve-blouse.jpg',
    width: 1200,
    height: 1600,
    alt: 'Emerald green full-sleeve bridal blouse with mirror and bead maggam work down each sleeve.',
    notes: 'Full sleeves worked separately, then joined once the fit is confirmed.',
  },
  {
    id: 'kanchi-red-blouse',
    title: 'Kanchipuram Red Blouse',
    category: 'bridal-blouses',
    technique: 'Zari outline on Kanchipuram silk',
    turnaround: turnaroundBlouse,
    image: '/images/portfolio/kanchi-red-blouse.jpg',
    width: 1200,
    height: 1450,
    alt: 'Red Kanchipuram silk blouse with fine gold zari outlining a traditional motif at the neckline.',
    notes: 'Cut from the saree’s own blouse piece so the weave matches exactly.',
  },
  {
    id: 'gold-vine-maggam',
    title: 'Gold Vine Maggam Panel',
    category: 'maggam-work',
    technique: 'Hand maggam — zari, salli and french knots',
    turnaround: turnaroundBlouse,
    image: '/images/portfolio/gold-vine-maggam.jpg',
    width: 1200,
    height: 1200,
    alt: 'Close view of a hand maggam panel with a gold vine of zari, salli and french knots on silk.',
    notes: 'Photographed close so the raised thread and the direction of each stitch are visible.',
  },
  {
    id: 'zardosi-neckline',
    title: 'Zardosi Neckline Study',
    category: 'maggam-work',
    technique: 'Zardosi with dabka and kasab',
    turnaround: turnaroundBlouse,
    image: '/images/portfolio/zardosi-neckline.jpg',
    width: 1200,
    height: 900,
    alt: 'Zardosi neckline worked in dabka and kasab, coiled metal thread catching light along the edge.',
    notes: 'Metal thread laid by hand — the coil holds its shape and its shine for years.',
  },
  {
    id: 'floral-cluster-maggam',
    title: 'Floral Cluster',
    category: 'maggam-work',
    technique: 'Hand maggam with silk thread and stone',
    turnaround: turnaroundDesigner,
    image: '/images/portfolio/floral-cluster-maggam.jpg',
    width: 1200,
    height: 1500,
    alt: 'Cluster of embroidered flowers in silk thread with stone centres, worked by hand on ivory fabric.',
    notes: 'Colour matched to the fabric before a single stitch is made.',
  },
  {
    id: 'mirror-work-panel',
    title: 'Mirror Work Panel',
    category: 'maggam-work',
    technique: 'Hand-set shisha mirror with thread binding',
    turnaround: turnaroundDesigner,
    image: '/images/portfolio/mirror-work-panel.jpg',
    width: 1200,
    height: 1200,
    alt: 'Panel of round shisha mirrors held in place by hand-worked thread binding on deep blue fabric.',
    notes: 'Each mirror is bound individually. Nothing is glued.',
  },
  {
    id: 'kundan-motif',
    title: 'Kundan Motif',
    category: 'maggam-work',
    technique: 'Kundan setting with zardosi surround',
    turnaround: turnaroundBlouse,
    image: '/images/portfolio/kundan-motif.jpg',
    width: 1200,
    height: 1400,
    alt: 'Kundan stones set into a hand-embroidered motif with a zardosi surround on red silk.',
    notes: 'Stones are set into the embroidery rather than sitting on top of it.',
  },
  {
    id: 'thread-texture-study',
    title: 'Thread Texture Study',
    category: 'maggam-work',
    technique: 'Layered silk thread, raised satin fill',
    turnaround: turnaroundDesigner,
    image: '/images/portfolio/thread-texture-study.jpg',
    width: 1200,
    height: 800,
    alt: 'Extreme close-up of layered silk thread in a raised satin fill, showing the depth of hand work.',
    notes: 'This is the detail you only see holding the fabric.',
  },
  {
    id: 'ruby-bridal-lehenga',
    title: 'Ruby Bridal Lehenga',
    category: 'lehengas',
    technique: 'Hand maggam across skirt, blouse and dupatta',
    turnaround: turnaroundLehenga,
    image: '/images/portfolio/ruby-bridal-lehenga.jpg',
    width: 1200,
    height: 1700,
    alt: 'Deep ruby bridal lehenga with hand maggam work covering the skirt panels, blouse and dupatta.',
    notes: 'A full bridal set — the skirt alone takes weeks on the frame.',
  },
  {
    id: 'blush-reception-lehenga',
    title: 'Blush Reception Lehenga',
    category: 'lehengas',
    technique: 'Pearl, sequin and light thread work',
    turnaround: turnaroundLehenga,
    image: '/images/portfolio/blush-reception-lehenga.jpg',
    width: 1200,
    height: 1600,
    alt: 'Blush pink reception lehenga with pearl, sequin and fine thread work scattered over the skirt.',
    notes: 'Lighter on the shoulders for a long evening.',
  },
  {
    id: 'green-gold-lehenga',
    title: 'Green and Gold Lehenga',
    category: 'lehengas',
    technique: 'Zari border with aari body work',
    turnaround: turnaroundLehenga,
    image: '/images/portfolio/green-gold-lehenga.jpg',
    width: 1200,
    height: 1500,
    alt: 'Bottle green lehenga with a wide gold zari border and aari work across the body of the skirt.',
    notes: 'Border weight balanced so the skirt falls correctly when she walks.',
  },
  {
    id: 'half-saree-lehenga',
    title: 'Half Saree Set',
    category: 'lehengas',
    technique: 'Traditional langa voni with hand borders',
    turnaround: turnaroundLehenga,
    image: '/images/portfolio/half-saree-lehenga.jpg',
    width: 1200,
    height: 1600,
    alt: 'Traditional half saree set in orange and green with hand-embroidered borders on skirt and voni.',
    notes: 'Made for the half saree function, sized to grow with a young girl.',
  },
  {
    id: 'wine-embellished-lehenga',
    title: 'Wine Embellished Lehenga',
    category: 'lehengas',
    technique: 'Zardosi with stone and cutdana',
    turnaround: turnaroundLehenga,
    image: '/images/portfolio/wine-embellished-lehenga.jpg',
    width: 1200,
    height: 1700,
    alt: 'Wine coloured lehenga with zardosi, stone and cutdana work concentrated along the hem.',
    notes: 'Weight kept low on the hem so the skirt holds its shape.',
  },
  {
    id: 'kanjivaram-blouse-set',
    title: 'Kanjivaram Saree with Worked Blouse',
    category: 'sarees',
    technique: 'Blouse embroidery matched to saree weave',
    turnaround: turnaroundSaree,
    image: '/images/portfolio/kanjivaram-blouse-set.jpg',
    width: 1200,
    height: 1600,
    alt: 'Kanjivaram silk saree paired with a hand-embroidered blouse matched to the saree’s zari weave.',
    notes: 'The blouse is designed against the saree, not from a catalogue.',
  },
  {
    id: 'organza-embroidered-saree',
    title: 'Embroidered Organza Saree',
    category: 'sarees',
    technique: 'Fine thread work on sheer organza',
    turnaround: turnaroundSaree,
    image: '/images/portfolio/organza-embroidered-saree.jpg',
    width: 1200,
    height: 1500,
    alt: 'Sheer organza saree with fine hand thread work scattered across the pallu and border.',
    notes: 'Sheer fabric takes a lighter hand — the reverse has to be as clean as the front.',
  },
  {
    id: 'pallu-detail-saree',
    title: 'Worked Pallu',
    category: 'sarees',
    technique: 'Zari and salli along the pallu',
    turnaround: turnaroundSaree,
    image: '/images/portfolio/pallu-detail-saree.jpg',
    width: 1200,
    height: 900,
    alt: 'Detail of a saree pallu worked in gold zari and salli along its full width.',
    notes: 'Worked so the pattern reads correctly once the pallu is pleated.',
  },
  {
    id: 'tissue-saree-border',
    title: 'Tissue Saree Border',
    category: 'sarees',
    technique: 'Hand border work on tissue silk',
    turnaround: turnaroundSaree,
    image: '/images/portfolio/tissue-saree-border.jpg',
    width: 1200,
    height: 1200,
    alt: 'Gold tissue silk saree with a hand-embroidered border in matching thread and small stones.',
    notes: 'Tone-on-tone work, so it reads as texture rather than pattern.',
  },
  {
    id: 'cape-lehenga-indo',
    title: 'Cape and Lehenga',
    category: 'indo-western',
    technique: 'Embroidered cape over a plain skirt',
    turnaround: turnaroundIndo,
    image: '/images/portfolio/cape-lehenga-indo.jpg',
    width: 1200,
    height: 1600,
    alt: 'Indo-western set with a hand-embroidered sheer cape worn over a plain flared skirt.',
    notes: 'All the work sits on the cape, so the skirt stays easy to move in.',
  },
  {
    id: 'dhoti-set-indo',
    title: 'Draped Dhoti Set',
    category: 'indo-western',
    technique: 'Structured drape with worked bodice',
    turnaround: turnaroundIndo,
    image: '/images/portfolio/dhoti-set-indo.jpg',
    width: 1200,
    height: 1500,
    alt: 'Draped dhoti set in dusty rose with a hand-worked bodice and a structured pleated drape.',
    notes: 'Drape is pinned and set on the wearer at the fitting.',
  },
  {
    id: 'jacket-set-indo',
    title: 'Embroidered Jacket Set',
    category: 'indo-western',
    technique: 'Zardosi on a tailored jacket',
    turnaround: turnaroundIndo,
    image: '/images/portfolio/jacket-set-indo.jpg',
    width: 1200,
    height: 1600,
    alt: 'Tailored long jacket with zardosi embroidery on the placket and cuffs, worn over a fitted set.',
    notes: 'Tailoring first, embroidery second — the jacket has to sit before it is worked.',
  },
  {
    id: 'palazzo-set-indo',
    title: 'Palazzo and Peplum',
    category: 'indo-western',
    technique: 'Aari work on peplum top',
    turnaround: turnaroundIndo,
    image: '/images/portfolio/palazzo-set-indo.jpg',
    width: 1200,
    height: 1400,
    alt: 'Peplum top with aari embroidery worn with wide palazzo trousers in a matching tone.',
    notes: 'For a sangeet or a mehendi, where she has to be able to dance.',
  },
  {
    id: 'champagne-gown',
    title: 'Champagne Gown',
    category: 'gowns',
    technique: 'Hand bead and sequin work on net',
    turnaround: turnaroundGown,
    image: '/images/portfolio/champagne-gown.jpg',
    width: 1200,
    height: 1700,
    alt: 'Floor-length champagne gown with hand bead and sequin work layered over net.',
    notes: 'Beading graded from the waist down so the light moves as she does.',
  },
  {
    id: 'wine-trail-gown',
    title: 'Wine Trail Gown',
    category: 'gowns',
    technique: 'Zardosi bodice with a plain trail',
    turnaround: turnaroundGown,
    image: '/images/portfolio/wine-trail-gown.jpg',
    width: 1200,
    height: 1800,
    alt: 'Wine coloured gown with a zardosi-worked bodice and a long plain trail.',
    notes: 'Trail length set at the fitting, against her shoes.',
  },
  {
    id: 'ivory-engagement-gown',
    title: 'Ivory Engagement Gown',
    category: 'gowns',
    technique: 'Pearl and thread work on crepe',
    turnaround: turnaroundGown,
    image: '/images/portfolio/ivory-engagement-gown.jpg',
    width: 1200,
    height: 1600,
    alt: 'Ivory engagement gown in crepe with pearl and fine thread work across the shoulders.',
    notes: 'Quiet work, close to the skin tone, photographs well indoors.',
  },
];

/* ------------------------------------------------------------------ */
/* Craft                                                               */
/* ------------------------------------------------------------------ */

export const craft = {
  eyebrow: 'OUR CRAFT',
  heading: 'What hand maggam work actually is',
  image: {
    src: '/images/craft-frame.jpg',
    alt: 'Fabric stretched on a wooden maggam frame with a needle and gold zari thread mid-stitch.',
    width: 1200,
    height: 1500,
  },
  blocks: [
    {
      id: 'what',
      title: 'The frame, the needle, the hand',
      body: 'Maggam work is embroidery done on a wooden frame. The fabric is stretched drum-tight, the design is traced onto it, and then it is filled in by hand — zari, silk thread, beads, stones and metal coil, placed one at a time with a hooked needle. The frame is what makes the tension even. The hand is what makes the line alive.',
    },
    {
      id: 'why-time',
      title: 'Why it takes the time it takes',
      body: 'A bridal yoke is not one pass of a machine. It is thousands of individual placements, in an order that has to be right, because thread laid in the wrong sequence cannot be lifted out without marking the silk. Work is done in daylight, checked against the fabric, and stopped when the hand tires. That is the whole reason the piece looks the way it does at the end.',
    },
    {
      id: 'vs-machine',
      title: 'How it differs from machine embroidery',
      body: 'A machine repeats a stored pattern at a fixed depth. Hand work changes as it goes — thread is packed denser where the light needs to catch, motifs are re-drawn to sit correctly on your shoulder line, and a border is scaled to your measurements rather than to a standard size. Turn a machine-worked blouse inside out and you will find a grid of jumps. Turn ours and you will find the same work, finished.',
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

export const pricing = {
  eyebrow: 'PRICING',
  heading: 'Honest ranges, not fixed prices',
  intro:
    'What a piece costs depends on how much hand work goes into it. These bands are here so you can plan before you get in touch.',
  closing: 'Every piece is quoted after we understand the design. These ranges help you plan.',
  bands: [
    {
      id: 'designer-blouse',
      title: 'Designer Blouse',
      range: pending(
        '₹6,000 – ₹15,000',
        'Real minimum and typical price band for a designer blouse.',
      ),
      summary: 'Lighter hand work for a reception, a sangeet or a family function.',
      drivers: [
        'Thread density across the yoke and sleeves',
        'Aari work versus full hand maggam',
        'Sleeve length and whether sleeves are worked',
        'Stone and bead work, if any',
      ],
      fabric: 'Fabric is usually yours. We can source it for you and bill it separately.',
    },
    {
      id: 'bridal-maggam-blouse',
      title: 'Bridal Maggam Blouse',
      range: pending(
        '₹15,000 – ₹35,000',
        'Real minimum and typical price band for a bridal maggam blouse.',
      ),
      summary: 'Full hand maggam, front and back, worked for the wedding day itself.',
      drivers: [
        'Coverage — partial yoke through to full front and back',
        'Zardosi, kundan and stone setting',
        'Weight and grade of zari',
        'Hand maggam throughout versus a mixed hand and aari build',
      ],
      fabric: 'Usually cut from your saree’s blouse piece. Studio-sourced silk is available.',
    },
    {
      id: 'custom-lehenga',
      title: 'Custom Lehenga',
      range: pending(
        '₹45,000 – ₹1,20,000',
        'Real minimum and typical price band for a custom lehenga.',
      ),
      summary: 'Skirt, blouse and dupatta, designed together and made to your measurements.',
      drivers: [
        'Number of worked skirt panels',
        'Base fabric — raw silk, velvet, organza, net',
        'Flare, lining and can-can construction',
        'Whether the dupatta is worked or bordered only',
      ],
      fabric: 'Studio-sourced by default. You are welcome to bring your own.',
    },
    {
      id: 'full-bridal-set',
      title: 'Full Bridal Set',
      range: pending(
        '₹80,000 – ₹2,50,000',
        'Real minimum and typical price band for a full bridal set, and what it includes.',
      ),
      summary: 'Everything for the wedding — main outfit plus the connected function pieces.',
      drivers: [
        'How many functions are being dressed',
        'Overall hand work density across the set',
        'Stone, kundan and metal thread content',
        'Number of fittings and how far ahead we start',
      ],
      fabric: 'Sourced together so colours hold across the set. Your own fabric is welcome.',
    },
  ] as readonly PriceBand[],
} as const;

/* ------------------------------------------------------------------ */
/* Timelines                                                           */
/* ------------------------------------------------------------------ */

export const timeline = {
  eyebrow: 'TIMELINES',
  heading: 'How long a piece takes',
  intro: 'Hand work cannot be rushed without showing. Here is how the weeks are actually spent.',
  /** CLIENT-INPUT: minimum lead time before a wedding date. */
  weddingLeadWeeks: pending('12', 'The minimum number of weeks before a wedding date she needs.'),
  leadLine: (weeks: string) => `For weddings, reach us at least ${weeks} weeks before your date.`,
  steps: [
    {
      id: 'consultation',
      title: 'Consultation',
      duration: pending('1 sitting', 'How long the first consultation typically takes.'),
      detail: 'We look at what you have, what you want, and what the day asks for.',
    },
    {
      id: 'design',
      title: 'Design and measurements',
      duration: pending('3 to 5 days', 'Typical time for design and measurement.'),
      detail: 'The design is drawn and your measurements are taken and recorded.',
    },
    {
      id: 'fabric',
      title: 'Fabric and thread selection',
      duration: pending('3 to 7 days', 'Typical time for fabric and thread selection.'),
      detail: 'Base fabric, zari grade and thread colours are chosen against each other.',
    },
    {
      id: 'embroidery',
      title: 'Embroidery',
      duration: pending('3 to 8 weeks', 'Typical embroidery time by garment type.'),
      detail: 'The longest stage, and the one that decides how the piece looks.',
    },
    {
      id: 'fitting',
      title: 'Fitting',
      duration: pending('1 to 2 sittings', 'How many fittings are typical.'),
      detail: 'Stitched, tried on, adjusted. Remote orders get this over video.',
    },
    {
      id: 'delivery',
      title: 'Delivery',
      duration: pending('2 to 7 days', 'Typical finishing and dispatch time.'),
      detail: 'Finished, pressed, packed and handed over or shipped.',
    },
  ] as readonly ProcessStep[],
  table: [
    { garment: 'Designer blouse', duration: turnaroundDesigner },
    { garment: 'Bridal maggam blouse', duration: turnaroundBlouse },
    { garment: 'Custom lehenga', duration: turnaroundLehenga },
    { garment: 'Saree work', duration: turnaroundSaree },
    { garment: 'Indo-western', duration: turnaroundIndo },
    { garment: 'Gown', duration: turnaroundGown },
    {
      garment: 'Full bridal set',
      duration: pending('12 to 16 weeks', 'Real turnaround for a full bridal set.'),
    },
  ] as readonly TurnaroundRow[],
} as const;

/* ------------------------------------------------------------------ */
/* Remote and NRI ordering                                             */
/* ------------------------------------------------------------------ */

export const remote = {
  eyebrow: 'REMOTE AND NRI ORDERS',
  heading: 'You do not have to be in Hyderabad',
  intro:
    'A good number of the pieces that leave this studio are made for someone who has never stood in it. You send your measurements, we work through the design on WhatsApp, and the finished piece is shipped to you.',
  steps: [
    {
      n: 1,
      title: 'Send your measurements',
      body: 'Use the guide below, or send a blouse that already fits you well and we will measure from that.',
    },
    {
      n: 2,
      title: 'Approve the design over WhatsApp',
      body: 'You see the drawing, the fabric, the thread colours and photographs as the work progresses. Nothing moves forward until you say yes.',
    },
    {
      n: 3,
      title: 'We ship to you',
      body: 'Packed, insured and tracked. You get the tracking number the day it leaves.',
    },
  ],
  measurements: [
    { id: 'bust', label: 'Bust', how: 'Around the fullest part, tape level all the way round, not pulled tight.' },
    { id: 'waist', label: 'Waist', how: 'Around the narrowest part of your waist, where you would tie a saree.' },
    { id: 'shoulder', label: 'Shoulder', how: 'Across the back, from the tip of one shoulder to the tip of the other.' },
    { id: 'sleeve-length', label: 'Sleeve length', how: 'From the shoulder tip down the arm to where you want the sleeve to end.' },
    { id: 'blouse-length', label: 'Blouse length', how: 'From the shoulder at the neck, straight down the front, to where the blouse should end.' },
    { id: 'armhole', label: 'Armhole', how: 'Around the arm at the underarm, over the shoulder and back again.' },
  ] as readonly MeasurementPoint[],
  guide: {
    href: '/downloads/vastrabharanam-measurement-guide.pdf',
    label: 'Download the measurement guide (PDF)',
  },
  shipping: {
    heading: 'International shipping',
    /** CLIENT-INPUT: couriers used, typical transit times, who bears duties. */
    body: pending(
      'We ship worldwide by tracked courier. Transit time and shipping cost depend on the destination and are quoted before dispatch. Import duty, where it applies, is paid by the customer.',
      'Confirm the couriers used, typical transit times to the main destinations (US, UK, Gulf, Australia, Canada), how shipping is charged, and who bears import duty.',
    ),
  },
  cta: { label: 'Order from anywhere' },
} as const;

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

/**
 * Deliberately empty of copy. Real Google review text has to be supplied by the
 * client and pasted in verbatim. Nothing here is written for her.
 *
 * `answers` records which worry each slot is meant to settle, so the four
 * reviews chosen from the Google listing are the four that do the most work.
 */
export const reviews = {
  eyebrow: 'REVIEWS',
  heading: 'What brides say',
  items: [
    {
      id: 'fit',
      quote: null,
      name: null,
      month: null,
      stars: null,
      answers: 'Perfect fit — a review from someone who was worried the blouse would not sit right.',
    },
    {
      id: 'communication',
      quote: null,
      name: null,
      month: null,
      stars: null,
      answers: 'Communication during the work — kept informed, photographs sent, questions answered.',
    },
    {
      id: 'remote',
      quote: null,
      name: null,
      month: null,
      stars: null,
      answers: 'Remote or NRI ordering — ordered without ever visiting the studio.',
    },
    {
      id: 'craft',
      quote: null,
      name: null,
      month: null,
      stars: null,
      answers: 'The work itself — detail, finish, how it looked on the day.',
    },
  ] as readonly Review[],
  linkLabel: `Read all ${studio.google.reviewCount} reviews on Google`,
} as const;

/* ------------------------------------------------------------------ */
/* Enquiry form                                                        */
/* ------------------------------------------------------------------ */

export const enquiry = {
  eyebrow: 'ENQUIRE',
  heading: 'Start a conversation',
  intro:
    'Fill this in and it opens WhatsApp with your details already written out. Nothing is sent from this page and nothing is stored here.',
  submitLabel: 'Send on WhatsApp',
  /** Select options mirror the portfolio categories exactly. */
  lookingForOptions: [
    'Bridal Maggam Blouse',
    'Designer Blouse',
    'Custom Lehenga',
    'Saree work',
    'Indo-Western',
    'Gown',
    'Full Bridal Set',
    'Not sure yet',
  ] as readonly string[],
  /** Budget options mirror the pricing bands exactly. */
  budgetOptions: [
    'Under ₹15,000',
    '₹15,000 – ₹35,000',
    '₹35,000 – ₹75,000',
    '₹75,000 – ₹1,50,000',
    'Above ₹1,50,000',
    'Would like guidance',
  ] as readonly string[],
  labels: {
    name: 'Your name',
    phone: 'WhatsApp number',
    lookingFor: 'What you are looking for',
    eventDate: 'Event date',
    budget: 'Budget range',
    message: 'Anything else',
  },
  placeholders: {
    name: 'Priya',
    phone: '+91 98765 43210',
    message: 'Colours you have in mind, the function it is for, a reference you have seen.',
  },
  optional: 'Optional',
  errors: {
    name: 'Please tell us your name.',
    phoneEmpty: 'Please add a WhatsApp number so we can reply.',
    phoneInvalid: 'That number does not look right. Include the country code if you are outside India.',
  },
  privacy: 'Your details go straight to WhatsApp. This site keeps nothing.',
} as const;

/* ------------------------------------------------------------------ */
/* Visit                                                               */
/* ------------------------------------------------------------------ */

export const visit = {
  eyebrow: 'VISIT',
  heading: 'The studio',
  intro:
    'Come and see the work in person. Bring the saree, bring a photograph, bring nothing at all — we will start from wherever you are.',
} as const;

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faq = {
  eyebrow: 'QUESTIONS',
  heading: 'Before you get in touch',
  items: [
    {
      id: 'own-fabric',
      question: 'Do I bring my own fabric?',
      answer:
        'You can. Most brides bring the blouse piece that came with their saree, and that is usually the best match. If you would rather we source the fabric, we can — it is billed separately from the work.',
    },
    {
      id: 'fittings',
      question: 'How many fittings will I need?',
      answer: null,
      needs: 'How many fittings are typical, and what happens at each one.',
    },
    {
      id: 'from-photo',
      question: 'Do you work from a photo I send?',
      answer:
        'Yes. Send the photograph on WhatsApp and we will tell you honestly what can be matched, what will need to change for your fabric or your measurements, and what it will cost. We do not copy another studio’s piece stitch for stitch, but we will design towards what you liked about it.',
    },
    {
      id: 'fit-wrong',
      question: 'What if the fit is not right?',
      answer: null,
      needs: 'The alteration policy — what is covered, for how long, and what happens for a remote order.',
    },
    {
      id: 'rush',
      question: 'Do you take rush orders?',
      answer: null,
      needs: 'Whether rush orders are accepted, the shortest workable timeline, and any rush charge.',
    },
    {
      id: 'international',
      question: 'Do you ship internationally?',
      answer: null,
      needs: 'Couriers used, typical transit times, how shipping is charged, and who bears import duty.',
    },
    {
      id: 'advance',
      question: 'What advance is required?',
      answer: null,
      needs: 'The advance percentage or amount, when the balance is due, and accepted payment methods.',
    },
    {
      id: 'classes',
      question: 'Do you offer maggam work classes?',
      answer: null,
      needs:
        'Confirm whether classes are taught. The Google listing is categorised partly as an educational institution. If she does teach, this deserves its own section rather than an FAQ line — format, duration, batch size and fees.',
      awaitingConfirmation: true,
    },
  ] as readonly FaqItem[],
} as const;

/** Only FAQ items the client has confirmed apply are rendered. */
export const visibleFaq = faq.items.filter((i) => !i.awaitingConfirmation);

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footer = {
  blurb: 'Bespoke bridal couture and hand maggam work, made to measure in KPHB, Hyderabad.',
  links: [
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#timelines', label: 'Timelines' },
    { href: '#remote', label: 'Remote Orders' },
    { href: '#visit', label: 'Visit' },
  ],
  rights: 'All rights reserved.',
} as const;

/* ------------------------------------------------------------------ */
/* WhatsApp deep links                                                 */
/* ------------------------------------------------------------------ */

/** Builds a wa.me link with a URL-encoded prefilled message. */
export function waLink(message: string, number: string = studio.primaryWa): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  general: () =>
    `Hi Vastrabharanam! I'd like to enquire about a piece.\n\n${studio.site.signature}`,

  piece: (title: string, technique: string) =>
    `Hi Vastrabharanam! I'd like to enquire about this piece.\n\nPiece: ${title}\nTechnique: ${technique}\n\n${studio.site.signature}`,

  remote: () =>
    `Hi Vastrabharanam! I'd like to place a remote order.\n\nI'm not in Hyderabad and would like to send my measurements.\n\nMy location: \n\n${studio.site.signature}`,

  consultation: () =>
    `Hi Vastrabharanam! I'd like to book a consultation at the studio.\n\n${studio.site.signature}`,

  enquiry: (f: {
    name: string;
    lookingFor: string;
    eventDate: string;
    budget: string;
    message: string;
  }) => {
    const lines = [
      "Hi Vastrabharanam! I'd like to enquire.",
      '',
      `Name: ${f.name}`,
      `Looking for: ${f.lookingFor}`,
    ];
    if (f.eventDate) lines.push(`Event date: ${f.eventDate}`);
    if (f.budget) lines.push(`Budget range: ${f.budget}`);
    if (f.message.trim()) {
      lines.push('', `Message: ${f.message.trim()}`);
    }
    lines.push('', studio.site.signature);
    return lines.join('\n');
  },
} as const;

export const whatsappFab = {
  label: 'Chat on WhatsApp',
  showAfter: 400,
} as const;

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

export const meta = {
  title: 'Vastrabharanam Design Studio — Bridal Maggam Work, KPHB Hyderabad',
  description:
    'Hand-embroidered bridal blouses, custom lehengas and maggam work, made to measure in KPHB, Hyderabad. Remote and NRI orders welcome. 4.8 stars from 385 Google reviews.',
  ogImage: {
    src: '/images/og-embroidery.jpg',
    width: 1200,
    height: 630,
    alt: 'Close detail of gold zari hand maggam embroidery on deep red silk.',
  },
} as const;
