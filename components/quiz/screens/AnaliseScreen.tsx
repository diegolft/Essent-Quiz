"use client";

import { Check } from "@phosphor-icons/react/dist/ssr";

import { ANALYSIS_MS, ANALYSIS_PCT_MS, ANALYSIS_STEPS } from "@/lib/quiz/content";
import { C } from "@/lib/quiz/tokens";
import { Eyebrow, Headline } from "../ui/Typography";

/** Cada etapa ocupa uma fatia igual, com uma folga no fim pra tudo fechar concluído. */
const STEP_DURATION = (ANALYSIS_MS - 700) / ANALYSIS_STEPS.length;

export function AnaliseScreen({ ms }: { ms: number }) {
  const pct = Math.min(100, Math.round((ms / ANALYSIS_PCT_MS) * 100));

  return (
    <div className="screen-in relative flex flex-1 flex-col justify-center overflow-hidden px-6 py-7">
      <div className="analysis-halo pointer-events-none absolute top-[6%] left-[-30%] h-[46%] w-[160%] rounded-[50%] opacity-[0.42]" />

      <div className="relative flex flex-col items-center">
        <div className="relative mb-[30px] flex h-[176px] w-[176px] items-center justify-center">
          <div
            className="ring-outer absolute inset-0 rounded-full border-2 border-white/5"
            style={{ borderTopColor: "#38bdf8", borderRightColor: "#38bdf8" }}
          />
          <div
            className="ring-mid absolute inset-[20px] rounded-full border-2 border-white/5"
            style={{ borderBottomColor: "#a78bfa", borderLeftColor: "#a78bfa" }}
          />
          <div
            className="ring-inner absolute inset-[40px] rounded-full border-2 border-white/5"
            style={{ borderTopColor: "#35d6a4" }}
          />
          <div className="ring-core absolute inset-[58px] rounded-full" />
          <div className="relative text-center">
            <div className="font-condensed text-[44px] leading-none font-extrabold tracking-[-0.01em] text-white">
              {pct}%
            </div>
            <div className="text-text-muted mt-1 text-[10px] font-bold tracking-[0.18em] uppercase">
              Analisado
            </div>
          </div>
        </div>

        <div className="mb-[26px] w-full text-center">
          <Eyebrow color="#38bdf8" className="mb-2">
            Análise em curso
          </Eyebrow>
          <Headline>Montando seu perfil.</Headline>
        </div>

        <div className="flex w-full flex-col gap-3">
          {ANALYSIS_STEPS.map((step, i) => {
            const done = ms >= (i + 1) * STEP_DURATION;
            const active = !done && ms >= i * STEP_DURATION;
            return (
              <div
                key={step.label}
                className="flex items-center gap-[11px] transition-opacity duration-[350ms]"
                style={{ opacity: done || active ? 1 : 0.3 }}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    active ? "dot-blip" : ""
                  }`}
                  style={{
                    borderColor: done || active ? step.hue : C.border,
                    background: done ? step.hue : "transparent",
                  }}
                >
                  <Check
                    size={11}
                    weight="duotone"
                    color={done ? C.ink : "transparent"}
                  />
                </span>
                <span
                  className="text-[13.5px] font-semibold"
                  style={{ color: done || active ? C.white : C.textMuted }}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="bg-line-soft mt-[30px] h-1 w-full overflow-hidden rounded-full">
          <div
            className="multi-gradient h-full rounded-full transition-[width] duration-[120ms] ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
