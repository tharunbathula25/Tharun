'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { faq, visibleFaq } from '@/lib/studio';
import { SectionHead } from './Section';
import { MissingContent } from './ToConfirm';

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-20">
      <SectionHead id="faq-heading" eyebrow={faq.eyebrow} heading={faq.heading} />

      <div className="border-t hairline">
        {visibleFaq.map((item) => {
          const isOpen = open === item.id;
          return (
            <div key={item.id} className="border-b hairline">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  id={`faq-button-${item.id}`}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                >
                  <span className="font-body text-[16px] leading-snug text-ink">{item.question}</span>
                  <span className="mt-0.5 shrink-0 text-gold" aria-hidden>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
              </h3>
              <div
                id={`faq-panel-${item.id}`}
                role="region"
                aria-labelledby={`faq-button-${item.id}`}
                hidden={!isOpen}
                className="pb-6 pr-10"
              >
                {item.answer ? (
                  <p className="text-[15px] leading-body text-muted">{item.answer}</p>
                ) : (
                  <MissingContent needs={item.needs ?? 'Answer to be supplied by the client.'} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
