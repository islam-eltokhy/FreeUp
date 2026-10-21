# Vibes Outlet

A modern outlet storefront: big-brand vibes, outlet prices. Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript and Tailwind CSS v4.

## Features

- **Landing page** with animated hero bento, brand marquee, category grid, trending products, deal-of-the-day countdown, value props, testimonials and newsletter sign-up.
- **Shop** (`/shop`) with category chips, search, and sorting (discount, price, rating, new). Filters live in the URL so they are shareable.
- **Product pages** (`/shop/[slug]`) with colour and size selection, quantity, wishlist, and related products. Statically generated from the catalog.
- **Bag** with slide-over drawer, quantity controls, free-shipping progress, promo code (`VIBES10`), and a mock checkout that ends on an order confirmation.
- **Wishlist** persisted alongside the bag in `localStorage` and synced across tabs.
- Zero external image dependencies: product art is generated from a gradient plus an icon, so the store runs fully offline. Set `image` on a product to use a real photo instead.

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
  components/           UI: Navbar, CartDrawer, ProductCard, ProductTile, Footer, ui/*
  components/sections/  landing page sections
  context/StoreContext  cart + wishlist + toasts (useSyncExternalStore over localStorage)
  data/                 products.ts and categories.ts (the catalog)
  lib/                  types, icons, formatting helpers
```

## Editing the catalog

Products live in `src/data/products.ts`. Each product has a `slug`, pricing (`price` and `compareAtPrice` drive the discount badge), `colors`, optional `sizes` and `tag`, and an `art` block (`from`, `to`, `ink`, `icon`) used to draw the generated tile. Icon names come from `src/lib/icons.ts`.

To use real photography, add `image: "https://..."` to a product and allow the host under `images.remotePatterns` in `next.config.ts`.

## Notes

- Checkout is a demo: nothing is charged, and card fields are not stored or sent anywhere.
- Brands and reviews are fictional placeholders.
