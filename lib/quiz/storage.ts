import { EMPTY_ANSWERS, type PersistedState } from "./types";
import { STORAGE_KEY } from "./content";

/**
 * Lê o progresso salvo. A análise nunca é restaurada pelo meio — quem recarrega
 * durante ela volta para o compromisso.
 */
export function loadState(): PersistedState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object" || !saved.answers) return null;
    return {
      screen: saved.screen === "analise" ? "compromisso" : saved.screen || "hero",
      mode: saved.mode === "espera" ? "espera" : "fundador",
      answers: { ...EMPTY_ANSWERS, ...saved.answers },
    };
  } catch {
    return null;
  }
}

export function saveState(state: PersistedState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage indisponível: o quiz segue funcionando sem persistir */
  }
}

export function clearState(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* idem */
  }
}
