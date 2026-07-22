import { NextResponse } from "next/server";
import { admin } from "@/lib/supabase/admin";
import { client } from "@/sanity/lib/client";
import { requireAdmin } from "@/lib/auth/auth";

const LOW_STOCK_THRESHOLD = 5;

export async function GET() {
  try {
    await requireAdmin();

    const [
      productCount,
      ordersResult,
      customersResult,
      pendingResult,
      pendingRequestsResult,
      lowStockProducts,
    ] = await Promise.all([
      client.fetch(`count(*[_type=="product"])`),

      admin.from("orders").select("total", { count: "exact" }),

      admin.from("profiles").select("*", { count: "exact", head: true }),

      admin
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "Pending"),

      admin
        .from("request_products")
        .select("*", { count: "exact", head: true })
        .eq("status", "Pending"),

      client.fetch(
        `*[_type=="product" && count(variants[stock < $threshold]) > 0]{
          _id, name, "slug": slug.current,
          "lowestStock": math::min(variants[].stock)
        }`,
        { threshold: LOW_STOCK_THRESHOLD }
      ),
    ]);

    const revenue =
      ordersResult.data?.reduce(
        (sum: number, order: any) => sum + (order.total ?? 0),
        0
      ) ?? 0;

    return NextResponse.json({
      success: true,
      dashboard: {
        totalProducts: productCount,
        totalOrders: ordersResult.count ?? 0,
        totalCustomers: customersResult.count ?? 0,
        pendingOrders: pendingResult.count ?? 0,
        pendingRequests: pendingRequestsResult.count ?? 0,
        lowStockProducts: lowStockProducts ?? [],
        totalRevenue: revenue,
      },
    });
  } catch (error: any) {
    console.error(error);

    if (error?.message === "Unauthorized") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (error?.message === "Forbidden") {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Dashboard failed",
      },
      {
        status: 500,
      }
    );
  }
}
