export default function WhyShop() {
  const trustPoints = [
    {
      icon: "✓",
      title: "100% Authentic Products",
      description: "Every product is sourced directly from trusted brands and verified retailers.",
    },
    {
      icon: "🌍",
      title: "Direct Global Sourcing",
      description: "We import from trusted international brands to ensure authenticity and freshness.",
    },
    {
      icon: "⭐",
      title: "Request Any Product",
      description: "Can't find a product? Submit a request and we'll source it for you.",
    },
    {
      icon: "📦",
      title: "Bulk Order Solutions",
      description: "Competitive pricing for businesses, salons, clinics, and organizations.",
    },
    {
      icon: "💰",
      title: "Competitive Pricing",
      description: "Direct sourcing allows us to offer fair pricing without compromising authenticity.",
    },
    {
      icon: "✅",
      title: "Quality Checked Before Dispatch",
      description: "Every order is carefully inspected before it reaches you.",
    },
    {
      icon: "🔒",
      title: "Secure Shopping Experience",
      description: "Transparent communication, safe ordering, and reliable delivery.",
    },
    {
      icon: "🤝",
      title: "Dedicated Customer Support",
      description: "Friendly assistance before, during, and after your purchase.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#f7f5f0]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-serif text-4xl md:text-5xl text-[var(--ink)] text-center">
          Why Choose OPARZO?
        </h2>

        <p className="mt-4 max-w-3xl mx-auto text-center text-base text-gray-600 leading-relaxed">
          Authentic global brands. Personalized sourcing. Trusted service.
          Everything you need—delivered with confidence.
        </p>

        {/* মোবাইলে ২ কলাম, ডেস্কটপে ৪ কলাম */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-[var(--stone)] transition hover:shadow-md hover:-translate-y-1 duration-300"
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{point.icon}</div>
              <h3 className="text-xs sm:text-sm font-medium text-[var(--ink)]">{point.title}</h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
