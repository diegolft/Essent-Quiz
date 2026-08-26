"use client";

import { useEffect, useState } from "react";

import { diagnosticar, type Medidor } from "@/lib/quiz/resultado";
import { C, P, tint } from "@/lib/quiz/tokens";
import type { Answers } from "@/lib/quiz/types";
import { StepScreen } from "../ui/ScreenLayout";
import { Eyebrow, Headline } from "../ui/Typography";

/** Paga a promessa da análise: devolve o perfil lido das respostas antes de pedir o contato. */
export function ResultadoScreen({ answers }: { answers: Answers }) {
  const d = diagnosticar(answers);

  // As barras crescem do zero depois da montagem, senão já entram cheias.
  const [preenchido, setPreenchido] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setPreenchido(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <StepScreen>
      <Eyebrow color={P.mint}>Diagnóstico pronto</Eyebrow>
      <Headline className="mb-3">{d.perfilTitulo}</Headline>
      <p
        className="text-text-secondary m-0 mb-6 text-[14px] leading-[1.55]"
        style={{ textWrap: "pretty" }}
      >
        {d.perfilTexto}
      </p>

      <div className="mb-6 flex flex-col gap-3.5">
        {d.medidores.map((m) => (
          <Barra key={m.key} medidor={m} preenchido={preenchido} />
        ))}
      </div>

      <div
        className="bg-panel relative overflow-hidden rounded-[14px] border px-4 py-[15px]"
        style={{ borderColor: C.border }}
      >
        <div
          className="absolute top-0 bottom-0 left-0 w-[3px]"
          style={{ background: d.gargalo.hue }}
        />
        <p
          className="m-0 mb-[7px] text-[11px] font-bold tracking-[0.12em] uppercase"
          style={{ color: d.gargalo.hue }}
        >
          {d.gargaloTitulo}
        </p>
        <p className="text-text-secondary m-0 text-[13px] leading-[1.5]">{d.gargaloTexto}</p>
      </div>

      <p className="text-text-muted m-0 mt-4 text-[13px] leading-[1.5]">{d.fechamento}</p>
    </StepScreen>
  );
}

function Barra({ medidor, preenchido }: { medidor: Medidor; preenchido: boolean }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[12.5px] font-semibold text-white">{medidor.label}</span>
        <span className="text-[12.5px] font-bold" style={{ color: medidor.hue }}>
          {medidor.valor}
        </span>
      </div>
      <div
        className="my-[7px] h-1 w-full overflow-hidden rounded-full"
        style={{ background: C.borderSoft }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: preenchido ? `${medidor.pct}%` : "0%",
            background: medidor.hue,
            boxShadow: `0 0 12px ${tint(medidor.hue, 0.45)}`,
            transition: "width .7s cubic-bezier(.2,.7,.3,1)",
          }}
        />
      </div>
      <p className="text-text-muted m-0 text-[11.5px] leading-[1.4]">{medidor.nota}</p>
    </div>
  );
}
