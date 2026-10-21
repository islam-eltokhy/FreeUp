import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const whole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const cents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** $42 for whole amounts, $115.20 otherwise. */
export function formatPrice(value: number) {
  return Number.isInteger(value) ? whole.format(value) : cents.format(value);
}

export function discountPercent(price: number, compareAtPrice: number) {
  if (compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

export const FREE_SHIPPING_THRESHOLD = 60;
export const PROMO_CODE = "VIBES10";
export const PROMO_RATE = 0.1;
