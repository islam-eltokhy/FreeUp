import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5 text-sm", className)}>
      <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = Math.max(0, Math.min(1, value - i));
          return (
            <span key={i} className="relative inline-block h-3.5 w-3.5">
              <Star className="absolute inset-0 h-3.5 w-3.5 text-ink/15" fill="currentColor" strokeWidth={0} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="h-3.5 w-3.5 text-gold" fill="currentColor" strokeWidth={0} />
              </span>
            </span>
          );
        })}
      </div>
      <span className="font-semibold">{value.toFixed(1)}</span>
      {count !== undefined && <span className="text-muted">({count.toLocaleString()})</span>}
    </div>
  );
}
