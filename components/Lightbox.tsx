'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, MessageCircle, X } from 'lucide-react';
import type { PortfolioPiece } from '@/lib/studio';
import { waLink, waMessages } from '@/lib/studio';
import { blurFor } from '@/lib/blur';
import { Pending } from './ToConfirm';

const SWIPE_THRESHOLD = 48;

export default function Lightbox({
  pieces,
  index,
  onClose,
  onIndex,
}: {
  pieces: readonly PortfolioPiece[];
  index: number;
  onClose: () => void;
  onIndex: (next: number) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusTo = useRef<Element | null>(null);
  const touchStartX = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const piece = pieces[index];
  const count = pieces.length;

  const next = useCallback(() => onIndex((index + 1) % count), [index, count, onIndex]);
  const prev = useCallback(() => onIndex((index - 1 + count) % count), [index, count, onIndex]);

  useEffect(() => setMounted(true), []);

  // Focus management: remember what was focused, move focus in, restore on close.
  useEffect(() => {
    restoreFocusTo.current = document.activeElement;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      (restoreFocusTo.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  // Keyboard: Escape closes, arrows navigate, Tab is trapped inside the panel.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [next, prev, onClose]);

  if (!piece) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${piece.title} — piece ${index + 1} of ${count}`}
      className={`fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-3 transition-opacity
                  duration-200 sm:p-6 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        if (start === null) return;
        const dx = (e.changedTouches[0]?.clientX ?? start) - start;
        if (Math.abs(dx) > SWIPE_THRESHOLD) (dx < 0 ? next : prev)();
        touchStartX.current = null;
      }}
    >
      <div
        ref={panelRef}
        className="relative flex max-h-full w-full max-w-5xl flex-col overflow-y-auto bg-ivory
                   md:flex-row md:overflow-hidden"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-2 top-2 z-10 grid h-10 w-10 place-items-center rounded-full
                     bg-ivory/90 text-wine transition-colors hover:bg-ivory md:right-3 md:top-3"
        >
          <X size={20} aria-hidden />
        </button>

        <div className="relative shrink-0 bg-ink md:w-[58%]">
          <Image
            key={piece.id}
            src={piece.image}
            alt={piece.alt}
            width={piece.width}
            height={piece.height}
            quality={90}
            loading="eager"
            placeholder={blurFor(piece.image) ? 'blur' : 'empty'}
            blurDataURL={blurFor(piece.image)}
            sizes="(max-width: 768px) 100vw, 58vw"
            className="h-auto max-h-[46vh] w-full object-contain md:max-h-[86vh]"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-8">
          <div>
            <p className="eyebrow">
              {index + 1} / {count}
            </p>
            <h3 className="mt-3 text-[26px] leading-tight sm:text-[30px]">{piece.title}</h3>

            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-body text-[11px] uppercase tracking-eyebrow text-muted">
                  Technique
                </dt>
                <dd className="mt-1 text-ink">{piece.technique}</dd>
              </div>
              <div>
                <dt className="font-body text-[11px] uppercase tracking-eyebrow text-muted">
                  Approximate turnaround
                </dt>
                <dd className="mt-1 text-ink">
                  <Pending field={piece.turnaround} />
                </dd>
              </div>
            </dl>

            <p className="mt-6 text-sm leading-body text-muted">{piece.notes}</p>
          </div>

          <div className="space-y-4">
            {/* One tap from falling for a piece to messaging about that piece. */}
            <a
              href={waLink(waMessages.piece(piece.title, piece.technique))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full"
            >
              <MessageCircle size={17} aria-hidden />
              Enquire about this piece
            </a>

            <div className="flex items-center justify-between border-t pt-4 hairline">
              <button
                type="button"
                onClick={prev}
                className="inline-flex items-center gap-2 py-1 text-sm text-wine transition-opacity hover:opacity-70"
              >
                <ArrowLeft size={16} aria-hidden />
                Previous
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-2 py-1 text-sm text-wine transition-opacity hover:opacity-70"
              >
                Next
                <ArrowRight size={16} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
