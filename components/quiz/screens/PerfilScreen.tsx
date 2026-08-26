"use client";

import { CalendarDots, Timer } from "@phosphor-icons/react/dist/ssr";

import { TEMPO_DIA_OPTS, TEMPO_TREINO_OPTS } from "@/lib/quiz/content";
import { P } from "@/lib/quiz/tokens";
import { ChipGroup } from "../ui/ChipGroup";
import { StepScreen } from "../ui/ScreenLayout";
import { Eyebrow, Headline } from "../ui/Typography";

export function PerfilScreen({
  tempoTreino,
  tempoDia,
  onTempoTreino,
  onTempoDia,
}: {
  tempoTreino: string | null;
  tempoDia: string | null;
  onTempoTreino: (v: string | null) => void;
  onTempoDia: (v: string | null) => void;
}) {
  return (
    <StepScreen>
      <Eyebrow>Seu ponto de partida</Eyebrow>
      <Headline>Rotina real, sem forçar.</Headline>

      <ChipGroup
        label="Há quanto tempo treina?"
        icon={CalendarDots}
        hue={P.cyan}
        options={TEMPO_TREINO_OPTS}
        value={tempoTreino}
        onSelect={onTempoTreino}
      />
      <ChipGroup
        label="Quanto tempo por dia consegue dedicar?"
        icon={Timer}
        hue={P.violet}
        options={TEMPO_DIA_OPTS}
        value={tempoDia}
        onSelect={onTempoDia}
      />
    </StepScreen>
  );
}
