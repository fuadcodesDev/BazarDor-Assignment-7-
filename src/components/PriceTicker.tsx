
import { createElement } from "react";
import { getProducts } from "@/lib/api";

export default async function PriceTicker() {
  const products = await getProducts();
  const tickerProducts = products.slice(0, 12);

  if (tickerProducts.length === 0) {
    return null;
  }

  const tickerContent = tickerProducts.map((product) => {
    const isUp = product.change.dir === "up";
    const isDown = product.change.dir === "down";

    return (
      <span
        key={product.id}
        className="mx-5 inline-flex items-center gap-1.5 whitespace-nowrap text-xs"
      >
        <span>{product.image}</span>
        <span className="font-medium text-[#465449]">
          {product.nameBn}
        </span>
        <span className="text-[#788179]">
          ৳{product.today.toLocaleString("bn-BD")}/{product.unit}
        </span>
        <span
          className={
            isUp
              ? "font-semibold text-red-600"
              : isDown
                ? "font-semibold text-green-600"
                : "font-semibold text-gray-500"
          }
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}
          {product.change.pct.toLocaleString("bn-BD")}%
        </span>
      </span>
    );
  });

  return (
    <div className="overflow-hidden border-b border-[#e4ebe4] bg-[#fbfdfb] py-2">
      {createElement(
        "marquee",
        { direction: "left", scrollamount: "6" },
        tickerContent
      )}
    </div>
  );
}