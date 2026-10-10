
"use client";

import { useRouter, useSearchParams } from "next/navigation";

type SortOption = "default" | "price-asc" | "price-desc";

export default function CategorySort({
  sort,
}: {
  sort: SortOption;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSortChange(value: SortOption) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    const query = params.toString();

    router.push(query ? `?${query}` : window.location.pathname);
  }

  return (
    <section className="mt-4 flex justify-end rounded-xl border border-[#e2eae3] bg-[#fbfdfb] px-4 py-3">
      <div className="flex items-center gap-2">
        <label
          htmlFor="sort"
          className="text-[11px] text-[#788179]"
        >
          সাজান
        </label>

        <select
          id="sort"
          value={sort}
          onChange={(event) =>
            handleSortChange(event.target.value as SortOption)
          }
          className="rounded-lg border border-[#dce5dc] bg-[#fbfdfb] px-3 py-1.5 text-[11px] text-[#354438] outline-none focus:border-green-700"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-asc">দাম: কম থেকে বেশি</option>
          <option value="price-desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>
    </section>
  );
}