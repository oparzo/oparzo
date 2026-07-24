import { NextResponse } from "next/server";
import { createOrder } from "@/lib/order/services/create-order";
import { getCurrentUser } from "@/lib/auth/auth";
import { formatVariantLabel } from "@/lib/format";
import { admin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // We don't use profile_id for now due to missing profiles table entry
    // Instead, we store all shipping info directly in orders table
    // const user = await getCurrentUser(); // optional, for future use

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

    // If user is logged in and wants to save the address, we skip saving
    // because profiles table may not have the user. We'll handle later.
    // For now, just log it.
    if (saveNewAddress) {
      console.log("Address save requested but skipped due to profile issue.");
    }

    // Prepare order data with profile_id = null
    const orderData = {
      profile_id: null, // force null to avoid foreign key error
      address_id: selectedAddressId,
      payment_method: body.payment_method || "Cash on Delivery",
      shipping_fee: body.shipping_fee || 0,
      discount: body.discount || 0,
      coupon_code: body.couponCode || null,
      subtotal: body.subtotal || 0,
      total: body.grandTotal || 0,
      items,

      // Shipping details from form
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
