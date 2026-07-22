import { admin } from "@/lib/supabase/admin";

export interface CreateBulkOrderInput {
  company_name: string;
  contact_person: string;
  phone: string;
  email?: string;

  products: string;
  quantity?: string;
  delivery_location?: string;
  message?: string;
}

export async function createBulkOrder(
  input: CreateBulkOrderInput
) {
  const { data, error } = await admin
    .from("bulk_orders")
    .insert({
      company_name: input.company_name,
      contact_person: input.contact_person,
      phone: input.phone,
      email: input.email,

      products: input.products,
      quantity: input.quantity,
      delivery_location: input.delivery_location,
      message: input.message,

      status: "Pending",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
