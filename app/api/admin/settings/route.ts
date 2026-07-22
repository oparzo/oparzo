import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/auth";
import { admin } from "@/lib/supabase/admin";

const EDITABLE_FIELDS = [
  "contact_email",
  "contact_phone",
  "whatsapp_number",
  "instagram_url",
  "facebook_url",
  "announcement_text",
  "announcement_enabled",
  "maintenance_mode",
  "shipping_notes",
];

export async function PATCH(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();

    // Only allow known fields through — never spread the raw body into
    // the update, so a stray `id` or unexpected field can't slip in.
    const update: Record<string, unknown> = {};

    for (const field of EDITABLE_FIELDS) {
      if (field in body) {
        update[field] = body[field];
      }
    }

    update.updated_at = new Date().toISOString();

    const { data, error } = await admin
      .from("site_settings")
      .update(update)
      .eq("id", 1)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, settings: data });
  } catch (error: any) {
    const status =
      error?.message === "Forbidden"
        ? 403
        : error?.message === "Unauthorized"
        ? 401
        : 500;

    return NextResponse.json(
      { success: false, error: error?.message ?? "Failed" },
      { status }
    );
  }
}
