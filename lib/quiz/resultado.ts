import { OBJETIVO_OPTS } from "./content";
import { C, P } from "./tokens";
import type { Answers } from "./types";

export type Metrica = {
  label: string;
  /** Percentual, no caso da consistência; a própria resposta dele nas outras. */
  valor: string;
  nota: string;
  /** Cor do valor: verde quando está a favor dele, laranja quando pesa contra. */
  hue: string;
};

/** Posição do usuário na escala de travamento, com a faixa em que ela cai. */
export type Nivel = {
  pct: number;
  label: string;
  hue: string;
};

export type Diagnostico = {
  headline: string;
  sub: string;
  nivel: Nivel;
  metricas: Metrica[];
  gargaloTitulo: string;
  gargaloTexto: string;
  fecho: string;
  foto: string | null;
  fotoAlt: string;
};

type Veredito = { h: string; s: string };

/** O veredito cruza a dor do passo 1 com o objetivo do passo 2 — 16 combinações. */
const VEREDITO: Record<string, Record<string, Veredito>> = {
  sem_plano: {
    emagrecimento: {
      h: "Você tá treinando no escuro.",
      s: "Treinar sem plano queima tempo, não gordura. Sem medir o que muda, você repete o mesmo mês achando que avançou.",
    },
    hipertrofia: {
      h: "Você tá treinando sem progressão.",
      s: "Músculo responde a carga que sobe. Sem plano, o estímulo fica igual e o corpo não tem motivo pra mudar.",
    },
    recomposicao: {
      h: "Você tá remando pros dois lados.",
      s: "Perder gordura e ganhar músculo ao mesmo tempo é a meta mais técnica que existe. Sem plano, uma parte sempre cancela a outra.",
    },
    performance: {
      h: "Você tá treinando sem alvo.",
      s: "Condicionamento é a soma de sessões que conversam entre si. Sem plano, cada treino recomeça do zero.",
    },
  },
  sem_sustentar: {
    emagrecimento: {
      h: "Você tá no ciclo do recomeço.",
      s: "O problema não foi nenhuma das dietas. Foi que todas exigiam uma vida que não é a sua.",
    },
    hipertrofia: {
      h: "Você treina, mas não come pra crescer.",
      s: "Hipertrofia é o objetivo que exige constância na cozinha antes da academia. É ali que suas tentativas caíram.",
    },
    recomposicao: {
      h: "Você tá trocando de estratégia, não de corpo.",
      s: "Recomposição leva semanas pra aparecer. Cada troca de plano zera o cronômetro.",
    },
    performance: {
      h: "Você começa forte e para no meio.",
      s: "Performance se constrói em bloco, semanas somando. Recomeçar sempre te devolve ao mesmo ponto.",
    },
  },
  travado: {
    emagrecimento: {
      h: "Você tá no platô, não no fim.",
      s: "Peso parado depois de uma fase boa quase nunca é falta de esforço. É o plano que envelheceu.",
    },
    hipertrofia: {
      h: "Você tá repetindo o estímulo que já funcionou.",
      s: "O que te trouxe até aqui é exatamente o que te segura agora. Carga, volume e descanso precisam mudar de lugar.",
    },
    recomposicao: {
      h: "Você tá firme, mas na mesma composição.",
      s: "A balança pode ficar igual enquanto o corpo muda — ou enquanto nada muda. Sem medir, dá no mesmo.",
    },
    performance: {
      h: "Você bateu no teto do método atual.",
      s: "Ritmo, potência e recuperação param juntos quando o treino não é periodizado.",
    },
  },
  nunca_comecei: {
    emagrecimento: {
      h: "Você tá na largada adiada.",
      s: "Nunca começar de verdade não é preguiça. É não ter um primeiro passo pequeno o suficiente pra caber na sua semana real.",
    },
    hipertrofia: {
      h: "Você tá na largada adiada.",
      s: "Nunca começar de verdade não é preguiça. É que ninguém te mostrou como são simples os primeiros meses de quem quer ganhar massa.",
    },
    recomposicao: {
      h: "Você tá na largada adiada.",
      s: "Nunca começar de verdade não é preguiça. É que recomposição parece complexa demais pra quem ainda não deu o primeiro passo.",
    },
    performance: {
      h: "Você tá na largada adiada.",
      s: "Nunca começar de verdade não é preguiça. É não ter um primeiro passo pequeno o suficiente pra caber na sua semana real.",
    },
  },
};

const VEREDITO_PADRAO: Veredito = {
  h: "Seu diagnóstico tá pronto.",
  s: "Pelo que você respondeu, o que falta não é vontade — é um plano que caiba na sua rotina e alguém acompanhando de perto.",
};

/** O gargalo vem da dor escolhida no passo 1. */
const GARGALO: Record<string, { t: string; x: string }> = {
  sem_plano: {
    t: "Seu gargalo: direção",
    x: "Você não precisa treinar mais. Precisa saber se o que fez essa semana te deixou mais perto. Isso é plano, não disciplina.",
  },
  sem_sustentar: {
    t: "Seu gargalo: sustentação",
    x: "Você já provou que consegue começar. O que falta é um plano que sobreviva a uma semana ruim.",
  },
  travado: {
    t: "Seu gargalo: ajuste",
    x: "Quem travou não precisa de mais vontade. Precisa de alguém olhando os números e mexendo na variável certa.",
  },
  nunca_comecei: {
    t: "Seu gargalo: base",
    x: "Começar sozinho é onde a maioria trava. Trinta dias acompanhado de perto valem mais que os seis meses seguintes no escuro.",
  },
};

