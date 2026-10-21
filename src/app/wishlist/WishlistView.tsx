"use client";

import { ArrowRight, Heart } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { getProductById } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";

export function WishlistView() {
  const { wishlist, hydrated } = useStore();
  if (!hydrated) return <div className="mt-10 h-64 animate-pulse rounded-3xl bg-cream-2" />;

  const saved = wishlist.map(getProductById).filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (saved.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-dashed border-line bg-white px-6 py-20 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cream-2">
          <Heart className="h-7 w-7 text-muted" />
        </span>
        <p className="font-display mt-5 text-2xl font-semibold">Nothing saved yet</p>
        <p className="mt-2 text-muted">Tap the heart on any product to keep it here.</p>
        <Button href="/shop" size="lg" className="mt-6">
          Browse styles <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {saved.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
