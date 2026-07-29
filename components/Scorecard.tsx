"use client";

import { CountUp } from "./CountUp";
import { SystemIcon } from "./SystemIcon";
import { SEVERITY_CLASS, type AuditResult } from "@/lib/audit";
import { BOOKING_LINK, SYSTEMS } from "@/lib/content";

function scoreVerdict(score: number) {
  if (score >= 75) return { label: "Strong", className: "text-chrome" };
  if (score >= 50) return { label: "Leaking customers", className: "text-gold" };
  return { label: "Critical", className: "text-crimson-bright" };
}

export function Scorecard({ result }: { result: AuditResult }) {
  const verdict = scoreVerdict(result.score);
  const recommended =
    SYSTEMS.find((system) => system.id === result.topWeakness) ?? SYSTEMS[0];

  return (
    <div className="mt-14">
      <div className="border-ink-line bg-ink-raised overflow-hidden rounded-2xl border">
        {/* Score + metrics */}
        <div className="grid gap-px md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div className="bg-ink-raised flex flex-col justify-center px-8 py-10">
            <p className="text-chrome-dim text-xs tracking-[0.2em] uppercase">
              Visibility score
            </p>
            <p className="mt-3 flex items-end gap-2">
              <CountUp
                to={result.score}
                className="text-gold-metal font-display text-8xl leading-none"
              />
              <span className="text-chrome-dim font-display pb-2 text-3xl leading-none">
                /100
              </span>
            </p>
            <p className={`font-display mt-2 text-2xl tracking-wide ${verdict.className}`}>
              {verdict.label}
            </p>
            <p className="text-chrome-dim mt-4 text-sm">
              Scored for{" "}
              <span className="text-chrome font-medium">{result.business}</span>
            </p>
          </div>

          <div className="bg-ink divide-ink-line divide-y">
            {result.metrics.map((metric) => (
              <div
                key={metric.id}
                className="flex items-start justify-between gap-6 px-8 py-4"
              >
                <div className="min-w-0">
                  <p className="text-chrome text-sm font-medium">{metric.label}</p>
                  <p className="text-chrome-dim mt-1 text-xs leading-relaxed">
                    {metric.detail}
                  </p>
                </div>
                <p
                  className={`font-display shrink-0 text-3xl leading-none ${SEVERITY_CLASS[metric.severity]}`}
                >
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Verdict line */}
        <div className="border-ink-line bg-ink-raised border-t px-8 py-6">
          <p className="text-gold text-lg leading-snug font-medium text-balance">
            {result.verdict}
          </p>
        </div>
      </div>

      {/* The fix — led by whatever scored worst */}
      <div className="border-gold/40 bg-gold/5 mt-6 rounded-2xl border p-8">
        <p className="text-chrome-dim text-xs tracking-[0.2em] uppercase">
          Start here
        </p>
        <div className="mt-3 flex items-center gap-4">
          <SystemIcon id={recommended.id} className="size-9 shrink-0" />
          <h3 className="headline text-metal text-4xl">{recommended.name}</h3>
        </div>
        <p className="text-gold mt-2 text-lg font-medium">{recommended.promise}</p>
        <p className="text-chrome-dim mt-4 max-w-2xl leading-relaxed">
          {recommended.detail}
        </p>

        <ul className="mt-6 space-y-2">
          {recommended.bullets.map((bullet) => (
            <li key={bullet} className="text-chrome flex gap-3 text-sm">
              <span className="text-gold">→</span>
              {bullet}
            </li>
          ))}
        </ul>

        <a
          href={BOOKING_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold text-ink hover:bg-gold-bright mt-8 inline-flex rounded-full px-6 py-3 font-semibold transition-colors"
        >
          Show me what fixing this looks like →
        </a>
      </div>

      {result.source === "mock" && (
        <p className="text-chrome-dim mt-4 text-center text-xs">
          Demo data — connect a Google Places key to score live listings.
        </p>
      )}
    </div>
  );
}
