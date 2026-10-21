"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight, Minus, Plus, ShoppingBag, Tag, Trash2, X } from "lucide-react";
import { itemKey, useStore } from "@/context/StoreContext";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { ProductTile } from "@/components/ProductTile";
import { Button } from "@/components/ui/Button";

export function CartView() {
  const store = useStore();
  const [code, setCode] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);

  function applyPromo(e: FormEvent) {
    e.preventDefault();
    const ok = store.applyPromo(code);
    setPromoError(ok ? null : "That code isn't valid. Try VIBES10.");
    if (ok) {
      setCode("");
      store.pushToast({ title: "Promo applied", description: "10% off your order" });
    }
  }

  if (!store.hydrated) {
    return <div className="mt-10 h-64 animate-pulse rounded-3xl bg-cream-2" />;
  }

  if (store.items.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-dashed border-line bg-white px-6 py-20 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cream-2">
          <ShoppingBag className="h-7 w-7 text-muted" />
        </span>
        <p className="font-display mt-5 text-2xl font-semibold">Your bag is empty</p>
        <p className="mt-2 text-muted">New pieces land every week.</p>
        <Button href="/shop" size="lg" className="mt-6">
          Start shopping <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
      <ul className="divide-y divide-line rounded-3xl border border-line bg-white px-6">
        {store.items.map((item) => {
          const product = getProductById(item.productId);
          if (!product) return null;
          const key = itemKey(item);
          return (
            <li key={key} className="flex gap-5 py-6">
              <Link href={`/shop/${product.slug}`} className="shrink-0">
                <ProductTile product={product} className="h-32 w-28 rounded-2xl" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted">{product.brand}</p>
                    <Link href={`/shop/${product.slug}`} className="text-lg font-semibold leading-tight hover:underline">
                      {product.name}
                    </Link>
                    <p className="mt-1.5 flex items-center gap-3 text-sm text-muted">
                      {item.color && (
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-3.5 w-3.5 rounded-full ring-1 ring-ink/10" style={{ background: item.color }} />
                          Colour
                        </span>
                      )}
                      {item.size && <span>Size {item.size}</span>}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{formatPrice(product.price * item.quantity)}</p>
                    <p className="text-sm text-muted line-through">{formatPrice(product.compareAtPrice * item.quantity)}</p>
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="inline-flex items-center rounded-full border border-line">
                    <button
                      type="button"
                      onClick={() => store.updateQuantity(key, item.quantity - 1)}
                      className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold tabular-nums">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => store.updateQuantity(key, item.quantity + 1)}
                      className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => store.removeItem(key)}
                    className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-brand"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="h-fit rounded-3xl border border-line bg-white p-6 lg:sticky lg:top-28">
        <h2 className="font-display text-xl font-semibold">Summary</h2>
        <form onSubmit={applyPromo} className="mt-5">
          <label htmlFor="promo" className="text-xs font-semibold uppercase tracking-wider text-muted">
            Promo code
          </label>
          {store.promo ? (
            <div className="mt-2 flex items-center justify-between rounded-xl bg-blush px-3 py-2.5 text-sm">
              <span className="inline-flex items-center gap-2 font-semibold">
                <Tag className="h-4 w-4" /> {store.promo} applied
              </span>
              <button type="button" onClick={store.clearPromo} aria-label="Remove promo" className="grid h-6 w-6 place-items-center rounded-full hover:bg-ink/10">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="mt-2 flex gap-2">
              <input
                id="promo"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="VIBES10"
                className="h-11 flex-1 rounded-xl border border-line px-3 font-mono text-sm uppercase focus:border-brand focus:outline-none"
              />
              <button type="submit" className="h-11 rounded-xl bg-brand px-4 text-sm font-semibold text-white">
                Apply
              </button>
            </div>
          )}
          {promoError && <p className="mt-2 text-xs text-brand">{promoError}</p>}
        </form>

        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd className="font-semibold">{formatPrice(store.subtotal)}</dd>
          </div>
          {store.discount > 0 && (
            <div className="flex justify-between text-brand">
              <dt>Promo ({store.promo})</dt>
              <dd className="font-semibold">-{formatPrice(store.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-muted">Delivery</dt>
            <dd className="font-semibold">{store.shipping === 0 ? "Free" : formatPrice(store.shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-3 text-base">
            <dt className="font-bold">Total</dt>
            <dd className="font-display text-2xl font-semibold">{formatPrice(store.total)}</dd>
          </div>
        </dl>
        <Button href="/checkout" size="lg" className="mt-6 w-full">
          Checkout <ArrowRight className="h-4 w-4" />
        </Button>
        <p className="mt-3 text-center text-xs text-muted">Cash on delivery available · 14-day exchanges</p>
      </aside>
    </div>
  );
}