const GARGALO_PADRAO = {
  t: "Seu gargalo: acompanhamento",
  x: "Trinta dias com alguém olhando o que você faz valem mais que seis meses tentando adivinhar sozinho.",
};

const FECHO: Record<string, string> = {
  emagrecimento: "Com esse perfil, emagrecer sem regredir é método, não força de vontade.",
  hipertrofia: "Com esse perfil, ganhar massa é método, não força de vontade.",
  recomposicao: "Com esse perfil, recompor o corpo é método, não força de vontade.",
  performance: "Com esse perfil, destravar sua performance é método, não força de vontade.",
};

const FECHO_PADRAO = "Com esse perfil, sair do lugar é método, não força de vontade.";

/**
 * Notas da consistência, indexadas pelo percentual — não pela nota da escala.
 * A afirmação do passo 3 é negativa ("não consigo manter consistência"), então
 * concordar com ela significa consistência baixa: o percentual inverte a nota.
 */
const NOTA_CONSISTENCIA: Record<number, string> = {
  20: "você mesmo disse: sabe o que fazer, mas não sustenta",
  40: "você mesmo disse: sabe o que fazer, mas não sustenta",
  60: "meio a meio: some quando a semana aperta",
  80: "consistência quase não é o seu problema",
  100: "consistência não é o seu problema — é direção",
};

const NOTA_TEMPO_DIA: Record<string, string> = {
  "Até 15 min": "pouco tempo exige plano enxuto",
  "15 a 30 min": "dá pra fazer muito com 30 min bem usados",
  "30 a 60 min": "tempo suficiente pra treino completo",
  "Mais de 1h": "tempo não é o seu limite",
};

const NOTA_BASE: Record<string, string> = {
  "Nunca treinei": "começar do zero é vantagem: nenhum vício pra desfazer",
  "Até 6 meses": "base recente: hora de estruturar",
  "6 meses a 2 anos": "você já tem base pra progressão real",
  "Mais de 2 anos": "experiência é seu ativo, o plano respeita isso",
};

/** Quanto cada resposta soma de "capacidade" — o oposto do que trava. */
const PESO_TEMPO_DIA: Record<string, number> = {
  "Até 15 min": 25,
  "15 a 30 min": 50,
  "30 a 60 min": 75,
  "Mais de 1h": 100,
};

const PESO_BASE: Record<string, number> = {
  "Nunca treinei": 15,
  "Até 6 meses": 40,
  "6 meses a 2 anos": 70,
  "Mais de 2 anos": 95,
};

/** Verde → âmbar → laranja: quanto mais alto o valor, melhor o estado. */
function corPorForca(valor: number): string {
  if (valor >= 70) return P.mint;
  if (valor >= 45) return P.amber;
  return C.orangeLight;
}

const FAIXAS: { ate: number; label: string; hue: string }[] = [
  { ate: 30, label: "Baixo", hue: P.mint },
  { ate: 55, label: "Normal", hue: P.amber },
  { ate: 75, label: "Médio", hue: C.orangeLight },
  { ate: 101, label: "Alto", hue: C.orange },
];

/**
 * Nível de travamento: o inverso da capacidade que ele descreveu. A consistência
 * pesa o dobro das outras — é o que mais derruba plano na prática.
 */
function nivelDeTravamento(consistencia: number, tempo: number, base: number): Nivel {
  const capacidade = consistencia * 0.5 + tempo * 0.25 + base * 0.25;
  const pct = Math.round(100 - capacidade);
  const faixa = FAIXAS.find((f) => pct < f.ate) ?? FAIXAS[FAIXAS.length - 1];
  return { pct, label: faixa.label, hue: faixa.hue };
}

/** Monta o diagnóstico a partir das respostas. Nada aqui é inventado. */
export function diagnosticar(answers: Answers): Diagnostico {
  const dor = answers.identificacao;
  const objetivo = answers.objetivo;

  const veredito = (dor && objetivo && VEREDITO[dor]?.[objetivo]) || VEREDITO_PADRAO;
  const gargalo = (dor && GARGALO[dor]) || GARGALO_PADRAO;
  const opcao = OBJETIVO_OPTS.find((o) => o.id === objetivo);

  const pct = (6 - (answers.afirmacao ?? 3)) * 20;
  const forcaTempo = PESO_TEMPO_DIA[answers.tempoDia ?? ""] ?? 50;
  const forcaBase = PESO_BASE[answers.tempoTreino ?? ""] ?? 50;

  const metricas: Metrica[] = [
    {
      label: "Consistência hoje",
      valor: `${pct}%`,
      nota: NOTA_CONSISTENCIA[pct] ?? NOTA_CONSISTENCIA[60],
      hue: corPorForca(pct),
    },
    {
      label: "Tempo por dia",
      valor: answers.tempoDia ?? "—",
      nota: NOTA_TEMPO_DIA[answers.tempoDia ?? ""] ?? "dá pra trabalhar com isso",
      hue: corPorForca(forcaTempo),
    },
    {
      label: "Base de treino",
      valor: answers.tempoTreino ?? "—",
      nota: NOTA_BASE[answers.tempoTreino ?? ""] ?? "base suficiente pra avançar",
      hue: corPorForca(forcaBase),
    },
  ];

  return {
    headline: veredito.h,
    sub: veredito.s,
    nivel: nivelDeTravamento(pct, forcaTempo, forcaBase),
    metricas,
    gargaloTitulo: gargalo.t,
    gargaloTexto: gargalo.x,
    fecho: (objetivo && FECHO[objetivo]) || FECHO_PADRAO,
    foto: opcao?.heroPhoto ?? null,
    fotoAlt: opcao?.heroAlt ?? "",
  };
}
