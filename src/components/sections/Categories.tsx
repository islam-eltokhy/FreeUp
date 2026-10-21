import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Categories() {
  return (
    <section className="container-x py-20">
      <SectionHeading
        eyebrow="Browse by vibe"
        title="Five aisles. Zero full-price regret."
        description="Everything is last season, open-box or overstock. Nothing is a knock-off."
        action={{ label: "Shop everything", href: "/shop" }}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {categories.map((c, i) => {
          const count = products.filter((p) => p.category === c.id).length;
          const Icon = c.icon;
          const span = i === 0 ? "lg:col-span-3 lg:row-span-1" : i === 1 ? "lg:col-span-3" : "lg:col-span-2";
          return (
            <Link
              key={c.id}
              href={`/shop?cat=${c.id}`}
              className={`group noise relative isolate flex min-h-[200px] flex-col justify-between overflow-hidden rounded-3xl p-6 text-ink shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${span}`}
              style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/70 backdrop-blur">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-cream transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">{count} deals</p>
                <h3 className="font-display mt-1 text-2xl font-extrabold">{c.label}</h3>
                <p className="mt-1 max-w-xs text-sm opacity-80">{c.blurb}</p>
              </div>
              <Icon
                aria-hidden
                className="absolute -bottom-8 -right-8 h-44 w-44 opacity-[0.12] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                strokeWidth={1}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
