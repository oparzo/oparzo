import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/auth";
import { admin } from "@/lib/supabase/admin";

// The customer-facing order detail page previously queried Supabase
// directly from the browser by order id, with no check that the order
// actually belonged to the logged-in user — an IDOR: any authenticated
// user who obtained another customer's order id (shared screenshot,
// browser history, etc.) could view their full order, including
// shipping name/phone/address. This route enforces ownership
// explicitly rather than relying solely on RLS, which isn't currently
// version-controlled or verified for this table (see supabase/SCHEMA.md).
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const { id } = await params;

    const { data: order, error } = await admin
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    // Same 404 whether the order doesn't exist or belongs to someone
    // else — don't leak which case it is.
    if (error || !order || order.profile_id !== user.id) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    const { data: items } = await admin
      .from("order_items")
      .select("*")
      .eq("order_id", id);

    return NextResponse.json({
      success: true,
      order,
      items: items ?? [],
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
}
