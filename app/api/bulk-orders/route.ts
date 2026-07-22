import { NextResponse } from "next/server";
import { createBulkOrder } from "@/lib/bulk-orders/services/create-bulk-order";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await createBulkOrder({
      company_name: body.company_name,
      contact_person: body.contact_person,
      phone: body.phone,
      email: body.email,

      products: body.products,
      quantity: body.quantity,
      delivery_location: body.delivery_location,
      message: body.message,
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
        message: "Bulk order submission failed.",
      },
      {
        status: 500,
      }
    );
  }
}
