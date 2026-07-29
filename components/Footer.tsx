import { INSTAGRAM_LINK, SERVICE_BAR, TAGLINE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-ink-line border-t">
      {/* Service bar — Variant A from the brand system. */}
      <div className="border-ink-line border-b">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-5">
          {SERVICE_BAR.map((service) => (
            <span key={service} className="text-chrome text-xs tracking-wide">
              {service}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-chrome-dim text-sm">{TAGLINE}</p>
        <div className="flex items-center gap-6">
          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-chrome-dim hover:text-gold text-sm transition-colors"
          >
            Instagram
          </a>
          <span className="text-gold font-display text-sm tracking-[0.2em]">
            THARUN AI STUDIO
          </span>
        </div>
      </div>
    </footer>
  );
}
