import type { WeaknessId } from "@/lib/audit";

/** Thin gold line icons — emoji would fight the chrome-and-gold palette. */
const PATHS: Record<WeaknessId, React.ReactNode> = {
  reviews: (
    <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.7l5.9-.9L12 3.5z" />
  ),
  response: (
    <>
      <path d="M4 5.5h16v10.5H9.5L5 20v-4H4z" />
      <path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" />
    </>
  ),
  booking: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <path d="M9 14.5l2 2 4-4" />
    </>
  ),
  website: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.6 3.6 5.4 3.6 8.5S14.4 18.4 12 20.5c-2.4-2.1-3.6-5.4-3.6-8.5S9.6 6.1 12 3.5z" />
    </>
  ),
};

export function SystemIcon({
  id,
  className = "size-8",
}: {
  id: WeaknessId;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`text-gold ${className}`}
    >
      {PATHS[id]}
    </svg>
  );
}
