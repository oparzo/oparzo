import { NextResponse } from "next/server";
import { createOrder } from "@/lib/order/services/create-order";
import { getCurrentUser } from "@/lib/auth/auth";
import { formatVariantLabel } from "@/lib/format";
import { admin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ✅ ইউজার লগইন চেক
    const user = await getCurrentUser();

    // ✅ প্রোফাইল আছে কিনা চেক করুন, না থাকলে তৈরি করুন
    if (user) {
      const { data: existingProfile } = await admin
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!existingProfile) {
        await admin.from("profiles").insert({
          id: user.id,
          email: user.email,
          full_name: body.form?.name || null,
          role: "customer",
        });
      }
    }

    // Map frontend cart items to order_items format
    const items = (body.items || []).map((item: any) => ({
      product_slug: item.slug ?? item._id,
      product_name: item.name,
      variant: formatVariantLabel(item.selectedVariant),
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity,
    }));

    // Extract shipping info from form
    const form = body.form || {};
    const selectedAddressId = body.selectedAddressId || null;
    const saveNewAddress = body.saveNewAddress || false;

    // ✅ অ্যাড্রেস সেভ করুন (যদি ইউজার লগইন থাকে এবং সেভ করতে চায়)
    let addressId = selectedAddressId;
    if (user && saveNewAddress && form.address) {
      const { data: newAddress, error: addressError } = await admin
        .from("addresses")
        .insert({
          profile_id: user.id,
          receiver_name: form.name,
          phone: form.phone,
          address: form.address,
          area: form.area || null,
          district: form.district || null,
          postal_code: form.postal_code || null,
        })
        .select()
        .single();

      if (!addressError && newAddress) {
        addressId = newAddress.id;
      } else {
        console.error("Address save error:", addressError);
      }
    }

    // ✅ অর্ডার ডেটা প্রস্তুত করুন (এখন profile_id সেট করা হচ্ছে)
    const orderData = {
      profile_id: user?.id || null,
      address_id: addressId,
      payment_method: body.payment_method || "Cash on Delivery",
      shipping_fee: body.shipping_fee || 0,
      discount: body.discount || 0,
      coupon_code: body.couponCode || null,
      subtotal: body.subtotal || 0,
      total: body.grandTotal || 0,
      items,
      shipping_name: form.name || null,
      shipping_phone: form.phone || null,
      shipping_email: form.email || null,
      shipping_address: form.address || null,
    };

    const order = await createOrder(orderData);

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Order creation failed",
      },
      {
        status: 500,
      }
    );
  }
}
