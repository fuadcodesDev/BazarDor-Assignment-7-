
import { Suspense } from "react";
import { getProductBySlug } from "@/lib/api";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default function ProductPage({
  params,
}: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <main className="p-8 text-center">
          পণ্যের তথ্য লোড হচ্ছে...
        </main>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-5xl">
          {product.image}
        </div>

        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          {product.nameBn}
        </h1>

        <p className="mt-2 text-gray-600">
          বিভাগ: {product.categoryNameBn}
        </p>

        <p className="mt-1 text-gray-600">
          একক: {product.unit}
        </p>

        <div className="mt-6 rounded-xl bg-green-50 p-5">
          <p className="text-sm text-gray-600">
            আজকের দাম
          </p>

          <p className="mt-1 text-3xl font-bold text-green-700">
            ৳{product.today}
          </p>

          <p className="mt-2 text-sm text-gray-600">
            গতকাল: ৳{product.yesterday}
          </p>
        </div>
      </div>
    </main>
  );
}