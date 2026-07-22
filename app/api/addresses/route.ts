import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/auth";

export async function GET() {
  try {
    const user = await requireUser();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("GET ADDRESS ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
      addresses: data,
    });
  } catch (e) {
    console.error("GET EXCEPTION:", e);

    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const supabase = await createClient();

    const body = await request.json();

    const { data, error } = await supabase
      .from("addresses")
      .insert({
        profile_id: user.id,
        receiver_name: body.receiver_name,
        phone: body.phone,
        district: body.district,
        area: body.area,
        address: body.address,
        postal_code: body.postal_code,
        is_default: body.is_default ?? false,
      })
      .select()
      .single();

    if (error) {
      console.error("ADDRESS INSERT ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
      address: data,
    });
  } catch (e) {
    console.error("POST EXCEPTION:", e);

    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}
