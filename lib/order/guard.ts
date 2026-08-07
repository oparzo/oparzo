import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";

const limiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  prefix: "rl:orders",
});

export class HttpError extends Error {
  constructor(
    public status: number,
    msg: string
  ) {
    super(msg);
  }
}

export async function requireAuthedCustomer(): Promise<{
  user: { id: string; email?: string };
  supabase: SupabaseClient;
}> {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  // ✅ getUser() — verifies JWT server-side. Never use getSession().
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) throw new HttpError(401, "Authentication required");

  const { success } = await limiter.limit(user.id);
  if (!success) {
    throw new HttpError(
      429,
      "Too many requests. Please try again in a moment."
    );
  }

  return { user, supabase };
}
