"use client";

import { Check, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export function Toaster() {
  const { toasts, dismissToast } = useStore();
  if (toasts.length === 0) return null;
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[60] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-cream shadow-lift animate-toast-in"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-white">
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
          <div className="flex-1 text-sm">
            <p className="font-semibold">{t.title}</p>
            {t.description && <p className="text-cream/70">{t.description}</p>}
          </div>
          <button
            type="button"
            onClick={() => dismissToast(t.id)}
            className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/10"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
