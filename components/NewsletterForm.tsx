"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setError(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm leading-7 text-[#d6d0c7]">
        You're on the list. Welcome to OPARZO.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <div className="flex overflow-hidden border border-[#3a3a3a] bg-transparent">

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="w-full bg-transparent px-5 py-4 text-sm text-white placeholder:text-gray-500 outline-none"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="border-l border-[#3a3a3a] px-6 text-[11px] uppercase tracking-[0.3em] transition hover:bg-[var(--gold)] hover:text-black"
        >
          {status === "loading"
            ? "Joining..."
            : "Join"}
        </button>

      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}

    </form>
  );
}
