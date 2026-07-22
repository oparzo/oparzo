import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/auth";
import { admin } from "@/lib/supabase/admin";
import { toCsv } from "@/lib/csv/to-csv";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    let query = admin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (from) query = query.gte("created_at", from);
    if (to) query = query.lte("created_at", `${to}T23:59:59`);

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    const columns = [
      "order_number",
      "created_at",
      "status",
      "payment_status",
      "payment_method",
      "shipping_name",
      "shipping_phone",
      "shipping_email",
      "shipping_address",
      "subtotal",
      "discount",
      "coupon_code",
      "shipping_fee",
      "total",
    ];

    const csv = toCsv(columns, data ?? []);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="oparzo-orders-${Date.now()}.csv"`,
      },
    });
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
