
import Image from "next/image";
import { Suspense } from "react";
import { connection } from "next/server";
import { getBanglaDate } from "@/lib/date";

async function HeroDate() {
  await connection();

  const dateFormatter = getBanglaDate();
  const date = dateFormatter.format(new Date());

  return <>{date}</>;
}

export default function Hero() {
  return (
    <section className="grid items-center gap-5 rounded-2xl border border-gray-100 bg-white px-5 py-6 sm:px-8 sm:py-8 md:grid-cols-[1.5fr_0.8fr]">
      <div>
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          <Suspense fallback="তারিখ লোড হচ্ছে...">
            <HeroDate />
          </Suspense>
        </span>

        <h1 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
          বাজারভিত্তিক বিস্তারিত তথ্য, সব সময় সর্বশেষ
          বাজারদরের আপডেট এক জায়গায়।
        </p>

        <a
          href="#সব-পণ্য"
          className="mt-5 inline-flex rounded-md bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      <div className="relative mx-auto w-full max-w-[220px] sm:max-w-[260px]">
        <Image
          src="/bazar-hero.png"
          alt="তাজা ফলের ঝুড়ি"
          width={400}
          height={300}
          priority
          className="h-auto w-full object-contain"
        />
      </div>
    </section>
  );
}