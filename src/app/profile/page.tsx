"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const user = session?.user;

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    const updatedName = name.trim();

    if (!updatedName) {
      setError("আপনার নাম লিখুন।");
      return;
    }

    setSaving(true);

    try {
      const { error: updateError } = await authClient.updateUser({
        name: updatedName,
      });

      if (updateError) {
        setError(updateError.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      router.refresh();
    } catch {
      setError("সার্ভারের সঙ্গে সংযোগ করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);
    setError("");

    try {
      const { error: signOutError } = await authClient.signOut();

      if (signOutError) {
        setError(signOutError.message || "সাইন আউট করা যায়নি।");
        return;
      }

      router.replace("/sign-in");
      router.refresh();
    } catch {
      setError("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending || !session || !user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#eff5ef]">
        <p className="text-sm text-[#667369]">প্রোফাইল লোড হচ্ছে...</p>
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
    <main className="min-h-[60vh] bg-[#eff5ef] px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-[400px]">
        <header className="mb-6">
          <h1 className="text-base font-bold text-[#26352b]">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-[11px] text-[#788179]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        <section className="mb-3 flex items-center gap-3 rounded-xl border border-[#e4ebe4] bg-[#fbfdfb] p-3">
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
            disabled={signingOut || saving}
            className="shrink-0 rounded-md border border-[#f08080] bg-white px-2.5 py-2 text-[10px] font-medium text-[#e05252] transition hover:bg-red-50 disabled:opacity-60"
          >
            {signingOut ? "অপেক্ষা করুন..." : "↪ সাইন আউট"}
          </button>
        </section>

        <section className="rounded-xl border border-[#e4ebe4] bg-[#fbfdfb] p-4">
          <h2 className="mb-5 text-xs font-semibold text-[#26352b]">
            তথ্য
          </h2>

          <form onSubmit={handleUpdate}>
            <label
              htmlFor="profile-name"
              className="mb-1.5 block text-[11px] font-medium text-[#26352b]"
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
              disabled={saving || signingOut}
              className="w-full rounded-md border border-[#e1e8e1] bg-white px-3 py-2.5 text-xs text-[#26352b] outline-none transition focus:border-[#078b43] focus:ring-2 focus:ring-[#078b43]/10 disabled:opacity-60"
            />

            {error && (
              <p role="alert" className="mt-3 text-[11px] text-red-600">
                {error}
              </p>
            )}

            {message && (
              <p role="status" className="mt-3 text-[11px] text-[#078b43]">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={saving || signingOut || !name.trim()}
              className="mt-2.5 w-full rounded-md bg-[#078b43] px-4 py-2.5 text-[11px] font-semibold text-white transition hover:bg-[#067638] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}