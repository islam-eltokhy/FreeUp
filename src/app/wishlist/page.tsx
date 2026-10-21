import type { Metadata } from "next";
import { WishlistView } from "./WishlistView";

export const metadata: Metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <div className="container-x py-10 lg:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Saved</p>
      <h1 className="font-display mt-2 text-4xl font-semibold leading-none sm:text-5xl">Your wishlist</h1>
      <WishlistView />
    </div>
  );
}
