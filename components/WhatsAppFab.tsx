'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { waLink, waMessages, whatsappFab } from '@/lib/studio';

export default function WhatsAppFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setShow(window.scrollY > whatsappFab.showAfter);
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

  return (
    // A landmark, so the button is not page content stranded outside every region.
    <aside aria-label="Quick contact">
      <a
        href={waLink(waMessages.general())}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={whatsappFab.label}
        // While faded out it must not be reachable by keyboard or screen reader.
        aria-hidden={!show}
        tabIndex={show ? 0 : -1}
        // Bottom-right, above the iOS safe area. On a phone the enquiry form's
        // submit button is full-width and centred, so this never covers it.
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
        className={`fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full
                    bg-wine text-ivory shadow-lift transition-all duration-300 hover:bg-[#571825] ${
                      show
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none translate-y-3 opacity-0'
                    }`}
      >
        <MessageCircle size={24} aria-hidden />
      </a>
    </aside>
  );
}
