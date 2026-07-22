import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const body = await request.json();

  const { data, error } = await supabase
    .from("concierge_requests")
    .insert({
      name: body.name,
      phone: body.phone,
      email: body.email,
      message: body.message,
      budget: body.budget,
      status: "Pending",
    })
    .select()
    .single();

  if (error) {
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
    request: data,
  });
}
