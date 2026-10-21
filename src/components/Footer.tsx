import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import { Instagram } from "@/lib/icons";
import { STORE } from "@/lib/utils";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "New in", href: "/shop?sort=new" },
      { label: "Sale", href: "/shop?sort=discount" },
      { label: "Jackets & Outerwear", href: "/shop?cat=jackets" },
      { label: "Dresses", href: "/shop?cat=dresses" },
      { label: "Denim & Bottoms", href: "/shop?cat=denim" },
      { label: "Jewellery & Accessories", href: "/shop?cat=accessories" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Delivery across Egypt", href: "#" },
      { label: "Cash on delivery", href: "#" },
      { label: "Exchanges (14 days)", href: "#" },
      { label: "Size guide", href: "#" },
      { label: "Track my order", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-cream-2">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo size="lg" />
          <p className="mt-4 max-w-xs text-sm text-muted">
            A women’s fashion outlet in Hadayek October. Current-season jackets, dresses, denim and jewellery at outlet
            prices, in store and delivered anywhere in Egypt.
          </p>
          <div className="mt-6 flex gap-2">
            {["Cash on delivery", "Visa", "Mastercard", "Instapay"].map((p) => (
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
                  <Link href={l.href} className="text-sm text-muted transition hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-ink">Visit us</h4>
          <p className="mt-4 flex items-start gap-2 text-sm text-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {STORE.address}
          </p>
          <p className="mt-2 text-sm text-muted">{STORE.hours}</p>
          <div className="mt-4 flex gap-2">
            <a
              href={STORE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-cream hover:bg-brand"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a
              href={STORE.whatsapp}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold hover:border-brand hover:text-brand"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Vibes Outlet. Prices in EGP and include VAT. Demo storefront.</p>
          <p className="flex gap-4">
            <Link href="#" className="hover:text-ink">Privacy</Link>
            <Link href="#" className="hover:text-ink">Terms</Link>
            <Link href="#" className="hover:text-ink">Exchanges</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
