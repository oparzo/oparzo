export default function PrivacyPage() {
  return (
    <main className="bg-[var(--cream)] py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-serif">Privacy Policy</h1>
        <div className="mt-8 prose prose-lg text-gray-700">
          <p>
            OPARZO respects your privacy. We collect personal information (name,
            phone, email, address) only to process orders and provide customer
            support.
          </p>
          <p>
            We do not sell or share your data with third parties except as
            necessary for order fulfillment (e.g., shipping carriers).
          </p>
          <p>
            Your payment information is not stored by us (COD only). For any
            questions, please contact our support team.
          </p>
        </div>
      </div>
    </main>
  );
}
