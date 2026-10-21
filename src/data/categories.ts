import type { Category } from "@/lib/types";
import type { ProductIcon } from "@/lib/icons";

export interface CategoryMeta {
  id: Category;
  label: string;
  /** Short label for filter chips and compact nav. */
  short: string;
  blurb: string;
  icon: ProductIcon;
  from: string;
  to: string;
}

export const categories: CategoryMeta[] = [
  {
    id: "jackets",
    label: "Jackets & Outerwear",
    short: "Jackets",
    blurb: "Suede, soutache trims and structured blazers.",
    icon: "jacket",
    from: "#F3DCC8",
    to: "#D9B08C",
  },
  {
    id: "dresses",
    label: "Dresses",
    short: "Dresses",
    blurb: "Linen midis, satin slips and occasion pieces.",
    icon: "dress",
    from: "#FBE3EC",
    to: "#F3BDD0",
  },
  {
    id: "tops",
    label: "Tops & Blouses",
    short: "Tops",
    blurb: "Waistcoats, knits and everyday basics.",
    icon: "top",
    from: "#FAF3E8",
    to: "#EAD9C2",
  },
  {
    id: "denim",
    label: "Denim & Bottoms",
    short: "Denim",
    blurb: "Wide-leg, cargo and pleated silhouettes.",
    icon: "trousers",
    from: "#DCE6F0",
    to: "#AFC3D8",
  },
  {
    id: "accessories",
    label: "Jewellery & Accessories",
    short: "Jewellery",
    blurb: "Beaded layers, chunky silver and silk.",
    icon: "necklace",
    from: "#F9E7D0",
    to: "#EFC89A",
  },
  {
    id: "shoes-bags",
    label: "Shoes & Bags",
    short: "Shoes & Bags",
    blurb: "Mules, heels and totes to finish the look.",
    icon: "tote",
    from: "#F6DDE4",
    to: "#E7B5C4",
  },
];

export function categoryLabel(id: Category) {
  return categories.find((c) => c.id === id)?.label ?? id;
}
