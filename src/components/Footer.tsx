import Link from "next/link";
import { Zap } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "New arrivals", href: "/shop?sort=new" },
      { label: "Biggest drops", href: "/shop?sort=discount" },
      { label: "Apparel", href: "/shop?cat=apparel" },
      { label: "Footwear", href: "/shop?cat=footwear" },
      { label: "Audio & Tech", href: "/shop?cat=tech" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping & delivery", href: "#" },
      { label: "Returns (30 days)", href: "#" },
      { label: "Order tracking", href: "#" },
      { label: "Size guide", href: "#" },
      { label: "Contact us", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Vibes", href: "#" },
      { label: "Why outlet?", href: "#" },
      { label: "Sustainability", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-cream-2">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-lime">
              <Zap className="h-5 w-5" fill="currentColor" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">
              vibes<span className="text-violet">.</span>outlet
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted">
            Last season’s best from brands you love, at prices that feel like a glitch. Authentic, guaranteed, and
            shipped fast.
          </p>
          <div className="mt-6 flex gap-2">
            {["Visa", "MC", "Amex", "PayPal", "Apple Pay"].map((p) => (
              <span key={p} className="rounded-md border border-line bg-white px-2 py-1 text-[10px] font-bold text-muted">
                {p}
              </span>
            ))}
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-ink">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted transition hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Vibes Outlet. All prices in USD. Demo storefront.</p>
          <p className="flex gap-4">
            <Link href="#" className="hover:text-ink">Privacy</Link>
            <Link href="#" className="hover:text-ink">Terms</Link>
            <Link href="#" className="hover:text-ink">Cookies</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
