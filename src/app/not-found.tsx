import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#f0f5f0] px-4 py-20">
      <section className="w-full max-w-md rounded-2xl border border-[#e2eae3] bg-[#fbfdfb] px-6 py-10 text-center shadow-sm">
        <div className="text-6xl" aria-hidden="true">
          🔎
        </div>

        <p className="mt-5 text-sm font-semibold text-[#078b43]">
          ৪০৪ — পৃষ্ঠা পাওয়া যায়নি
        </p>

        <h1 className="mt-2 text-2xl font-bold text-[#26352b]">
          দুঃখিত! এই পৃষ্ঠাটি খুঁজে পাওয়া যায়নি।
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#788179]">
          পৃষ্ঠাটি সরানো হয়েছে, ঠিকানা ভুল হয়েছে, অথবা পণ্যটি আর পাওয়া যাচ্ছে না।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#078b43] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#067638]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </section>
    </main>
  );
}