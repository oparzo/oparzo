-- Adds shipping contact/address fields to orders.
-- Previously the checkout form collected name/phone/email/address but
-- nothing in the order-creation code path persisted them anywhere, so
-- every order was saved with no way to know who to ship it to.
-- All columns are nullable text, so this is backward compatible with
-- existing rows and existing `select("*")` queries.

alter table orders
add column if not exists shipping_name text;

alter table orders
add column if not exists shipping_phone text;

alter table orders
add column if not exists shipping_email text;

alter table orders
add column if not exists shipping_address text;
