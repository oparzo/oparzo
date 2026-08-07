import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/auth";
import { getRequests } from "@/lib/request-product/services/get-requests";

export async function GET() {
  try {
    await requireAdmin();

    const requests = await getRequests();

    return NextResponse.json({ success: true, requests });
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
