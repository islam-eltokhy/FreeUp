"use client";

import { useEffect, useState } from "react";

function msUntilMidnight(now: number) {
  const d = new Date(now);
  d.setHours(24, 0, 0, 0);
  return d.getTime() - now;
}

export function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(msUntilMidnight(Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const total = Math.max(0, Math.floor((remaining ?? 0) / 1000));
  const parts = [
    ["Hrs", Math.floor(total / 3600)],
    ["Min", Math.floor((total % 3600) / 60)],
    ["Sec", total % 60],
  ] as const;

  return (
    <div className="flex items-center gap-2" aria-label="Time left on this deal">
      <span className="mr-1 text-xs font-medium uppercase tracking-wider text-cream/60">Ends in</span>
      {parts.map(([label, value]) => (
        <div key={label} className="rounded-xl bg-white/10 px-3 py-2 text-center backdrop-blur">
          <div className="font-mono text-xl font-bold tabular-nums leading-none">
            {remaining === null ? "--" : String(value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-wider text-cream/60">{label}</div>
        </div>
      ))}
    </div>
  );
}
