"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { ProductTile } from "@/components/ProductTile";
import { Button } from "@/components/ui/Button";

const field =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-sm focus:border-ink focus:outline-none placeholder:text-muted/70";

export function CheckoutForm() {
  const store = useStore();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (store.items.length === 0) return;
    setSubmitting(true);
    const order = `VB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    try {
      window.sessionStorage.setItem(
        "vibes.lastOrder",
        JSON.stringify({ order, total: store.total, count: store.count }),
      );
    } catch {
      /* ignore */
    }
    // Simulate a payment round-trip.
    window.setTimeout(() => {
      store.clearCart();
      router.push(`/checkout/success?order=${order}`);
    }, 900);
  }

  if (!store.hydrated) return <div className="mt-10 h-64 animate-pulse rounded-3xl bg-cream-2" />;

  if (store.items.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-dashed border-line bg-white px-6 py-20 text-center">
        <p className="font-display text-2xl font-bold">Your bag is empty</p>
        <p className="mt-2 text-muted">Add something before checking out.</p>
        <Button href="/shop" variant="lime" size="lg" className="mt-6">
          Browse deals <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]">
      <div className="space-y-8">
        <Section title="Contact" step={1}>
          <input className={field} type="email" required placeholder="Email address" autoComplete="email" />
        </Section>
        <Section title="Delivery" step={2}>
          <div className="grid gap-3 sm:grid-cols-2">
            <input className={field} required placeholder="First name" autoComplete="given-name" />
            <input className={field} required placeholder="Last name" autoComplete="family-name" />
          </div>
          <input className={field} required placeholder="Address" autoComplete="street-address" />
          <div className="grid gap-3 sm:grid-cols-3">
            <input className={field} required placeholder="City" autoComplete="address-level2" />
            <input className={field} required placeholder="State" autoComplete="address-level1" />
            <input className={field} required placeholder="ZIP" autoComplete="postal-code" />
          </div>
        </Section>
        <Section title="Payment" step={3}>
          <p className="-mt-1 mb-1 text-xs text-muted">
            Demo checkout. Nothing is charged and card details are not stored or sent anywhere.
          </p>
          <input className={field} required placeholder="Card number" inputMode="numeric" autoComplete="off" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input className={field} required placeholder="MM / YY" autoComplete="off" />
            <input className={field} required placeholder="CVC" inputMode="numeric" autoComplete="off" />
          </div>
        </Section>
      </div>

      <aside className="h-fit rounded-3xl border border-line bg-white p-6 lg:sticky lg:top-28">
        <h2 className="font-display text-xl font-bold">Order summary</h2>
        <ul className="mt-5 max-h-72 space-y-4 overflow-y-auto pr-1">
          {store.items.map((item) => {
            const product = getProductById(item.productId);
            if (!product) return null;
            return (
              <li key={`${item.productId}-${item.color}-${item.size}`} className="flex items-center gap-3">
                <div className="relative">
                  <ProductTile product={product} className="h-16 w-14 rounded-xl" />
                  <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[10px] font-bold text-cream">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-semibold leading-tight">{product.name}</p>
                  <p className="text-xs text-muted">{product.brand}{item.size ? ` · ${item.size}` : ""}</p>
                </div>
                <p className="text-sm font-semibold">{formatPrice(product.price * item.quantity)}</p>
              </li>
            );
          })}
        </ul>
        <dl className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm">
          <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="font-semibold">{formatPrice(store.subtotal)}</dd></div>
          {store.discount > 0 && (
            <div className="flex justify-between text-violet"><dt>Promo ({store.promo})</dt><dd className="font-semibold">-{formatPrice(store.discount)}</dd></div>
          )}
          <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd className="font-semibold">{store.shipping === 0 ? "Free" : formatPrice(store.shipping)}</dd></div>
          <div className="flex justify-between border-t border-line pt-3 text-base"><dt className="font-bold">Total</dt><dd className="font-display text-2xl font-extrabold">{formatPrice(store.total)}</dd></div>
        </dl>
        <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting}>
          <Lock className="h-4 w-4" /> {submitting ? "Processing…" : `Pay ${formatPrice(store.total)}`}
        </Button>
        <p className="mt-3 text-center text-xs text-muted">256-bit encrypted · 30-day returns</p>
      </aside>
    </form>
  );
}

function Section({ title, step, children }: { title: string; step: number; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-line bg-white p-6">
      <h2 className="mb-4 flex items-center gap-3 font-display text-xl font-bold">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-xs font-bold text-cream">{step}</span>
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
