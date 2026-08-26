"use client";

import { IDENTIFICACAO_OPTS } from "@/lib/quiz/content";
import { OptionCard } from "../ui/OptionCard";
import { StepScreen } from "../ui/ScreenLayout";
import { Eyebrow, Headline } from "../ui/Typography";

export function IdentificacaoScreen({
  value,
  onSelect,
}: {
  value: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <StepScreen>
      <Eyebrow>Diagnóstico</Eyebrow>
      <Headline className="mb-2">Qual dessas é você hoje?</Headline>
      <p className="text-text-muted m-0 mb-[22px] text-[13.5px]">
        Sem frescura. Escolhe a que mais pesa.
      </p>
      <div className="flex flex-col gap-2.5">
        {IDENTIFICACAO_OPTS.map((option) => (
          <OptionCard
            key={option.id}
            label={option.label}
            icon={option.icon}
            hue={option.hue}
            selected={value === option.id}
            onSelect={() => onSelect(option.id)}
          />
        ))}
      </div>
    </StepScreen>
  );
}
