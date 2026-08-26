"use client";

import Image from "next/image";

import { PROVA_PRINTS, config } from "@/lib/quiz/content";
import { StepScreen } from "../ui/ScreenLayout";
import { Eyebrow } from "../ui/Typography";

/**
 * Prova social logo antes do gate de compromisso: é ali que a dúvida sobre o
 * acompanhamento ser real aparece, e é ali que o funil mais perde gente.
 */
export function ProvaScreen() {
  return (
    <StepScreen>
      <div className="text-center">
        <Eyebrow>Quem já treina com o Gabriel</Eyebrow>
        {/* Itálico não condensado, como a citação do passo 3 — é fala de gente, não manchete. */}
        <h1
          className="m-0 mb-3.5 text-[26px] leading-[1.2] font-medium text-white italic"
          style={{ textWrap: "balance" }}
        >
          Você não vai ser o primeiro.
        </h1>
        <p
          className="text-text-secondary m-0 mb-[26px] text-[14px] leading-[1.5]"
          style={{ textWrap: "pretty" }}
        >
          A consultoria individual está sendo descontinuada e o grupo fundador é pra onde
          esse acompanhamento vai. Quem passou por ele não estava mais motivado que você —
          só teve alguém junto por 30 dias.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {PROVA_PRINTS.map((print, i) => (
          <Print key={print.id} src={print.src} alt={print.alt} indice={i + 1} />
        ))}
      </div>

      <p className="text-text-muted m-0 mt-[22px] text-center text-[11.5px]">
        +{config.alunos} alunos acompanhados de perto até aqui.
      </p>
    </StepScreen>
  );
}

/** Cada print entra como imagem quando o arquivo existir; até lá, mostra o vazio nomeado. */
function Print({
  src,
  alt,
  indice,
}: {
  src: string | null;
  alt: string;
  indice: number;
}) {
  return (
    <div className="border-line bg-panel relative overflow-hidden rounded-[14px] border">
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={430}
          height={180}
          sizes="(max-width: 430px) 100vw, 430px"
          className="h-auto w-full"
        />
      ) : (
        <div className="text-text-muted flex h-[132px] flex-col items-center justify-center gap-1.5 px-4 text-center">
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase">
            Print {indice}
          </span>
          <span className="text-[11.5px] leading-[1.4]">{alt}</span>
        </div>
      )}
    </div>
  );
}
