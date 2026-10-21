import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedProducts() {
  const featured = [...products].sort((a, b) => b.reviews * b.rating - a.reviews * a.rating).slice(0, 8);
  return (
    <section id="new-in" className="container-x py-20">
      <SectionHeading
        eyebrow="Trending in store"
        title="The pieces everyone is asking about."
        description="Sorted by what’s leaving the rails fastest. Hover for a one-tap add."
        action={{ label: "See all styles", href: "/shop" }}
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p, i) => (
          <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <ProductCard product={p} className="h-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
