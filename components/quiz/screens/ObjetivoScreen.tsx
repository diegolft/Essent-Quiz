"use client";

import { OBJETIVO_OPTS } from "@/lib/quiz/content";
import { PhotoOptionCard } from "../ui/PhotoOptionCard";
import { StepScreen } from "../ui/ScreenLayout";
import { Eyebrow, Headline } from "../ui/Typography";

export function ObjetivoScreen({
  value,
  onSelect,
}: {
  value: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <StepScreen>
      <Eyebrow>Objetivo</Eyebrow>
      <Headline className="mb-2">Onde você quer chegar?</Headline>
      <p className="text-text-muted m-0 mb-[22px] text-[13.5px]">
        Escolhe o que pesa mais agora.
      </p>
      <div className="flex flex-col gap-2.5">
        {OBJETIVO_OPTS.map((option) => (
          <PhotoOptionCard
            key={option.id}
            label={option.label}
            hint={option.hint}
            photo={option.photo}
            alt={option.alt}
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
