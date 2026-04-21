'use client';

import { useState } from 'react';

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

interface Props {
  value: number;
  min: number;
  max?: number;
  inputMode?: 'numeric' | 'decimal';
  placeholder?: string;
  className?: string;
  onCommit: (v: number) => void;
}

/**
 * Mobile-friendly numeric input:
 * - `type="text"` + `inputMode` so browsers don't enforce min/max mid-typing
 * - Draft-state pattern: while focused, display shadows what user types and
 *   completely ignores incoming `value` prop changes (e.g. from a sibling slider).
 *   On blur or Enter, parses, clamps, and commits.
 */
export function NumericField({
  value,
  min,
  max = Number.MAX_SAFE_INTEGER,
  inputMode = 'numeric',
  placeholder,
  className = '',
  onCommit,
}: Props) {
  const [draft, setDraft] = useState<string | null>(null);
  const display = draft !== null ? draft : String(value);

  return (
    <input
      type="text"
      inputMode={inputMode}
      value={display}
      placeholder={placeholder}
      onFocus={() => setDraft(String(value))}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        if (draft === null) return;
        const v = Number(draft);
        if (Number.isFinite(v) && v >= 0) {
          onCommit(clamp(v, min, max));
        }
        setDraft(null);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') (e.currentTarget as HTMLInputElement).blur();
      }}
      className={
        'h-11 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ' +
        className
      }
    />
  );
}
