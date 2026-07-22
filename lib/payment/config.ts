// Reflects REAL configuration status by checking for the env vars each
// gateway needs, instead of a hardcoded "Coming Soon" label. This does
// NOT implement the actual payment flow (redirect/webhook handling) for
// SSLCommerz/bKash/Nagad — that requires live merchant credentials and
// sandbox testing that has to happen against a real account. Once you
// have credentials, set the env vars below and each provider will flip
// to "active" here; the checkout integration is a separate follow-up.

export type PaymentProviderStatus = "active" | "not_configured";

export interface PaymentProviderInfo {
  id: string;
  name: string;
  status: PaymentProviderStatus;
  requiredEnvVars: string[];
}

export function getPaymentProvidersStatus(): PaymentProviderInfo[] {
  return [
    {
      id: "cod",
      name: "Cash on Delivery",
      status: "active",
      requiredEnvVars: [],
    },
    {
      id: "sslcommerz",
      name: "SSLCommerz",
      status:
        process.env.SSLCOMMERZ_STORE_ID &&
        process.env.SSLCOMMERZ_STORE_PASSWORD
          ? "active"
          : "not_configured",
      requiredEnvVars: [
        "SSLCOMMERZ_STORE_ID",
        "SSLCOMMERZ_STORE_PASSWORD",
      ],
    },
    {
      id: "bkash",
      name: "bKash",
      status:
        process.env.BKASH_APP_KEY && process.env.BKASH_APP_SECRET
          ? "active"
          : "not_configured",
      requiredEnvVars: ["BKASH_APP_KEY", "BKASH_APP_SECRET"],
    },
    {
      id: "nagad",
      name: "Nagad",
      status: process.env.NAGAD_MERCHANT_ID ? "active" : "not_configured",
      requiredEnvVars: ["NAGAD_MERCHANT_ID"],
    },
    {
      id: "stripe",
      name: "Stripe",
      status: process.env.STRIPE_SECRET_KEY ? "active" : "not_configured",
      requiredEnvVars: ["STRIPE_SECRET_KEY"],
    },
  ];
}
