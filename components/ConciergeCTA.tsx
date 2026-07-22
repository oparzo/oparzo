import Link from "next/link";

export default function ConciergeCTA() {
  return (
    <section className="bg-[var(--cream)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div className="border border-[var(--stone)] bg-white px-6 py-12 text-center md:px-16 md:py-20 lg:px-24 lg:py-24">

          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-gray-500">
            PERSONAL SHOPPING SERVICE
          </p>

          <h2 className="mx-auto max-w-4xl font-serif text-4xl leading-tight md:text-6xl">
            Can't find what
            <br />
            you're looking for?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 md:text-lg md:leading-8">
            Tell us what you need. Our concierge team will source
            authentic products from trusted global retailers and keep
            you updated every step of the way.
          </p>

          <div className="mt-10">
            <Link
              href="/concierge"
              className="inline-flex items-center justify-center bg-[var(--gold)] px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-[var(--ink)] transition hover:opacity-90"
            >
              Request Concierge
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
