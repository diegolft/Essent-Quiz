"use client";

import Image from "next/image";
import type { KeyboardEvent } from "react";
import type { Icon } from "@phosphor-icons/react";
import { Check } from "@phosphor-icons/react/dist/ssr";

import { C, tint } from "@/lib/quiz/tokens";

/** Card de opção com foto — passo Objetivo. O card inteiro é o alvo de seleção. */
export function PhotoOptionCard({
  label,
  hint,
  photo,
  alt,
  icon: IconComponent,
  hue,
  selected,
  onSelect,
}: {
  label: string;
  hint: string;
  photo: string;
  alt: string;
  icon: Icon;
  hue: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className="flex w-full cursor-pointer items-center gap-[13px] rounded-[14px] py-2.5 pr-3.5 pl-2.5 text-left transition-all duration-150"
      style={{
        border: `1.5px solid ${selected ? hue : C.border}`,
        background: selected ? tint(hue, 0.09) : C.panel,
      }}
    >
      <div
        className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-[10px] transition-[filter] duration-200"
        style={{ filter: selected ? "none" : "saturate(0.5) brightness(0.82)" }}
      >
        <Image src={photo} alt={alt} fill sizes="76px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div
          className="text-[15px] leading-[1.25] font-bold"
          style={{ color: selected ? C.white : C.textSecondary }}
        >
          {label}
        </div>
        <div className="text-text-muted mt-[5px] flex items-center gap-1.5 text-[11.5px]">
          <IconComponent size={14} weight="duotone" color={hue} />
          {hint}
        </div>
      </div>
      {selected && (
        <Check size={18} weight="duotone" color={hue} className="pop-in shrink-0" />
      )}
    </div>
  );
}
