import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const numberCents = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Prices are in Egyptian pounds: "1,450 EGP". */
export function formatPrice(value: number) {
  const n = Number.isInteger(value) ? number.format(value) : numberCents.format(value);
  return `${n} EGP`;
}

export function discountPercent(price: number, compareAtPrice: number) {
  if (compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

export const FREE_SHIPPING_THRESHOLD = 1500;
export const SHIPPING_FEE = 60;
export const PROMO_CODE = "VIBES10";
export const PROMO_RATE = 0.1;

export const STORE = {
  name: "Vibes Outlet",
  tagline: "Where fashion sets the mood",
  address: "Zoweil Plaza Mall, 2nd floor, Hadayek October, Giza",
  hours: "Daily 11:00 – 23:00",
  instagramUrl: "https://www.instagram.com/reel/DewiN1ctNWt/",
  whatsapp: "#",
};
