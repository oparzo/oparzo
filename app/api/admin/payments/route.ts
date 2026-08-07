import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/auth";
import { getPaymentProvidersStatus } from "@/lib/payment/config";

export async function GET() {
  try {
    await requireAdmin();

    return NextResponse.json({
      success: true,
      providers: getPaymentProvidersStatus(),
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
