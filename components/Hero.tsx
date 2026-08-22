import Image from 'next/image';
import { Star } from 'lucide-react';
import { hero, studio } from '@/lib/studio';
import { blurFor } from '@/lib/blur';
import { Pending } from './ToConfirm';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        width={hero.image.width}
        height={hero.image.height}
        priority
        quality={85}
        placeholder={blurFor(hero.image.src) ? 'blur' : 'empty'}
        blurDataURL={blurFor(hero.image.src)}
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Warm scrim — enough contrast for the text, not enough to flatten the thread. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/45 to-ink/80"
      />

      <div className="relative flex min-h-[100svh] items-end pb-16 pt-28 sm:items-center sm:pb-24">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold">
              {hero.eyebrow} · SINCE <Pending field={studio.foundedYear} />
            </p>

            <h1 className="mt-6 font-display text-[38px] leading-[1.08] text-ivory sm:text-[54px] md:text-[64px]">
              {hero.heading}
            </h1>

            <p className="mt-6 max-w-xl text-[16px] leading-body text-ivory/85 sm:text-[17px]">
              {hero.sub}
            </p>

            <ul className="mt-9 flex flex-col gap-2 text-[13px] text-ivory/80 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
              <li className="flex items-center gap-2">
                <Star size={14} className="fill-gold text-gold" aria-hidden />
                <span>
                  {studio.google.rating} stars · {studio.google.reviewCount} Google reviews
                </span>
              </li>
              <li aria-hidden className="hidden h-3 w-px bg-ivory/25 sm:block" />
              <li>
                Bespoke since <Pending field={studio.foundedYear} />
              </li>
              <li aria-hidden className="hidden h-3 w-px bg-ivory/25 sm:block" />
              <li>We ship worldwide</li>
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a href={hero.primary.href} className="btn-primary">
                {hero.primary.label}
              </a>
              <a
                href={hero.secondary.href}
                className="btn border border-ivory/40 text-ivory transition-colors hover:bg-ivory/10"
              >
                {hero.secondary.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
