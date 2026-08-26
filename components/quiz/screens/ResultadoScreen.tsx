"use client";

import Image from "next/image";

import { diagnosticar, type Metrica } from "@/lib/quiz/resultado";
import { C } from "@/lib/quiz/tokens";
import type { Answers } from "@/lib/quiz/types";
import { EssentLogo } from "../ui/EssentMark";

/** Paga a promessa da análise: devolve o veredito lido das respostas antes de pedir o contato. */
export function ResultadoScreen({ answers }: { answers: Answers }) {
  const d = diagnosticar(answers);

  return (
    // O respiro do topo evita que a foto encoste na borda e pareça cortada.
    <div className="screen-in flex-1 pt-6">
      <div className="relative h-[190px]">
        {d.foto ? (
          <Image
            src={d.foto}
            alt={d.fotoAlt}
            fill
            sizes="(max-width: 430px) 100vw, 430px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="bg-panel absolute inset-0 flex items-center justify-center text-[12px] tracking-[0.08em] text-[#55504a] uppercase">
            Foto do objetivo
          </div>
        )}
        {/* Escurece o topo pra assinatura respirar e dissolve a foto no fundo do app. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(12,12,14,0.5) 0%, rgba(12,12,14,0) 30%, rgba(12,12,14,0) 68%, ${C.void} 100%)`,
          }}
        />
        <div className="pointer-events-none absolute top-[18px] left-[22px]">
          <EssentLogo markHeight={15} wordSize={13} />
        </div>
      </div>

      <div className="px-[22px] pt-1 pb-2">
        <Kicker>Diagnóstico pronto</Kicker>
        <h1
          className="font-condensed m-0 mb-3 text-[34px] leading-[0.97] font-extrabold text-white uppercase"
          style={{ textWrap: "balance" }}
        >
          {d.headline}
        </h1>
        <p
          className="text-text-secondary m-0 mb-[26px] text-[14px] leading-[1.55]"
          style={{ textWrap: "pretty" }}
        >
          {d.sub}
        </p>

        <div className="mb-[26px] flex flex-col gap-[18px]">
          {d.metricas.map((m) => (
            <Linha key={m.label} metrica={m} />
          ))}
        </div>

        <div className="mb-[22px] flex items-stretch gap-3.5">
          <div className="bg-orange w-[3px] shrink-0 rounded-[2px]" />
          <div>
            <Kicker>{d.gargaloTitulo}</Kicker>
            <p
              className="m-0 text-[15.5px] leading-[1.45] font-medium text-white italic"
              style={{ textWrap: "pretty" }}
            >
              {d.gargaloTexto}
            </p>
          </div>
        </div>

        <p className="text-text-muted m-0 text-[13px] leading-[1.5]">{d.fecho}</p>
      </div>
    </div>
  );
}

/** Eyebrow desta tela: um pouco menor e mais espaçado que o do resto do quiz. */
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-orange-light mb-2 text-[10.5px] font-bold tracking-[0.16em] uppercase">
      {children}
    </div>
  );
}

/** Métrica tipográfica: rótulo à esquerda, valor à direita, nota ocupando a linha de baixo. */
function Linha({ metrica }: { metrica: Metrica }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-[5px]">
      <span className="text-text-muted text-[11.5px] font-bold tracking-[0.12em] uppercase">
        {metrica.label}
      </span>
      <span className="font-condensed text-right text-[19px] leading-none font-extrabold text-white">
        {metrica.valor}
      </span>
      <span className="text-text-muted col-span-2 text-[12.5px] leading-[1.4]">
        {metrica.nota}
      </span>
    </div>
  );
}
