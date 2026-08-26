"use client";

import { LIKERT_HUES, LIKERT_VALUES } from "@/lib/quiz/content";
import { C, tint } from "@/lib/quiz/tokens";
import type { Likert } from "@/lib/quiz/types";

export function LikertScale({
  value,
  onSelect,
}: {
  value: Likert | null;
  onSelect: (v: Likert) => void;
}) {
  return (
    <div className="mb-2.5 flex justify-between gap-1.5">
      {LIKERT_VALUES.map((v) => {
        const hue = LIKERT_HUES[v - 1];
        const selected = value === v;
        return (
          <button
            key={v}
            type="button"
            onClick={() => onSelect(v)}
            aria-pressed={selected}
            aria-label={`Nota ${v} de 5`}
            className="font-condensed aspect-square flex-1 cursor-pointer rounded-full text-[19px] font-extrabold transition-all duration-[180ms]"
            style={{
              border: `2px solid ${selected ? hue : C.border}`,
              background: selected ? hue : C.panel,
              color: selected ? C.ink : C.textSecondary,
              transform: selected ? "scale(1.06)" : "scale(1)",
              boxShadow: selected ? `0 6px 20px ${tint(hue, 0.35)}` : "none",
            }}
          >
            {v}
          </button>
        );
      })}
    </div>
  );
}
