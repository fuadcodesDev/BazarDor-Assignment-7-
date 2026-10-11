"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [signingOut, setSigningOut] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে।");
      router.replace("/sign-in");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending || !session || !user) {
    return (
      <main className="flex min-h-[60vh] flex-1 items-center justify-center bg-[#eff5ef]">
        <p className="text-sm text-[#667369]">
          প্রোফাইল লোড হচ্ছে...
        </p>
      </main>
    );
  }

  const initials =
    user.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <main className="min-h-[60vh] flex-1 bg-[#eff5ef] px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-[400px]">
        <header className="mb-6">
          <h1 className="text-base font-bold text-[#26352b]">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-[11px] text-[#788179]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        <section className="flex items-center gap-3 rounded-xl border border-[#e4ebe4] bg-[#fbfdfb] p-3">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt="প্রোফাইল ছবি"
              className="h-10 w-10 shrink-0 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e5f2e8] text-sm font-bold text-[#078b43]">
              {initials}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-[#26352b]">
              {user.name || "ব্যবহারকারী"}
            </p>
            <p className="mt-1 truncate text-[10px] text-[#788179]">
              {user.email}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="shrink-0 rounded-md border border-[#f08080] bg-white px-2.5 py-2 text-[10px] font-medium text-[#e05252] transition hover:bg-red-50 disabled:opacity-60"
          >
            {signingOut ? "অপেক্ষা করুন..." : "↪ সাইন আউট"}
          </button>
        </section>

        <section className="mt-3 rounded-xl border border-[#e4ebe4] bg-[#fbfdfb] p-4">
          <h2 className="text-xs font-semibold text-[#26352b]">
            অ্যাকাউন্টের তথ্য
          </h2>

          <div className="mt-4 border-b border-[#e4ebe4] pb-3">
            <p className="text-[11px] text-[#788179]">নাম</p>
            <p className="mt-1 break-words text-sm text-[#26352b]">
              {user.name || "নাম দেওয়া হয়নি"}
            </p>
          </div>

          <div className="mt-3">
            <p className="text-[11px] text-[#788179]">ইমেইল</p>
            <p className="mt-1 break-all text-sm text-[#26352b]">
              {user.email}
            </p>
          </div>

          <Link
            href="/profile/update"
            className="mt-5 flex w-full items-center justify-center rounded-md bg-[#078b43] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#067638]"
          >
            Update Information
          </Link>
        </section>
      </div>
    </main>
  );
}