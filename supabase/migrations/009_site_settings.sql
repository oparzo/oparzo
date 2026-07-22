-- Real site configuration, replacing the two mock "Settings" /
-- "Site Settings" admin pages (one was just a nav shortcut menu, the
-- other was a hardcoded info card — neither stored or controlled
-- anything). Singleton row pattern: exactly one row, id fixed at 1.
--
-- This intentionally does NOT try to cover every conceivable setting.
-- Scope is limited to what's concretely missing from the live site
-- today: there is currently no customer-facing contact info (email,
-- phone, WhatsApp, social) anywhere on oparzo.com, which is a real gap
-- for a premium brand. Announcement bar + maintenance mode are the two
-- other genuinely common, unambiguous needs for a storefront at this
-- stage. Anything more speculative (multi-currency, multi-language,
-- tax rules, etc.) is deliberately left out until there's a concrete
-- need — adding unused config fields is the same anti-pattern as the
-- mock pages this replaces.

create table if not exists site_settings (
  id int primary key default 1,
  constraint site_settings_singleton check (id = 1),

  contact_email text,
  contact_phone text,
  whatsapp_number text,
  instagram_url text,
  facebook_url text,

  announcement_text text,
  announcement_enabled boolean not null default false,

  maintenance_mode boolean not null default false,

  updated_at timestamptz not null default now()
);

insert into site_settings (id)
values (1)
on conflict (id) do nothing;

alter table site_settings enable row level security;

-- Anyone (including anonymous visitors) can read settings — the footer,
-- announcement bar, and maintenance-mode check all need this without
-- requiring a login.
create policy "Public can read site settings"
on site_settings
for select
using (true);

-- Only admins can change them.
create policy "Admins can update site settings"
on site_settings
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
