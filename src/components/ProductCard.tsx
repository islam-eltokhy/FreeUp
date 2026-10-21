"use client";

import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn, discountPercent, formatPrice } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";
import { ProductTile } from "./ProductTile";
import { Badge } from "./ui/Badge";
import { Rating } from "./ui/Rating";

const tagTone: Record<NonNullable<Product["tag"]>, "ink" | "brand" | "blush" | "camel"> = {
  "New in": "brand",
  "Best seller": "blush",
  "Last pieces": "ink",
  "Made in Egypt": "camel",
  "As seen on Instagram": "brand",
};

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addItem, openDrawer, pushToast, toggleWishlist, isWishlisted, hydrated } = useStore();
  const off = discountPercent(product.price, product.compareAtPrice);
  const wished = hydrated && isWishlisted(product.id);

  function quickAdd() {
    addItem({
      productId: product.id,
      quantity: 1,
      color: product.colors[0],
      size: product.sizes?.[Math.floor((product.sizes.length - 1) / 2)],
    });
    pushToast({ title: "Added to your bag", description: product.name });
    openDrawer();
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-3xl border border-line bg-white p-2.5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative">
        <Link href={`/shop/${product.slug}`} className="block" aria-label={product.name}>
          <ProductTile
            product={product}
            className="aspect-[4/5] rounded-2xl transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {off > 0 && <Badge tone="white">-{off}%</Badge>}
          {product.tag && <Badge tone={tagTone[product.tag]}>{product.tag}</Badge>}
        </div>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wished}
          aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
          className={cn(
            "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink backdrop-blur transition hover:scale-105",
            wished && "text-brand",
          )}
        >
          <Heart className="h-4 w-4" fill={wished ? "currentColor" : "none"} />
        </button>
        <button
          type="button"
          onClick={quickAdd}
          aria-label={`Add ${product.name} to bag`}
          className="absolute bottom-3 right-3 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-brand text-white opacity-0 shadow-brand transition-all duration-300 hover:bg-brand-2 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">{product.brand}</p>
        <h3 className="mt-1 font-display text-[17px] font-semibold leading-snug">
          <Link href={`/shop/${product.slug}`} className="after:absolute after:inset-0 after:content-[''] after:pointer-events-none">
            {product.name}
          </Link>
        </h3>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((c) => (
              <span key={c} className="h-3 w-3 rounded-full ring-1 ring-ink/10" style={{ background: c }} />
            ))}
          </div>
          <Rating value={product.rating} className="text-xs" />
        </div>
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-4">
          <span className="text-lg font-bold">{formatPrice(product.price)}</span>
          <span className="text-sm text-muted line-through">{formatPrice(product.compareAtPrice)}</span>
        </div>
      </div>
    </article>
  );
}
