import type { ProductIcon } from "@/lib/icons";

export type Category = "jackets" | "dresses" | "tops" | "denim" | "accessories" | "shoes-bags";

export type ProductTag = "New in" | "Best seller" | "Last pieces" | "Made in Egypt" | "As seen on Instagram";

export interface ProductArt {
  /** Two soft gradient stops for the generated product tile. */
  from: string;
  to: string;
  /** Stroke colour for the garment silhouette. */
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
  material?: string;
  description: string;
  details: string[];
  /** Product ids that complete the look. */
  styleWith?: string[];
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
