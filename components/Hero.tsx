import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-[#f7f5f0] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-gray-500">
            PREMIUM CURATED LIFESTYLE
          </p>

          {/* Heading */}
          <h1 className="mt-3 sm:mt-4 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-[var(--ink)]">
            Thoughtfully Curated Authenticity
          </h1>

          {/* Subheading */}
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl">
            No more guessing if it's real. Authentic global brands, curated for Bangladesh.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-block bg-[var(--ink)] text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium transition hover:bg-black/80"
            >
              EXPLORE COLLECTION
            </Link>

            <Link
              href="/request-product"
              className="inline-block border border-[var(--ink)] text-[var(--ink)] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium transition hover:bg-[var(--ink)] hover:text-white"
            >
              REQUEST PRODUCT
            </Link>

            <Link
              href="/bulk-orders"
              className="inline-block border border-[var(--ink)] text-[var(--ink)] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium transition hover:bg-[var(--ink)] hover:text-white"
            >
              BULK ORDER
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
