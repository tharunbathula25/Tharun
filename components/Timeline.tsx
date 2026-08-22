import { timeline, read } from '@/lib/studio';
import { SectionHead } from './Section';
import { Pending } from './ToConfirm';
import Reveal from './Reveal';

export default function Timeline() {
  const lead = read(timeline.weddingLeadWeeks);

  return (
    <>
      <SectionHead
        id="timelines-heading"
        eyebrow={timeline.eyebrow}
        heading={timeline.heading}
        intro={timeline.intro}
      />

      {/* Horizontal stepper on desktop, vertical on a phone where horizontal cannot work. */}
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        {timeline.steps.map((step, i) => (
          <Reveal key={step.id} as="li" delay={i * 70} className="relative lg:pt-6">
            <span
              aria-hidden
              className="absolute left-0 top-0 hidden h-px w-full bg-[rgba(176,141,79,0.35)] lg:block"
            />
            <span
              aria-hidden
              className="absolute left-0 top-0 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gold lg:block"
            />
            <p className="font-body text-[11px] uppercase tracking-eyebrow text-goldink">
              Step {i + 1}
            </p>
            <h3 className="mt-2 font-display text-[20px] leading-snug text-wine">{step.title}</h3>
            <p className="mt-2 font-body text-[13px] text-ink">
              <Pending field={step.duration} />
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">{step.detail}</p>
          </Reveal>
        ))}
      </ol>

      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20">
        <div>
          <h3 className="font-display text-[24px] text-wine">Turnaround by garment</h3>
          <table className="mt-6 w-full border-collapse text-left">
            <caption className="sr-only">
              Approximate turnaround time for each type of garment
            </caption>
            <thead>
              <tr className="border-b hairline">
                <th scope="col" className="py-3 font-body text-[11px] uppercase tracking-eyebrow text-muted">
                  Garment
                </th>
                <th scope="col" className="py-3 font-body text-[11px] uppercase tracking-eyebrow text-muted">
                  Typical
                </th>
              </tr>
            </thead>
            <tbody>
              {timeline.table.map((row) => (
                <tr key={row.garment} className="border-b last:border-b-0 hairline">
                  <th scope="row" className="py-4 pr-4 font-body text-[15px] font-normal text-ink">
                    {row.garment}
                  </th>
                  <td className="py-4 font-body text-[15px] text-ink">
                    <Pending field={row.duration} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Reveal className="self-start border-l-2 border-wine bg-blush/50 p-8">
          <p className="font-display text-[26px] leading-snug text-wine sm:text-[30px]">
            {timeline.leadLine(lead.value)}
          </p>
          {lead.unconfirmed ? (
            <p className="mt-4 font-body text-[11px] uppercase tracking-eyebrow text-goldink">
              Lead time to confirm
            </p>
          ) : null}
          <p className="mt-4 text-sm leading-body text-muted">
            Earlier is better. Starting sooner means more room for fittings and fewer decisions
            made in a hurry.
          </p>
        </Reveal>
      </div>
    </>
  );
}
