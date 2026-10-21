import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const quotes = [
  {
    name: "Priya N.",
    role: "Bought the Pulse ANC Over-Ears",
    body: "Open-box but you'd never know. Box sealed, warranty card inside, $170 cheaper than anywhere else. Felt like a glitch in the matrix.",
    initials: "PN",
    color: "#5B4BFF",
  },
  {
    name: "Marcus T.",
    role: "Bought the Stride 2 Runner",
    body: "Ordered Tuesday night, running in them Thursday morning. Sizing guide was spot on and returns were pre-paid in case it wasn't.",
    initials: "MT",
    color: "#FF6B4A",
  },
  {
    name: "Sofia R.",
    role: "Bought the Arc Desk Lamp",
    body: "Packaging was gorgeous, lamp is perfect, and the whole thing cost less than dinner. I've since sent four friends here.",
    initials: "SR",
    color: "#3FB8E8",
  },
];

export function Testimonials() {
  return (
    <section className="container-x py-20">
      <SectionHeading
        eyebrow="32,000+ reviews"
        title="Rated 4.8 by people who hate overpaying."
        align="center"
      />
      <div className="grid gap-5 md:grid-cols-3">
        {quotes.map((q) => (
          <figure key={q.name} className="flex flex-col rounded-3xl border border-line bg-white p-7 shadow-soft">
            <div className="flex gap-0.5 text-sun">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-2">“{q.body}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span
                className="grid h-10 w-10 place-items-center rounded-full text-xs font-extrabold text-white"
                style={{ background: q.color }}
              >
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
