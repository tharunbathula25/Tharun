import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Karla } from 'next/font/google';
import { meta, studio } from '@/lib/studio';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
  variable: '--font-display',
});

const body = Karla({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: new URL(studio.site.url),
  title: meta.title,
  description: meta.description,
  keywords: [
    'maggam work Hyderabad',
    'bridal blouse KPHB',
    'custom bridal lehenga Hyderabad',
    'hand embroidery bridal wear',
    'aari work blouse',
    'NRI bridal orders India',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: studio.site.url,
    siteName: `${studio.name} ${studio.descriptor}`,
    title: meta.title,
    description: meta.description,
    images: [
      {
        url: meta.ogImage.src,
        width: meta.ogImage.width,
        height: meta.ogImage.height,
        alt: meta.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: [meta.ogImage.src],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#FBF7F1',
  width: 'device-width',
  initialScale: 1,
};

/** Local business structured data, built from the same config the page uses. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: `${studio.name} ${studio.descriptor}`,
  description: meta.description,
  url: studio.site.url,
  telephone: studio.phones[0].display,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${studio.address.line1}, ${studio.address.line2}`,
    addressLocality: studio.address.city,
    postalCode: studio.address.postcode,
    addressCountry: 'IN',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: studio.google.rating,
    reviewCount: studio.google.reviewCount,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '11:00',
    closes: '20:00',
  },
  sameAs: [studio.social.instagram.url],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]
                     focus:rounded-sm focus:bg-wine focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
