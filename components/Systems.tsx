import { Reveal } from "./Reveal";
import { SystemIcon } from "./SystemIcon";
import { SYSTEMS } from "@/lib/content";

export function Systems() {
  return (
    <section
      id="systems"
      className="border-ink-line scroll-mt-24 border-t px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-chrome-dim text-xs tracking-[0.3em] uppercase">
            The four systems
          </p>
          <h2 className="headline mt-4 max-w-3xl text-5xl text-balance md:text-6xl">
            <span className="text-metal">We don&apos;t sell websites. </span>
            <span className="text-gold-metal">We install systems.</span>
          </h2>
          <p className="text-chrome-dim mt-5 max-w-xl leading-relaxed">
            Each one fixes a specific line on your scorecard. Most businesses
            need two. Nobody needs all four on day one.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {SYSTEMS.map((system, index) => (
            <Reveal key={system.id} delay={index * 80}>
              <article className="border-ink-line bg-ink-raised hover:border-gold/50 h-full rounded-2xl border p-8 transition-colors">
                <SystemIcon id={system.id} />
                <h3 className="headline text-metal mt-4 text-3xl">
                  {system.name}
                </h3>
                <p className="text-gold mt-2 font-medium">{system.promise}</p>
                <p className="text-chrome-dim mt-4 text-sm leading-relaxed">
                  {system.detail}
                </p>
                <ul className="border-ink-line mt-6 space-y-2 border-t pt-6">
                  {system.bullets.map((bullet) => (
                    <li key={bullet} className="text-chrome flex gap-3 text-sm">
                      <span className="text-gold">→</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
