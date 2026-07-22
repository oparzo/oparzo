import Link from "next/link";
import { getSiteSettings } from "@/lib/settings/get-settings";
import NewsletterForm from "@/components/NewsletterForm";
import Wordmark from "@/components/Wordmark";

export default async function Footer() {
  const settings = await getSiteSettings();

  const hasContactInfo =
    settings.contact_email ||
    settings.contact_phone ||
    settings.whatsapp_number ||
    settings.instagram_url ||
    settings.facebook_url;

  return (
    <footer className="bg-[var(--ink)] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid gap-14 lg:grid-cols-4">

          <div>

            <Wordmark className="text-[2.3rem]" />

            <p className="mt-6 max-w-xs leading-8 text-white/65">
              Authentic global products, thoughtfully curated for Bangladesh.
            </p>

            {hasContactInfo && (
              <div className="mt-8 space-y-3 text-sm text-white/60">

                {settings.contact_email && (
                  <a href={`mailto:${settings.contact_email}`} className="block hover:text-white">
                    {settings.contact_email}
                  </a>
                )}

                {settings.contact_phone && (
                  <a href={`tel:${settings.contact_phone}`} className="block hover:text-white">
                    {settings.contact_phone}
                  </a>
                )}

                {settings.whatsapp_number && (
                  <a
                    href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-white"
                  >
                    WhatsApp
                  </a>
                )}

                <div className="flex gap-5 pt-2">

                  {settings.instagram_url && (
                    <a
                      href={settings.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white"
                    >
                      Instagram
                    </a>
                  )}

                  {settings.facebook_url && (
                    <a
                      href={settings.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white"
                    >
                      Facebook
                    </a>
                  )}

                </div>

              </div>
            )}

          </div>

          <div>

            <h3 className="mb-6 text-[11px] uppercase tracking-[0.35em] text-white/50">
              Explore
            </h3>

            <div className="space-y-4 text-white/70">

              <Link href="/products">Products</Link>

              <Link href="/categories">Categories</Link>

              <Link href="/brands">Brands</Link>

            </div>

          </div>

          <div>

            <h3 className="mb-6 text-[11px] uppercase tracking-[0.35em] text-white/50">
              Customer
            </h3>

            <div className="space-y-4 text-white/70">

              <Link href="/account">My Account</Link>

              <Link href="/track-order">Track Order</Link>

              <Link href="/concierge">Concierge</Link>

              <Link href="/request-product">Request Product</Link>

              <Link href="/bulk-orders">Bulk Orders</Link>

            </div>

          </div>

          <div>

            <h3 className="mb-6 text-[11px] uppercase tracking-[0.35em] text-white/50">
              Newsletter
            </h3>

            <p className="mb-6 leading-7 text-white/60">
              Receive curated launches and exclusive updates.
            </p>

            <NewsletterForm />

          </div>

        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-2"><Link
            href="/request-product"
            className="border border-white/10 bg-white/[0.02] p-8 transition hover:border-[var(--gold)]"
          >
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/45">
              REQUEST PRODUCT
            </p>

            <h3 className="mt-4 font-[Cormorant_Garamond] text-3xl font-semibold">
              Can't find your product?
            </h3>

            <p className="mt-4 leading-8 text-white/65">
              Share the product name or product link. We'll source it directly
              for you.
            </p>
          </Link>

          <Link
            href="/bulk-orders"
            className="border border-white/10 bg-white/[0.02] p-8 transition hover:border-[var(--gold)]"
          >
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/45">
              BULK ORDERS
            </p>

            <h3 className="mt-4 font-[Cormorant_Garamond] text-3xl font-semibold">
              Buying for your business?
            </h3>

            <p className="mt-4 leading-8 text-white/65">
              Dedicated sourcing, wholesale pricing and priority support for
              businesses.
            </p>
          </Link>

        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-sm text-white/45">
          © {new Date().getFullYear()} OPARZO. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
