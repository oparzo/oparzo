export default function AdminLogsPage() {
  return (
    <main className="max-w-3xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-6">Logs</h1>

      <div className="rounded-xl border p-6 space-y-4">
        <p className="text-gray-700">
          Application and server logs are handled by your hosting and
          database providers, not stored in this panel — building a
          custom log viewer here would mean re-implementing tools that
          already exist and already work.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://vercel.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl bg-black px-6 py-3 text-white"
          >
            Open Vercel Logs →
          </a>

          <a
            href="https://supabase.com/dashboard/project/_/logs/explorer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl border px-6 py-3"
          >
            Open Supabase Log Explorer →
          </a>
        </div>

        <p className="text-sm text-gray-500">
          Vercel shows request/function logs and errors for the app
          itself. Supabase's log explorer shows database queries, auth
          events, and API errors on the Supabase side.
        </p>
      </div>
    </main>
  );
}
