import { NextResponse } from "next/server";

import { client } from "@/sanity/lib/client";

import { searchProductsQuery } from "@/sanity/lib/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const term = searchParams.get("term");

  if (!term) {
    return NextResponse.json([]);
  }

  const products = await client.fetch(
    searchProductsQuery,

    {
      term,
    }
  );

  return NextResponse.json(products);
}
