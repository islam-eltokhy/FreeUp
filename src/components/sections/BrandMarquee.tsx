const items = [
  "Northwave",
  "Atlas",
  "Pulse Audio",
  "Lumen",
  "Fjord",
  "Kuko",
  "Up to 70% off",
  "Authenticity guaranteed",
  "30-day returns",
];

export function BrandMarquee() {
  const row = [...items, ...items];
  return (
    <section aria-label="Featured brands" className="border-y border-ink/10 bg-ink py-5 text-cream">
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-10 pr-10">
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="font-display text-xl font-extrabold uppercase tracking-tight sm:text-2xl">{item}</span>
              <span className="h-2 w-2 rounded-full bg-lime" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
