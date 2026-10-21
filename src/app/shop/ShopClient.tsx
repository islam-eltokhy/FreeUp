"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import type { Category } from "@/lib/types";
import { cn, discountPercent } from "@/lib/utils";
import { ProductCard } from "@/components/ProductCard";

type Sort = "featured" | "discount" | "price-asc" | "price-desc" | "new" | "rating";

const sorts: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "discount", label: "Biggest discount" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
  { id: "new", label: "New in" },
];

const categoryIds = new Set<string>(categories.map((c) => c.id));

export function ShopClient() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const catParam = params.get("cat");
  const cat: Category | "all" = catParam && categoryIds.has(catParam) ? (catParam as Category) : "all";
  const sortParam = params.get("sort");
  const sort: Sort = sorts.some((s) => s.id === sortParam) ? (sortParam as Sort) : "featured";
  const [query, setQuery] = useState(params.get("q") ?? "");

  function setParam(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value && value !== "all" && value !== "featured") next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => (cat === "all" ? true : p.category === cat));
    if (q) {
      list = list.filter((p) =>
        [p.name, p.brand, p.description, p.category].some((s) => s.toLowerCase().includes(q)),
      );
    }
    const byDiscount = (p: (typeof products)[number]) => discountPercent(p.price, p.compareAtPrice);
    switch (sort) {
      case "discount":
        return [...list].sort((a, b) => byDiscount(b) - byDiscount(a));
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      case "new":
        return [...list].sort((a, b) => Number(b.tag === "New") - Number(a.tag === "New"));
      default:
        return [...list].sort((a, b) => b.reviews * b.rating - a.reviews * a.rating);
    }
  }, [cat, sort, query]);

  return (
    <div>
      <div className="sticky top-[100px] z-30 -mx-4 mb-8 border-y border-line bg-cream/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Chip active={cat === "all"} onClick={() => setParam("cat", null)}>
              All
            </Chip>
            {categories.map((c) => (
              <Chip key={c.id} active={cat === c.id} onClick={() => setParam("cat", c.id)}>
                <c.icon className="h-3.5 w-3.5" /> {c.label}
              </Chip>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <label className="relative flex-1 lg:w-64">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search brands, products"
                className="h-10 w-full rounded-full border border-line bg-white pl-10 pr-9 text-sm focus:border-ink focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-ink/5"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </label>
            <label className="relative">
              <SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <select
                value={sort}
                onChange={(e) => setParam("sort", e.target.value)}
                className="h-10 appearance-none rounded-full border border-line bg-white pl-10 pr-8 text-sm font-medium focus:border-ink focus:outline-none"
                aria-label="Sort products"
              >
                {sorts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <p className="mb-5 text-sm text-muted">
        <span className="font-semibold text-ink">{results.length}</span> {results.length === 1 ? "deal" : "deals"}
        {cat !== "all" && (
          <>
            {" "}
            in <span className="font-semibold text-ink">{categories.find((c) => c.id === cat)?.label}</span>
          </>
        )}
      </p>

      {results.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-line bg-white px-6 py-20 text-center">
          <p className="font-display text-2xl font-bold">Nothing matches that, yet.</p>
          <p className="mt-2 text-muted">Try a different search or clear the filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              router.replace(pathname);
            }}
            className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream"
          >
            Clear everything
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition",
        active ? "border-ink bg-ink text-cream" : "border-line bg-white text-ink-2 hover:border-ink/40",
      )}
    >
      {children}
    </button>
  );
}
