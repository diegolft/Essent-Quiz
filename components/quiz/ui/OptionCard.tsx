"use client";

import type { Icon } from "@phosphor-icons/react";
import { Check } from "@phosphor-icons/react/dist/ssr";

import { C, tint } from "@/lib/quiz/tokens";

/** Card de opção com chip de ícone — passo Identificação. */
export function OptionCard({
  label,
  icon: IconComponent,
  hue,
  selected,
  onSelect,
}: {
  label: string;
  icon: Icon;
  hue: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className="flex w-full cursor-pointer items-center gap-3 rounded-[14px] px-4 py-3.5 text-left transition-all duration-150"
      style={{
        border: `1.5px solid ${selected ? hue : C.border}`,
        background: selected ? tint(hue, 0.09) : C.panel,
      }}
    >
      <span
        className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] transition-all duration-150"
        style={{ background: selected ? hue : tint(hue, 0.14) }}
      >
        <IconComponent size={19} weight="duotone" color={selected ? C.ink : hue} />
      </span>
      <span
        className="text-[14.5px] leading-[1.3] font-semibold"
        style={{ color: selected ? C.white : C.textSecondary }}
      >
        {label}
      </span>
      {selected && (
        <Check size={18} weight="duotone" color={hue} className="pop-in ml-auto shrink-0" />
      )}
    </button>
  );
}
