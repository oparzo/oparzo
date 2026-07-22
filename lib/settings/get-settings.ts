import { createClient } from "@/lib/supabase/server";

export interface SiteSettings {
  contact_email: string | null;
  contact_phone: string | null;
  whatsapp_number: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  announcement_text: string | null;
  announcement_enabled: boolean;
  maintenance_mode: boolean;
  shipping_notes: string | null;
}

const DEFAULTS: SiteSettings = {
  contact_email: null,
  contact_phone: null,
  whatsapp_number: null,
  instagram_url: null,
  facebook_url: null,
  announcement_text: null,
  announcement_enabled: false,
  maintenance_mode: false,
  shipping_notes: null,
};

// Public read (RLS allows anyone to select site_settings), used by the
// footer and the announcement bar. Falls back to safe defaults if the
// row doesn't exist yet (e.g. migration 009 hasn't been run) so a
// missing settings row never breaks page rendering.
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();

    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (!data) return DEFAULTS;

    return { ...DEFAULTS, ...data };
  } catch {
    return DEFAULTS;
  }
}
