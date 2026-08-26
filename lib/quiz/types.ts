export type Screen =
  | "hero"
  | "identificacao"
  | "objetivo"
  | "afirmacao"
  | "perfil"
  | "compromisso"
  | "atrito"
  | "analise"
  | "resultado"
  | "prova"
  | "captura"
  | "confirmacao";

export type Mode = "fundador" | "espera";

export type Likert = 1 | 2 | 3 | 4 | 5;

export type Compromisso = "topo" | "nao";

export type Answers = {
  identificacao: string | null;
  objetivo: string | null;
  afirmacao: Likert | null;
  tempoTreino: string | null;
  tempoDia: string | null;
  compromisso: Compromisso | null;
  nome: string;
  whats: string;
};

export type QuizState = {
  screen: Screen;
  mode: Mode;
  answers: Answers;
  whatsTouched: boolean;
  analysisMs: number;
};

/** Só isto é persistido — `whatsTouched` e `analysisMs` são efêmeros. */
export type PersistedState = Pick<QuizState, "screen" | "mode" | "answers">;

export const EMPTY_ANSWERS: Answers = {
  identificacao: null,
  objetivo: null,
  afirmacao: null,
  tempoTreino: null,
  tempoDia: null,
  compromisso: null,
  nome: "",
  whats: "",
};

export const INITIAL_STATE: QuizState = {
  screen: "hero",
  mode: "fundador",
  answers: { ...EMPTY_ANSWERS },
  whatsTouched: false,
  analysisMs: 0,
};
