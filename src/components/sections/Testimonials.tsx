import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const quotes = [
  {
    name: "Mariam H.",
    role: "Bought the Soutache Suede Jacket",
    body: "Saw it on the reel at 10pm, ordered it, and it was at my door in Sheikh Zayed two days later. The embroidery is even prettier in person.",
    initials: "MH",
    color: "#C81D63",
  },
  {
    name: "Salma A.",
    role: "Bought the Wide-Leg Jeans",
    body: "Finally a wide leg that actually fits a 38. Cash on delivery made it easy, and the girls in store swapped my size in five minutes.",
    initials: "SA",
    color: "#8B5A36",
  },
  {
    name: "Farida K.",
    role: "Bought the Beaded Necklace",
    body: "The store is so cute I ended up with three things. Prices feel like a mistake in the best way. Already sent my sister.",
    initials: "FK",
    color: "#2A1A21",
  },
];

export function Testimonials() {
  return (
    <section className="container-x py-20">
      <SectionHeading eyebrow="From our customers" title="Loved in store. Loved at the door." align="center" />
      <div className="grid gap-5 md:grid-cols-3">
        {quotes.map((q) => (
          <figure key={q.name} className="flex flex-col rounded-3xl border border-line bg-white p-7 shadow-soft">
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-2">“{q.body}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full text-xs font-extrabold text-white" style={{ background: q.color }}>
                {q.initials}
              </span>
              <div>
                <p className="text-sm font-bold">{q.name}</p>
                <p className="text-xs text-muted">{q.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
