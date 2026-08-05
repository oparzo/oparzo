import { NextResponse } from "next/server";
import { z } from "zod";
import { createOrder } from "@/lib/order/services/create-order";
import { formatVariantLabel } from "@/lib/format";
import { server } from "@/lib/supabase/server";
import { requireAuthedCustomer, HttpError } from "@/lib/order/guard";
import { resolveUnitPrice } from "@/lib/order/resolve-price";
import { calculateTotals } from "@/lib/order/calculate-totals";

const OrderInput = z.object({
  items: z
    .array(
      z.object({
        product_slug: z.string().min(1),
        selectedVariant: z.any().nullable().optional(),
        quantity: z.number().int().positive().max(20),
      })
    )
    .min(1)
    .max(50),
  form: z.object({
    name: z.string().min(2).max(120),
    phone: z.string().min(8).max(20),
    email: z.string().email().max(120).optional().or(z.literal("")),
    address: z.string().min(5).max(400),
    area: z.string().max(120).optional(),
    district: z.string().max(120).optional(),
    postal_code: z.string().max(20).optional(),
  }),
  selectedAddressId: z.string().uuid().nullable().optional(),
  saveNewAddress: z.boolean().optional(),
  payment_method: z
    .enum(["Cash on Delivery", "Stripe", "bKash"])
    .default("Cash on Delivery"),
  couponCode: z.string().max(40).nullable().optional(),
});

export async function POST(request: Request) {
  try {
    const session = await requireAuthedCustomer();
    const payload = OrderInput.parse(await request.json());

    // Resolve prices server-side
    const items = await Promise.all(
      payload.items.map(async (item) => {
        const variantLabel = item.selectedVariant
          ? formatVariantLabel(item.selectedVariant)
          : null;

        const { unit_price, name, variant_label } = await resolveUnitPrice({
          slug: item.product_slug,
          variant: variantLabel,
        });

        return {
          product_slug: item.product_slug,
          product_name: name,
          variant: variant_label ?? undefined, // ✅ fix: null → undefined
          quantity: item.quantity,
          unit_price,
          total_price: unit_price * item.quantity,
        };
      })
    );

    const totals = await calculateTotals({
      items,
      couponCode: payload.couponCode ?? null,
      paymentMethod: payload.payment_method,
      destination: payload.form.district ?? null,
      profileId: session.user.id,
    });

    let addressId = payload.selectedAddressId ?? null;
    if (payload.saveNewAddress && payload.form.address) {
      const supabase = await server();
      const { data: newAddress, error: addressError } = await supabase
        .from("addresses")
        .insert({
          profile_id: session.user.id,
          receiver_name: payload.form.name,
          phone: payload.form.phone,
          address: payload.form.address,
          area: payload.form.area || null,
          district: payload.form.district || null,
          postal_code: payload.form.postal_code || null,
        })
        .select()
        .single();

      if (!addressError && newAddress) {
        addressId = newAddress.id;
      } else {
        console.error("Address save error:", addressError);
      }
    }

    const orderData = {
      profile_id: session.user.id,
      address_id: addressId,
      payment_method: payload.payment_method,
      shipping_fee: totals.shipping_fee,
      discount: totals.discount,
      coupon_code: payload.couponCode ?? null,
      subtotal: totals.subtotal,
      total: totals.grand_total,
      items,
      shipping_name: payload.form.name,
      shipping_phone: payload.form.phone,
      shipping_email: payload.form.email || null,
      shipping_address: payload.form.address,
    };

    const order = await createOrder(orderData);

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json(
        { success: false, message: err.message },
        { status: err.status }
      );
    }
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, issues: err.issues },
        { status: 422 }
      );
    }
    console.error("[orders] unhandled:", err);
    return NextResponse.json(
      { success: false, message: "Internal error" },
      { status: 500 }
    );
  }
}
