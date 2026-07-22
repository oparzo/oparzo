import { admin } from "@/lib/supabase/admin";

export interface CreateRequestInput {
  full_name: string;
  phone: string;
  email?: string;

  product_name: string;
  brand?: string;
  product_link?: string;
  notes?: string;
}

export async function createRequest(
  input: CreateRequestInput
) {
  const { data, error } = await admin
    .from("request_products")
    .insert({
      full_name: input.full_name,
      phone: input.phone,
      email: input.email,

      product_name: input.product_name,
      brand: input.brand,
      product_link: input.product_link,
      notes: input.notes,

      status: "Pending",
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
