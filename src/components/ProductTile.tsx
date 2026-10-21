import Image from "next/image";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { productIcons } from "@/lib/icons";

/**
 * Product artwork. Renders the product photo when one is provided, otherwise a
 * generated boutique tile: soft gradient, an arch, and the garment silhouette,
 * so the catalog works with zero external assets.
 */
export function ProductTile({
  product,
  className,
  iconClassName,
  priority = false,
}: {
  product: Product;
  className?: string;
  iconClassName?: string;
  priority?: boolean;
}) {
  const { art } = product;
  const Icon = productIcons[art.icon];

  if (product.image) {
    return (
      <div className={cn("relative overflow-hidden bg-cream-2", className)}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn("noise relative isolate overflow-hidden", className)}
      style={{ background: `linear-gradient(160deg, ${art.from} 0%, ${art.to} 100%)` }}
      aria-hidden
    >
      <div className="absolute -left-1/4 -top-1/4 h-3/4 w-3/4 rounded-full bg-white/60 blur-2xl" />
      <div className="absolute inset-x-[18%] bottom-0 top-[14%] rounded-arch border border-white/70 bg-white/30" />
      <div className="absolute inset-0 flex items-center justify-center pt-[6%]">
        <Icon
          className={cn("h-[46%] w-[46%] drop-shadow-[0_10px_20px_rgba(42,26,33,0.14)]", iconClassName)}
          style={{ color: art.ink }}
          strokeWidth={1.1}
        />
      </div>
    </div>
  );
}
