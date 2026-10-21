"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, Banknote, CreditCard, Lock } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { getProductById } from "@/data/products";
import { cn, formatPrice } from "@/lib/utils";
import { ProductTile } from "@/components/ProductTile";
import { Button } from "@/components/ui/Button";

const field =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-sm focus:border-brand focus:outline-none placeholder:text-muted/70";

const governorates = [
  "Cairo", "Giza", "6th of October", "Alexandria", "Dakahlia", "Sharqia", "Gharbia", "Monufia", "Qalyubia",
  "Beheira", "Kafr El Sheikh", "Damietta", "Port Said", "Ismailia", "Suez", "Fayoum", "Beni Suef", "Minya",
  "Assiut", "Sohag", "Qena", "Luxor", "Aswan", "Red Sea", "Matrouh", "North Sinai", "South Sinai", "New Valley",
];

type Payment = "cod" | "card";

export function CheckoutForm() {
  const store = useStore();
  const router = useRouter();
  const [payment, setPayment] = useState<Payment>("cod");
  const [submitting, setSubmitting] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (store.items.length === 0) return;
    setSubmitting(true);
    const order = `VB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    // Simulate a confirmation round-trip.
    window.setTimeout(() => {
      store.clearCart();
      router.push(`/checkout/success?order=${order}`);
    }, 900);
  }

  if (!store.hydrated) return <div className="mt-10 h-64 animate-pulse rounded-3xl bg-cream-2" />;

  if (store.items.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-dashed border-line bg-white px-6 py-20 text-center">
        <p className="font-display text-2xl font-semibold">Your bag is empty</p>
        <p className="mt-2 text-muted">Add something before checking out.</p>
        <Button href="/shop" size="lg" className="mt-6">
          Browse styles <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]">
      <div className="space-y-8">
        <Section title="Contact" step={1}>
          <div className="grid gap-3 sm:grid-cols-2">
            <input className={field} required placeholder="Full name" autoComplete="name" />
            <input className={field} type="tel" required placeholder="Mobile (01X XXXX XXXX)" autoComplete="tel" inputMode="tel" />
          </div>
          <input className={field} type="email" placeholder="Email (optional, for your receipt)" autoComplete="email" />
          <p className="text-xs text-muted">We confirm every order on WhatsApp before dispatch.</p>
        </Section>
        <Section title="Delivery address" step={2}>
          <div className="grid gap-3 sm:grid-cols-2">
            <select className={field} required defaultValue="" aria-label="Governorate">
              <option value="" disabled>
                Governorate
              </option>
              {governorates.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
            <input className={field} required placeholder="City / district" autoComplete="address-level2" />
          </div>
          <input className={field} required placeholder="Street, building, floor, apartment" autoComplete="street-address" />
          <input className={field} placeholder="Landmark or delivery notes (optional)" />
        </Section>
        <Section title="Payment" step={3}>
          <div className="grid gap-3 sm:grid-cols-2">
            <PayOption active={payment === "cod"} onClick={() => setPayment("cod")} icon={Banknote} title="Cash on delivery" body="Pay the courier at your door." />
            <PayOption active={payment === "card"} onClick={() => setPayment("card")} icon={CreditCard} title="Card or Instapay" body="Pay securely now." />
          </div>
          {payment === "card" && (
            <div className="space-y-3 pt-1">
              <p className="text-xs text-muted">Demo checkout. Nothing is charged and card details are not stored or sent anywhere.</p>
              <input className={field} required placeholder="Card number" inputMode="numeric" autoComplete="off" />
              <div className="grid gap-3 sm:grid-cols-2">
                <input className={field} required placeholder="MM / YY" autoComplete="off" />
                <input className={field} required placeholder="CVC" inputMode="numeric" autoComplete="off" />
              </div>
            </div>
          )}
        </Section>
      </div>

      <aside className="h-fit rounded-3xl border border-line bg-white p-6 lg:sticky lg:top-28">
        <h2 className="font-display text-xl font-semibold">Order summary</h2>
        <ul className="mt-5 max-h-72 space-y-4 overflow-y-auto pr-1">
          {store.items.map((item) => {
            const product = getProductById(item.productId);
            if (!product) return null;
            return (
              <li key={`${item.productId}-${item.color}-${item.size}`} className="flex items-center gap-3">
                <div className="relative">
                  <ProductTile product={product} className="h-16 w-14 rounded-xl" />
                  <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-semibold leading-tight">{product.name}</p>
                  <p className="text-xs text-muted">
                    {product.brand}
                    {item.size ? ` · ${item.size}` : ""}
                  </p>
                </div>
                <p className="text-sm font-semibold">{formatPrice(product.price * item.quantity)}</p>
              </li>
            );
          })}
        </ul>
        <dl className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm">
          <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="font-semibold">{formatPrice(store.subtotal)}</dd></div>
          {store.discount > 0 && (
            <div className="flex justify-between text-brand"><dt>Promo ({store.promo})</dt><dd className="font-semibold">-{formatPrice(store.discount)}</dd></div>
          )}
          <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd className="font-semibold">{store.shipping === 0 ? "Free" : formatPrice(store.shipping)}</dd></div>
          <div className="flex justify-between border-t border-line pt-3 text-base"><dt className="font-bold">Total</dt><dd className="font-display text-2xl font-semibold">{formatPrice(store.total)}</dd></div>
        </dl>
        <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting}>
          <Lock className="h-4 w-4" />{" "}
          {submitting ? "Confirming…" : payment === "cod" ? `Place order · ${formatPrice(store.total)}` : `Pay ${formatPrice(store.total)}`}
        </Button>
        <p className="mt-3 text-center text-xs text-muted">Free delivery over 1,500 EGP · 14-day exchanges</p>
      </aside>
    </form>
  );
}

function Section({ title, step, children }: { title: string; step: number; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-line bg-white p-6">
      <h2 className="mb-4 flex items-center gap-3 font-display text-xl font-semibold">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-xs font-bold text-white">{step}</span>
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function PayOption({
  active,
  onClick,
  icon: Icon,
  title,
  body,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Banknote;
  title: string;
  body: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-4 text-left transition",
        active ? "border-brand bg-blush/60 ring-1 ring-brand" : "border-line bg-white hover:border-brand/40",
      )}
    >
      <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full", active ? "bg-brand text-white" : "bg-cream-2 text-ink")}>
        <Icon className="h-4 w-4" />
      </span>
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-xs text-muted">{body}</span>
      </span>
    </button>
  );
}
