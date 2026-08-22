'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { categories, portfolio, type CategoryId } from '@/lib/studio';
import { blurFor } from '@/lib/blur';
import { SectionHead } from './Section';
import Lightbox from './Lightbox';

export default function Portfolio() {
  const [active, setActive] = useState<CategoryId>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (active === 'all' ? portfolio : portfolio.filter((p) => p.category === active)),
    [active],
  );

  return (
    <>
      <SectionHead
        id="portfolio-heading"
        eyebrow="PORTFOLIO"
        heading="The work"
        intro="Every piece here was made for one person. Browse by garment, then open anything you like to see the technique and message about that piece directly."
      />

      <div className="mt-10 -mx-6 overflow-x-auto px-6 pb-2 sm:mx-0 sm:px-0">
        <ul aria-label="Filter portfolio by garment" className="flex gap-2 sm:flex-wrap">
          {categories.map((cat) => {
            const isActive = cat.id === active;
            return (
              <li key={cat.id} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(cat.id)}
                  className={`rounded-full border px-4 py-2 font-body text-[13px] transition-colors ${
                    isActive
                      ? 'border-wine bg-wine text-ivory'
                      : 'border-muted/25 text-ink hover:border-wine/50 hover:text-wine'
                  }`}
                >
                  {cat.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? 'piece' : 'pieces'}
      </p>

      {/* CSS columns give a true masonry flow without a layout library. */}
      <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {visible.map((piece, i) => (
          <button
            key={piece.id}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open ${piece.title}`}
            className="group mb-5 block w-full break-inside-avoid overflow-hidden bg-blush/50 text-left"
          >
            <span className="relative block overflow-hidden">
              <Image
                src={piece.image}
                alt={piece.alt}
                width={piece.width}
                height={piece.height}
                quality={85}
                loading="lazy"
                placeholder={blurFor(piece.image) ? 'blur' : 'empty'}
                blurDataURL={blurFor(piece.image)}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent
                           px-4 pb-4 pt-12 opacity-0 transition-opacity duration-300
                           group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <span className="block font-display text-[20px] text-ivory">{piece.title}</span>
                <span className="mt-1 block font-body text-[12px] text-ivory/75">
                  {piece.technique}
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>

      {openIndex !== null ? (
        <Lightbox
          pieces={visible}
          index={openIndex}
          onIndex={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      ) : null}
    </>
  );
}
