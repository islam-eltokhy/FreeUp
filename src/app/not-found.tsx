import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <p className="font-display text-8xl font-semibold leading-none text-brand/15">404</p>
      <h1 className="font-display mt-4 text-3xl font-semibold sm:text-4xl">That piece has gone home with someone.</h1>
      <p className="mt-3 text-muted">Outlet stock moves fast. Here’s what is still on the rails.</p>
      <Button href="/shop" size="lg" className="mt-8">
        Shop all styles <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
