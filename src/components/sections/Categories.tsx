import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { productIcons } from "@/lib/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Categories() {
  return (
    <section className="container-x py-20">
      <SectionHeading
        eyebrow="Shop by category"
        title="Six rails. One very good mood."
        description="Everything in store is current season, hand-picked and priced to go home with you today."
        action={{ label: "Shop everything", href: "/shop" }}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.id).length;
          const Icon = productIcons[c.icon];
          return (
            <Link
              key={c.id}
              href={`/shop?cat=${c.id}`}
              className="group noise relative isolate flex min-h-[220px] flex-col justify-between overflow-hidden rounded-arch p-6 pt-8 text-ink shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              style={{ background: `linear-gradient(160deg, ${c.from}, ${c.to})` }}
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/70 backdrop-blur">
                  <Icon className="h-6 w-6 text-brand-2" strokeWidth={1.5} />
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-cream transition-transform duration-300 group-hover:rotate-45 group-hover:bg-brand">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">{count} styles</p>
                <h3 className="font-display mt-1 text-2xl font-semibold">{c.label}</h3>
                <p className="mt-1 max-w-xs text-sm opacity-80">{c.blurb}</p>
              </div>
              <Icon
                aria-hidden
                className="absolute -bottom-8 -right-8 h-44 w-44 text-ink opacity-[0.07] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                strokeWidth={0.9}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
