import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/auth";
import { admin } from "@/lib/supabase/admin";

// GET – ইউজারের সব অ্যাড্রেস আনা
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await admin
    .from("addresses")
    .select("*")
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, addresses: data });
}

// POST – নতুন অ্যাড্রেস যোগ করা
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { receiver_name, phone, address, area, district, postal_code } = body;

  // প্রয়োজনীয় ফিল্ড চেক
  if (!receiver_name || !phone || !address) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  // প্রথমে প্রোফাইল আছে কিনা চেক করুন, না থাকলে তৈরি করুন
  const { data: profile } = await admin
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!profile) {
    // প্রোফাইল তৈরি করুন
    await admin.from("profiles").insert({
      id: user.id,
      full_name: receiver_name,
      email: user.email,
    });
  }

  // অ্যাড্রেস ইনসার্ট করুন
  const { data, error } = await admin
    .from("addresses")
    .insert({
      profile_id: user.id,
      receiver_name,
      phone,
      address,
      area: area || null,
      district: district || null,
      postal_code: postal_code || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, address: data });
}

// PUT – অ্যাড্রেস আপডেট
export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, receiver_name, phone, address, area, district, postal_code } = body;

  if (!id) {
    return NextResponse.json({ success: false, message: "Address ID required" }, { status: 400 });
  }

  const { data, error } = await admin
    .from("addresses")
    .update({ receiver_name, phone, address, area, district, postal_code })
    .eq("id", id)
    .eq("profile_id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, address: data });
}

// DELETE – অ্যাড্রেস ডিলিট
export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ success: false, message: "Address ID required" }, { status: 400 });
  }

  const { error } = await admin
    .from("addresses")
    .delete()
    .eq("id", id)
    .eq("profile_id", user.id);

  if (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
