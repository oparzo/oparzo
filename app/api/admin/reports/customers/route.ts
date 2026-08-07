import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/auth";
import { admin } from "@/lib/supabase/admin";
import { toCsv } from "@/lib/csv/to-csv";

export async function GET() {
  try {
    await requireAdmin();

    const { data, error } = await admin
      .from("profiles")
      .select("full_name, email, phone, role, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    const columns = ["full_name", "email", "phone", "role", "created_at"];
    const csv = toCsv(columns, data ?? []);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="oparzo-customers-${Date.now()}.csv"`,
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
