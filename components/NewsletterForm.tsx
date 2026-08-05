"use client";

import { useState } from "react";

interface NewsletterFormProps {
  slim?: boolean;
}

export default function NewsletterForm({ slim }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setMessage("Thanks for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    }
  };

  // ✅ চিকন ও লম্বা ভার্সন (slim)
  if (slim) {
    return (
      <div className="w-full max-w-[200px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded text-[10px] uppercase tracking-[0.2em] transition disabled:opacity-50"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
        {message && (
          <p className={`mt-1 text-[10px] ${status === "success" ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}
      </div>
    );
  }

  // ✅ বড় ভার্সন (আগের মতো)
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/50"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-white/10 hover:bg-white/20 text-white py-3 text-sm font-medium transition disabled:opacity-50"
      >
        {status === "loading" ? "Subscribing..." : "JOIN"}
      </button>
      {message && (
        <p className={`text-xs ${status === "success" ? "text-green-400" : "text-red-400"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
