export default function TrustSection() {
  return (
    <section className="bg-[var(--ink)] py-16 md:py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-white/60">
            THE OPARZO PROMISE
          </p>

          <h2 className="font-serif text-4xl leading-tight md:text-6xl">
            Every product. Verified. Every single time.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
            We hand-pick every brand, verify every product, and deliver it
            exactly as promised — no compromises, no counterfeits.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {/* Authenticity */}
          <article className="border-t border-white/15 pt-6">
            <h3 className="font-serif text-2xl">Authenticity</h3>
            <p className="mt-4 text-sm leading-7 text-white/70 md:text-base">
              100% verified. Every product checked before it reaches you —
              guaranteed genuine, guaranteed OPARZO.
            </p>
          </article>

          {/* Global Access */}
          <article className="border-t border-white/15 pt-6">
            <h3 className="font-serif text-2xl">Global Access</h3>
            <p className="mt-4 text-sm leading-7 text-white/70 md:text-base">
              The world's best brands, finally in Bangladesh — no middlemen, no
              guesswork.
            </p>
          </article>

          {/* Customer Support */}
          <article className="border-t border-white/15 pt-6">
            <h3 className="font-serif text-2xl">Customer Support</h3>
            <p className="mt-4 text-sm leading-7 text-white/70 md:text-base">
              Real people, real help — before you order and long after it
              arrives.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
