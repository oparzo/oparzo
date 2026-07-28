import Link from "next/link";
import { getSiteSettings } from "@/lib/settings/get-settings";
import NewsletterForm from "@/components/NewsletterForm";
import Wordmark from "@/components/Wordmark";

export default async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="bg-[var(--ink)] py-8 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* 4-column grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">

          {/* Column 1: Brand + Contact + Social */}
          <div>
            <Wordmark className="text-[1.4rem] sm:text-[1.8rem]" />
            <p className="mt-1 text-[10px] sm:text-xs leading-4 text-white/60">
              Authentic. Verified. Yours.
            </p>
            {/* Contact */}
            <div className="mt-3 space-y-1 text-[10px] sm:text-xs text-white/50">
              {settings.contact_email && (
                <a href={`mailto:${settings.contact_email}`} className="block hover:text-white truncate">
                  ✉ {settings.contact_email}
                </a>
              )}
              {settings.contact_phone && (
                <a href={`tel:${settings.contact_phone}`} className="block hover:text-white">
                  📞 {settings.contact_phone}
                </a>
              )}
              {settings.whatsapp_number && (
                <a
                  href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-white"
                >
                  💬 WhatsApp
                </a>
              )}
            </div>
            {/* Social Links */}
            <div className="mt-2 flex gap-3">
              {settings.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-xs transition">
                  📸 Instagram
                </a>
              )}
              {settings.facebook_url && (
                <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-xs transition">
                  👍 Facebook
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="mb-2 text-[9px] uppercase tracking-[0.2em] text-white/40">Explore</h3>
            <ul className="space-y-1.5 text-[10px] sm:text-xs">
              <li><Link href="/products" className="text-white/60 hover:text-white transition">Products</Link></li>
              <li><Link href="/categories" className="text-white/60 hover:text-white transition">Categories</Link></li>
              <li><Link href="/brands" className="text-white/60 hover:text-white transition">Brands</Link></li>
              <li><Link href="/about" className="text-white/60 hover:text-white transition">About</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer (শুধু My Account + Track Order) */}
          <div>
            <h3 className="mb-2 text-[9px] uppercase tracking-[0.2em] text-white/40">Customer</h3>
            <ul className="space-y-1.5 text-[10px] sm:text-xs">
              <li><Link href="/account" className="text-white/60 hover:text-white transition">My Account</Link></li>
              <li><Link href="/track-order" className="text-white/60 hover:text-white transition">Track Order</Link></li>
            </ul>
          </div>

          {/* Column 4: Policies + Slim Newsletter */}
          <div>
            <h3 className="mb-2 text-[9px] uppercase tracking-[0.2em] text-white/40">Policies</h3>
            <ul className="space-y-1.5 text-[10px] sm:text-xs">
              <li><Link href="/shipping-policy" className="text-white/60 hover:text-white transition">Shipping</Link></li>
              <li><Link href="/return-refund-policy" className="text-white/60 hover:text-white transition">Returns</Link></li>
              <li><Link href="/terms" className="text-white/60 hover:text-white transition">Terms</Link></li>
              <li><Link href="/privacy" className="text-white/60 hover:text-white transition">Privacy</Link></li>
            </ul>
            <div className="mt-3">
              <h3 className="mb-1 text-[9px] uppercase tracking-[0.2em] text-white/40">Newsletter</h3>
              <NewsletterForm slim />
            </div>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="mt-6 border-t border-white/10 pt-4 text-[9px] text-white/40 text-center">
          <p className="uppercase tracking-[0.2em]">"Bangladesh deserves the real thing."</p>
          <p className="mt-1">© {new Date().getFullYear()} OPARZO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
