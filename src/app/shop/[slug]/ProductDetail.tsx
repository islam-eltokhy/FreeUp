"use client";

import { useState } from "react";
import { BadgeCheck, Check, Heart, Minus, Plus, RotateCcw, ShoppingBag, Truck } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn, discountPercent, formatPrice } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";
import { ProductTile } from "@/components/ProductTile";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem, openDrawer, pushToast, toggleWishlist, isWishlisted, hydrated } = useStore();
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState<string | undefined>(
    product.sizes?.[Math.floor((product.sizes.length - 1) / 2)],
  );
  const [qty, setQty] = useState(1);
  const off = discountPercent(product.price, product.compareAtPrice);
  const wished = hydrated && isWishlisted(product.id);

  function add() {
    addItem({ productId: product.id, quantity: qty, color, size });
    pushToast({ title: `Added ${qty > 1 ? `${qty} × ` : ""}to your bag`, description: product.name });
    openDrawer();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative">
          <ProductTile
            product={{ ...product, art: { ...product.art, from: color } }}
            className="aspect-[4/5] w-full rounded-[2rem] shadow-lift transition-colors duration-500"
            priority
          />
          <div className="absolute left-5 top-5 flex gap-2">
            {off > 0 && <Badge tone="white" className="text-xs">-{off}%</Badge>}
            {product.tag && <Badge tone="brand" className="text-xs">{product.tag}</Badge>}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {product.colors.map((c, i) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={cn(
                "overflow-hidden rounded-2xl ring-2 ring-offset-2 ring-offset-cream transition",
                color === c ? "ring-brand" : "ring-transparent hover:ring-ink/20",
              )}
              aria-label={`Colour option ${i + 1}`}
            >
              <ProductTile
                product={{ ...product, art: { ...product.art, from: c, to: product.art.to } }}
                className="aspect-square"
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">{product.brand}</p>
        <h1 className="font-display mt-2 text-balance text-4xl font-semibold leading-[1] sm:text-5xl">{product.name}</h1>
        <Rating value={product.rating} count={product.reviews} className="mt-4" />

        <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1">
          <span className="font-display text-4xl font-semibold">{formatPrice(product.price)}</span>
          <span className="pb-1 text-lg text-muted line-through">{formatPrice(product.compareAtPrice)}</span>
          <span className="mb-1 rounded-full bg-blush-2 px-2.5 py-1 text-xs font-extrabold text-brand-2">
            You save {formatPrice(product.compareAtPrice - product.price)}
          </span>
        </div>

        <p className="mt-6 text-ink-2">{product.description}</p>
        {product.material && <p className="mt-2 text-sm text-muted">Fabric: {product.material}</p>}

        <div className="mt-8">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">Colour</span>
            <span className="text-muted">{product.colors.indexOf(color) + 1} of {product.colors.length}</span>
          </div>
          <div className="mt-3 flex gap-2.5">
            {product.colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                aria-label={`Select colour ${c}`}
                aria-pressed={color === c}
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full ring-2 ring-offset-2 ring-offset-cream transition",
                  color === c ? "ring-brand" : "ring-transparent hover:ring-ink/20",
                )}
                style={{ background: c }}
              >
                {color === c && <Check className="h-4 w-4 mix-blend-difference text-white" strokeWidth={3} />}
              </button>
            ))}
          </div>
        </div>

        {product.sizes && (
          <div className="mt-8">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Size</span>
              <button type="button" className="text-muted underline-offset-4 hover:underline">Size guide</button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={cn(
                    "h-11 min-w-[3rem] rounded-xl border px-3 text-sm font-semibold transition",
                    size === s ? "border-brand bg-brand text-white" : "border-line bg-white hover:border-brand/50",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="inline-flex h-13 items-center rounded-full border border-line bg-white">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid h-full w-12 place-items-center rounded-full hover:bg-ink/5"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(9, q + 1))}
              className="grid h-full w-12 place-items-center rounded-full hover:bg-ink/5"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <Button size="lg" onClick={add} className="flex-1">
            <ShoppingBag className="h-5 w-5" /> Add to bag · {formatPrice(product.price * qty)}
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => toggleWishlist(product.id)}
            aria-pressed={wished}
            className={cn("sm:w-13 sm:px-0", wished && "text-brand")}
            aria-label="Save to wishlist"
          >
            <Heart className="h-5 w-5" fill={wished ? "currentColor" : "none"} />
          </Button>
        </div>

        <ul className="mt-8 grid gap-3 rounded-2xl border border-line bg-white p-5 text-sm sm:grid-cols-3">
          <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-brand" /> Delivery across Egypt</li>
          <li className="flex items-center gap-2"><RotateCcw className="h-4 w-4 text-brand" /> 14-day exchange</li>
          <li className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-brand" /> Cash on delivery</li>
        </ul>

        <details className="group mt-6 rounded-2xl border border-line bg-white" open>
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-semibold">
            Details
            <Plus className="h-4 w-4 transition-transform group-open:rotate-45" />
          </summary>
          <ul className="space-y-2 border-t border-line px-5 py-4 text-sm text-ink-2">
            {product.details.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={3} /> {d}
              </li>
            ))}
          </ul>
        </details>
        <details className="group mt-3 rounded-2xl border border-line bg-white">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-semibold">
            Delivery &amp; exchanges
            <Plus className="h-4 w-4 transition-transform group-open:rotate-45" />
          </summary>
          <p className="border-t border-line px-5 py-4 text-sm text-ink-2">
            Cairo and Giza arrive in 1 to 3 days, other governorates in 2 to 5. Delivery is 60 EGP, free over 1,500 EGP.
            Pay cash on delivery or by card. Exchange sizes within 14 days in store or by courier, tags on.
          </p>
        </details>
      </div>
    </div>
  );
}
