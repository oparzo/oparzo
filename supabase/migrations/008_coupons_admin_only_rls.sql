-- The original policy in supabase/coupons.sql allowed ANY authenticated
-- user (not just admins) to insert/update/delete coupons:
--   create policy "Authenticated users manage coupons"
--   on public.coupons for all
--   using (auth.role() = 'authenticated')
--   with check (auth.role() = 'authenticated');
--
-- This replaces it with an admin-only write policy, and adds a
-- separate read policy so the admin panel (which needs to see
-- inactive/expired coupons too, not just active ones) keeps working.
--
-- Note: order creation (lib/order/services/create-order.ts) uses the
-- service-role client, which bypasses RLS entirely, so checkout/coupon
-- redemption is unaffected by this change.

drop policy if exists "Authenticated users manage coupons" on public.coupons;

create policy "Admins can view all coupons"
on public.coupons
for select
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);

create policy "Admins manage coupons"
on public.coupons
for insert
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);

create policy "Admins update coupons"
on public.coupons
for update
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);

create policy "Admins delete coupons"
on public.coupons
for delete
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);

-- "Public can read active coupons" (select using active = true) from the
-- original coupons.sql is left in place — it's what lets the
-- /api/coupons/validate endpoint and checkout coupon-apply flow work for
-- any shopper, logged in or not.
