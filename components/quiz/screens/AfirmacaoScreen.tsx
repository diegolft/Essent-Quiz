"use client";

import { LikertScale } from "../ui/LikertScale";
import { StepScreen } from "../ui/ScreenLayout";
import { Eyebrow } from "../ui/Typography";
import type { Likert } from "@/lib/quiz/types";

export function AfirmacaoScreen({
  value,
  onSelect,
}: {
  value: Likert | null;
  onSelect: (v: Likert) => void;
}) {
  return (
    <StepScreen>
      <Eyebrow className="mb-3.5">Autoavaliação</Eyebrow>

      <div className="mb-2.5 flex gap-3.5">
        <div
          className="w-0.5 shrink-0 rounded-[2px]"
          style={{
            background: "linear-gradient(180deg, #f472b6 0%, #38bdf8 50%, #f7b32b 100%)",
          }}
        />
        {/* Única headline não condensada e fora de caixa alta. */}
        <h1
          className="m-0 text-[22px] leading-[1.3] font-medium text-white italic"
          style={{ textWrap: "pretty" }}
        >
          “Sei o que fazer, mas não consigo manter consistência.”
        </h1>
      </div>
      <p className="text-text-muted m-0 mb-[30px] ml-[22px] text-[13.5px]">
        O quanto isso é você?
      </p>

      <LikertScale value={value} onSelect={onSelect} />

      <div className="text-text-muted flex justify-between px-0.5 text-[10.5px] tracking-[0.03em]">
        <span>Discordo totalmente</span>
        <span>Concordo totalmente</span>
      </div>
    </StepScreen>
  );
}
