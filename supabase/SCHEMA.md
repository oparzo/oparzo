# Database Schema Reference (Inferred from Code)

## Why this file exists instead of reconstructed migrations 001–003

I don't have live access to your Supabase project from this environment, and
I don't have the original SQL for migrations `001`–`003` (missing from
`supabase/migrations/`). Writing fake `CREATE TABLE` statements and
presenting them as the real history would be guesswork dressed up as fact —
specifically the kind of thing I was told not to do. Instead, this documents
what every table's columns are **inferred to be**, based on every
`.select()` / `.insert()` / `.update()` / `.eq()` call on that table across
the codebase. Treat it as a reference, not a source of truth — the actual
source of truth is your live database.

**To get the real, authoritative schema**, run this from your machine (with
the Supabase CLI linked to your project) and commit the output as your new
baseline:

```
supabase db dump --schema public -f supabase/schema_baseline.sql
```

That command talks to your live project directly, so it'll be exactly
correct — something I can't produce from here.

---

## Tables (inferred)

### `profiles`
Referenced columns: `id` (= `auth.users.id`), `full_name`, `email`, `phone`,
`role` (`'admin' | 'customer'`), `created_at`.

### `addresses`
Referenced columns: `id`, `profile_id`, `receiver_name` / `full_name`,
`first_name`, `last_name`, `phone`, `district`, `area`, `address`,
`landmark`, `label` (default `'Home'`), `is_primary`, `is_default`,
`postal_code`, `notes`, `created_at`.
(`first_name`/`last_name`/`landmark`/`label`/`is_primary`/`district`/`notes`
were added in migration `006_addresses_upgrade.sql`.)

### `orders`
Referenced columns: `id`, `order_number`, `profile_id`, `address_id`,
`status`, `payment_status`, `payment_method`, `subtotal`, `discount`,
`shipping_fee`, `total`, `coupon_id`, `coupon_code`, `notes`, `created_at`,
plus `shipping_name` / `shipping_phone` / `shipping_email` /
`shipping_address` (added in migration `007_orders_shipping_fields.sql`,
this session).

### `order_items`
Referenced columns: `id`, `order_id`, `product_slug`, `product_name`,
`variant` (added in `004_add_variant_to_order_items.sql`), `quantity`,
`unit_price`, `total_price`.

### `coupons`
Referenced columns: `id`, `code`, `active`, `discount_type`
(`'percentage' | 'fixed'`), `discount_value`, `maximum_discount`,
`expires_at`, `usage_limit`, `used_count`.
RLS: public can read active coupons; writes are admin-only as of migration
`008_coupons_admin_only_rls.sql` (this session) — verify this actually
applied against your live policies, since the checked-in `coupons.sql` still
showed the old permissive policy before that migration.

### `wishlist`
Referenced columns: `id`, `profile_id`, `product_id` (a Sanity `_id`, not a
foreign key into a local products table — there is no local products
table), `created_at`.

### `cart_items`
Referenced columns: `id`, `profile_id`, `product_id`, `quantity`,
`created_at`.
**Known gap** (see audit + Milestone 2 notes): no columns for variant,
price, or currency, so this table can't represent what's actually in a
cart today. Currently unused — cart is localStorage-only by design
decision, see `components/cart/CartProvider.tsx`.

---

## RLS policies confirmed in the repo
Only `coupons` has its policy checked into `supabase/coupons.sql` /
migration `008`. `profiles`, `addresses`, `orders`, `order_items`,
`wishlist`, and `cart_items` have RLS enabled per your Supabase dashboard
(per earlier session notes) but no policy SQL is checked in anywhere — so
I can't verify what they actually say from code. This is worth a direct
check in the Supabase dashboard: Database → Tables → (table) → RLS Policies
for each of those six tables, particularly whether `orders`/`order_items`
correctly restrict a customer to their own rows and admins can see all.
