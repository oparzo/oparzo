import { NextResponse } from "next/server";
import { createOrder } from "@/lib/order/services/create-order";
import { formatVariantLabel } from "@/lib/format";
import { admin } from "@/lib/supabase/admin";
import { requireAuthedCustomer, HttpError } from "@/lib/order/guard";

export async function POST(request: Request) {
  try {
    const session = await requireAuthedCustomer();
    const body = await request.json();

    // Map frontend cart items to order_items format
    const items = (body.items || []).map((item: any) => ({
      product_slug: item.slug ?? item._id,
      product_name: item.name,
      variant: formatVariantLabel(item.selectedVariant),
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity,
    }));

    const form = body.form || {};
    const selectedAddressId = body.selectedAddressId || null;
    const saveNewAddress = body.saveNewAddress || false;

    // ✅ ইউজার লগইন থাকলে অ্যাড্রেস সেভ করুন
    let addressId = selectedAddressId;
    if (saveNewAddress && form.address) {
      const { data: newAddress, error: addressError } = await admin
        .from("addresses")
        .insert({
          profile_id: session.user.id,
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

    // ✅ অর্ডার ডেটা প্রস্তুত
    const orderData = {
      profile_id: session.user.id,
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

    if (error instanceof HttpError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Order creation failed",
      },
      { status: 500 }
    );
  }
}
