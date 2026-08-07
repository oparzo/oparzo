import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/auth";
import { admin } from "@/lib/supabase/admin";

const ALLOWED_ROLES = ["admin", "customer"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentAdmin = await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    if (!ALLOWED_ROLES.includes(body.role)) {
      return NextResponse.json(
        { success: false, error: "Invalid role" },
        { status: 400 }
      );
    }

    // Prevent an admin from locking themselves out by demoting their
    // own account — they'd need another admin to do it instead.
    if (id === currentAdmin.id && body.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          error: "You can't change your own admin role.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await admin
      .from("profiles")
      .update({ role: body.role })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, profile: data });
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
