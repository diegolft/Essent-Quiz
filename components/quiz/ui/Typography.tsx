import type { ReactNode } from "react";

import { C } from "@/lib/quiz/tokens";

export function Eyebrow({
  children,
  color = C.orangeLight,
  className = "mb-2.5",
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`text-[11px] font-bold tracking-[0.15em] uppercase ${className}`}
      style={{ color }}
    >
      {children}
    </div>
  );
}

/** Headline condensada em caixa alta — o padrão das telas. */
export function Headline({
  children,
  size = 32,
  className = "",
}: {
  children: ReactNode;
  size?: 32 | 38 | 42;
  className?: string;
}) {
  const lineHeight = size === 32 ? 1.02 : size === 38 ? 0.99 : 0.98;
  return (
    <h1
      className={`font-condensed m-0 font-extrabold text-white uppercase ${className}`}
      style={{
        fontSize: size,
        lineHeight,
        letterSpacing: size === 42 ? "-0.005em" : undefined,
        textWrap: size === 32 ? undefined : "balance",
      }}
    >
      {children}
    </h1>
  );
}

export function Body({
  children,
  className = "",
  muted = false,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <p
      className={`m-0 text-[14px] leading-[1.55] ${muted ? "text-text-muted" : "text-text-secondary"} ${className}`}
      style={{ textWrap: "pretty" }}
    >
      {children}
    </p>
  );
}
