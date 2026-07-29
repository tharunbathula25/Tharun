"use client";

import { useEffect, useState } from "react";

/** Counts a number up from zero — used for the score, which should feel like a verdict landing. */
export function CountUp({
  to,
  duration = 1100,
  className = "",
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced ? 0 : duration;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = total === 0 ? 1 : Math.min(1, (now - start) / total);
      // Ease-out cubic — fast, then settles.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, duration]);

  return <span className={className}>{value}</span>;
}
