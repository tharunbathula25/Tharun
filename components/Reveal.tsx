'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fade-up on scroll, per the design system: 500ms ease-out, and disabled
 * entirely under `prefers-reduced-motion` (handled in globals.css).
 *
 * Content is only ever hidden once the observer has confirmed the element is
 * off-screen, so nothing above the fold flashes blank on first paint. A
 * failsafe reveals everything after two seconds in case the observer never
 * reports — a printed page, a headless capture, an odd browser. Text must
 * never be trapped behind an animation.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article';
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        } else {
          // Off-screen: safe to hide, and now there is something to fade in.
          setArmed(true);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    io.observe(el);

    const failsafe = window.setTimeout(() => setShown(true), 2000);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const hidden = armed && !shown;

  return (
    <Tag
      ref={ref as never}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${armed ? 'reveal' : ''} ${hidden ? '' : 'reveal-in'} ${className}`}
    >
      {children}
    </Tag>
  );
}
