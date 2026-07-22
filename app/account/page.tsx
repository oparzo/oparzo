import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const menu = [
    {
      title: "Account Details",
      description: "Manage your personal information",
      href: "/profile",
    },
    {
      title: "Orders",
      description: "Track and manage your purchases",
      href: "/orders",
    },
    {
      title: "Saved Addresses",
      description: "Manage delivery addresses",
      href: "/addresses",
    },
    {
      title: "Wishlist",
      description: "Products you've saved",
      href: "/wishlist",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
          My Account
        </p>

        <h1 className="mt-4 text-5xl font-serif">
          Welcome,
          <br />
          {user.user_metadata?.full_name || "Guest"}
        </h1>

        <p className="mt-5 text-neutral-600">
          {user.email}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {menu.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="border rounded-2xl p-8 hover:bg-[#faf8f3] transition"
          >
            <h2 className="text-2xl font-serif">
              {item.title}
            </h2>

            <p className="mt-3 text-neutral-600">
              {item.description}
            </p>
          </Link>
        ))}

        <form action="/auth/signout" method="post">
          <button
            className="w-full text-left border rounded-2xl p-8 hover:bg-red-50 transition"
          >
            <h2 className="text-2xl font-serif">
              Logout
            </h2>

            <p className="mt-3 text-neutral-600">
              Sign out from your account
            </p>
          </button>
        </form>
      </div>
    </main>
  );
}
