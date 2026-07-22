export default function TrustSection() {
  return (
    <section className="bg-[var(--ink)] py-16 md:py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div className="max-w-3xl">

          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-white/60">
            THE OPARZO PROMISE
          </p>

          <h2 className="font-serif text-4xl leading-tight md:text-6xl">
            Authentic products.
            <br />
            Trusted sourcing.
            <br />
            Exceptional service.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
            Every product is carefully sourced from trusted
            international brands, inspected before dispatch,
            and delivered with a premium concierge experience.
          </p>

        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">

          <article className="border-t border-white/15 pt-6">
            <h3 className="font-serif text-2xl">
              Authenticity
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/70 md:text-base">
              Every product is sourced through verified suppliers
              and quality checked before reaching your doorstep.
            </p>
          </article>

          <article className="border-t border-white/15 pt-6">
            <h3 className="font-serif text-2xl">
              Global Access
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/70 md:text-base">
              Shop premium international brands that are
              rarely available in Bangladesh with confidence.
            </p>
          </article>

          <article className="border-t border-white/15 pt-6">
            <h3 className="font-serif text-2xl">
              Concierge Care
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/70 md:text-base">
              From product requests to delivery updates,
              our team stays with you throughout the journey.
            </p>
          </article>

        </div>

      </div>
    </section>
  );
}
