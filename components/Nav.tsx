'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navCta, navLinks, studio } from '@/lib/studio';

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setSolid(window.scrollY > 80);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Lock the page while the drawer is open, and close it on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b bg-ivory/95 backdrop-blur-sm hairline' : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="shell flex h-[68px] items-center justify-between gap-3 sm:gap-4"
      >
        <a
          href="#top"
          className={`whitespace-nowrap font-display text-[20px] tracking-[0.1em] transition-colors
                      sm:text-[22px] sm:tracking-wordmark ${
                        solid ? 'text-wine' : 'text-ivory drop-shadow-sm'
                      }`}
        >
          {studio.wordmark}
        </a>

        <div className="hidden items-center gap-9 md:flex">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`font-body text-sm transition-colors ${
                    solid
                      ? 'text-ink hover:text-wine'
                      : 'text-ivory/90 drop-shadow-sm hover:text-ivory'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={navCta.href} className="btn-primary px-6 py-2.5 text-[13px]">
            {navCta.label}
          </a>
        </div>

        {/* Mobile: the consultation pill never leaves the bar. */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href={navCta.href}
            aria-label={navCta.label}
            className="btn-primary whitespace-nowrap px-4 py-2 text-[12px]"
          >
            {navCta.shortLabel}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`grid h-10 w-10 place-items-center rounded-sm transition-colors ${
              solid || open ? 'text-wine' : 'text-ivory'
            }`}
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t bg-ivory hairline md:hidden"
      >
        <ul className="shell flex flex-col py-2">
          {navLinks.map((link) => (
            <li key={link.href} className="border-b last:border-b-0 hairline">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-4 font-body text-base text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
