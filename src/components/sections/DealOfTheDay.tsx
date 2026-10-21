import { ArrowRight, Check } from "lucide-react";
import { products } from "@/data/products";
import { ProductTile } from "@/components/ProductTile";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";
import { discountPercent, formatPrice } from "@/lib/utils";
import { Countdown } from "./Countdown";

export function DealOfTheDay() {
  const product = products.find((p) => p.id === "p3") ?? products[0];
  const off = discountPercent(product.price, product.compareAtPrice);
  return (
    <section className="container-x py-10">
      <div className="noise relative isolate grid overflow-hidden rounded-[2.5rem] bg-ink text-cream lg:grid-cols-2">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet opacity-50 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 right-1/3 h-96 w-96 rounded-full bg-lime opacity-20 blur-3xl"
        />
        <div className="relative flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-lime">Deal of the day</p>
          <h2 className="font-display mt-4 text-balance text-4xl font-extrabold leading-[1] sm:text-5xl">
            {product.name}
            <span className="block text-cream/50">by {product.brand}</span>
          </h2>
          <p className="mt-5 max-w-md text-cream/75">{product.description}</p>
          <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
            {product.details.slice(0, 4).map((d) => (
              <li key={d} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-lime" strokeWidth={3} /> {d}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-end gap-x-4 gap-y-2">
            <span className="font-display text-5xl font-extrabold">{formatPrice(product.price)}</span>
            <span className="pb-2 text-lg text-cream/50 line-through">{formatPrice(product.compareAtPrice)}</span>
            <span className="mb-2 rounded-full bg-lime px-3 py-1 text-sm font-extrabold text-ink">Save {off}%</span>
          </div>
          <Rating value={product.rating} count={product.reviews} className="mt-3 text-cream/80" />
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={`/shop/${product.slug}`} variant="lime" size="lg">
              Grab it <ArrowRight className="h-4 w-4" />
            </Button>
            <Countdown />
          </div>
        </div>
        <div className="relative p-6 sm:p-10 lg:p-12">
          <ProductTile product={product} className="h-full min-h-[320px] w-full rounded-[2rem] shadow-lift" />
          <span className="absolute left-10 top-10 -rotate-6 rounded-full bg-coral px-4 py-2 text-sm font-extrabold text-white shadow-lift sm:left-14 sm:top-14">
            Only 38 left
          </span>
        </div>
      </div>
    </section>
  );
}
