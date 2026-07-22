export default function AdminBackupPage() {
  return (
    <main className="max-w-3xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-6">Backups</h1>

      <div className="rounded-xl border p-6 space-y-4">
        <p className="text-gray-700">
          Backups are handled by Supabase directly, not by this admin
          panel — a "Create Backup" button here would either be fake, or
          would duplicate infrastructure Supabase already runs reliably.
          Your data lives in a real, managed Postgres instance with its
          own backup system.
        </p>

        <a
          href="https://supabase.com/dashboard/project/_/database/backups/scheduled"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-xl bg-black px-6 py-3 text-white"
        >
          Open Supabase Backups →
        </a>

        <p className="text-sm text-gray-500">
          Daily backups are included on Supabase's paid plans; Point-in-Time
          Recovery (restore to any second) is available on Pro and above.
          Worth confirming which tier your project is on.
        </p>
      </div>

      <div className="mt-6 rounded-xl border p-6">
        <h2 className="font-semibold mb-2">Product content (Sanity)</h2>
        <p className="text-gray-700">
          Product, brand, and category content lives in Sanity, which
          keeps its own document history independent of Supabase —
          every edit is versioned automatically.
        </p>
      </div>
    </main>
  );
}
