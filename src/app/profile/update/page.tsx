"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const updatedName = name.trim();

    if (!updatedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (updatedName.length > 100) {
      toast.error("নাম ১০০ অক্ষরের মধ্যে রাখুন।");
      return;
    }

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: updatedName,
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      toast.success("আপনার তথ্য সফলভাবে আপডেট হয়েছে।");
      router.replace("/profile");
      router.refresh();
    } catch {
      toast.error("সার্ভারের সঙ্গে সংযোগ করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
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

  return (
    <main className="flex min-h-[60vh] flex-1 items-center justify-center bg-[#eff5ef] px-4 py-12">
      <section className="w-full max-w-[400px] rounded-xl border border-[#e4ebe4] bg-[#fbfdfb] p-5">
        <Link
          href="/profile"
          className="text-xs font-medium text-[#078b43] hover:underline"
        >
          ← প্রোফাইলে ফিরে যান
        </Link>

        <h1 className="mt-5 text-lg font-bold text-[#26352b]">
          তথ্য আপডেট করুন
        </h1>

        <p className="mt-1 text-xs leading-5 text-[#788179]">
          আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।
        </p>

        <form onSubmit={handleUpdate} className="mt-6">
          <label
            htmlFor="profile-name"
            className="mb-1.5 block text-xs font-medium text-[#26352b]"
          >
            নাম
          </label>

          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            maxLength={100}
            required
            disabled={saving}
            className="w-full rounded-md border border-[#e1e8e1] bg-white px-3 py-3 text-sm text-[#26352b] outline-none transition focus:border-[#078b43] focus:ring-2 focus:ring-[#078b43]/10 disabled:opacity-60"
            placeholder="আপনার নাম লিখুন"
          />

          <button
            type="submit"
            disabled={saving || !name.trim()}
            className="mt-4 w-full rounded-md bg-[#078b43] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#067638] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "আপডেট হচ্ছে..." : "Update Information"}
          </button>
        </form>
      </section>
    </main>
  );
}