import { admin } from "@/lib/supabase/admin";

export interface CreateBulkOrderInput {
  company_name?: string;
  contact_person: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  product_name: string;
  brand?: string;
  estimated_quantity: string;
  product_link?: string;
  notes?: string;
  full_delivery_address: string;
  nearest_landmark: string;
  postal_code: string;
}

export async function createBulkOrder(input: CreateBulkOrderInput) {
  const { data, error } = await admin
    .from("bulk_orders")
    .insert({
      company_name: input.company_name || null,
      contact_person: input.contact_person,
      phone: input.phone,
      whatsapp: input.whatsapp || null,
      email: input.email || null,
      product_name: input.product_name,
      brand: input.brand || null,
      estimated_quantity: input.estimated_quantity,
      product_link: input.product_link || null,
      notes: input.notes || null,
      full_delivery_address: input.full_delivery_address,
      nearest_landmark: input.nearest_landmark,
      postal_code: input.postal_code,
      status: "Pending",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
