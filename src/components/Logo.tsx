import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Text-mark version of the boutique sign: "V!BES" in magenta with the
 * exclamation standing in for the I, "outlet" set small beneath.
 */
export function Logo({ className, size = "md", href = "/" }: { className?: string; size?: "sm" | "md" | "lg"; href?: string }) {
  const scale = { sm: "text-xl", md: "text-2xl", lg: "text-5xl" }[size];
  const sub = { sm: "text-[9px]", md: "text-[10px]", lg: "text-sm" }[size];
  return (
    <Link href={href} aria-label="Vibes Outlet home" className={cn("inline-flex flex-col leading-none", className)}>
      <span className={cn("font-display font-bold tracking-tight text-brand", scale)}>
        V<span className="relative inline-block">
          <span className="sr-only">I</span>
          <span aria-hidden className="inline-block">!</span>
        </span>
        BES
      </span>
      <span className={cn("-mt-0.5 self-end font-sans font-semibold lowercase tracking-[0.35em] text-ink-2", sub)}>outlet</span>
    </Link>
  );
}
