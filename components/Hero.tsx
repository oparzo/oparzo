import Link from "next/link";
import Wordmark from "@/components/Wordmark";

export default function Hero() {
  return (
    <section className="bg-[var(--cream)]">
      <div className="mx-auto grid min-h-[85vh] max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:min-h-screen lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-24">

        {/* LEFT */}

        <div className="max-w-2xl">

          <p className="mb-5 text-[11px] uppercase tracking-[0.45em] text-gray-500 sm:mb-7">
            PREMIUM CURATED LIFESTYLE
          </p>

          <h1 className="font-serif text-4xl leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Thoughtfully
            <br />
            Curated
            <br />
            Authenticity
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:mt-8 sm:text-lg">
            Authentic global products, thoughtfully curated,
            delivered with a trusted concierge experience.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row">

            <Link
              href="/products"
              className="w-full bg-[var(--gold)] px-8 py-4 text-center text-[11px] uppercase tracking-[0.3em] text-[var(--ink)] sm:w-auto"
            >
              Explore Collection
            </Link>

            <Link
              href="/concierge"
              className="w-full border border-[var(--ink)] px-8 py-4 text-center text-[11px] uppercase tracking-[0.3em] sm:w-auto"
            >
              Concierge
            </Link>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative hidden h-[420px] items-center justify-center overflow-hidden bg-[var(--stone)] md:flex lg:h-[560px] xl:h-[650px]">

          <div className="absolute inset-8 border border-black/10 lg:inset-10" />

          <div className="relative z-10 text-center">

            <div className="text-3xl lg:text-4xl">
              <Wordmark />
            </div>

            <p className="mt-4 text-[11px] uppercase tracking-[0.45em] text-gray-500">
              GLOBAL COLLECTION
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
