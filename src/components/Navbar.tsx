"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { cn, STORE } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";
import { categories } from "@/data/categories";
import { productIcons, Instagram } from "@/lib/icons";
import { Logo } from "./Logo";

const links = [
  { href: "/shop?sort=new", label: "New in" },
  { href: "/shop?cat=jackets", label: "Jackets" },
  { href: "/shop?cat=dresses", label: "Dresses" },
  { href: "/shop?cat=tops", label: "Tops" },
  { href: "/shop?cat=denim", label: "Denim" },
  { href: "/shop?cat=accessories", label: "Accessories" },
  { href: "/shop?sort=discount", label: "Sale", accent: true },
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
      <div className="bg-brand text-white">
        <div className="container-x flex h-9 items-center justify-center gap-2 whitespace-nowrap text-xs font-medium tracking-wide">
          <span className="hidden sm:inline">Free delivery over 1,500 EGP · Cash on delivery across Egypt · </span>
          <span>
            Extra 10% off with code{" "}
            <span className="rounded bg-white px-1.5 py-0.5 font-mono font-bold text-brand">VIBES10</span>
          </span>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled ? "border-line bg-cream/85 backdrop-blur-xl" : "border-transparent bg-cream",
        )}
      >
        <nav className="container-x flex h-[72px] items-center justify-between gap-4">
          <div className="flex items-center gap-2 lg:gap-8">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5 lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Logo />
            <ul className="hidden items-center gap-0.5 lg:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm font-medium transition hover:bg-blush hover:text-brand-2",
                      l.accent ? "text-brand" : "text-ink-2",
                    )}
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
              className="hidden h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm text-muted transition hover:border-brand/40 md:flex"
            >
              <Search className="h-4 w-4" />
              <span className="pr-6">Search the outlet</span>
            </Link>
            <a
              href={STORE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden h-10 w-10 place-items-center rounded-full hover:bg-ink/5 sm:grid"
              aria-label="Vibes Outlet on Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <Link href="/wishlist" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {hydrated && wishlist.length > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand" />}
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
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  className={cn("rounded-xl px-3 py-3 text-base font-medium hover:bg-blush", l.accent && "text-brand")}
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                {categories.map((c) => {
                  const Icon = productIcons[c.icon];
                  return (
                    <Link
                      key={c.id}
                      href={`/shop?cat=${c.id}`}
                      onClick={close}
                      className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-3 text-sm font-medium"
                    >
                      <Icon className="h-4 w-4 text-brand" /> {c.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
