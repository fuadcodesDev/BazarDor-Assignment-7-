import Link from "next/link";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
     <Link href={`/product/${product.slug}`}
  className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
> 
<article className="rounded-xl border border-[#E2EAE3] bg-[#FBFDFB] p-3 transition-colors duration-200 hover:border-[#C8DDCA] sm:p-3.5">
      {/* Product image and details */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eff5ef] text-xl">
          {product.image}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold leading-5 text-[#26352b]">
            {product.nameBn}
          </h3>

          <p className="mt-0.5 text-[11px] leading-4 text-[#788179]">
            প্রতি {product.unit}
          </p>
        </div>
      </div>

      {/* Today's price and percentage change */}
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-[10px] leading-4 text-[#7a827b]">
            আজকের দাম
          </p>

          <p className="text-sm font-bold leading-5 text-[#26352b]">
            {product.today.toLocaleString("bn-BD")} টাকা
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-0.5 rounded-full px-2 py-1 text-[10px] font-semibold leading-none ${
            isUp
              ? "bg-[#f0f5f0] text-red-600"
              : isDown
                ? "bg-[#edf6ef] text-[#159447]"
                : "bg-[#f0f2f0] text-[#737a74]"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}
          {product.change.pct.toLocaleString("bn-BD")}%
        </span>
      </div>
   
    </article>
    </Link>
  );
}