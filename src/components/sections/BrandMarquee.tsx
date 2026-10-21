const items = [
  "New drops every week",
  "Made in Egypt",
  "Cash on delivery",
  "Delivery across Egypt",
  "Sizes S to XL",
  "14-day exchanges",
  "Zoweil Plaza Mall",
];

export function BrandMarquee() {
  const row = [...items, ...items];
  return (
    <section aria-label="Store highlights" className="border-y border-brand/20 bg-brand py-4 text-white">
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-10 pr-10">
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="font-display text-xl font-medium italic tracking-tight sm:text-2xl">{item}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
