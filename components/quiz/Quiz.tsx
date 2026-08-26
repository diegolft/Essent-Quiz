"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";

import {
  ANALYSIS_MS,
  AUTO_ADVANCE_MS,
  config,
} from "@/lib/quiz/content";
import { isPhoneValid, maskPhone, phoneDigits } from "@/lib/quiz/phone";
import {
  canAdvance,
  ctaLabel,
  quizReducer,
  showCta,
  showTopBar,
  stepNumber,
  toPersisted,
} from "@/lib/quiz/reducer";
import { clearState, loadState, saveState } from "@/lib/quiz/storage";
import { INITIAL_STATE, type Answers, type Compromisso, type Likert, type Mode, type Screen } from "@/lib/quiz/types";

import { CtaBar } from "./CtaBar";
import { TopBar } from "./TopBar";
import { AfirmacaoScreen } from "./screens/AfirmacaoScreen";
import { AnaliseScreen } from "./screens/AnaliseScreen";
import { AtritoScreen } from "./screens/AtritoScreen";
import { CapturaScreen } from "./screens/CapturaScreen";
import { CompromissoScreen } from "./screens/CompromissoScreen";
import { ConfirmacaoScreen } from "./screens/ConfirmacaoScreen";
import { HeroScreen } from "./screens/HeroScreen";
import { IdentificacaoScreen } from "./screens/IdentificacaoScreen";
import { ObjetivoScreen } from "./screens/ObjetivoScreen";
import { PerfilScreen } from "./screens/PerfilScreen";
import { ProvaScreen } from "./screens/ProvaScreen";
import { ResultadoScreen } from "./screens/ResultadoScreen";

export function Quiz() {
  const [state, dispatch] = useReducer(quizReducer, INITIAL_STATE);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const analysisTick = useRef<ReturnType<typeof setInterval> | null>(null);
  const restored = useRef(false);

  const stopTimers = useCallback(() => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    if (analysisTick.current) clearInterval(analysisTick.current);
    advanceTimer.current = null;
    analysisTick.current = null;
  }, []);

  // Restaura o progresso salvo só depois da montagem, pra não divergir do HTML do servidor.
  useEffect(() => {
    const saved = loadState();
    if (saved) dispatch({ type: "restore", payload: saved });
  }, []);

  // Pula a primeira passada: nela o estado ainda é o inicial e sobrescreveria o salvo.
  useEffect(() => {
    if (!restored.current) {
      restored.current = true;
      return;
    }
    saveState(toPersisted(state));
  }, [state]);

  useEffect(() => stopTimers, [stopTimers]);

  // A análise roda por tempo real, não por contagem de ticks.
  useEffect(() => {
    if (state.screen !== "analise") return;
    const start = Date.now();
    analysisTick.current = setInterval(() => {
      const ms = Date.now() - start;
      if (ms >= ANALYSIS_MS) {
        if (analysisTick.current) clearInterval(analysisTick.current);
        analysisTick.current = null;
        dispatch({ type: "goto", screen: "resultado" });
      } else {
        dispatch({ type: "tick", ms });
      }
    }, 60);
    return () => {
      if (analysisTick.current) clearInterval(analysisTick.current);
      analysisTick.current = null;
    };
  }, [state.screen]);

  const goto = useCallback(
    (screen: Screen, mode?: Mode) => {
      stopTimers();
      dispatch({ type: "goto", screen, mode });
    },
    [stopTimers],
  );

  const setAnswer = useCallback(
    <K extends keyof Answers>(key: K, value: Answers[K]) => {
      dispatch({ type: "setAnswer", key, value });
    },
    [],
  );

  /** Seleção que dispara auto-avanço depois de um respiro pra ver o estado selecionado. */
  const select = useCallback(
    <K extends keyof Answers>(key: K, value: Answers[K], advanceTo: Screen, mode?: Mode) => {
      setAnswer(key, value);
      if (!config.autoAdvance) return;
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(() => goto(advanceTo, mode), AUTO_ADVANCE_MS);
    },
    [goto, setAnswer],
  );

  const onBack = useCallback(() => {
    stopTimers();
    dispatch({ type: "back" });
  }, [stopTimers]);

  const onNext = useCallback(() => {
    stopTimers();
    dispatch({ type: "next" });
  }, [stopTimers]);

  const onRestart = useCallback(() => {
    stopTimers();
    clearState();
    dispatch({ type: "restart" });
  }, [stopTimers]);

  const { screen, mode, answers } = state;
  // O erro só aparece depois do primeiro blur e só se o campo não estiver vazio.
  const whatsError =
    state.whatsTouched &&
    phoneDigits(answers.whats).length > 0 &&
    !isPhoneValid(answers.whats);

  return (
    <main className="bg-void flex min-h-full flex-1 justify-center">
      <div className="bg-void relative flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden">
        {showTopBar(screen) && <TopBar step={stepNumber(screen)} onBack={onBack} />}

        <div className="flex flex-1 flex-col overflow-y-auto">
          {screen === "hero" && <HeroScreen onStart={onNext} />}

          {screen === "identificacao" && (
            <IdentificacaoScreen
              value={answers.identificacao}
              onSelect={(id) => select("identificacao", id, "objetivo")}
            />
          )}

          {screen === "objetivo" && (
            <ObjetivoScreen
              value={answers.objetivo}
              onSelect={(id) => select("objetivo", id, "afirmacao")}
            />
          )}

          {screen === "afirmacao" && (
            <AfirmacaoScreen
              value={answers.afirmacao}
              onSelect={(v: Likert) => select("afirmacao", v, "perfil")}
            />
          )}

          {screen === "perfil" && (
            <PerfilScreen
              tempoTreino={answers.tempoTreino}
              tempoDia={answers.tempoDia}
              onTempoTreino={(v) => setAnswer("tempoTreino", v)}
              onTempoDia={(v) => setAnswer("tempoDia", v)}
            />
          )}

          {screen === "compromisso" && (
            <CompromissoScreen
              value={answers.compromisso}
              onSelect={(v: Compromisso) =>
                v === "topo"
                  ? select("compromisso", v, "analise", "fundador")
                  : select("compromisso", v, "atrito")
              }
            />
          )}

          {screen === "atrito" && (
            <AtritoScreen
              onReconsider={() => {
                setAnswer("compromisso", "topo");
                goto("analise", "fundador");
              }}
              onWaitlist={() => goto("captura", "espera")}
            />
          )}

          {screen === "analise" && <AnaliseScreen ms={state.analysisMs} />}

          {screen === "resultado" && <ResultadoScreen answers={answers} />}

          {screen === "prova" && <ProvaScreen />}

          {screen === "captura" && (
            <CapturaScreen
              mode={mode}
              objetivo={answers.objetivo}
              nome={answers.nome}
              whats={answers.whats}
              showError={whatsError}
              onNome={(v) => setAnswer("nome", v)}
              onWhats={(v) => setAnswer("whats", maskPhone(v))}
              onWhatsBlur={() => dispatch({ type: "touchWhats" })}
            />
          )}

          {screen === "confirmacao" && (
            <ConfirmacaoScreen
              mode={mode}
              nome={answers.nome}
              objetivo={answers.objetivo}
              onRestart={onRestart}
            />
          )}
        </div>

        {showCta(screen) && (
          <CtaBar
            label={ctaLabel(state)}
            disabled={!canAdvance(state)}
            onClick={onNext}
          />
        )}
      </div>
    </main>
  );
}
