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

  if (slim) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-1">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 min-w-0 bg-white/10 border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/30"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-xs font-medium transition disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Join"}
        </button>
      </form>
    );
  }

  // Full version (existing)
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
