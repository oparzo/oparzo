"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback`
            : undefined,
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSent(true);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-2">
          Create your Oparzo account
        </h1>

        {sent ? (
          <p className="text-gray-600" role="status">
            Check your email and click the verification link to finish
            creating your account.
          </p>
        ) : (
          <>
            <p className="text-gray-500 mb-6">
              Continue securely with your email.
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              <label htmlFor="fullName" className="sr-only">
                Full name
              </label>

              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                placeholder="Full name"
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg border p-3"
              />

              <label htmlFor="email" className="sr-only">
                Email address
              </label>

              <input
                id="email"
                type="email"
                required
                value={email}
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border p-3"
                aria-invalid={!!error}
                aria-describedby={error ? "register-error" : undefined}
              />

              {error && (
                <p
                  id="register-error"
                  role="alert"
                  className="text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[var(--gold)] text-[var(--ink)] py-3"
              >
                {loading ? "Sending..." : "Create Account"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
