import Image from "next/image";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { productIcons } from "@/lib/icons";

/**
 * Product artwork. Renders the product photo when one is provided, otherwise a
 * generated gradient tile with the product's icon so the catalog works with
 * zero external assets.
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
      style={{ background: `linear-gradient(135deg, ${art.from} 0%, ${art.to} 100%)` }}
      aria-hidden
    >
      <div
        className="absolute -left-1/4 -top-1/4 h-3/4 w-3/4 rounded-full opacity-50 blur-2xl"
        style={{ background: "rgba(255,255,255,0.7)" }}
      />
      <div
        className="absolute -bottom-1/3 -right-1/4 h-3/4 w-3/4 rounded-full opacity-40 blur-2xl"
        style={{ background: art.ink }}
      />
      <div
        className="absolute inset-[12%] rounded-[28%] border opacity-30"
        style={{ borderColor: art.ink }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon
          className={cn("h-[42%] w-[42%] drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]", iconClassName)}
          style={{ color: art.ink }}
          strokeWidth={1.25}
        />
      </div>
    </div>
  );
}
