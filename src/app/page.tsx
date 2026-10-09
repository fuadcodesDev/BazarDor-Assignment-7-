
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const products = await getProducts();

  const risingProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const bengaliNumber = (number: number) =>
    number.toLocaleString("bn-BD");

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <section>
        
<h2 className="text-2xl font-bold text-gray-900">
  <span className="text-red-500">▲</span>{" "}
  আজ দাম বেড়েছে
</h2>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {risingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
       
<h2 className="text-2xl font-bold text-gray-900">
  <span className="text-green-600">▼</span>{" "}
  আজ দাম কমেছে
</h2>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fallingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য">
        <h2 className="text-2xl font-bold text-gray-900">
          সব পণ্য
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          মোট {bengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}