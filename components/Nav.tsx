import Link from "next/link";
import { Monogram } from "./Monogram";
import { BOOKING_LINK } from "@/lib/content";

const LINKS = [
  { href: "#systems", label: "Systems" },
  { href: "#proof", label: "Proof" },
  { href: "#demo", label: "Live demo" },
];

export function Nav() {
  return (
    <header className="border-ink-line bg-ink/80 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="#top" aria-label="Tharun AI Studio, back to top">
          <Monogram />
        </Link>

        <nav className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-chrome-dim hover:text-chrome text-sm transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="border-gold text-gold hover:bg-gold hover:text-ink rounded-full border px-4 py-2 text-sm font-medium transition-colors"
          >
            Book a call
          </a>
        </nav>
      </div>
    </header>
  );
}
