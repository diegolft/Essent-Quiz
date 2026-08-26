/** Tokens base do handoff. */
export const C = {
  void: "#0c0c0e",
  panel: "#17140f",
  panelSoft: "#1c1712",
  border: "#332a20",
  borderSoft: "#241f19",
  white: "#ffffff",
  textSecondary: "#c9c9c0",
  textMuted: "#8a857b",
  onOrange: "#2b0f04",
  ink: "#0e1214",
  orange: "#ff5a2e",
  orangeLight: "#ff7a45",
} as const;

/** Paleta de apoio. Cada cor é atribuída a um item e se repete de forma consistente. */
export const P = {
  orange: "#ff5a2e",
  amber: "#f7b32b",
  mint: "#35d6a4",
  cyan: "#38bdf8",
  violet: "#a78bfa",
  pink: "#f472b6",
} as const;

export type Hue = (typeof P)[keyof typeof P];

const RGB: Record<string, string> = {
  "#ff5a2e": "255,90,46",
  "#f7b32b": "247,179,43",
  "#35d6a4": "53,214,164",
  "#38bdf8": "56,189,248",
  "#a78bfa": "167,139,250",
  "#f472b6": "244,114,182",
};

/** Fundo tintado de item selecionado: a cor do item numa opacidade baixa. */
export function tint(hex: string, alpha: number): string {
  return `rgba(${RGB[hex] ?? "255,255,255"},${alpha})`;
}

export const CTA_GRADIENT = `linear-gradient(180deg, ${C.orangeLight} 0%, ${C.orange} 100%)`;
export const MULTI_GRADIENT =
  "linear-gradient(90deg, #ff5a2e, #f7b32b, #35d6a4, #38bdf8, #a78bfa)";
