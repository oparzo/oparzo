"use client";

import { useEffect, useState } from "react";

type Profile = {
  full_name: string;
  phone: string;
  email?: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res = await fetch("/api/profile");

      if (res.status === 401) {
        setIsLoggedIn(false);
        return;
      }

      const data = await res.json();

      if (data.success) {
        setProfile({
          full_name: data.profile.full_name ?? "",
          phone: data.profile.phone ?? "",
          email: data.profile.email ?? "",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: "Profile updated." });
      } else {
        setMessage({
          type: "error",
          text: data.error ?? "Failed to update profile.",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Failed to update profile.",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-serif">Loading...</h1>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
          My Account
        </p>

        <h1 className="mt-4 text-4xl font-serif">Profile</h1>

        <p className="mt-6 text-gray-600">
          Log in to view and edit your profile.
        </p>

        <a
          href="/login"
          className="mt-8 inline-flex rounded-full bg-[var(--gold)] px-8 py-3 text-[var(--ink)]"
        >
          Log In
        </a>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
        My Account
      </p>

      <h1 className="mt-4 text-5xl font-serif">Profile</h1>

      <form onSubmit={saveProfile} className="mt-12 space-y-6">
        <input
          required
          name="full_name"
          value={profile.full_name}
          onChange={handleChange}
          placeholder="Full Name"
          aria-label="Full Name"
          className="w-full border rounded-xl p-4"
        />

        <input
          required
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          aria-label="Phone Number"
          className="w-full border rounded-xl p-4"
        />

        <input
          name="email"
          value={profile.email}
          readOnly
          placeholder="Email"
          aria-label="Email (read-only)"
          className="w-full rounded-xl border bg-gray-100 p-4 text-gray-500"
        />

        <div className="rounded-2xl bg-[var(--cream)] p-6">
          <h2 className="text-2xl font-serif">Account Information</h2>

          <div className="mt-6 space-y-3 text-gray-600">
            <div className="flex justify-between border-b pb-3">
              <span>Name</span>
              <span>{profile.full_name || "-"}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Phone</span>
              <span>{profile.phone || "-"}</span>
            </div>

            <div className="flex justify-between">
              <span>Email</span>
              <span>{profile.email || "-"}</span>
            </div>
          </div>
        </div>

        {message && (
          <p
            role={message.type === "error" ? "alert" : "status"}
            className={`text-sm ${
              message.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-[var(--gold)] py-4 text-[var(--ink)] transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </main>
  );
}
