"use client";

import { PrimaryPill } from "./ui/PillButton";

export function CtaBar({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <div className="shrink-0 px-5 pt-3.5 pb-[22px]">
      <PrimaryPill onClick={onClick} disabled={disabled}>
        {label}
      </PrimaryPill>
    </div>
  );
}
