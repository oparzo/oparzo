import { admin } from "@/lib/supabase/admin";

export async function getBulkOrders() {
  const { data, error } = await admin
    .from("bulk_orders")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}
