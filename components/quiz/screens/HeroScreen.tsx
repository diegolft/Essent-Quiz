"use client";

import { config } from "@/lib/quiz/content";
import { EssentLogo } from "../ui/EssentMark";
import { MomentScreen } from "../ui/ScreenLayout";
import { Eyebrow, Headline } from "../ui/Typography";
import { PrimaryPill } from "../ui/PillButton";

export function HeroScreen({ onStart }: { onStart: () => void }) {
  return (
    <MomentScreen>
      <div className="glow-orange glow-in pointer-events-none absolute inset-0" />
      <div className="relative">
        <div className="mb-[30px]">
          <EssentLogo />
        </div>

        <Eyebrow className="mb-3">Grupo fundador · vagas limitadas</Eyebrow>
        <Headline size={42} className="mb-3.5">
          Você já tentou. Faltou plano, não vontade.
        </Headline>
        <p
          className="text-text-secondary m-0 mb-3.5 text-[14.5px] leading-[1.55]"
          style={{ textWrap: "pretty" }}
        >
          6 perguntas, 60 segundos. No fim você recebe o diagnóstico do que te trava — e
          descobre se entra na primeira turma acompanhada de perto pelo método Essent.
        </p>

        <div className="text-text-muted mb-[30px] flex items-center gap-[9px] text-[11.5px] font-semibold tracking-[0.04em] uppercase">
          <span>{config.vagas} vagas</span>
          <span className="h-[3px] w-[3px] rounded-full bg-[#4a443c]" />
          <span>{config.dias} dias de inscrição</span>
        </div>

        <PrimaryPill onClick={onStart}>Descobrir o que me trava</PrimaryPill>
        <p className="text-text-muted m-0 mt-3.5 text-center text-[11.5px]">
          Sem cadastro. Só 6 perguntas.
        </p>
      </div>
    </MomentScreen>
  );
}
