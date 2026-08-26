import { STEP_NUM } from "./content";
import { isPhoneValid } from "./phone";
import {
  INITIAL_STATE,
  EMPTY_ANSWERS,
  type Answers,
  type Mode,
  type PersistedState,
  type QuizState,
  type Screen,
} from "./types";

export type QuizAction =
  | { type: "restore"; payload: PersistedState }
  | { type: "setAnswer"; key: keyof Answers; value: Answers[keyof Answers] }
  | { type: "goto"; screen: Screen; mode?: Mode }
  | { type: "back" }
  | { type: "next" }
  | { type: "tick"; ms: number }
  | { type: "touchWhats" }
  | { type: "restart" };

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "restore":
      return { ...state, ...action.payload };

    case "setAnswer":
      return {
        ...state,
        answers: { ...state.answers, [action.key]: action.value },
      };

    case "goto":
      return {
        ...state,
        screen: action.screen,
        mode: action.mode ?? state.mode,
        analysisMs: 0,
      };

    case "back":
      return { ...state, screen: prevScreen(state), analysisMs: 0 };

    case "next":
      if (!canAdvance(state)) return state;
      return { ...state, screen: nextScreen(state), analysisMs: 0 };

    case "tick":
      return { ...state, analysisMs: action.ms };

    case "touchWhats":
      return { ...state, whatsTouched: true };

    case "restart":
      return { ...INITIAL_STATE, answers: { ...EMPTY_ANSWERS } };

    default:
      return state;
  }
}

const FORWARD: Partial<Record<Screen, Screen>> = {
  hero: "identificacao",
  identificacao: "objetivo",
  objetivo: "afirmacao",
  afirmacao: "perfil",
  perfil: "compromisso",
  resultado: "captura",
  captura: "confirmacao",
};

const BACKWARD: Partial<Record<Screen, Screen>> = {
  identificacao: "hero",
  objetivo: "identificacao",
  afirmacao: "objetivo",
  perfil: "afirmacao",
  compromisso: "perfil",
  atrito: "compromisso",
};

export function nextScreen(state: QuizState): Screen {
  if (state.screen === "compromisso") {
    return state.answers.compromisso === "nao" ? "atrito" : "analise";
  }
  return FORWARD[state.screen] ?? state.screen;
}

export function prevScreen(state: QuizState): Screen {
  // Quem entrou pela lista de espera não passou pela análise nem pelo resultado.
  if (state.screen === "captura") {
    return state.mode === "espera" ? "atrito" : "resultado";
  }
  return BACKWARD[state.screen] ?? "hero";
}

/** O CTA fica desabilitado até haver resposta válida na tela atual. */
export function canAdvance(state: QuizState): boolean {
  const a = state.answers;
  switch (state.screen) {
    case "identificacao":
      return !!a.identificacao;
    case "objetivo":
      return !!a.objetivo;
    case "afirmacao":
      return !!a.afirmacao;
    case "perfil":
      return !!a.tempoTreino && !!a.tempoDia;
    case "compromisso":
      return !!a.compromisso;
    case "captura":
      return a.nome.trim().length > 1 && isPhoneValid(a.whats);
    default:
      return true;
  }
}

export function showTopBar(screen: Screen): boolean {
  return (
    screen !== "hero" &&
    screen !== "analise" &&
    screen !== "resultado" &&
    screen !== "confirmacao"
  );
}

export function showCta(screen: Screen): boolean {
  return (
    screen !== "hero" &&
    screen !== "atrito" &&
    screen !== "analise" &&
    screen !== "confirmacao"
  );
}

export function stepNumber(screen: Screen): number {
  return STEP_NUM[screen] ?? 0;
}

export function ctaLabel(state: QuizState): string {
  if (state.screen === "resultado") return "Quero minha vaga";
  if (state.screen !== "captura") return "Continuar";
  return state.mode === "espera" ? "Entrar na lista de espera" : "Confirmar minha vaga";
}

export function toPersisted(state: QuizState): PersistedState {
  return { screen: state.screen, mode: state.mode, answers: state.answers };
}
