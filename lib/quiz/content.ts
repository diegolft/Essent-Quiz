import type { Icon } from "@phosphor-icons/react";
import {
  ArrowCounterClockwise,
  Barbell,
  Flame,
  Gauge,
  Prohibit,
  Scales,
  Target,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr";

import { P, type Hue } from "./tokens";
import type { Compromisso, Likert, Screen } from "./types";

/** Valores ajustáveis do protótipo, agora props/config do app. */
export const config = {
  vagas: 50,
  dias: 7,
  autoAdvance: true,
  /** Prova social da tela de depoimentos. Conferir o número real antes de publicar. */
  alunos: 120,
};

export type ProvaPrint = {
  id: string;
  /** Caminho do print em /public. `null` mantém o placeholder na tela. */
  src: string | null;
  alt: string;
};

/** Prints de WhatsApp dos alunos da consultoria. Trocar `src` quando chegarem. */
export const PROVA_PRINTS: ProvaPrint[] = [
  { id: "print-1", src: null, alt: "Aluno falando sobre o acompanhamento de perto" },
  { id: "print-2", src: null, alt: "Aluno contando o resultado depois de meses travado" },
  { id: "print-3", src: null, alt: "Aluno comentando a migração pro grupo fundador" },
];

export const ANALYSIS_MS = 6000;
/** O contador chega a 100% um pouco antes do fim, pra não travar em 99. */
export const ANALYSIS_PCT_MS = ANALYSIS_MS - 400;
export const AUTO_ADVANCE_MS = 380;
export const STORAGE_KEY = "essent-quiz-v1";

export type IdentificacaoOption = {
  id: string;
  label: string;
  icon: Icon;
  hue: Hue;
};

export const IDENTIFICACAO_OPTS: IdentificacaoOption[] = [
  {
    id: "sem_plano",
    label: "Treino sem plano, sem saber se avanço",
    icon: ArrowCounterClockwise,
    hue: P.cyan,
  },
  {
    id: "sem_sustentar",
    label: "Já tentei dieta várias vezes e não sustento",
    icon: Scales,
    hue: P.violet,
  },
  { id: "travado", label: "Tenho resultado, mas travei", icon: Gauge, hue: P.amber },
  { id: "nunca_comecei", label: "Nunca comecei de verdade", icon: Prohibit, hue: P.pink },
];

export type ObjetivoOption = {
  id: string;
  label: string;
  hint: string;
  icon: Icon;
  hue: Hue;
  photo: string;
  /** Faixa larga do topo da tela de resultado — outra foto, porque o recorte é outro. */
  heroPhoto: string;
  heroAlt: string;
  alt: string;
};

/** Fotos de referência (Unsplash). Trocar pelos assets definitivos do app. */
const unsplash = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80`;

/** Miniatura do card de opção. */
const thumb = (id: string) => unsplash(id, 228, 228);

/** Faixa larga usada como topo da tela de resultado. */
const hero = (id: string) => unsplash(id, 860, 420);

export const OBJETIVO_OPTS: ObjetivoOption[] = [
  {
    id: "emagrecimento",
    label: "Emagrecimento",
    hint: "Perder peso e manter",
    icon: Flame,
    hue: P.orange,
    photo: thumb("1571019613454-1cb2f99b2d8b"),
    heroPhoto: hero("1550345332-09e3ac987658"),
    heroAlt: "Mulher em esforço numa academia, luz dura em preto e branco",
    alt: "Pessoa treinando no chão de um estúdio",
  },
  {
    id: "hipertrofia",
    label: "Hipertrofia",
    hint: "Ganhar massa",
    icon: Barbell,
    hue: P.cyan,
    photo: thumb("1517836357463-d25dfeac3438"),
    heroPhoto: hero("1581009146145-b5ef050c2e1e"),
    heroAlt: "Homem executando uma série pesada com barra",
    alt: "Pessoa se posicionando para levantar uma barra",
  },
  {
    id: "recomposicao",
    label: "Recomposição corporal",
    hint: "Trocar gordura por músculo",
    icon: TrendUp,
    hue: P.mint,
    photo: thumb("1526506118085-60ce8714f8c5"),
    heroPhoto: hero("1583454110551-21f2fa2afe61"),
    heroAlt: "Mãos segurando halteres num rack, veias em tensão",
    alt: "Costas definidas de uma pessoa em barra fixa",
  },
  {
    id: "performance",
    label: "Performance / condicionamento",
    hint: "Render e durar mais",
    icon: Target,
    hue: P.violet,
    photo: thumb("1552674605-db6ffd4facb5"),
    heroPhoto: hero("1552674605-db6ffd4facb5"),
    heroAlt: "Corredores em silhueta contra o sol",
    alt: "Corredores em silhueta contra o céu",
  },
];

export const TEMPO_TREINO_OPTS = [
  "Nunca treinei",
  "Até 6 meses",
  "6 meses a 2 anos",
  "Mais de 2 anos",
];

export const TEMPO_DIA_OPTS = ["Até 15 min", "15 a 30 min", "30 a 60 min", "Mais de 1h"];

export const LIKERT_VALUES: Likert[] = [1, 2, 3, 4, 5];
export const LIKERT_HUES: Hue[] = [P.pink, P.violet, P.cyan, P.mint, P.amber];

/** Uma cor por passo, na ordem da barra de progresso. */
export const SEGMENT_HUES: Hue[] = [P.orange, P.amber, P.mint, P.cyan, P.violet, P.pink];

export const ANALYSIS_STEPS: { label: string; hue: Hue }[] = [
  { label: "Cruzando suas respostas", hue: P.orange },
  { label: "Lendo seu ponto de partida", hue: P.amber },
  { label: "Calibrando volume de treino", hue: P.mint },
  { label: "Ajustando o ritmo da dieta", hue: P.cyan },
  { label: "Montando sua rota de 30 dias", hue: P.violet },
];

/** Gancho de copy derivado do objetivo escolhido no passo 2. */
const OBJETIVO_GANCHO: Record<string, string> = {
  emagrecimento: "emagrecer sem regredir em 3 semanas",
  hipertrofia: "travar de vez a hipertrofia",
  recomposicao: "recompor o corpo com constância",
  performance: "destravar sua performance",
};

export function ganchoDe(objetivo: string | null): string {
  return (objetivo && OBJETIVO_GANCHO[objetivo]) || "destravar seu resultado";
}

export function primeiroNome(nome: string): string {
  return nome.trim().split(" ")[0] || "Fera";
}

/** Passo exibido na barra de topo. Prova congela em 4 e atrito em 5. */
export const STEP_NUM: Partial<Record<Screen, number>> = {
  identificacao: 1,
  objetivo: 2,
  afirmacao: 3,
  perfil: 4,
  prova: 4,
  compromisso: 5,
  atrito: 5,
  captura: 6,
};

export const COMPROMISSO_LABELS: Record<Compromisso, string> = {
  topo: "Topo — quero levar a sério",
  nao: "Não é pra mim agora",
};
