import type { ReactNode } from "react";

/**
 * Tela de passo: conteúdo centralizado verticalmente com `margin: auto 0`
 * (e não `justify-content: center`, que cortaria conteúdo alto em telas baixas).
 */
export function StepScreen({ children }: { children: ReactNode }) {
  return (
    <div className="screen-in flex flex-1 px-5 pt-3 pb-4">
      <div className="my-auto w-full">{children}</div>
    </div>
  );
}

/** Tela de momento: hero, atrito, análise e confirmação. */
export function MomentScreen({
  children,
  className = "",
  padding = "py-[34px] px-6",
}: {
  children: ReactNode;
  className?: string;
  padding?: string;
}) {
  return (
    <div
      className={`screen-in-slow relative flex flex-1 flex-col justify-center ${padding} ${className}`}
    >
      {children}
    </div>
  );
}
