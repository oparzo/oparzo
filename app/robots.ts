export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/auth/",
        "/checkout/",
        "/cart/",
        "/wishlist/",
        "/profile/",
        "/addresses/",
        "/orders/",
        "/track-order/",
      ],
    },
    sitemap: "https://oparzo.com/sitemap.xml",
  };
}
