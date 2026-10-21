import { Clock, MapPin, MessageCircle, Navigation } from "lucide-react";
import { Instagram } from "@/lib/icons";
import { Button } from "@/components/ui/Button";
import { STORE } from "@/lib/utils";

export function VisitStore() {
  return (
    <section id="visit" className="container-x py-10">
      <div className="grid overflow-hidden rounded-[2.5rem] border border-line bg-white shadow-soft lg:grid-cols-2">
        <div className="noise relative isolate min-h-[320px] bg-gradient-to-br from-blush via-cream-2 to-sand">
          <svg aria-hidden className="absolute inset-0 h-full w-full text-ink/10" viewBox="0 0 400 300" preserveAspectRatio="none">
            <path d="M0 80 H400 M0 150 H400 M0 220 H400 M90 0 V300 M200 0 V300 M310 0 V300" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M0 110 C120 100 180 190 400 170" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.6" />
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand text-white shadow-brand">
              <MapPin className="h-7 w-7" />
            </span>
            <p className="font-display mt-3 text-xl font-semibold">Zoweil Plaza Mall</p>
            <p className="text-sm text-muted">2nd floor · Hadayek October</p>
          </div>
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Come say hi</p>
          <h2 className="font-display mt-3 text-balance text-3xl font-semibold leading-[1.05] sm:text-4xl">
            Try the whole rail on in Hadayek October.
          </h2>
          <p className="mt-4 text-muted">
            The boutique is where the vibe lives: pink ottomans, dreamcatchers, and a team that will happily pull five
            sizes for you. Reserve online and pick up in store, or just drop by.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {STORE.address}
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {STORE.hours}
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#" variant="dark">
              <Navigation className="h-4 w-4" /> Get directions
            </Button>
            <Button href={STORE.whatsapp} variant="secondary">
              <MessageCircle className="h-4 w-4 text-brand" /> WhatsApp us
            </Button>
            <Button href={STORE.instagramUrl} target="_blank" rel="noreferrer" variant="secondary">
              <Instagram className="h-4 w-4 text-brand" /> Instagram
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
