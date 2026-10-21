"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/types";
import { getProductById } from "@/data/products";
import { PROMO_CODE, PROMO_RATE, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/utils";

/* ------------------------------------------------------------------------ */
/* Persisted store (cart + wishlist) backed by localStorage.                 */
/* Exposed through useSyncExternalStore so SSR renders an empty bag and the  */
/* client swaps in the saved one without hydration mismatches.              */
/* ------------------------------------------------------------------------ */

const STORAGE_KEY = "vibes.store.v1";

interface Persisted {
  items: CartItem[];
  wishlist: string[];
}

const EMPTY: Persisted = { items: [], wishlist: [] };
let snapshot: Persisted | null = null;
const listeners = new Set<() => void>();

function readStorage(): Persisted {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
    };
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): Persisted {
  if (snapshot === null) snapshot = readStorage();
  return snapshot;
}

function getServerSnapshot(): Persisted {
  return EMPTY;
}

function emit() {
  listeners.forEach((l) => l());
}

function update(updater: (prev: Persisted) => Persisted) {
  snapshot = updater(getSnapshot());
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    /* storage unavailable: keep in-memory state only */
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      snapshot = null;
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const subscribeNoop = () => () => {};

/* ------------------------------------------------------------------------ */

export interface Toast {
  id: number;
  title: string;
  description?: string;
}

interface StoreValue {
  hydrated: boolean;
  items: CartItem[];
  count: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promo: string | null;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
  addItem: (item: CartItem) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toasts: Toast[];
  pushToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function itemKey(item: Pick<CartItem, "productId" | "color" | "size">) {
  return [item.productId, item.color ?? "", item.size ?? ""].join("|");
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const persisted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
  const { items, wishlist } = persisted;

  const [promo, setPromo] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const pushToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = ++toastId.current;
    setToasts((t) => [...t.slice(-2), { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3200);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const addItem = useCallback((item: CartItem) => {
    update((prev) => {
      const key = itemKey(item);
      const existing = prev.items.find((p) => itemKey(p) === key);
      const items = existing
        ? prev.items.map((p) => (itemKey(p) === key ? { ...p, quantity: p.quantity + item.quantity } : p))
        : [...prev.items, item];
      return { ...prev, items };
    });
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    update((prev) => ({
      ...prev,
      items:
        quantity <= 0
          ? prev.items.filter((p) => itemKey(p) !== key)
          : prev.items.map((p) => (itemKey(p) === key ? { ...p, quantity } : p)),
    }));
  }, []);

  const removeItem = useCallback((key: string) => {
    update((prev) => ({ ...prev, items: prev.items.filter((p) => itemKey(p) !== key) }));
  }, []);

  const clearCart = useCallback(() => {
    update((prev) => ({ ...prev, items: [] }));
    setPromo(null);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    update((prev) => ({
      ...prev,
      wishlist: prev.wishlist.includes(productId)
        ? prev.wishlist.filter((id) => id !== productId)
        : [...prev.wishlist, productId],
    }));
  }, []);

  const applyPromo = useCallback((code: string) => {
    const ok = code.trim().toUpperCase() === PROMO_CODE;
    setPromo(ok ? PROMO_CODE : null);
    return ok;
  }, []);

  const clearPromo = useCallback(() => setPromo(null), []);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo<StoreValue>(() => {
    const subtotal = items.reduce((sum, item) => {
      const product = getProductById(item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    const discount = promo ? Math.round(subtotal * PROMO_RATE * 100) / 100 : 0;
    const shipping = subtotal === 0 || subtotal - discount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const total = Math.max(0, subtotal - discount + shipping);
    return {
      hydrated,
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal,
      discount,
      shipping,
      total,
      promo,
      applyPromo,
      clearPromo,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      wishlist,
      toggleWishlist,
      isWishlisted: (id) => wishlist.includes(id),
      drawerOpen,
      openDrawer,
      closeDrawer,
      toasts,
      pushToast,
      dismissToast,
    };
  }, [
    hydrated,
    items,
    wishlist,
    promo,
    drawerOpen,
    toasts,
    applyPromo,
    clearPromo,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    toggleWishlist,
    openDrawer,
    closeDrawer,
    pushToast,
    dismissToast,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
