"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";
import { categories } from "@/data/categories";

const links = [
  { href: "/shop", label: "Shop all" },
  { href: "/shop?cat=apparel", label: "Apparel" },
  { href: "/shop?cat=footwear", label: "Footwear" },
  { href: "/shop?cat=tech", label: "Tech" },
  { href: "/shop?cat=home", label: "Home" },
  { href: "/shop?sort=discount", label: "Biggest drops" },
];

export function Navbar() {
  const { count, hydrated, openDrawer, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-ink text-cream">
        <div className="container-x flex h-9 items-center justify-center gap-2 whitespace-nowrap text-xs font-medium tracking-wide">
          <Zap className="h-3.5 w-3.5 shrink-0 text-lime" fill="currentColor" />
          <span>
            <span className="hidden sm:inline">Free shipping over $60 · </span>
            Extra 10% off with code{" "}
            <span className="rounded bg-lime px-1.5 py-0.5 font-mono font-bold text-ink">VIBES10</span>
          </span>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled ? "border-line bg-cream/85 backdrop-blur-xl" : "border-transparent bg-cream",
        )}
      >
        <nav className="container-x flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3 lg:gap-8">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5 lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/" className="flex items-center gap-2" aria-label="Vibes Outlet home">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-lime shadow-soft">
                <Zap className="h-5 w-5" fill="currentColor" />
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight">
                vibes<span className="text-violet">.</span>outlet
              </span>
            </Link>
            <ul className="hidden items-center gap-1 lg:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-2 transition hover:bg-ink/5 hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-1">
            <Link
              href="/shop"
              className="hidden h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm text-muted transition hover:border-ink/30 md:flex"
            >
              <Search className="h-4 w-4" />
              <span className="pr-6">Search deals</span>
            </Link>
            <Link
              href="/wishlist"
              className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {hydrated && wishlist.length > 0 && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-coral" />
              )}
            </Link>
            <button
              type="button"
              onClick={openDrawer}
              className="relative flex h-10 items-center gap-2 rounded-full bg-ink px-3.5 text-cream shadow-soft transition hover:bg-ink-2"
              aria-label="Open bag"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="text-sm font-semibold tabular-nums">{hydrated ? count : 0}</span>
            </button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-line bg-cream lg:hidden">
            <div className="container-x grid gap-1 py-4">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={close} className="rounded-xl px-3 py-3 text-base font-medium hover:bg-ink/5">
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/shop?cat=${c.id}`}
                    onClick={close}
                    className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-3 text-sm font-medium"
                  >
                    <c.icon className="h-4 w-4 text-violet" /> {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
