import { Reveal } from "./Reveal";
import { PROOF } from "@/lib/content";

export function Proof() {
  return (
    <section
      id="proof"
      className="border-ink-line scroll-mt-24 border-t px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-chrome-dim text-xs tracking-[0.3em] uppercase">
            Proof
          </p>
          <h2 className="headline mt-4 max-w-3xl text-5xl text-balance md:text-6xl">
            <span className="text-metal">Same business. </span>
            <span className="text-gold-metal">Different numbers.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PROOF.map((item, index) => (
            <Reveal key={item.business} delay={index * 80}>
              <article className="border-ink-line bg-ink-raised h-full rounded-2xl border p-8">
                <p className="text-chrome text-sm font-medium">{item.business}</p>
                <p className="text-chrome-dim mt-1 text-xs">{item.category}</p>

                <p className="text-chrome-dim mt-8 text-xs tracking-[0.2em] uppercase">
                  {item.metric}
                </p>
                <div className="mt-3 flex items-end gap-4">
                  <span className="font-display text-crimson-bright text-5xl leading-none line-through decoration-2">
                    {item.before}
                  </span>
                  <span className="text-chrome-dim pb-1 text-2xl">→</span>
                  <span className="font-display text-gold-metal text-6xl leading-none">
                    {item.after}
                  </span>
                </div>

                <p className="border-ink-line text-chrome-dim mt-8 border-t pt-4 text-xs">
                  In {item.window}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
