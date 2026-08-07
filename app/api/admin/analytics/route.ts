import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/auth";
import { admin } from "@/lib/supabase/admin";

const DAYS = 14;

export async function GET() {
  try {
    await requireAdmin();

    const since = new Date();
    since.setDate(since.getDate() - DAYS);
    since.setHours(0, 0, 0, 0);

    const { data: orders, error: ordersError } = await admin
      .from("orders")
      .select("id, created_at, total, status, discount, coupon_code")
      .gte("created_at", since.toISOString());

    if (ordersError) {
      return NextResponse.json(
        { success: false, error: ordersError.message },
        { status: 400 }
      );
    }

    const orderIds = (orders ?? []).map((o) => o.id);

    const { data: items } = orderIds.length
      ? await admin
          .from("order_items")
          .select("order_id, product_name, quantity")
          .in("order_id", orderIds)
      : { data: [] };

    // Revenue + order count per day, oldest to newest, zero-filled for
    // days with no orders (so the chart doesn't silently skip gaps).
    const dayBuckets: Record<string, { total: number; orders: number }> = {};

    for (let i = 0; i < DAYS; i++) {
      const d = new Date(since);
      d.setDate(d.getDate() + i);
      dayBuckets[d.toISOString().slice(0, 10)] = { total: 0, orders: 0 };
    }

    (orders ?? []).forEach((o) => {
      const day = o.created_at.slice(0, 10);
      if (dayBuckets[day]) {
        dayBuckets[day].total += Number(o.total ?? 0);
        dayBuckets[day].orders += 1;
      }
    });

    const revenueByDay = Object.entries(dayBuckets).map(([date, v]) => ({
      date,
      ...v,
    }));

    // Orders by status.
    const statusCounts: Record<string, number> = {};
    (orders ?? []).forEach((o) => {
      statusCounts[o.status] = (statusCounts[o.status] ?? 0) + 1;
    });
    const statusBreakdown = Object.entries(statusCounts).map(
      ([status, count]) => ({ status, count })
    );

    // Top products by quantity sold.
    const productTotals: Record<string, number> = {};
    (items ?? []).forEach((item: any) => {
      productTotals[item.product_name] =
        (productTotals[item.product_name] ?? 0) + item.quantity;
    });
    const topProducts = Object.entries(productTotals)
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    // Coupon usage within the window.
    const coupledOrders = (orders ?? []).filter((o) => o.coupon_code);
    const couponStats = {
      redemptions: coupledOrders.length,
      totalDiscount: coupledOrders.reduce(
        (sum, o) => sum + Number(o.discount ?? 0),
        0
      ),
    };

    const revenue = (orders ?? []).reduce(
      (sum, o) => sum + Number(o.total ?? 0),
      0
    );

    return NextResponse.json({
      success: true,
      windowDays: DAYS,
      revenue,
      orderCount: (orders ?? []).length,
      averageOrder:
        (orders ?? []).length > 0
          ? Math.round(revenue / (orders ?? []).length)
          : 0,
      revenueByDay,
      statusBreakdown,
      topProducts,
      couponStats,
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
