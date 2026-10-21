"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useStore, itemKey } from "@/context/StoreContext";
import { getProductById } from "@/data/products";
import { FREE_SHIPPING_THRESHOLD, formatPrice } from "@/lib/utils";
import { ProductTile } from "./ProductTile";
import { Button } from "./ui/Button";

export function CartDrawer() {
  const { drawerOpen, closeDrawer, items, subtotal, updateQuantity, removeItem } = useStore();
  const pathname = usePathname();

  useEffect(() => {
    closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [drawerOpen, closeDrawer]);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div
      className={`fixed inset-0 z-50 ${drawerOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!drawerOpen}
    >
      <div
        onClick={closeDrawer}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-lift transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-xl font-bold">Your bag</h2>
          <button
            type="button"
            onClick={closeDrawer}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5"
            aria-label="Close bag"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="border-b border-line px-5 py-3">
          <p className="text-xs font-medium text-ink-2">
            {remaining > 0 ? (
              <>
                Add <span className="font-bold">{formatPrice(remaining)}</span> more for free delivery
              </>
            ) : (
              <span className="font-bold text-brand">You’ve unlocked free delivery</span>
            )}
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
            <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-soft">
                <ShoppingBag className="h-7 w-7 text-muted" />
              </span>
              <p className="mt-4 font-semibold">Your bag is empty</p>
              <p className="mt-1 text-sm text-muted">New pieces land every week.</p>
              <Button href="/shop" className="mt-6" onClick={closeDrawer}>
                Start shopping
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {items.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                const key = itemKey(item);
                return (
                  <li key={key} className="flex gap-4 py-4">
                    <ProductTile product={product} className="h-24 w-20 shrink-0 rounded-xl" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-muted">{product.brand}</p>
                          <Link href={`/shop/${product.slug}`} className="font-semibold leading-tight hover:underline">
                            {product.name}
                          </Link>
                          <p className="mt-1 flex items-center gap-2 text-xs text-muted">
                            {item.color && (
                              <span className="inline-flex items-center gap-1">
                                <span className="h-3 w-3 rounded-full ring-1 ring-ink/10" style={{ background: item.color }} />
                              </span>
                            )}
                            {item.size && <span>Size {item.size}</span>}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(key)}
                          className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-brand"
                          aria-label={`Remove ${product.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="inline-flex items-center rounded-full border border-line bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(key, item.quantity - 1)}
                            className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold tabular-nums">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(key, item.quantity + 1)}
                            className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="font-bold">{formatPrice(product.price * item.quantity)}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-line bg-white px-5 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="text-lg font-bold">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted">Delivery and promo codes are applied at checkout. Cash on delivery available.</p>
            <div className="mt-4 grid gap-2">
              <Button href="/checkout" size="lg" className="w-full">
                Checkout <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/cart" variant="secondary" className="w-full">
                View bag
              </Button>
            </div>
          </footer>
        )}
      </aside>
    </div>
  );
}
