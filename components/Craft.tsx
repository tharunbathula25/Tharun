import Image from 'next/image';
import { craft } from '@/lib/studio';
import { blurFor } from '@/lib/blur';
import Reveal from './Reveal';

export default function Craft() {
  return (
    <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
      <Reveal className="relative">
        <Image
          src={craft.image.src}
          alt={craft.image.alt}
          width={craft.image.width}
          height={craft.image.height}
          quality={85}
          loading="lazy"
          placeholder={blurFor(craft.image.src) ? 'blur' : 'empty'}
          blurDataURL={blurFor(craft.image.src)}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-auto w-full"
        />
      </Reveal>

      <div>
        <p className="eyebrow">{craft.eyebrow}</p>
        <h2 id="craft-heading" className="mt-4 text-[30px] leading-tight sm:text-[38px] md:text-[42px]">
          {craft.heading}
        </h2>

        <div className="mt-10 space-y-9">
          {craft.blocks.map((block, i) => (
            <Reveal key={block.id} delay={i * 90}>
              <h3 className="font-display text-[22px] text-wine">{block.title}</h3>
              <p className="mt-3 text-[15px] leading-body text-ink/85">{block.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
