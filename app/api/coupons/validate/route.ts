import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          error: "Coupon code is required",
        },
        {
          status: 400,
        }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("coupons")
      .select(
        "code, discount_type, discount_value, maximum_discount, minimum_order, expires_at, usage_limit, used_count"
      )
      .eq("code", code.toUpperCase())
      .eq("active", true)
      .single();

    if (error || !data) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid coupon",
        },
        {
          status: 404,
        }
      );
    }

    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return NextResponse.json(
        {
          success: false,
          error: "Coupon expired",
        },
        {
          status: 400,
        }
      );
    }

    if (data.used_count >= data.usage_limit) {
      return NextResponse.json(
        {
          success: false,
          error: "Coupon usage limit reached",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
      coupon: data,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
