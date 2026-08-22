import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { read, studio, visit, waLink, waMessages } from '@/lib/studio';
import { SectionHead } from './Section';
import { MissingContent } from './ToConfirm';

export default function Visit() {
  const map = read(studio.google.mapEmbedUrl);

  return (
    <>
      <SectionHead id="visit-heading" eyebrow={visit.eyebrow} heading={visit.heading} intro={visit.intro} />

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <dl className="space-y-8">
            <div className="grid grid-cols-[18px_minmax(0,1fr)] gap-x-4">
              <MapPin size={18} className="mt-1 row-span-2 shrink-0 text-gold" aria-hidden />
              <dt className="font-body text-[11px] uppercase tracking-eyebrow text-muted">Address</dt>
              <dd className="mt-2 text-[15px] leading-body text-ink">
                {studio.address.line1}
                <br />
                {studio.address.line2}
                <br />
                {studio.address.city} {studio.address.postcode}
              </dd>
            </div>

            <div className="grid grid-cols-[18px_minmax(0,1fr)] gap-x-4">
              <Clock size={18} className="mt-1 row-span-3 shrink-0 text-gold" aria-hidden />
              <dt className="font-body text-[11px] uppercase tracking-eyebrow text-muted">Hours</dt>
              <dd className="mt-2 text-[15px] leading-body text-ink">
                {studio.hours.days}, {studio.hours.open} – {studio.hours.close}
              </dd>
              <dd className="col-start-2 mt-2 text-sm leading-relaxed text-muted">
                {studio.hours.note}
              </dd>
            </div>

            <div className="grid grid-cols-[18px_minmax(0,1fr)] gap-x-4">
              <Phone size={18} className="mt-1 row-span-2 shrink-0 text-gold" aria-hidden />
              <dt className="font-body text-[11px] uppercase tracking-eyebrow text-muted">
                Call or WhatsApp
              </dt>
              <dd className="mt-2 space-y-1">
                {studio.phones.map((p) => (
                  <div key={p.wa}>
                    <a
                      href={`tel:+${p.wa}`}
                      className="text-[15px] text-ink underline decoration-gold/40 underline-offset-4 hover:text-wine"
                    >
                      {p.display}
                    </a>
                  </div>
                ))}
              </dd>
            </div>
          </dl>

          <a
            href={waLink(waMessages.consultation())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-10 w-full sm:w-auto"
          >
            <MessageCircle size={17} aria-hidden />
            Book a consultation
          </a>
        </div>

        <div className="order-1 lg:order-2">
          <div className="aspect-[4/3] w-full overflow-hidden border hairline">
            <iframe
              src={map.value}
              title={`Map showing ${studio.name} ${studio.descriptor} at ${studio.address.full}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
          {map.unconfirmed ? (
            <div className="mt-4">
              <MissingContent
                needs={studio.google.mapEmbedUrl.status === 'pending' ? studio.google.mapEmbedUrl.needs : ''}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
