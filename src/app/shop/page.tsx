import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopClient } from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop all styles",
  description: "Every piece in the outlet: jackets, dresses, tops, denim, jewellery, shoes and bags at up to 50% off.",
};

export default function ShopPage() {
  return (
    <div className="container-x py-10 lg:py-14">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Vibes Outlet</p>
        <h1 className="font-display mt-2 text-4xl font-semibold leading-none sm:text-5xl">All styles</h1>
      </div>
      <Suspense fallback={<ShopSkeleton />}>
        <ShopClient />
      </Suspense>
    </div>
  );
}

function ShopSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="aspect-[4/6] animate-pulse rounded-3xl bg-cream-2" />
      ))}
    </div>
  );
}
