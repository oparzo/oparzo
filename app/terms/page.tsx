export default function TermsPage() {
  return (
    <main className="bg-[var(--cream)] py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-serif">Terms &amp; Conditions</h1>
        <div className="mt-8 prose prose-lg text-gray-700">
          <p>By using OPARZO, you agree to the following terms:</p>
          <ul>
            <li>All products are sourced from third-party retailers and brands.</li>
            <li>
              OPARZO acts as a sourcing agent and is not responsible for manufacturer defects.
            </li>
            <li>
              Advance payment policies apply as outlined in the checkout and product request pages.
            </li>
            <li>
              We reserve the right to decline any order that cannot be sourced or does not meet
              our quality standards.
            </li>
            <li>
              Pricing, exchange rates, and delivery timelines are subject to change and will be
              confirmed before order processing.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
