import { ganchoDe } from "./content";
import { P, type Hue } from "./tokens";
import type { Answers } from "./types";

export type Medidor = {
  /** Chave da dimensão, usada pra escolher o texto do gargalo. */
  key: "consistencia" | "tempo" | "base";
  label: string;
  /** O que aparece à direita: o percentual ou a própria resposta dele. */
  valor: string;
  pct: number;
  hue: Hue;
  nota: string;
};

export type Diagnostico = {
  perfilTitulo: string;
  perfilTexto: string;
  medidores: Medidor[];
  gargalo: Medidor;
  gargaloTitulo: string;
  gargaloTexto: string;
  fechamento: string;
};

/** O perfil é a dor que ele mesmo escolheu no passo 1. */
const PERFIS: Record<string, { titulo: string; texto: string }> = {
  sem_plano: {
    titulo: "Você tá no esforço sem direção.",
    texto:
      "Treinar, você treina. O que falta é saber se o que você faz hoje te leva a algum lugar — e isso não se resolve com mais treino, se resolve com plano.",
  },
  sem_sustentar: {
    titulo: "Você tá no ciclo do recomeço.",
    texto:
      "Não é falta de esforço. Você já provou que consegue começar — três, quatro vezes. O que nunca teve foi alguém segurando o plano com você depois da segunda semana.",
  },
  travado: {
    titulo: "Você tá num platô.",
    texto:
      "Você já fez a parte difícil: saiu do zero. Só que platô não quebra repetindo o que funcionou antes — quebra ajustando o que mudou em você desde então.",
  },
  nunca_comecei: {
    titulo: "Você tá na largada adiada.",
    texto:
      "Nunca começar de verdade não é preguiça. É não ter um primeiro passo pequeno o suficiente pra caber na sua semana real.",
  },
};

const PERFIL_PADRAO = {
  titulo: "Você tá pronto pra sair do lugar.",
  texto:
    "Pelo que você respondeu, o que falta não é vontade — é um plano que caiba na sua rotina e alguém acompanhando de perto.",
};

/**
 * A afirmação do passo 3 é negativa ("sei o que fazer, mas não consigo manter
 * consistência"), então concordar muito significa consistência baixa.
 */
function medidorConsistencia(afirmacao: number | null, identificacao: string | null): Medidor {
  const nota = afirmacao ?? 3;
  const pct = (6 - nota) * 20;
  const hue = pct <= 40 ? P.pink : pct <= 60 ? P.amber : P.mint;

  // Quem nunca começou não tem rotina pra sustentar: seria acusar de um vício que ele não tem.
  const texto =
    identificacao === "nunca_comecei" && pct <= 60
      ? "sem rotina fixa ainda — é ponto de partida, não defeito"
      : pct <= 40
        ? "você mesmo disse: sabe o que fazer, mas não sustenta"
        : pct <= 60
          ? "vai bem por um tempo e depois escapa"
          : "você sustenta o que começa — falta direcionar";

  return { key: "consistencia", label: "Consistência hoje", valor: `${pct}%`, pct, hue, nota: texto };
}

const TEMPO_DIA: Record<string, { pct: number; nota: string }> = {
  "Até 15 min": { pct: 25, nota: "pouco, mas suficiente se cada minuto tiver função" },
  "15 a 30 min": { pct: 50, nota: "dá pra montar a semana inteira nessa janela" },
  "30 a 60 min": { pct: 75, nota: "espaço de sobra pra progressão" },
  "Mais de 1h": { pct: 100, nota: "tempo não é o seu limite" },
};

const TEMPO_TREINO: Record<string, { pct: number; nota: string }> = {
  "Nunca treinei": { pct: 15, nota: "começar do zero é vantagem: nenhum vício pra desfazer" },
  "Até 6 meses": { pct: 40, nota: "cedo o bastante pra corrigir execução sem trauma" },
  "6 meses a 2 anos": { pct: 70, nota: "base sólida, dá pra puxar mais" },
  "Mais de 2 anos": { pct: 95, nota: "experiência é o que você tem de sobra" },
};

/** Prioridade em caso de empate: consistência pesa mais que tempo, tempo mais que base. */
const PRIORIDADE: Medidor["key"][] = ["consistencia", "tempo", "base"];

function menorMedidor(medidores: Medidor[]): Medidor {
  return medidores.reduce((menor, atual) => {
    if (atual.pct < menor.pct) return atual;
    if (atual.pct > menor.pct) return menor;
    return PRIORIDADE.indexOf(atual.key) < PRIORIDADE.indexOf(menor.key) ? atual : menor;
  });
}

function textoGargalo(gargalo: Medidor, answers: Answers): { titulo: string; texto: string } {
  switch (gargalo.key) {
    case "consistencia":
      return {
        titulo: "Seu gargalo: consistência",
        texto:
          "Seu problema não é conhecimento — é não ter ninguém do lado nos primeiros 30 dias. É exatamente isso que o grupo fundador faz.",
      };
    case "tempo":
      return {
        titulo: "Seu gargalo: tempo",
        texto: `Com ${(answers.tempoDia ?? "o tempo que você tem").toLowerCase()} por dia dá pra ir longe — desde que cada minuto esteja no lugar certo. Montar essa semana é o nosso trabalho.`,
      };
    case "base":
      return {
        titulo: "Seu gargalo: base",
        texto:
          "Começar sozinho é onde a maioria trava. Trinta dias acompanhado de perto valem mais que os seis meses seguintes no escuro.",
      };
  }
}

/**
 * Monta o diagnóstico a partir das respostas. Nenhum número é inventado: todos
 * saem direto do que o usuário respondeu nos passos 3, 4 e 5.
 */
export function diagnosticar(answers: Answers): Diagnostico {
  const perfil = (answers.identificacao && PERFIS[answers.identificacao]) || PERFIL_PADRAO;

  const dia = TEMPO_DIA[answers.tempoDia ?? ""] ?? { pct: 50, nota: "dá pra trabalhar com isso" };
  const treino = TEMPO_TREINO[answers.tempoTreino ?? ""] ?? {
    pct: 50,
    nota: "base suficiente pra avançar",
  };

  const medidores: Medidor[] = [
    medidorConsistencia(answers.afirmacao, answers.identificacao),
    {
      key: "tempo",
      label: "Tempo por dia",
      valor: answers.tempoDia ?? "—",
      pct: dia.pct,
      hue: P.cyan,
      nota: dia.nota,
    },
    {
      key: "base",
      label: "Base de treino",
      valor: answers.tempoTreino ?? "—",
      pct: treino.pct,
      hue: P.violet,
      nota: treino.nota,
    },
  ];

  const gargalo = menorMedidor(medidores);
  const { titulo, texto } = textoGargalo(gargalo, answers);

  return {
    perfilTitulo: perfil.titulo,
    perfilTexto: perfil.texto,
    medidores,
    gargalo,
    gargaloTitulo: titulo,
    gargaloTexto: texto,
    fechamento: `Com esse perfil, ${ganchoDe(answers.objetivo)} é método, não força de vontade.`,
  };
}
