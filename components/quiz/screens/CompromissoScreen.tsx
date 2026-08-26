"use client";

import { FireSimple, HourglassMedium } from "@phosphor-icons/react/dist/ssr";

import { COMPROMISSO_LABELS } from "@/lib/quiz/content";
import { C, P, tint } from "@/lib/quiz/tokens";
import { StepScreen } from "../ui/ScreenLayout";
import { Body, Eyebrow, Headline } from "../ui/Typography";
import type { Compromisso } from "@/lib/quiz/types";

/** Gate binário: sem auto-seleção prévia. */
export function CompromissoScreen({
  value,
  onSelect,
}: {
  value: Compromisso | null;
  onSelect: (v: Compromisso) => void;
}) {
  return (
    <StepScreen>
      <Eyebrow>Antes de continuar</Eyebrow>
      <Headline className="mb-3">Isso aqui não é pra todo mundo.</Headline>
      <Body className="mb-7">
        O grupo fundador pede pelo menos 30 dias seguindo o plano, sem trocar de estratégia
        toda semana. É acompanhamento de verdade, não milagre.
      </Body>

      <div className="flex flex-col gap-2.5">
        <GateButton
          selected={value === "topo"}
          onClick={() => onSelect("topo")}
          color={C.white}
        >
          <FireSimple size={20} weight="duotone" color={C.orangeLight} />
          {COMPROMISSO_LABELS.topo}
        </GateButton>
        <GateButton
          selected={value === "nao"}
          onClick={() => onSelect("nao")}
          color={C.textSecondary}
        >
          <HourglassMedium size={20} weight="duotone" color={C.textMuted} />
          {COMPROMISSO_LABELS.nao}
        </GateButton>
      </div>
    </StepScreen>
  );
}

function GateButton({
  children,
  selected,
  onClick,
  color,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className="flex w-full cursor-pointer items-center gap-[11px] rounded-[14px] px-5 py-[18px] text-left text-[14.5px] font-bold transition-all duration-150"
      style={{
        border: `1.5px solid ${selected ? C.orange : C.border}`,
        background: selected ? tint(P.orange, 0.1) : C.panel,
        color,
      }}
    >
      {children}
    </button>
  );
}
