'use client';

import { useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { enquiry, waLink, waMessages } from '@/lib/studio';
import { SectionHead } from './Section';

type Errors = { name?: string; phone?: string };

/**
 * Accepts the forms a bride actually types: 9618249379, +91 96182 49379,
 * 0096182..., with spaces, dashes or brackets. Requires 7 to 15 digits, which
 * covers every country's national number length.
 */
function validPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

/** 2026-11-14 → 14 Nov 2026. Falls back to the raw value if it will not parse. */
function formatDate(value: string): string {
  if (!value) return '';
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function EnquiryForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [lookingFor, setLookingFor] = useState<string>(enquiry.lookingForOptions[0]);
  const [eventDate, setEventDate] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  /** An error stops being true the moment the bride starts fixing it. */
  const clearError = (field: keyof Errors) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const next: Errors = {};
    if (!name.trim()) next.name = enquiry.errors.name;
    if (!phone.trim()) next.phone = enquiry.errors.phoneEmpty;
    else if (!validPhone(phone)) next.phone = enquiry.errors.phoneInvalid;

    setErrors(next);

    if (next.name) {
      nameRef.current?.focus();
      return;
    }
    if (next.phone) {
      phoneRef.current?.focus();
      return;
    }

    const text = waMessages.enquiry({
      name: name.trim(),
      lookingFor,
      eventDate: formatDate(eventDate),
      budget,
      message,
    });

    window.open(waLink(text), '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
      <div>
        <SectionHead
          id="enquiry-heading"
          eyebrow={enquiry.eyebrow}
          heading={enquiry.heading}
          intro={enquiry.intro}
        />
        <p className="mt-8 max-w-sm border-l-2 border-gold/40 pl-4 text-sm text-muted">
          {enquiry.privacy}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="grid gap-5">
        <div>
          <label htmlFor="enq-name" className="label">
            {enquiry.labels.name}
          </label>
          <input
            id="enq-name"
            ref={nameRef}
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError('name');
            }}
            placeholder={enquiry.placeholders.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'enq-name-error' : undefined}
            className={`field ${errors.name ? 'field-error' : ''}`}
          />
          {errors.name ? (
            <p id="enq-name-error" role="alert" className="mt-2 text-sm text-wine">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="enq-phone" className="label">
            {enquiry.labels.phone}
          </label>
          <input
            id="enq-phone"
            ref={phoneRef}
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              clearError('phone');
            }}
            placeholder={enquiry.placeholders.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'enq-phone-error' : undefined}
            className={`field ${errors.phone ? 'field-error' : ''}`}
          />
          {errors.phone ? (
            <p id="enq-phone-error" role="alert" className="mt-2 text-sm text-wine">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="enq-looking" className="label">
            {enquiry.labels.lookingFor}
          </label>
          <select
            id="enq-looking"
            name="lookingFor"
            value={lookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            className="field"
          >
            {enquiry.lookingForOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="enq-date" className="label">
              {enquiry.labels.eventDate}{' '}
              <span className="text-muted">({enquiry.optional})</span>
            </label>
            <input
              id="enq-date"
              type="date"
              name="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="field"
            />
          </div>

          <div>
            <label htmlFor="enq-budget" className="label">
              {enquiry.labels.budget}{' '}
              <span className="text-muted">({enquiry.optional})</span>
            </label>
            <select
              id="enq-budget"
              name="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="field"
            >
              <option value="">Select a range</option>
              {enquiry.budgetOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="enq-message" className="label">
            {enquiry.labels.message} <span className="text-muted">({enquiry.optional})</span>
          </label>
          <textarea
            id="enq-message"
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={enquiry.placeholders.message}
            className="field resize-y"
          />
        </div>

        {/* Never disabled — people should be able to click and see what is missing. */}
        <button type="submit" className="btn-primary w-full sm:w-auto sm:self-start">
          <MessageCircle size={17} aria-hidden />
          {enquiry.submitLabel}
        </button>
      </form>
    </div>
  );
}
