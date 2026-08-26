"use client";

import type { Icon } from "@phosphor-icons/react";

import { C, tint } from "@/lib/quiz/tokens";

/** Grupo de chips de escolha única. Clicar no chip selecionado desmarca. */
export function ChipGroup({
  label,
  icon: IconComponent,
  hue,
  options,
  value,
  onSelect,
}: {
  label: string;
  icon: Icon;
  hue: string;
  options: string[];
  value: string | null;
  onSelect: (value: string | null) => void;
}) {
  return (
    <>
      <p className="mt-[26px] mb-3 flex items-center gap-2 text-[13.5px] font-bold text-white">
        <IconComponent size={17} weight="duotone" color={hue} />
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(selected ? null : option)}
              aria-pressed={selected}
              className="cursor-pointer rounded-[10px] px-3.5 py-2.5 text-[13px] font-semibold transition-all duration-150"
              style={{
                border: `1.5px solid ${selected ? hue : C.border}`,
                background: selected ? tint(hue, 0.1) : C.panel,
                color: selected ? C.white : C.textSecondary,
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </>
  );
}
