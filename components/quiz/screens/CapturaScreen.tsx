"use client";

import { WarningCircle, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

import { ganchoDe } from "@/lib/quiz/content";
import { C, P } from "@/lib/quiz/tokens";
import { StepScreen } from "../ui/ScreenLayout";
import { Eyebrow, Headline } from "../ui/Typography";
import type { Mode } from "@/lib/quiz/types";

export function CapturaScreen({
  mode,
  objetivo,
  nome,
  whats,
  showError,
  onNome,
  onWhats,
  onWhatsBlur,
}: {
  mode: Mode;
  objetivo: string | null;
  nome: string;
  whats: string;
  showError: boolean;
  onNome: (v: string) => void;
  onWhats: (v: string) => void;
  onWhatsBlur: () => void;
}) {
  const espera = mode === "espera";

  return (
    <StepScreen>
      <Eyebrow color={espera ? C.textMuted : C.orangeLight}>
        {espera ? "Lista de espera" : "Quase lá"}
      </Eyebrow>
      <Headline className="mb-3">
        {espera ? "Te aviso quando abrir." : "Você tá dentro do perfil."}
      </Headline>
      <p
        className="text-text-secondary m-0 mb-[26px] text-[14px] leading-[1.5]"
        style={{ textWrap: "pretty" }}
      >
        {espera
          ? "Deixa nome e WhatsApp que a gente te chama quando o app abrir pro público geral. Sem vaga de grupo fundador, sem cobrança de compromisso."
          : `Deixa seu nome e WhatsApp que a gente confirma sua vaga na lista pra ${ganchoDe(objetivo)}.`}
      </p>

      <label
        htmlFor="quiz-nome"
        className="text-text-muted text-[12px] font-semibold tracking-[0.04em]"
      >
        Nome
      </label>
      <input
        id="quiz-nome"
        value={nome}
        onChange={(e) => onNome(e.target.value)}
        placeholder="Como podemos te chamar"
        autoComplete="given-name"
        className="border-line bg-panel focus:border-cyan mt-[7px] mb-[18px] box-border w-full rounded-xl border-[1.5px] p-3.5 text-[14px] text-white outline-none transition-[border-color] duration-150"
      />

      <label
        htmlFor="quiz-whats"
        className="text-text-muted text-[12px] font-semibold tracking-[0.04em]"
      >
        WhatsApp
      </label>
      <div
        className="bg-panel mt-[7px] flex items-center gap-[9px] rounded-xl border-[1.5px] p-3.5 transition-[border-color] duration-150 focus-within:border-[#38bdf8]"
        style={{ borderColor: showError ? P.pink : C.border }}
      >
        <WhatsappLogo size={19} weight="duotone" color={P.mint} />
        <input
          id="quiz-whats"
          value={whats}
          onChange={(e) => onWhats(e.target.value)}
          onBlur={onWhatsBlur}
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(11) 90000-0000"
          aria-invalid={showError}
          aria-describedby={showError ? "quiz-whats-erro" : undefined}
          className="min-w-0 flex-1 border-none bg-transparent text-[14px] text-white outline-none"
        />
      </div>
      {showError && (
        <p
          id="quiz-whats-erro"
          className="text-pink m-0 mt-[9px] flex items-center gap-1.5 text-[11.5px]"
        >
          <WarningCircle size={14} weight="duotone" />
          Coloca DDD + número, com 10 ou 11 dígitos.
        </p>
      )}

      <p className="text-text-muted m-0 mt-3.5 text-[11px]">
        {espera
          ? "Um aviso só, quando abrir. Sem spam."
          : "Vagas limitadas — sem spam, prometo."}
      </p>
    </StepScreen>
  );
}
