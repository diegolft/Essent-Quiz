import { C } from "@/lib/quiz/tokens";

/** Proporções do ícone oficial: duas barras, a menor com 2/3 da altura, centradas. */
const VIEW_W = 184;
const VIEW_H = 250;

/**
 * Símbolo da Essent. A altura manda; a largura acompanha a proporção do ícone.
 */
export function EssentMark({ height = 19 }: { height?: number }) {
  return (
    <svg
      width={(height * VIEW_W) / VIEW_H}
      height={height}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="72" height="250" rx="36" fill={C.orange} />
      <rect x="112" y="42" width="72" height="166" rx="36" fill={C.orange} />
    </svg>
  );
}

/** Símbolo + wordmark, como aparece no hero e no topo do resultado. */
export function EssentLogo({
  markHeight = 19,
  wordSize = 17,
}: {
  markHeight?: number;
  wordSize?: number;
}) {
  return (
    <div className="inline-flex items-center gap-[7px]">
      <EssentMark height={markHeight} />
      <span
        className="font-condensed font-extrabold tracking-[0.18em] text-white"
        style={{ fontSize: wordSize }}
      >
        ESSENT
      </span>
    </div>
  );
}
