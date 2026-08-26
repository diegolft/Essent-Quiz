"use client";

import { ArrowCounterClockwise, Bell, Check } from "@phosphor-icons/react/dist/ssr";

import { ganchoDe, primeiroNome } from "@/lib/quiz/content";
import { C, P, tint } from "@/lib/quiz/tokens";
import { MomentScreen } from "../ui/ScreenLayout";
import { Body, Eyebrow, Headline } from "../ui/Typography";
import type { Mode } from "@/lib/quiz/types";

export function ConfirmacaoScreen({
  mode,
  nome,
  objetivo,
  onRestart,
}: {
  mode: Mode;
  nome: string;
  objetivo: string | null;
  onRestart: () => void;
}) {
  const espera = mode === "espera";
  const primeiro = primeiroNome(nome);
  const gancho = ganchoDe(objetivo);

  return (
    <MomentScreen>
      <div
        className={`${espera ? "glow-cyan" : "glow-orange"} glow-in pointer-events-none absolute inset-0`}
      />
      <div className="relative">
        <div
          className="pop-in-badge mb-[22px] flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: espera ? tint(P.cyan, 0.16) : C.orange }}
        >
          {espera ? (
            <Bell size={28} weight="duotone" color={P.cyan} />
          ) : (
            <Check size={28} weight="duotone" color={C.onOrange} />
          )}
        </div>

        <Eyebrow color={espera ? P.cyan : C.orangeLight} className="mb-3">
          {espera ? "Você está na fila" : "Vaga reservada"}
        </Eyebrow>
        <Headline size={38} className="mb-3.5">
          {espera ? `Anotado, ${primeiro}.` : `Fechado, ${primeiro}. Você tá na lista.`}
        </Headline>
        <Body className="mb-6">
          {espera
            ? "Você entrou na lista de espera geral. Quando o app abrir pro público, você é um dos primeiros a saber — e o grupo fundador segue de porta aberta se você mudar de ideia antes disso."
            : `Baseado no que você respondeu, separamos sua vaga pro grupo fundador focado em ${gancho}. A gente te chama no WhatsApp assim que as vagas da turma abrirem.`}
        </Body>

        <div className="border-line bg-panel relative overflow-hidden rounded-[14px] border px-4 py-[15px]">
          <div
            className="absolute top-0 bottom-0 left-0 w-[3px]"
            style={{
              background: "linear-gradient(180deg, #ff5a2e, #f7b32b, #35d6a4, #38bdf8)",
            }}
          />
          <p className="text-orange-light m-0 mb-[7px] text-[11px] font-bold tracking-[0.12em] uppercase">
            Próximo passo
          </p>
          <p className="text-text-secondary m-0 text-[13px] leading-[1.5]">
            {espera
              ? "Nada a fazer agora. Guarda nosso número no WhatsApp pra não perder o aviso."
              : "Fica de olho no WhatsApp — é por lá que vamos confirmar sua vaga e mandar os primeiros conteúdos."}
          </p>
        </div>

        <button
          type="button"
          onClick={onRestart}
          className="border-line-soft text-text-muted hover:border-line mx-auto mt-[22px] flex cursor-pointer items-center gap-[7px] rounded-full border bg-transparent px-4 py-[9px] text-[12.5px] font-semibold transition-all duration-150 hover:text-white"
        >
          <ArrowCounterClockwise size={14} weight="duotone" />
          Refazer diagnóstico
        </button>
      </div>
    </MomentScreen>
  );
}
