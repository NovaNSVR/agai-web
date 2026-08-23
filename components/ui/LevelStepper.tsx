// Verbatim copy of NEW-AGAI-Base's components/ui/LevelStepper.tsx — see
// Card.tsx's header comment for why this is a duplicate, not an import.
// Not yet used on the advertiser dashboard (no campaign-funding amount
// picker exists in this build) — copied over so it's available the moment
// that flow is built, consistent with the "reuse the shipped design system"
// instruction, without fabricating a use for it before one is real.
"use client";

export function LevelStepper({
  value,
  min,
  max,
  onChange,
  disabled,
  formatValue,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  disabled?: boolean;
  formatValue?: (v: number) => string;
}) {
  const atMin = value <= min;
  const atMax = value >= max;

  const btnStyle = (enabled: boolean): React.CSSProperties => ({
    background: "var(--bg-card)",
    color: enabled ? "var(--text-primary)" : "var(--text-muted)",
    cursor: enabled ? "pointer" : "default",
  });

  return (
    <div className="flex items-center justify-between rounded-xl p-2" style={{ background: "var(--bg-input)" }}>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || atMin}
        aria-label="Decrease"
        className="flex items-center justify-center rounded-lg text-lg font-semibold"
        style={{ width: 44, height: 44, ...btnStyle(!disabled && !atMin) }}
      >
        −
      </button>
      <span className="text-base font-semibold" style={{ color: "var(--accent-primary, #0D9488)" }}>
        {formatValue ? formatValue(value) : value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || atMax}
        aria-label="Increase"
        className="flex items-center justify-center rounded-lg text-lg font-semibold"
        style={{ width: 44, height: 44, ...btnStyle(!disabled && !atMax) }}
      >
        +
      </button>
    </div>
  );
}
