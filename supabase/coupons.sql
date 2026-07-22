create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),

  code text unique not null,

  discount_type text not null
    check (discount_type in ('percentage','fixed')),

  discount_value numeric(10,2) not null,

  minimum_order numeric(10,2) default 0,

  maximum_discount numeric(10,2),

  usage_limit integer default 1,

  used_count integer default 0,

  active boolean default true,

  expires_at timestamptz,

  created_at timestamptz default now()
);

alter table public.coupons enable row level security;

create policy "Public can read active coupons"
on public.coupons
for select
using (active = true);

create policy "Authenticated users manage coupons"
on public.coupons
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
