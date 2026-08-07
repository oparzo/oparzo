import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/auth";
import {
  getIntegrationStatus,
  getSecurityChecklist,
} from "@/lib/system/status";

export async function GET() {
  try {
    await requireAdmin();

    return NextResponse.json({
      success: true,
      integrations: getIntegrationStatus(),
      security: getSecurityChecklist(),
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
