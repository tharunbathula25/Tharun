import { Monogram } from "./Monogram";
import { Reveal } from "./Reveal";
import { BOOKING_LINK, WHATSAPP_LINK } from "@/lib/content";

export function BookCta() {
  return (
    <section
      id="book"
      className="border-ink-line bg-ink scroll-mt-24 border-t px-6 py-28 text-center"
    >
      <Reveal>
        <div className="mx-auto max-w-3xl">
          <h2 className="headline text-6xl text-balance md:text-7xl">
            <span className="text-metal">Ready to build your </span>
            <span className="text-gold-metal">5-star</span>
            <span className="text-metal"> reputation?</span>
          </h2>

          <p className="text-chrome-dim mx-auto mt-6 max-w-lg leading-relaxed">
            Bring your score to the call. Twenty minutes, no deck — we go
            through what&apos;s leaking and what it takes to close it.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="border-gold text-gold hover:bg-gold hover:text-ink rounded-full border px-8 py-4 font-semibold transition-colors"
            >
              Book the audit call
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-chrome-dim hover:text-chrome px-6 py-4 text-sm transition-colors"
            >
              or message on WhatsApp →
            </a>
          </div>

          <div className="mt-16 flex justify-center">
            <Monogram size="lg" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
