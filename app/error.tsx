"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h2 className="text-2xl font-serif text-[var(--ink)]">
        Something went wrong!
      </h2>
      <p className="mt-2 text-gray-500">We're sorry for the inconvenience.</p>
      <button
        onClick={reset}
        className="mt-4 px-6 py-2 bg-[var(--gold)] text-[var(--ink)] rounded-lg hover:opacity-85 transition"
      >
        Try again
      </button>
    </div>
  );
}
