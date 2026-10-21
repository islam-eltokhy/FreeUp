import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { products } from "@/data/products";
import { ProductTile } from "@/components/ProductTile";
import { Button } from "@/components/ui/Button";
import { discountPercent, formatPrice } from "@/lib/utils";

const heroPicks = ["p3", "p2", "p1", "p4"]
  .map((id) => products.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export function Hero() {
  const [a, b, c, d] = heroPicks;
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(198,241,53,0.55), transparent 70%), radial-gradient(closest-side at 70% 60%, rgba(91,75,255,0.35), transparent 70%)",
        }}
      />
      <div className="container-x relative grid items-center gap-14 pb-20 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-20">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 py-1.5 pl-1.5 pr-4 text-sm font-medium shadow-soft backdrop-blur">
            <span className="rounded-full bg-lime px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-ink">
              Live now
            </span>
            The Autumn Clear-Out · up to 70% off
          </div>
          <h1 className="font-display mt-6 text-balance text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            Big-brand{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-violet via-coral to-violet bg-clip-text text-transparent">
                vibes.
              </span>
              <svg
                aria-hidden
                viewBox="0 0 220 24"
                className="absolute -bottom-2 left-0 z-0 h-5 w-full text-lime"
                preserveAspectRatio="none"
              >
                <path d="M3 18C60 6 140 4 217 12" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            Outlet prices.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink-2 sm:text-xl">
            Last season’s most-wanted drops from the labels you already love, authenticated and shipped in 48 hours.
            Same vibe, a fraction of the price.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/shop" size="lg">
              Shop the drop <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/shop?sort=discount" size="lg" variant="secondary">
              <Sparkles className="h-4 w-4 text-violet" /> Biggest discounts
            </Button>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-ink/10 pt-6">
            {[
              ["70%", "max discount"],
              ["48h", "dispatch"],
              ["4.8★", "from 32k reviews"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl font-extrabold sm:text-3xl">{v}</dt>
                <dd className="mt-0.5 text-xs font-medium uppercase tracking-wider text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto grid w-full max-w-[520px] grid-cols-6 grid-rows-6 gap-3 aspect-square lg:max-w-none">
          <Link
            href={`/shop/${a.slug}`}
            className="group relative col-span-4 row-span-4 animate-float [--tilt:-2deg]"
            style={{ animationDelay: "0.2s" }}
          >
            <ProductTile product={a} className="h-full w-full rounded-[2rem] shadow-lift" />
            <PriceSticker product={a} className="left-4 top-4" />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold backdrop-blur">
              {a.brand} · {a.name}
            </span>
          </Link>
          <Link
            href={`/shop/${b.slug}`}
            className="group relative col-span-2 row-span-3 animate-float-slow [--tilt:3deg]"
            style={{ animationDelay: "1.1s" }}
          >
            <ProductTile product={b} className="h-full w-full rounded-3xl shadow-lift" />
            <PriceSticker product={b} className="left-3 top-3" small />
          </Link>
          <Link
            href={`/shop/${c.slug}`}
            className="group relative col-span-2 row-span-3 animate-float [--tilt:-3deg]"
            style={{ animationDelay: "0.6s" }}
          >
            <ProductTile product={c} className="h-full w-full rounded-3xl shadow-lift" />
            <PriceSticker product={c} className="left-3 top-3" small />
          </Link>
          <Link
            href={`/shop/${d.slug}`}
            className="group relative col-span-4 row-span-2 animate-float-slow [--tilt:1.5deg]"
            style={{ animationDelay: "1.6s" }}
          >
            <ProductTile product={d} className="h-full w-full rounded-3xl shadow-lift" iconClassName="h-[70%] w-[70%]" />
            <PriceSticker product={d} className="left-3 top-3" small />
          </Link>

          <div className="absolute -bottom-6 right-[34%] hidden -rotate-3 rounded-2xl bg-white p-3 shadow-lift sm:block">
            <div className="flex items-center gap-1 text-sun">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="mt-1 text-xs font-semibold">“Felt like a glitch in the matrix.”</p>
            <p className="text-[10px] text-muted">— Priya, verified buyer</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceSticker({
  product,
  className,
  small,
}: {
  product: (typeof products)[number];
  className?: string;
  small?: boolean;
}) {
  const off = discountPercent(product.price, product.compareAtPrice);
  return (
    <span
      className={`absolute flex items-center gap-1.5 rounded-full bg-ink text-cream shadow-lift ${small ? "px-2.5 py-1 text-[11px]" : "px-3.5 py-1.5 text-sm"} ${className}`}
    >
      <span className="font-bold">{formatPrice(product.price)}</span>
      <span className="rounded-full bg-lime px-1.5 py-0.5 text-[10px] font-extrabold text-ink">-{off}%</span>
    </span>
  );
}
