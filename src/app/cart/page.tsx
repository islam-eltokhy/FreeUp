import type { Metadata } from "next";
import { CartView } from "./CartView";

export const metadata: Metadata = { title: "Your bag" };

export default function CartPage() {
  return (
    <div className="container-x py-10 lg:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Bag</p>
      <h1 className="font-display mt-2 text-4xl font-semibold leading-none sm:text-5xl">Your bag</h1>
      <CartView />
    </div>
  );
}
