import Link from "next/link";
import { ArrowRight, Check, Play } from "lucide-react";
import { Instagram } from "@/lib/icons";
import { getProductById, products } from "@/data/products";
import { ProductTile } from "@/components/ProductTile";
import { Button } from "@/components/ui/Button";
import { formatPrice, STORE } from "@/lib/utils";

/** "As seen on Instagram": the hero jacket from the reel plus the pieces it was styled with. */
export function ReelSpotlight() {
  const hero = getProductById("p1") ?? products[0];
  const look = (hero.styleWith ?? []).map(getProductById).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const lookTotal = look.reduce((s, p) => s + p.price, hero.price);

  return (
    <section className="container-x py-10">
      <div className="noise relative isolate grid overflow-hidden rounded-[2.5rem] bg-ink text-cream lg:grid-cols-[0.9fr_1.1fr]">
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand opacity-40 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-camel opacity-30 blur-3xl" />

        <div className="relative flex items-center justify-center p-8 sm:p-12">
          <a
            href={STORE.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-[2rem] border-[6px] border-white/10 shadow-lift"
            aria-label="Watch the reel on Instagram"
          >
            <ProductTile product={hero} className="h-full w-full" iconClassName="h-[36%] w-[36%]" />
            <div className="absolute inset-x-0 top-0 flex items-center gap-2 bg-gradient-to-b from-black/50 to-transparent p-4 text-xs font-semibold text-white">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-[10px] font-bold">V!</span>
              vibes outlet
              <Instagram className="ml-auto h-4 w-4" />
            </div>
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lift transition group-hover:scale-110">
              <Play className="ml-1 h-6 w-6" fill="currentColor" />
            </span>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-xs text-white">
              <p className="font-semibold">New in: the soutache suede jacket</p>
              <p className="opacity-80">Zoweil Plaza Mall · 2nd floor · ships nationwide</p>
            </div>
          </a>
        </div>

        <div className="relative flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blush-2">As seen on Instagram</p>
          <h2 className="font-display mt-4 text-balance text-4xl font-semibold leading-[1] sm:text-5xl">
            Get the look from the reel.
          </h2>
          <p className="mt-5 max-w-md text-cream/75">{hero.description}</p>
          <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
            {hero.details.slice(0, 4).map((d) => (
              <li key={d} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blush-2" strokeWidth={3} /> {d}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-cream/60">Style it with</p>
            <ul className="divide-y divide-white/10">
              {[hero, ...look].map((p) => (
                <li key={p.id} className="flex items-center gap-3 py-2.5">
                  <ProductTile product={p} className="h-12 w-10 shrink-0 rounded-lg" />
                  <Link href={`/shop/${p.slug}`} className="flex-1 text-sm font-medium hover:underline">
                    {p.name}
                  </Link>
                  <span className="text-sm font-semibold">{formatPrice(p.price)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-baseline justify-between border-t border-white/10 pt-3 text-sm">
              <span className="text-cream/60">The full look</span>
              <span className="font-display text-2xl font-semibold">{formatPrice(lookTotal)}</span>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={`/shop/${hero.slug}`} size="lg">
              Shop the jacket <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href={STORE.instagramUrl} target="_blank" rel="noreferrer" size="lg" variant="ghost" className="text-cream hover:bg-white/10">
              <Instagram className="h-4 w-4" /> Watch on Instagram
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
