import { Download, Globe, MessageCircle } from 'lucide-react';
import { remote, waLink, waMessages } from '@/lib/studio';
import { SectionHead } from './Section';
import { Pending } from './ToConfirm';
import MeasurementDiagram from './MeasurementDiagram';
import Reveal from './Reveal';

export default function RemoteOrdering() {
  return (
    <>
      <SectionHead
        id="remote-heading"
        eyebrow={remote.eyebrow}
        heading={remote.heading}
        intro={remote.intro}
      />

      <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
        {remote.steps.map((step, i) => (
          <Reveal key={step.n} as="li" delay={i * 90} className="border-t pt-6 hairline">
            <p className="font-display text-[34px] leading-none text-goldink">
              {String(step.n).padStart(2, '0')}
            </p>
            <h3 className="mt-4 font-display text-[22px] text-wine">{step.title}</h3>
            <p className="mt-3 text-[15px] leading-body text-ink/85">{step.body}</p>
          </Reveal>
        ))}
      </ol>

      <div className="mt-20 grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal className="bg-ivory p-8">
          <MeasurementDiagram className="mx-auto h-auto w-full max-w-[320px]" />
        </Reveal>

        <div>
          <h3 className="font-display text-[26px] text-wine">What to measure</h3>
          <p className="mt-3 text-[15px] leading-body text-muted">
            Measure over a well-fitting blouse, not over loose clothing, and keep the tape level.
            If you would rather not measure yourself, post us a blouse that fits you well and we
            will take everything from it.
          </p>

          <dl className="mt-8 divide-y divide-[rgba(176,141,79,0.2)] border-y border-[rgba(176,141,79,0.2)]">
            {remote.measurements.map((m) => (
              <div key={m.id} className="grid gap-1 py-4 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-6">
                <dt className="font-body text-[15px] text-wine">{m.label}</dt>
                <dd className="text-[14px] leading-relaxed text-ink/85">{m.how}</dd>
              </div>
            ))}
          </dl>

          <a
            href={remote.guide.href}
            download
            className="btn-ghost mt-8 w-full sm:w-auto"
          >
            <Download size={16} aria-hidden />
            {remote.guide.label}
          </a>
        </div>
      </div>

      <div className="mt-16 grid gap-10 border-t pt-12 hairline md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-16">
        <div className="max-w-xl">
          <h3 className="flex items-center gap-3 font-display text-[22px] text-wine">
            <Globe size={20} className="text-gold" aria-hidden />
            {remote.shipping.heading}
          </h3>
          <p className="mt-3 text-[15px] leading-body text-ink/85">
            <Pending field={remote.shipping.body} />
          </p>
        </div>

        <a
          href={waLink(waMessages.remote())}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full md:w-auto"
        >
          <MessageCircle size={17} aria-hidden />
          {remote.cta.label}
        </a>
      </div>
    </>
  );
}
