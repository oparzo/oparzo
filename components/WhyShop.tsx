export default function WhyShop() {
  return (
    <section className="py-16 md:py-24 bg-[#f7f5f0]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <h2 className="font-serif text-4xl md:text-5xl text-[var(--ink)] text-center">
          Why Choose OPARZO?
        </h2>

        {/* Subheading / Introduction */}
        <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-gray-600 leading-relaxed">
          Authentic global brands. Personalized sourcing. Trusted service.
          Everything you need—delivered with confidence.
        </p>

        {/* 8 Trust Points – Grid Layout */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--stone)]">
            <p className="text-sm font-medium text-[var(--ink)]">✓ 100% Authentic Products</p>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Every product is sourced directly from trusted brands and verified retailers.
            </p>
          </div>

          {/* 2 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--stone)]">
            <p className="text-sm font-medium text-[var(--ink)]">✓ Direct Global Sourcing</p>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              We import from trusted international brands to ensure authenticity and freshness.
            </p>
          </div>

          {/* 3 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--stone)]">
            <p className="text-sm font-medium text-[var(--ink)]">✓ Request Any Product ⭐</p>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Can't find a product on our website? Simply submit a Request Product and we'll source it for you.
            </p>
          </div>

          {/* 4 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--stone)]">
            <p className="text-sm font-medium text-[var(--ink)]">✓ Bulk Order Solutions ⭐</p>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Need products for your business, salon, clinic, or organization? We provide competitive pricing for bulk purchases.
            </p>
          </div>

          {/* 5 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--stone)]">
            <p className="text-sm font-medium text-[var(--ink)]">✓ Competitive Pricing</p>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Direct sourcing allows us to offer fair pricing without compromising authenticity.
            </p>
          </div>

          {/* 6 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--stone)]">
            <p className="text-sm font-medium text-[var(--ink)]">✓ Quality Checked Before Dispatch</p>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Every order is carefully inspected before it reaches you.
            </p>
          </div>

          {/* 7 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--stone)]">
            <p className="text-sm font-medium text-[var(--ink)]">✓ Secure Shopping Experience</p>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Transparent communication, safe ordering, and reliable delivery.
            </p>
          </div>

          {/* 8 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--stone)]">
            <p className="text-sm font-medium text-[var(--ink)]">✓ Dedicated Customer Support</p>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Friendly assistance before, during, and after your purchase.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
