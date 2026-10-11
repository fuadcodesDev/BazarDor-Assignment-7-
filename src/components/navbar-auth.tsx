"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function NavbarAuth() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      setMenuOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending) {
    return <div className="h-9 w-24" aria-hidden="true" />;
  }

  if (!session) {
    return (
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
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-label="প্রোফাইল মেনু"
        className="flex items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-[#eff5ef]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#078b43] text-xs font-semibold text-white">
          {session.user.name?.charAt(0).toUpperCase() || "U"}
        </span>

        <span className="max-w-28 truncate text-[11px] font-medium text-[#26352b]">
          {session.user.name}
        </span>

        <span className="text-[10px] text-[#788179]">⌄</span>
      </button>

      {menuOpen && (
        <div className="absolute right-0 z-50 mt-2 w-52 rounded-lg border border-[#e4ebe4] bg-white p-2 shadow-lg">
          <div className="border-b border-[#edf1ed] px-3 py-2">
            <p className="truncate text-xs font-semibold text-[#26352b]">
              {session.user.name}
            </p>

            <p className="truncate text-[10px] text-[#788179]">
              {session.user.email}
            </p>
          </div>

          <Link
            href="/profile"
            onClick={() => setMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-xs text-[#26352b] transition hover:bg-[#eff5ef]"
          >
            আমার প্রোফাইল
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full rounded-md px-3 py-2 text-left text-xs text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
          </button>
        </div>
      )}
    </div>
  );
}