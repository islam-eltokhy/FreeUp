import type { Metadata } from "next";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="container-x py-10 lg:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Almost there</p>
      <h1 className="font-display mt-2 text-4xl font-semibold leading-none sm:text-5xl">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
