import Link from "next/link";

const sections = [
  {
    title: "Dashboard",
    items: [{ name: "Dashboard", href: "/admin/dashboard" }],
  },

  {
    title: "Catalog",
    items: [
      { name: "Products", href: "/admin/products" },
      { name: "Brands", href: "/admin/brands" },
      { name: "Categories", href: "/admin/categories" },
      { name: "Inventory", href: "/admin/inventory" },
    ],
  },

  {
    title: "Sales",
    items: [
      { name: "Orders", href: "/admin/orders" },
      { name: "Customers", href: "/admin/customers" },
      { name: "Coupons", href: "/admin/coupons" },
      { name: "Payments", href: "/admin/payments" },
    ],
  },

  {
    title: "Requests",
    items: [
      {
        name: "Request Products",
        href: "/admin/request-products",
      },
      {
        name: "Bulk Orders",
        href: "/admin/bulk-orders",
      },
    ],
  },

  {
    title: "Content",
    items: [
      { name: "Media", href: "/admin/media" },
      { name: "Reviews", href: "/admin/reviews" },
    ],
  },

  {
    title: "Marketing",
    items: [
      { name: "Analytics", href: "/admin/analytics" },
      { name: "Reports", href: "/admin/reports" },
    ],
  },

  {
    title: "System",
    items: [
      { name: "Users", href: "/admin/users" },
      { name: "Roles", href: "/admin/roles" },
      { name: "Settings", href: "/admin/settings" },
      { name: "Security", href: "/admin/security" },
      { name: "Backup", href: "/admin/backup" },
      { name: "Logs", href: "/admin/logs" },
    ],
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-72 min-h-screen border-r bg-white px-6 py-8">
      <h1 className="text-3xl font-serif mb-10">
        OPAR<span className="text-yellow-600">ZO</span>
      </h1>

      {sections.map((section) => (
        <div key={section.title} className="mb-8">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gray-500">
            {section.title}
          </p>

          <div className="space-y-2">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 hover:bg-gray-100"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
