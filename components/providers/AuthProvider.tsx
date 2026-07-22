"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useMemo } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useMemo(() => {
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }, []);

  return <>{children}</>;
}
