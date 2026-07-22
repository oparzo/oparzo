import { admin } from "@/lib/supabase/admin";

export async function getRequests() {
  const { data, error } = await admin
    .from("request_products")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}
