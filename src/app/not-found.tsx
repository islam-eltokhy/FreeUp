import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <p className="font-display text-8xl font-extrabold leading-none text-ink/10">404</p>
      <h1 className="font-display mt-4 text-3xl font-extrabold sm:text-4xl">That deal’s gone.</h1>
      <p className="mt-3 text-muted">Outlet stock moves fast. Here’s where the rest of it lives.</p>
      <Button href="/shop" size="lg" className="mt-8">
        Shop all deals <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
