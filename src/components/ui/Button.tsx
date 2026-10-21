import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-2 shadow-brand",
  dark: "bg-ink text-cream hover:bg-ink-2 shadow-soft",
  secondary: "bg-white text-ink hover:bg-blush border border-line",
  ghost: "text-ink hover:bg-ink/5",
  outline: "border border-ink/15 text-ink hover:border-brand hover:text-brand",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  href?: string;
  target?: string;
  rel?: string;
  children: ReactNode;
};

export function Button({ variant = "primary", size = "md", className, href, target, rel, children, ...rest }: ButtonProps) {
  const classes = buttonClasses(variant, size, className);
  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
