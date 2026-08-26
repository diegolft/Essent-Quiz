"use client";

import { config } from "@/lib/quiz/content";
import { MomentScreen } from "../ui/ScreenLayout";
import { OutlinePill, PrimaryPill } from "../ui/PillButton";
import { Body, Eyebrow, Headline } from "../ui/Typography";
import { C } from "@/lib/quiz/tokens";

/** Desvio de quem recusou o compromisso de 30 dias. */
export function AtritoScreen({
  onReconsider,
  onWaitlist,
}: {
  onReconsider: () => void;
  onWaitlist: () => void;
}) {
  return (
    <MomentScreen padding="py-6 px-5">
      <Eyebrow color={C.textMuted}>Sem pressa</Eyebrow>
      <Headline className="mb-3">Então melhor não pegar sua vaga agora.</Headline>
      <Body className="mb-2">
        O grupo fundador tem {config.vagas} vagas e cada uma vira acompanhamento próximo
        por 30 dias. Sem esse compromisso, a vaga rende mais com outra pessoa — e você não
        fica com a sensação de ter desperdiçado.
      </Body>
      <p className="text-text-muted m-0 mb-7 text-[13.5px] leading-[1.5]">
        Se o momento não é esse, entra na lista de espera geral. Você é avisado quando o
        app abrir pra todo mundo.
      </p>
      <div className="flex flex-col gap-2.5">
        <PrimaryPill onClick={onReconsider}>Pensando bem, eu topo os 30 dias</PrimaryPill>
        <OutlinePill onClick={onWaitlist}>Entrar na lista de espera geral</OutlinePill>
      </div>
    </MomentScreen>
  );
}
