import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "ink" | "lime" | "coral" | "violet" | "white";

const tones: Record<Tone, string> = {
  ink: "bg-ink text-cream",
  lime: "bg-lime text-ink",
  coral: "bg-coral text-white",
  violet: "bg-violet text-white",
  white: "bg-white/90 text-ink backdrop-blur",
};

export function Badge({
  tone = "ink",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
