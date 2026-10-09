
import Image from "next/image";
import Link from "next/link";
import { getBanglaDate } from "@/lib/date";
import { Suspense } from "react";
import { connection } from "next/server";

const categories = [
  { name: "🥥 চাল", href: "/category/chal" },
  { name: "🫘 ডাল", href: "/category/dal" },
  { name: "🛢️ তেল", href: "/category/tel" },
  { name: "🥬 সবজি", href: "/category/shobji" },
  { name: "🐟 মাছ", href: "/category/mach" },
  { name: "🍗 মাংস", href: "/category/mangsho" },
  { name: "🥚 ডিম", href: "/category/dim" },
  { name: "🌶️ মসলা", href: "/category/moshla" },
];

async function NavbarDate() {
  await connection();

  const formatter = getBanglaDate();
  const date = formatter.format(new Date());

  return <>{date}</>;
}

export default function Navbar() {
  return (
    <header className="w-full border-b border-[#e4ebe4] bg-[#fbfdfb]">
      {/* Top row */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          {/* Logo with green background */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#078b43] p-1.5">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর লোগো"
              width={28}
              height={28}
              priority
              className="h-full w-full object-contain"
            />
          </div>

          {/* Brand name and live Bangla date */}
          <div className="leading-tight">
            <span className="block text-sm font-bold text-[#26352b]">
              বাজার দর
            </span>

            <span className="mt-1 block text-[9px] text-[#788179]">
              <Suspense fallback="তারিখ লোড হচ্ছে...">
                <NavbarDate />
              </Suspense>
            </span>
          </div>
        </Link>

        {/* Authentication links */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/sign-in"
            className="rounded-md px-3 py-2 text-[11px] font-medium text-[#26352b] transition hover:bg-[#eff5ef]"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="rounded-md bg-[#078b43] px-3 py-2 text-[11px] font-semibold text-white shadow-sm transition hover:bg-[#067638]"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      {/* Category row */}
      <nav className="border-t border-[#edf1ed]">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 overflow-x-auto px-4 py-2 sm:gap-5">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="shrink-0 whitespace-nowrap text-[11px] font-medium text-[#465449] transition hover:text-[#078b43]"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}