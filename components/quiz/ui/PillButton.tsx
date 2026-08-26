"use client";

import type { ReactNode } from "react";

/** Botão pill primário — o CTA laranja da marca. */
export function PrimaryPill({
  children,
  onClick,
  disabled = false,
  className = "",
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-full px-5 py-[17px] text-[15px] font-extrabold tracking-[0.01em] transition-transform duration-[120ms] ${
        disabled
          ? "bg-line-soft text-text-muted cursor-default"
          : "cta-gradient text-on-orange cursor-pointer hover:-translate-y-px active:translate-y-px"
      } ${className}`}
    >
      {children}
    </button>
  );
}

/** Botão pill secundário, em contorno. */
export function OutlinePill({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-line text-text-secondary w-full cursor-pointer rounded-full border-[1.5px] bg-transparent px-5 py-4 text-[14px] font-bold transition-all duration-150 hover:border-[#4a4038] hover:text-white ${className}`}
    >
      {children}
    </button>
  );
}
