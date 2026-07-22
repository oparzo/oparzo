// The established brand mark: "ZO" always rendered in gold. Used for
// the standalone logo/wordmark (nav, footer, hero, loading screen) —
// not for prose mentions of "OPARZO" in running text (e.g. "Join
// OPARZO", "Why shop with OPARZO?"), where the gold treatment would
// look like a mid-sentence typo rather than a brand mark.
export default function Wordmark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span className={className}>
      OPAR<span style={{ color: "var(--gold)" }}>ZO</span>
    </span>
  );
}
