import type { ProductIcon } from "@/lib/icons";

export type Category =
  | "apparel"
  | "footwear"
  | "accessories"
  | "tech"
  | "home";

export type ProductTag = "New" | "Best seller" | "Last chance" | "Limited";

export interface ProductArt {
  /** Two gradient stops used for the generated product tile. */
  from: string;
  to: string;
  /** Foreground color used for the icon/line-work on the tile. */
  ink: string;
  icon: ProductIcon;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  compareAtPrice: number;
  rating: number;
  reviews: number;
  colors: string[];
  sizes?: string[];
  tag?: ProductTag;
  description: string;
  details: string[];
  art: ProductArt;
  /**
   * Optional real photo. When set, the storefront renders it instead of the
   * generated tile. Remote hosts need to be allowed in next.config.ts.
   */
  image?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
}
