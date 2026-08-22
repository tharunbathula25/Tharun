import { Instagram, MessageCircle } from 'lucide-react';
import { footer, studio, waLink, waMessages } from '@/lib/studio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-ivory hairline">
      <div className="shell grid gap-12 py-16 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
        <div>
          <p className="font-display text-[20px] tracking-[0.14em] text-wine sm:text-[22px] sm:tracking-wordmark">
            {studio.wordmark}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-body text-muted">{footer.blurb}</p>

          {/* Only platforms she actually uses. Nothing is linked that does not exist. */}
          <div className="mt-6 flex items-center gap-3">
            <a
              href={studio.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram — ${studio.social.instagram.handle}`}
              className="grid h-10 w-10 place-items-center border text-wine transition-colors hairline hover:bg-blush/60"
            >
              <Instagram size={17} aria-hidden />
            </a>
            {studio.social.facebook ? (
              <a
                href={studio.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center border text-wine transition-colors hairline hover:bg-blush/60"
              >
                {studio.social.facebook.name}
              </a>
            ) : null}
            <a
              href={studio.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-muted transition-colors hover:text-wine"
            >
              {studio.social.instagram.handle}
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-body text-[11px] uppercase tracking-eyebrow text-goldink">Explore</h2>
          <ul className="mt-5 space-y-3">
            {footer.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="font-body text-sm text-ink transition-colors hover:text-wine">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-body text-[11px] uppercase tracking-eyebrow text-goldink">Get in touch</h2>
          <ul className="mt-5 space-y-3">
            {studio.phones.map((p) => (
              <li key={p.wa}>
                <a
                  href={waLink(waMessages.general(), p.wa)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-sm text-ink transition-colors hover:text-wine"
                >
                  <MessageCircle size={14} className="text-gold" aria-hidden />
                  {p.display}
                </a>
              </li>
            ))}
            {/* studio.email is deliberately null until a real address is confirmed —
                the field is omitted rather than filled with a placeholder. */}
            {studio.email ? (
              <li>
                <a
                  href={`mailto:${studio.email}`}
                  className="font-body text-sm text-ink transition-colors hover:text-wine"
                >
                  {studio.email}
                </a>
              </li>
            ) : null}
          </ul>

          <address className="mt-6 not-italic text-sm leading-body text-muted">
            {studio.address.line1}
            <br />
            {studio.address.line2}
            <br />
            {studio.address.city} {studio.address.postcode}
          </address>
        </div>
      </div>

      <div className="border-t hairline">
        <div className="shell flex flex-col gap-2 py-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {studio.name} {studio.descriptor}. {footer.rights}
          </p>
          <p>{studio.locality}</p>
        </div>
      </div>
    </footer>
  );
}
