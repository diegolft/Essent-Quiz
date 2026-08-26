"use client";

import { CaretLeft } from "@phosphor-icons/react/dist/ssr";

import { SEGMENT_HUES } from "@/lib/quiz/content";
import { C } from "@/lib/quiz/tokens";

/** Voltar + 6 segmentos de progresso, cada um na cor do seu passo. */
export function TopBar({ step, onBack }: { step: number; onBack: () => void }) {
  return (
    <div className="shrink-0 px-5 pt-[18px] pb-3.5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar"
          className="text-text-secondary flex cursor-pointer items-center border-none bg-transparent p-0.5"
        >
          <CaretLeft size={21} weight="duotone" />
        </button>
        <div className="flex flex-1 gap-1">
          {SEGMENT_HUES.map((hue, i) => (
            <div
              key={hue}
              className="h-1 flex-1 rounded-full transition-[background] duration-[400ms]"
              style={{ background: i + 1 <= step ? hue : C.borderSoft }}
            />
          ))}
        </div>
        <span className="text-text-muted min-w-[30px] text-right text-[11px] font-bold tracking-[0.04em]">
          {step}/6
        </span>
      </div>
    </div>
  );
}
