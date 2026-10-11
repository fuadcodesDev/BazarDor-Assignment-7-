
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type SocialProvider = "google" | "github";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] =
    useState<SocialProvider | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        callbackURL: "/",
      });

      if (authError) {
        setError(
          authError.message ||
            "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।"
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("সার্ভারের সঙ্গে সংযোগ করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(provider: SocialProvider) {
    setError("");
    setSocialLoading(provider);

    try {
      const { error: authError } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (authError) {
        setError(
          authError.message ||
            "সোশ্যাল লগইন করা যায়নি। আবার চেষ্টা করুন।"
        );
        setSocialLoading(null);
      }
    } catch {
      setError(
        "সোশ্যাল লগইন শুরু করা যায়নি। কনফিগারেশন পরীক্ষা করুন।"
      );
      setSocialLoading(null);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-[#f5f8f4] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Signup Card */}
        <div className="rounded-2xl border border-[#e2eae1] bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#26352b]">
              অ্যাকাউন্ট তৈরি করুন
            </h1>

            <p className="mt-2 text-sm text-[#788179]">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-[#26352b]"
              >
            নাম
              </label>

              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                maxLength={100}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="আপনার পুরো নাম"
                className="w-full rounded-lg border border-[#dce5dc] px-3 py-2.5 text-sm outline-none focus:border-[#078b43] focus:ring-2 focus:ring-[#078b43]/10"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-[#26352b]"
              >
                ইমেইল
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[#dce5dc] px-3 py-2.5 text-sm outline-none focus:border-[#078b43] focus:ring-2 focus:ring-[#078b43]/10"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-[#26352b]"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full rounded-lg border border-[#dce5dc] px-3 py-2.5 text-sm outline-none focus:border-[#078b43] focus:ring-2 focus:ring-[#078b43]/10"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-[#26352b]"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="পাসওয়ার্ড আবার লিখুন"
                className="w-full rounded-lg border border-[#dce5dc] px-3 py-2.5 text-sm outline-none focus:border-[#078b43] focus:ring-2 focus:ring-[#078b43]/10"
              />
            </div>

            {/* Error Message */}
            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading || socialLoading !== null}
              className="w-full rounded-lg bg-[#078b43] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#067638] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          {/* OR Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e2eae1]" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-sm text-[#788179]">
                অথবা
              </span>
            </div>
          </div>

          {/* Social Signup Buttons: Side by Side */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google */}
            <button
              type="button"
              disabled={loading || socialLoading !== null}
              onClick={() => handleSocialSignIn("google")}
              className="flex min-w-0 w-full items-center justify-center gap-2 rounded-lg border border-[#dce5dc] bg-white px-2 py-3 text-center text-xs font-medium text-[#26352b] transition hover:bg-[#f8faf8] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 48 48"
                className="h-5 w-5 shrink-0"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                  transform="translate(0 4)"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.62 5.91c4.45-4.11 7.14-10.16 7.14-17.56Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.9-5.89l-7.62-5.91c-2.12 1.42-4.83 2.26-8.28 2.26-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                />
              </svg>

              <span className="truncate">
                {socialLoading === "google"
                  ? "সংযোগ হচ্ছে..."
                  : "Google"}
              </span>
            </button>

            {/* GitHub */}
            <button
              type="button"
              disabled={loading || socialLoading !== null}
              onClick={() => handleSocialSignIn("github")}
              className="flex min-w-0 w-full items-center justify-center gap-2 rounded-lg border border-[#dce5dc] bg-white px-2 py-3 text-center text-xs font-medium text-[#26352b] transition hover:bg-[#f8faf8] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
                className="shrink-0"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.71-1.49-2.47-.28-5.07-1.23-5.07-5.49 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.66.11 2.94.72.78 1.15 1.77 1.15 2.98 0 4.27-2.6 5.21-5.08 5.49.4.35.76 1.02.76 2.06v3.14c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>

              <span className="truncate">
                {socialLoading === "github"
                  ? "সংযোগ হচ্ছে..."
                  : "GitHub"}
              </span>
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-[#788179]">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-[#078b43] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Home Link Below Signup Card */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-[#078b43] hover:underline"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}