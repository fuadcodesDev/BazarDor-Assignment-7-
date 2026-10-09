
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
    <article className="group rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-5">
      <div className="flex h-24 items-center justify-center rounded-xl bg-green-50 text-5xl">
        {product.image}
      </div>

      <div className="mt-4">
        <h3 className="text-base font-semibold leading-7 text-gray-800">
          {product.nameBn}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          প্রতি {product.unit}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
        <p className="text-xl font-bold text-gray-900">
          ৳{product.today}
        </p>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
                ? "bg-green-50 text-green-700"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}
          {product.change.pct}%
        </span>
      </div>
    </article>
  );
}