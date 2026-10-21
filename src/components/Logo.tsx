import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The boutique mark: extra-bold geometric "V!BES" in magenta where the I is a
 * downward charcoal exclamation stem, and "outlet" beneath it whose "o" is a
 * charcoal bullseye that doubles as the exclamation's dot.
 */
export function LogoMark({ className, tagline = false }: { className?: string; tagline?: boolean }) {
  return (
    <svg
      viewBox={tagline ? "0 0 200 92" : "0 0 200 74"}
      role="img"
      aria-label={tagline ? "Vibes Outlet. Where fashion sets the mood" : "Vibes Outlet"}
      className={cn("block h-10 w-auto", className)}
    >
      {/* VIBES */}
      <text
        x="0"
        y="42"
        fontFamily="var(--font-logo)"
        fontWeight="800"
        fontSize="48"
        letterSpacing="1"
        fill="currentColor"
        className="text-brand"
      >
        V
      </text>
      {/* "!" stem in place of the I */}
      <path d="M46 6 h14 l-4.5 29 h-5 z" fill="#2b2b2b" />
      <text
        x="66"
        y="42"
        fontFamily="var(--font-logo)"
        fontWeight="800"
        fontSize="48"
        letterSpacing="1"
        fill="currentColor"
        className="text-brand"
      >
        BES
      </text>
      {/* bullseye "o": the dot of the "!" and the o of "outlet" */}
      <circle cx="53" cy="55" r="9.5" fill="none" stroke="#2b2b2b" strokeWidth="3.5" />
      <circle cx="53" cy="55" r="3" fill="#2b2b2b" />
      <text
        x="66"
        y="64"
        fontFamily="var(--font-logo)"
        fontWeight="800"
        fontSize="26"
        letterSpacing="1"
        fill="currentColor"
        className="text-brand"
      >
        utlet
      </text>
      {tagline && (
        <text x="100" y="86" textAnchor="middle" fontFamily="var(--font-geist-sans)" fontWeight="500" fontSize="10" letterSpacing="1.2" fill="#2b2b2b">
          Where fashion sets the mood
        </text>
      )}
    </svg>
  );
}

export function Logo({ className, size = "md", href = "/" }: { className?: string; size?: "sm" | "md" | "lg"; href?: string }) {
  const h = { sm: "h-8", md: "h-10", lg: "h-20" }[size];
  return (
    <Link href={href} aria-label="Vibes Outlet home" className={cn("inline-flex items-center", className)}>
      <LogoMark className={h} tagline={size === "lg"} />
    </Link>
  );
}
