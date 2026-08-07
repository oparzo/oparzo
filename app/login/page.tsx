"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback`
            : undefined,
        shouldCreateUser: true,
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
        <h1 className="text-3xl font-bold mb-2">Sign in to Oparzo</h1>

        {sent ? (
          <p className="text-gray-600" role="status">
            Check your email and click the Oparzo sign-in link to continue.
          </p>
        ) : (
          <>
            <p className="text-gray-500 mb-6">
              Enter your email to receive a secure sign-in link.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>

              <input
                id="email"
                type="email"
                className="w-full rounded-lg border p-3"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={!!error}
                aria-describedby={error ? "login-error" : undefined}
              />

              {error && (
                <p
                  id="login-error"
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
                {loading ? "Sending..." : "Continue"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
