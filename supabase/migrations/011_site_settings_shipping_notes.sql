-- The standalone "/admin/shipping" page showed hardcoded fixed rates
-- (Inside Dhaka ৳80, Outside Dhaka ৳120, Express ৳200) that don't match
-- how checkout actually works — checkout deliberately shows "Calculated
-- Later, confirmed by the Concierge Team" rather than a fixed-rate
-- table, because OPARZO's business model is concierge-assisted
-- cross-border sourcing, not flat-rate shipping. That page was
-- presenting fictional data that contradicted the real checkout flow.
--
-- Rather than build an automated rate engine (which would work against
-- the concierge model) or leave the misleading static page in place,
-- this adds one real field: free-text internal reference notes about
-- typical shipping expectations, editable in Settings, consolidating
-- with the rest of the site configuration instead of a separate page.

alter table site_settings
add column if not exists shipping_notes text;
