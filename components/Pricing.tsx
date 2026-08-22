import { pricing } from '@/lib/studio';
import { SectionHead } from './Section';
import { Pending } from './ToConfirm';
import Reveal from './Reveal';

export default function Pricing() {
  return (
    <>
      <SectionHead
        id="pricing-heading"
        eyebrow={pricing.eyebrow}
        heading={pricing.heading}
        intro={pricing.intro}
      />

      <div className="mt-12 grid gap-px border bg-[rgba(176,141,79,0.2)] hairline sm:grid-cols-2">
        {pricing.bands.map((band, i) => (
          <Reveal key={band.id} as="article" delay={i * 70} className="flex flex-col bg-ivory p-7 sm:p-9">
            <h3 className="font-display text-[24px] text-wine">{band.title}</h3>

            <p className="mt-4 font-body text-[20px] text-ink">
              <Pending field={band.range} />
            </p>

            <p className="mt-4 text-sm leading-body text-muted">{band.summary}</p>

            <div className="mt-7 border-t pt-5 hairline">
              <p className="font-body text-[11px] uppercase tracking-eyebrow text-goldink">
                What moves the price
              </p>
              <ul className="mt-3 space-y-2">
                {band.drivers.map((d) => (
                  <li key={d} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                    <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-gold/60" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-[13px] leading-relaxed text-muted">{band.fabric}</p>
          </Reveal>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-xl text-center font-display text-[22px] leading-snug text-wine">
        {pricing.closing}
      </p>
    </>
  );
}
