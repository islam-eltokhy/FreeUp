"use client";

import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SuccessView() {
  const params = useSearchParams();
  const order = params.get("order") ?? "VB-PENDING";
  return (
    <div className="mx-auto max-w-xl text-center">
      <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-lime shadow-soft">
        <Check className="h-9 w-9" strokeWidth={3} />
      </span>
      <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-violet">Order {order}</p>
      <h1 className="font-display mt-3 text-balance text-4xl font-extrabold leading-[1] sm:text-5xl">
        Good vibes incoming.
      </h1>
      <p className="mt-4 text-muted">
        Your order is confirmed and will ship within 48 hours. We’ll email you tracking the moment it leaves the
        warehouse.
      </p>
      <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-left text-sm shadow-soft">
        <PackageCheck className="h-6 w-6 text-violet" />
        <div>
          <p className="font-semibold">Estimated delivery</p>
          <p className="text-muted">3 to 5 working days, tracked</p>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button href="/shop" size="lg">
          Keep shopping <ArrowRight className="h-4 w-4" />
        </Button>
        <Button href="/" variant="secondary" size="lg">
          Back home
        </Button>
      </div>
    </div>
  );
}
