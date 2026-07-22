import { getSiteSettings } from "@/lib/settings/get-settings";

export default async function AnnouncementBar() {
  const settings = await getSiteSettings();

  if (
    !settings.announcement_enabled ||
    !settings.announcement_text
  ) {
    return null;
  }

  return (
    <div className="border-b border-[var(--stone)] bg-[var(--ink)] px-6 py-3 text-center text-[11px] font-medium uppercase tracking-[0.35em] text-white">
      {settings.announcement_text}
    </div>
  );
}
