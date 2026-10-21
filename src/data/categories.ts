import {
  Shirt,
  Footprints,
  Watch,
  Headphones,
  Lamp,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "@/lib/types";

export interface CategoryMeta {
  id: Category;
  label: string;
  blurb: string;
  icon: LucideIcon;
  from: string;
  to: string;
}

export const categories: CategoryMeta[] = [
  {
    id: "apparel",
    label: "Apparel",
    blurb: "Tees, hoodies and jackets from last season's best drops.",
    icon: Shirt,
    from: "#FFB199",
    to: "#FF6B4A",
  },
  {
    id: "footwear",
    label: "Footwear",
    blurb: "Runners, slides and court classics, up to 60% off.",
    icon: Footprints,
    from: "#C6F135",
    to: "#5BD16B",
  },
  {
    id: "accessories",
    label: "Accessories",
    blurb: "Caps, shades, totes and watches that finish the look.",
    icon: Watch,
    from: "#FFD66B",
    to: "#FF9F43",
  },
  {
    id: "tech",
    label: "Audio & Tech",
    blurb: "Headphones, speakers and gear with full warranties.",
    icon: Headphones,
    from: "#9D8CFF",
    to: "#5B4BFF",
  },
  {
    id: "home",
    label: "Home",
    blurb: "Candles, mugs and lighting to set the mood.",
    icon: Lamp,
    from: "#8FE3FF",
    to: "#3FB8E8",
  },
];

export function categoryLabel(id: Category) {
  return categories.find((c) => c.id === id)?.label ?? id;
}
