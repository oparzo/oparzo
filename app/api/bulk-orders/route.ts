import { NextResponse } from "next/server";
import { createBulkOrder } from "@/lib/bulk-orders/services/create-bulk-order";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await createBulkOrder({
      company_name: body.company_name,
      contact_person: body.contact_person,
      phone: body.phone,
      whatsapp: body.whatsapp,
      email: body.email,
      product_name: body.product_name,
      brand: body.brand,
      estimated_quantity: body.estimated_quantity,
      product_link: body.product_link,
      notes: body.notes,
      full_delivery_address: body.full_delivery_address,
      nearest_landmark: body.nearest_landmark,
      postal_code: body.postal_code,
    });

    return NextResponse.json({
      success: true,
      bulkOrder: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Bulk order submission failed.",
      },
      {
        status: 500,
      }
    );
  }
}
