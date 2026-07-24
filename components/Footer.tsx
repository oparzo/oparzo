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
        <div className="grid gap-14 lg:grid-cols-5">
          {/* Brand */}
          <div>
            <Wordmark className="text-[2.3rem]" />
            <p className="mt-6 max-w-xs leading-8 text-white/65">
              Authentic. Verified. Yours. — Global brands, curated for Bangladesh.
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
                    <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                      Instagram
                    </a>
                  )}
                  {settings.facebook_url && (
                    <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                      Facebook
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* EXPLORE - vertical layout */}
          <div>
            <h3 className="mb-6 text-[11px] uppercase tracking-[0.35em] text-white/50">Explore</h3>
            <div className="flex flex-col space-y-3">
              <Link href="/products" className="text-white/70 hover:text-white transition">
                Products
              </Link>
              <Link href="/categories" className="text-white/70 hover:text-white transition">
                Categories
              </Link>
              <Link href="/brands" className="text-white/70 hover:text-white transition">
                Brands
              </Link>
              <Link href="/about" className="text-white/70 hover:text-white transition">
                About
              </Link>
            </div>
          </div>

          {/* CUSTOMER - vertical layout */}
          <div>
            <h3 className="mb-6 text-[11px] uppercase tracking-[0.35em] text-white/50">Customer</h3>
            <div className="flex flex-col space-y-3">
              <Link href="/account" className="text-white/70 hover:text-white transition">
                My Account
              </Link>
              <Link href="/track-order" className="text-white/70 hover:text-white transition">
                Track Order
              </Link>
            </div>
          </div>

          {/* POLICIES - vertical layout */}
          <div>
            <h3 className="mb-6 text-[11px] uppercase tracking-[0.35em] text-white/50">Policies</h3>
            <div className="flex flex-col space-y-3">
              <Link href="/shipping-policy" className="text-white/70 hover:text-white transition">
                Shipping Policy
              </Link>
              <Link href="/return-refund-policy" className="text-white/70 hover:text-white transition">
                Return &amp; Refund Policy
              </Link>
              <Link href="/terms" className="text-white/70 hover:text-white transition">
                Terms &amp; Conditions
              </Link>
              <Link href="/privacy" className="text-white/70 hover:text-white transition">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-6 text-[11px] uppercase tracking-[0.35em] text-white/50">Newsletter</h3>
            <p className="mb-6 leading-7 text-white/60">
              Receive curated launches and exclusive updates.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Signature Hook & Copyright */}
        <div className="mt-16 border-t border-white/10 pt-8 text-sm text-white/45">
          <p className="text-center text-[11px] uppercase tracking-[0.35em]">
            "Bangladesh deserves the real thing."
          </p>
          <p className="mt-4 text-center">
            © {new Date().getFullYear()} OPARZO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
