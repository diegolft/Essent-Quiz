"use client";

import { config } from "@/lib/quiz/content";
import { MomentScreen } from "../ui/ScreenLayout";
import { Eyebrow, Headline } from "../ui/Typography";
import { PrimaryPill } from "../ui/PillButton";

export function HeroScreen({ onStart }: { onStart: () => void }) {
  return (
    <MomentScreen>
      <div className="glow-orange glow-in pointer-events-none absolute inset-0" />
      <div className="relative">
        <div className="mb-[30px] inline-flex items-center gap-[7px]">
          <div className="bg-orange h-[19px] w-1 rounded-[2px]" />
          <span className="font-condensed text-[17px] font-extrabold tracking-[0.18em] text-white">
            ESSENT
          </span>
        </div>

        <Eyebrow className="mb-3">Grupo fundador · vagas limitadas</Eyebrow>
        <Headline size={42} className="mb-3.5">
          Seu corpo não muda no piloto automático.
        </Headline>
        <p
          className="text-text-secondary m-0 mb-3.5 text-[14.5px] leading-[1.55]"
          style={{ textWrap: "pretty" }}
        >
          60 segundos pra descobrir se você entra pra primeira turma acompanhada de perto
          pelo método Essent.
        </p>

        <div className="text-text-muted mb-[30px] flex items-center gap-[9px] text-[11.5px] font-semibold tracking-[0.04em] uppercase">
          <span>{config.vagas} vagas</span>
          <span className="h-[3px] w-[3px] rounded-full bg-[#4a443c]" />
          <span>{config.dias} dias de inscrição</span>
        </div>

        <PrimaryPill onClick={onStart}>Começar diagnóstico</PrimaryPill>
        <p className="text-text-muted m-0 mt-3.5 text-center text-[11.5px]">
          Sem cadastro. Direto ao ponto.
        </p>
      </div>
    </MomentScreen>
  );
}
