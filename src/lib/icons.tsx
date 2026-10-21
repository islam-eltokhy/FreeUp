import type { SVGProps } from "react";
import { Gem, Glasses, Watch } from "lucide-react";

type IconProps = SVGProps<SVGSVGElement> & { strokeWidth?: number };

function base(props: IconProps) {
  const { strokeWidth = 1.5, ...rest } = props;
  return {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...rest,
  };
}

/* Garment silhouettes drawn on the same 24x24 grid as Lucide. */

export const Jacket = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 3 6 4.5 3 10l3 1.5V21h12v-9.5L21 10l-3-5.5L15 3" />
    <path d="M9 3l3 7 3-7" />
    <path d="M12 10v11" />
    <path d="M6 11.5 6.5 15M18 11.5 17.5 15" />
    <path d="M10 14h.01M10 17.5h.01" />
  </svg>
);

export const Dress = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 3c0 4 2 6 2 7l-4 11h14l-4-11c0-1 2-3 2-7" />
    <path d="M7 3c2 3 8 3 10 0" />
    <path d="M9 10h6" />
  </svg>
);

export const Top = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 3 3 6l2 4 2-1v12h10V9l2 1 2-4-5-3" />
    <path d="M8 3c1 2 7 2 8 0" />
  </svg>
);

export const Vest = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 3l-1 5 2 1v12h8V9l2-1-1-5" />
    <path d="M7 3l5 8 5-8" />
    <path d="M12 11v10" />
    <path d="M10 14h.01M10 17h.01" />
  </svg>
);

export const Trousers = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 3h12l2 18h-6l-2-10-2 10H4z" />
    <path d="M6 6.5h12" />
  </svg>
);

export const Skirt = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 3h8l4 18H4z" />
    <path d="M8 6.5h8" />
    <path d="M11 6.5 9 21M13 6.5 15 21" />
  </svg>
);

export const Necklace = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 3c0 8 4 13 8 14 4-1 8-6 8-14" />
    <path d="M12 17l2.5 2.5L12 22l-2.5-2.5z" />
    <path d="M6.5 11h.01M9 14.5h.01M15 14.5h.01M17.5 11h.01" />
  </svg>
);

export const Earrings = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="8" cy="15" r="4.5" />
    <circle cx="16" cy="15" r="4.5" />
    <path d="M8 10.5V5M16 10.5V5" />
    <circle cx="8" cy="3.5" r="1" />
    <circle cx="16" cy="3.5" r="1" />
  </svg>
);

export const Tote = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 8V6a4 4 0 0 1 8 0v2" />
    <path d="M4 8h16l-1 13H5z" />
    <path d="M8 12h8" />
  </svg>
);

export const Heel = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2 17l2-5c2-3 5-3 8-1l8 4v2H2z" />
    <path d="M16 17v4h2v-4" />
    <path d="M6 12.5c1 1 2 1 3 .5" />
  </svg>
);

export const Scarf = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 5c5-3 11 5 16 2" />
    <path d="M4 5v10c5-3 11 5 16 2V7" />
    <path d="M6 15l-1 5M9 15.5l-.5 5M15 16.5l.5 4.5M18 16l1 5" />
  </svg>
);

/** Icons available for generated product tiles, keyed by a serialisable name. */
export const productIcons = {
  jacket: Jacket,
  dress: Dress,
  top: Top,
  vest: Vest,
  trousers: Trousers,
  skirt: Skirt,
  necklace: Necklace,
  earrings: Earrings,
  ring: Gem,
  tote: Tote,
  heel: Heel,
  scarf: Scarf,
  sunglasses: Glasses,
  watch: Watch,
} as const;

export type ProductIcon = keyof typeof productIcons;

/** Instagram glyph (Lucide removed brand icons in v1). */
export const Instagram = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);
