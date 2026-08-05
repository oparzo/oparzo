import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const limiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  prefix: "rl:orders",
});

export class HttpError extends Error {
  constructor(public status: number, msg: string) {
    super(msg);
  }
}

export async function requireAuthedCustomer() {
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

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new HttpError(401, "Authentication required");

  // Rate limit by user ID
  const { success, remaining } = await limiter.limit(session.user.id);
  if (!success) {
    throw new HttpError(429, `Too many requests. Please try again in a moment.`);
  }

  return session;
}
