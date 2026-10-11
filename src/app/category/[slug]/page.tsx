import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import CategorySort from "@/components/CategorySort";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

const categories = [
  { slug: "chal", name: "চাল", icon: "🍚" },
  { slug: "dal", name: "ডাল", icon: "🫘" },
  { slug: "tel", name: "তেল", icon: "🛢️" },
  { slug: "shobji", name: "সবজি", icon: "🥬" },
  { slug: "mach", name: "মাছ", icon: "🐟" },
  { slug: "mangsho", name: "মাংস", icon: "🍗" },
  { slug: "dim", name: "ডিম", icon: "🥚" },
  { slug: "moshla", name: "মসলা", icon: "🌶️" },
];

type SortOption = "default" | "price-asc" | "price-desc";

async function CategoryContent({
  params,
  sort,
}: {
  params: Promise<{ slug: string }>;
  sort: SortOption;
}) {
  const { slug } = await params;

  const category = categories.find((item) => item.slug === slug);

  // Show the Next.js 404 page for an invalid category.
  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(slug);
  const sortedProducts = [...products];

  // Sort using numeric prices, not strings.
  if (sort === "price-asc") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sort === "price-desc") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <main className="flex-1 bg-[#f0f5f0] px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-[1160px]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-2 text-[11px] text-[#69776c]"
        >
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>

          <span aria-hidden="true">›</span>

          <span className="text-[#354438]">{category.name}</span>
        </nav>

        {/* Category header */}
        <section className="flex items-center gap-4 rounded-xl border border-[#e2eae3] bg-[#fbfdfb] px-4 py-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl"
            aria-hidden="true"
          >
            {category.icon}
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-bold leading-tight text-[#26352b]">
              {category.name}
            </h1>

            <p className="mt-1 text-[11px] text-[#788179]">
              {products.length.toLocaleString("bn-BD")}
              টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* Sort control */}
        <CategorySort sort={sort} />

        {/* Product count */}
        <p className="mt-3 text-[11px] text-[#788179]">
          মোট{" "}
          {sortedProducts.length.toLocaleString("bn-BD")}
          টি পণ্য দেখানো হচ্ছে
        </p>

        {/* Product grid or empty state */}
        {sortedProducts.length > 0 ? (
          <section
            aria-label={`${category.name} বিভাগের পণ্য`}
            className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </section>
        ) : (
          <section className="mt-3 rounded-xl border border-[#e2eae3] bg-[#fbfdfb] px-4 py-10 text-center">
            <p className="text-3xl" aria-hidden="true">
              {category.icon}
            </p>

            <h2 className="mt-3 text-base font-semibold text-[#26352b]">
              এই বিভাগে কোনো পণ্য পাওয়া যায়নি
            </h2>

            <p className="mt-2 text-sm text-[#788179]">
              অন্য বিভাগ দেখুন অথবা সব পণ্যের তালিকায় ফিরে যান।
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#078b43] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#067638]"
            >
              হোম পেজে ফিরে যান
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}

async function CategoryPageContent({
  params,
  searchParams,
}: Props) {
  const { sort: requestedSort } = await searchParams;

  const sort: SortOption =
    requestedSort === "price-asc" ||
    requestedSort === "price-desc"
      ? requestedSort
      : "default";

  return (
    <CategoryContent params={params} sort={sort} />
  );
}

export default function CategoryPage(props: Props) {
  return (
    <Suspense
      fallback={
        <main
          className="min-h-screen flex-1 bg-[#f0f5f0] px-4 py-8 sm:px-6"
          aria-label="পণ্য লোড হচ্ছে"
        >
          <div className="mx-auto w-full max-w-[1160px] animate-pulse">
            {/* Category header skeleton */}
            <div className="h-20 rounded-xl bg-[#e2eae3]" />

            {/* Sort control skeleton */}
            <div className="mt-4 h-12 rounded-xl bg-[#e2eae3]" />

            {/* Product card skeletons */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-36 rounded-xl border border-[#e2eae3] bg-[#e2eae3]"
                />
              ))}
            </div>
          </div>
        </main>
      }
    >
      <CategoryPageContent {...props} />
    </Suspense>
  );
}