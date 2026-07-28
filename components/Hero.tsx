import Link from "next/link";

export default function Hero() {
  const backgroundImage = "/hero-bg.png";

  return (
    <section className="relative overflow-hidden h-[280px] sm:h-[320px] lg:h-[380px] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Content – minimal padding, small text */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-white">
          <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-white/70">
            PREMIUM CURATED LIFESTYLE
          </p>
          <h1 className="mt-1 sm:mt-1.5 font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
            Thoughtfully Curated Authenticity
          </h1>
          <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm md:text-base text-white/80 max-w-xl">
            No more guessing if it's real. Authentic global brands, curated for Bangladesh.
          </p>
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
            <Link
              href="/products"
              className="inline-block bg-[var(--gold)] text-[var(--ink)] px-4 sm:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium transition hover:opacity-85"
            >
              EXPLORE
            </Link>
            <Link
              href="/request-product"
              className="inline-block border border-white text-white px-4 sm:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium transition hover:bg-white hover:text-[var(--ink)]"
            >
              REQUEST
            </Link>
            <Link
              href="/bulk-orders"
              className="inline-block border border-white text-white px-4 sm:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium transition hover:bg-white hover:text-[var(--ink)]"
            >
              BULK
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
