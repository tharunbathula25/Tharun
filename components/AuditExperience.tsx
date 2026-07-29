"use client";

import { useEffect, useRef, useState } from "react";
import { Scorecard } from "./Scorecard";
import type { AuditResult } from "@/lib/audit";

const SCAN_STEPS = [
  "Finding your listing…",
  "Reading your reviews…",
  "Checking your website and booking…",
  "Comparing you to businesses nearby…",
];

/** The audit has to feel like work, but never take longer than it needs to. */
const MIN_SCAN_MS = 1600;

export function AuditExperience() {
  const [query, setQuery] = useState("");
  const [scanning, setScanning] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scanning) return;
    const timer = setInterval(
      () => setStep((current) => Math.min(current + 1, SCAN_STEPS.length - 1)),
      MIN_SCAN_MS / SCAN_STEPS.length,
    );
    return () => clearInterval(timer);
  }, [scanning]);

  useEffect(() => {
    if (result) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  async function runAudit(event: React.FormEvent) {
    event.preventDefault();
    if (query.trim().length < 2 || scanning) return;

    setScanning(true);
    setStep(0);
    setError(null);
    setResult(null);

    try {
      const [response] = await Promise.all([
        fetch("/api/audit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        }),
        new Promise((resolve) => setTimeout(resolve, MIN_SCAN_MS)),
      ]);

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
        return;
      }

      setResult(data as AuditResult);
    } catch {
      setError("Couldn't reach the audit service. Try again.");
    } finally {
      setScanning(false);
    }
  }

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center px-6 pt-32 pb-20"
    >
      {/* Faint gold pool behind the fold — the only light in the room. */}
      <div
        aria-hidden
        className="bg-gold/10 pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[520px] w-[820px] max-w-full -translate-x-1/2 rounded-full blur-[140px]"
      />

      <div className="mx-auto w-full max-w-4xl">
        <p className="text-chrome-dim text-center text-xs tracking-[0.3em] uppercase">
          Free · 20 seconds · No signup
        </p>

        <h1 className="headline mt-6 text-center text-6xl text-balance sm:text-7xl md:text-8xl">
          <span className="text-metal">Find out why they chose </span>
          <span className="text-crimson-bright">someone else.</span>
        </h1>

        <p className="text-chrome-dim mx-auto mt-6 max-w-xl text-center text-lg text-balance">
          Type your business name. We&apos;ll score exactly what a customer sees
          before they decide — and what it&apos;s costing you.
        </p>

        <form onSubmit={runAudit} className="mt-10">
          <div className="border-ink-line bg-ink-raised focus-within:border-gold flex flex-col gap-3 rounded-2xl border p-3 transition-colors sm:flex-row sm:items-center">
            <label htmlFor="audit-query" className="sr-only">
              Business name or Google Maps link
            </label>
            <input
              id="audit-query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              disabled={scanning}
              placeholder="Brew Haven Café, Hyderabad"
              className="text-chrome placeholder:text-chrome-dim min-w-0 flex-1 bg-transparent px-4 py-3 text-lg outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={scanning || query.trim().length < 2}
              className="bg-gold text-ink hover:bg-gold-bright shrink-0 rounded-xl px-6 py-3 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            >
              {scanning ? "Scanning…" : "Run the audit →"}
            </button>
          </div>
        </form>

        <div aria-live="polite" className="min-h-6">
          {scanning && (
            <p className="text-gold mt-5 text-center text-sm">
              {SCAN_STEPS[step]}
            </p>
          )}
          {error && (
            <p className="text-crimson-bright mt-5 text-center text-sm">{error}</p>
          )}
        </div>

        <div ref={resultRef} className="scroll-mt-28">
          {result && <Scorecard result={result} />}
        </div>
      </div>
    </section>
  );
}
