import { ExternalLink, Star } from 'lucide-react';
import { read, reviews, studio } from '@/lib/studio';
import { SectionHead } from './Section';
import { MissingContent } from './ToConfirm';
import Reveal from './Reveal';

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          aria-hidden
          className={i < n ? 'fill-gold text-gold' : 'text-gold/25'}
        />
      ))}
    </span>
  );
}

export default function Reviews() {
  const listing = read(studio.google.listingUrl);

  return (
    <>
      <SectionHead id="reviews-heading" eyebrow={reviews.eyebrow} heading={reviews.heading} />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.items.map((r, i) => (
          <Reveal key={r.id} as="article" delay={i * 70} className="border-t pt-6 hairline">
            {r.quote ? (
              <>
                {r.stars ? <Stars n={r.stars} /> : null}
                <blockquote className="mt-4 text-[15px] leading-body text-ink/85">
                  “{r.quote}”
                </blockquote>
                <footer className="mt-5 font-body text-[13px] text-muted">
                  {r.name}
                  {r.month ? ` · ${r.month}` : ''}
                </footer>
              </>
            ) : (
              /* No review copy is written for the studio. It is pasted in verbatim
                 from her Google listing, or this slot does not ship. */
              <MissingContent
                needs={`Paste a real Google review here, verbatim, with the reviewer's first name and month. Pick one about: ${r.answers}`}
              />
            )}
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-start gap-4 border-t pt-8 hairline sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-3 font-display text-[24px] text-wine">
          <Star size={18} className="fill-gold text-gold" aria-hidden />
          {studio.google.rating} from {studio.google.reviewCount} reviews on Google
        </p>
        <a
          href={listing.value}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-sm text-wine underline
                     decoration-gold/50 underline-offset-4 hover:decoration-wine"
        >
          {reviews.linkLabel}
          <ExternalLink size={14} aria-hidden />
        </a>
      </div>

      {listing.unconfirmed ? (
        <div className="mt-6">
          <MissingContent
            needs={studio.google.listingUrl.status === 'pending' ? studio.google.listingUrl.needs : ''}
          />
        </div>
      ) : null}
    </>
  );
}
