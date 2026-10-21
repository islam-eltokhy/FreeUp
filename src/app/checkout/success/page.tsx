import type { Metadata } from "next";
import { Suspense } from "react";
import { SuccessView } from "./SuccessView";

export const metadata: Metadata = { title: "Order confirmed" };

export default function SuccessPage() {
  return (
    <div className="container-x py-16 lg:py-24">
      <Suspense fallback={null}>
        <SuccessView />
      </Suspense>
    </div>
  );
}
