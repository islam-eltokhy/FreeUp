import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { Instagram } from "@/lib/icons";
import { products } from "@/data/products";
import { ProductTile } from "@/components/ProductTile";
import { Button } from "@/components/ui/Button";
import { discountPercent, formatPrice, STORE } from "@/lib/utils";

const picks = ["p1", "p4", "p9", "p6"]
  .map((id) => products.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export function Hero() {
  const [a, b, c, d] = picks;
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 h-[560px] w-[1000px] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side at 35% 50%, rgba(245,206,220,0.9), transparent 70%), radial-gradient(closest-side at 72% 55%, rgba(233,217,198,0.9), transparent 70%)",
        }}
      />
      <div className="container-x relative grid items-center gap-14 pb-20 pt-12 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-16">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/80 py-1.5 pl-1.5 pr-4 text-sm font-medium shadow-soft backdrop-blur">
            <span className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
              New drop
            </span>
            The Autumn edit · up to 50% off
          </div>
          <p className="font-script mt-7 text-3xl text-brand sm:text-4xl">{STORE.tagline}</p>
          <h1 className="font-display mt-2 text-balance text-5xl font-semibold leading-[0.98] text-ink sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            Boutique pieces.
            <br />
            <span className="italic text-brand">Outlet</span> prices.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink-2 sm:text-xl">
            This season’s most-loved jackets, dresses, denim and jewellery, hand-picked for Vibes Outlet. Shop online
            with delivery anywhere in Egypt, or come and try it on in Hadayek October.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/shop?sort=new" size="lg">
              Shop new arrivals <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#visit" size="lg" variant="secondary">
              <MapPin className="h-4 w-4 text-brand" /> Visit the store
            </Button>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-ink/10 pt-6">
            {[
              ["50%", "up to off"],
              ["1–3 days", "Cairo & Giza delivery"],
              ["4.9★", "in-store rating"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl font-semibold sm:text-3xl">{v}</dt>
                <dd className="mt-0.5 text-xs font-medium uppercase tracking-wider text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto grid aspect-square w-full max-w-[520px] grid-cols-6 grid-rows-6 gap-3 lg:max-w-none">
          <Link href={`/shop/${a.slug}`} className="group relative col-span-4 row-span-4 animate-float [--tilt:-1.5deg]" style={{ animationDelay: "0.2s" }}>
            <ProductTile product={a} className="h-full w-full rounded-arch shadow-lift" />
            <PriceSticker product={a} className="left-4 top-4" />
            <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold backdrop-blur">
              <Instagram className="h-3.5 w-3.5 text-brand" /> From our latest reel
            </span>
          </Link>
          <Link href={`/shop/${b.slug}`} className="group relative col-span-2 row-span-3 animate-float-slow [--tilt:2.5deg]" style={{ animationDelay: "1.1s" }}>
            <ProductTile product={b} className="h-full w-full rounded-arch shadow-lift" />
            <PriceSticker product={b} className="left-3 top-3" small />
          </Link>
          <Link href={`/shop/${c.slug}`} className="group relative col-span-2 row-span-3 animate-float [--tilt:-2.5deg]" style={{ animationDelay: "0.6s" }}>
            <ProductTile product={c} className="h-full w-full rounded-3xl shadow-lift" />
            <PriceSticker product={c} className="left-3 top-3" small />
          </Link>
          <Link href={`/shop/${d.slug}`} className="group relative col-span-4 row-span-2 animate-float-slow [--tilt:1.5deg]" style={{ animationDelay: "1.6s" }}>
            <ProductTile product={d} className="h-full w-full rounded-3xl shadow-lift" iconClassName="h-[80%] w-[80%]" />
            <PriceSticker product={d} className="left-3 top-3" small />
          </Link>

          <div className="absolute -bottom-6 right-[34%] hidden -rotate-3 rounded-2xl bg-white p-3 shadow-lift sm:block">
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="mt-1 text-xs font-semibold">“The jacket is even prettier in person.”</p>
            <p className="text-[10px] text-muted">— Mariam, 6th of October</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceSticker({ product, className, small }: { product: (typeof products)[number]; className?: string; small?: boolean }) {
  const off = discountPercent(product.price, product.compareAtPrice);
  return (
    <span
      className={`absolute flex items-center gap-1.5 rounded-full bg-ink text-cream shadow-lift ${small ? "px-2.5 py-1 text-[11px]" : "px-3.5 py-1.5 text-sm"} ${className}`}
    >
      <span className="font-bold">{formatPrice(product.price)}</span>
      <span className="rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-extrabold text-white">-{off}%</span>
    </span>
  );
}
