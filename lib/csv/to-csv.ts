// Shared CSV formatting for admin report exports (orders, customers).
// Was previously duplicated identically in both report routes.

export function toCsvValue(v: unknown) {
  if (v === null || v === undefined) return "";
  const s = String(v);
  // Quote and escape any field that contains a comma, quote, or newline.
  if (/[",\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function toCsv(columns: string[], rows: Record<string, unknown>[]) {
  const header = columns.join(",");
  const body = rows.map((row) =>
    columns.map((col) => toCsvValue(row[col])).join(",")
  );
  return [header, ...body].join("\n");
}
