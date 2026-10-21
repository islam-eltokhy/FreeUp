# Vibes Outlet

Storefront and landing page for **Vibes Outlet**, a women’s fashion outlet at Zoweil Plaza Mall, Hadayek October (Giza), with delivery across Egypt. Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript and Tailwind CSS v4.

Brand direction comes from the boutique’s Instagram reel: magenta “V!BES outlet” mark, the tagline “Where fashion sets the mood”, blush/cream/camel palette, and a boho-chic edit of jackets, dresses, denim and jewellery.

## Features

- **Landing page**: hero bento with the reel’s jacket, highlights marquee, category arches, trending pieces, an “as seen on Instagram” get-the-look section, delivery/COD/exchange value props, store visit card, testimonials and a WhatsApp early-access CTA.
- **Shop** (`/shop`) with category chips, search and sorting. Filters live in the URL so they are shareable.
- **Product pages** (`/shop/[slug]`): colour and size pickers, fabric, quantity, wishlist, delivery and exchange info, and “complete the look” suggestions.
- **Bag and checkout**: slide-over drawer with free-delivery progress, cart page, promo code `VIBES10`, and a checkout with Egyptian governorates and cash on delivery or card. Ends on an order confirmation.
- **Wishlist** persisted alongside the bag in `localStorage` and synced across tabs.
- **Zero external images**: product art is a generated boutique tile (gradient, arch, garment silhouette). Set `image` on a product to use a real photo.

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm lint
pnpm build && pnpm start
```

## Project structure

```
src/
  app/                  routes (landing, shop, product, cart, wishlist, checkout)
  components/           Logo, Navbar, CartDrawer, ProductCard, ProductTile, Footer, ui/*
  components/sections/  landing page sections
  context/StoreContext  bag + wishlist + toasts (useSyncExternalStore over localStorage)
  data/                 products.ts and categories.ts (the catalog)
  lib/                  types, garment icons, EGP formatting, store details
```

## Editing the catalog and store details

- Products live in `src/data/products.ts`. `price` and `compareAtPrice` drive the discount badge; `styleWith` lists product ids that complete the look; `art` (`from`, `to`, `ink`, `icon`) draws the generated tile. Icon names come from `src/lib/icons.tsx`.
- Store address, hours, Instagram and WhatsApp links are in `STORE` inside `src/lib/utils.ts`. Delivery fee and free-delivery threshold live next to it.
- To use real photography, add `image: "https://..."` to a product and allow the host under `images.remotePatterns` in `next.config.ts`.

## Notes

- Checkout is a demo: nothing is charged, and card fields are not stored or sent anywhere.
- Labels (Oasis Atelier, Maison Nour, etc.), reviews and ratings are placeholders to replace with the real range.
