// Verbatim copy of NEW-AGAI-Base's components/ui/SegmentedControl.tsx — see
// Card.tsx's header comment for why this is a duplicate, not an import.
"use client";

export type SegmentOption<T extends string | number> = { value: T; label: string };

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  disabled,
}: {
  options: SegmentOption<T>[];
  value: T;
  onChange: (v: T) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex rounded-xl p-1" style={{ background: "var(--bg-input)" }}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={String(opt.value)}
            onClick={() => onChange(opt.value)}
            disabled={disabled}
            className="flex-1 rounded-lg py-2 px-1 text-xs font-semibold transition-colors"
            style={{
              background: active ? "var(--accent-primary, #0D9488)" : "transparent",
              color: active ? "#fff" : "var(--text-secondary)",
              cursor: disabled ? "default" : "pointer",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
