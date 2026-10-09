
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

async function ProductDetails({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const formatPrice = (price: number) =>
    price.toLocaleString("bn-BD");

  const priceDifference = Math.abs(
    product.today - product.yesterday
  );

  const priceDirection =
    product.today > product.yesterday
      ? "up"
      : product.today < product.yesterday
        ? "down"
        : "flat";

  const changeColor =
    priceDirection === "up"
      ? "text-red-600"
      : priceDirection === "down"
        ? "text-green-700"
        : "text-[#788179]";

  const changeArrow =
    priceDirection === "up"
      ? "▲"
      : priceDirection === "down"
        ? "▼"
        : "—";

  const markets = product.markets ?? [];

  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (sum, market) =>
            sum + (market.min + market.max) / 2,
          0
        ) / markets.length
      : product.today;

  const unit =
    product.unit.toLowerCase() === "kg"
      ? "কেজি"
      : product.unit;

  const summaryCards = [
    {
      label: "সর্বনিম্ন দাম",
      price: minPrice,
      description: "সবচেয়ে কম দামের বাজার",
      color: "text-[#168044]",
    },
    {
      label: "সর্বাধিক দাম",
      price: maxPrice,
      description: "সবচেয়ে বেশি দামের বাজার",
      color: "text-[#d92f35]",
    },
    {
      label: "গড় দাম",
      price: averagePrice,
      description: `প্রতি ${unit}-এর হিসাবে`,
      color: "text-[#168044]",
    },
  ];

  return (
    <main className="flex-1 bg-[#f0f5f0] px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-[1160px]">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-[11px] text-[#69776c]">
          <span>হোম</span>
          <span>›</span>
          <span>{product.categoryNameBn}</span>
          <span>›</span>
          <span className="text-[#354438]">
            {product.nameBn}
          </span>
        </nav>

        {/* Product summary */}
        <section className="flex flex-col justify-between gap-4 rounded-xl border border-[#e2eae3] bg-[#fbfdfb] p-4 sm:flex-row sm:items-center sm:px-4 sm:py-4">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
              {product.image}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-bold leading-tight text-[#26352b] sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-[11px] text-[#7b867d]">
                প্রতি {unit} · {product.categoryNameBn}
              </p>

              <p className="mt-2 text-[11px] text-[#344137]">
                গতকালের তুলনায় আজ দাম{" "}
                <span className={`font-semibold ${changeColor}`}>
                  {priceDirection === "up"
                    ? "বেড়েছে"
                    : priceDirection === "down"
                      ? "কমেছে"
                      : "অপরিবর্তিত"}
                </span>

                {priceDirection !== "flat" && (
                  <>
                    {" · "}
                    {formatPrice(priceDifference)} টাকা
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Today's price */}
          <div className="flex shrink-0 flex-row items-center justify-between gap-4 rounded-xl bg-[#f0f5f0] px-5 py-3 sm:min-w-[112px] sm:flex-col sm:items-center sm:gap-0">
            <p className="text-[10px] text-[#788179]">
              আজকের দাম
            </p>

            <p className="text-2xl font-bold leading-tight text-[#26352b]">
              {formatPrice(product.today)}
            </p>

            <p className="text-[10px] text-[#788179]">
              টাকা / {unit}
            </p>

            <p className={`mt-1 text-[10px] font-semibold ${changeColor}`}>
              {changeArrow}{" "}
              {formatPrice(product.change.pct)}%
            </p>
          </div>
        </section>

        {/* Summary cards and market table */}
        <section className="mt-5 rounded-xl border border-[#e2eae3] bg-[#fbfdfb] p-4 sm:p-4">
          <h2 className="text-sm font-bold text-[#26352b]">
            দামের সারসংক্ষেপ
          </h2>

          {/* Minimum, maximum, and average */}
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className="min-h-[80px] rounded-xl border border-[#e2eae3] bg-[#fbfdfb] px-4 py-3"
              >
                <p className="text-[10px] leading-4 text-[#59665b]">
                  {card.label}
                </p>

                <p
                  className={`mt-0.5 text-sm font-bold leading-5 ${card.color}`}
                >
                  {formatPrice(Math.round(card.price))} টাকা
                </p>

                <p className="mt-0.5 text-[9px] leading-4 text-[#59665b]">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Market price table */}
          <h2 className="mt-5 text-sm font-bold text-[#26352b]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="mt-3 overflow-x-auto rounded-xl border border-[#e2eae3]">
            <table className="w-full min-w-[620px] border-collapse text-left text-[11px] text-[#344137]">
              <thead className="bg-[#f8fbf8] text-[#788179]">
                <tr>
                  <th className="px-3 py-3 font-semibold">
                    বাজার
                  </th>
                  <th className="px-3 py-3 font-semibold">
                    বিভাগ
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">
                    সর্বনিম্ন
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">
                    সর্বোচ্চ
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => {
                  const average =
                    (market.min + market.max) / 2;

                  return (
                    <tr
                      key={`${market.market}-${index}`}
                      className={
                        index % 2 === 0
                          ? "bg-[#fbfdfb]"
                          : "bg-[#eef3ee]"
                      }
                    >
                      <td className="border-t border-[#dce4dc] px-3 py-2.5">
                        {market.market}
                      </td>

                      <td className="border-t border-[#dce4dc] px-3 py-2.5">
                        {market.division}
                      </td>

                      <td className="border-t border-[#dce4dc] px-3 py-2.5 text-right">
                        {formatPrice(market.min)} টাকা
                      </td>

                      <td className="border-t border-[#dce4dc] px-3 py-2.5 text-right">
                        {formatPrice(market.max)} টাকা
                      </td>

                      <td className="border-t border-[#dce4dc] px-3 py-2.5 text-right font-bold">
                        {formatPrice(Math.round(average))} টাকা
                      </td>
                    </tr>
                  );
                })}

                {markets.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="border-t border-[#dce4dc] px-3 py-6 text-center text-[#788179]"
                    >
                      বাজারের তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex-1 bg-[#f0f5f0] px-4 py-10">
          <div className="mx-auto max-w-[1160px] text-sm text-[#788179]">
            পণ্যের তথ্য লোড হচ্ছে...
          </div>
        </main>
      }
    >
      <ProductDetails params={params} />
    </Suspense>
  );
}