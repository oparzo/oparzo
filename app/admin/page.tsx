import Link from "next/link";

export default function AdminHomePage() {
  const items = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Orders", href: "/admin/orders" },
    { title: "Products", href: "/admin/products" },
    { title: "Brands", href: "/admin/brands" },
    { title: "Categories", href: "/admin/categories" },
    { title: "Customers", href: "/admin/customers" },
    { title: "Search", href: "/admin/search" },
    { title: "Settings", href: "/admin/settings" },
  ];

  return (
    <main className="max-w-7xl mx-auto px-8 py-16">
      <h1 className="text-6xl font-serif mb-12">Oparzo Admin</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border rounded-xl p-8 hover:bg-gray-50 transition"
          >
            <h2 className="text-2xl font-semibold">{item.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
