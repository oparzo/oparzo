import { NextResponse } from "next/server";
import { createRequest } from "@/lib/request-product/services/create-request";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await createRequest({
      full_name: body.full_name,
      phone: body.phone,
      email: body.email,

      product_name: body.product_name,
      brand: body.brand,
      product_link: body.product_link,
      notes: body.notes,
    });

    return NextResponse.json({
      success: true,
      request: result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Request submission failed.",
      },
      {
        status: 500,
      }
    );
  }
}
