# Design: Quiz do Grupo Fundador em Next.js

Data: 2026-08-25

## Objetivo

Recriar o protótipo `design_handoff_quiz_grupo_fundador` como uma página Next.js de
produção. O handoff (`README.md` do pacote + `design/Essent Quiz.dc.html`) é a
especificação canônica de UI: copy, tokens, estados e animações são finais e não se
reinterpretam aqui. Este documento cobre só **como** isso vira código.

## Decisões

| Ponto | Decisão |
| --- | --- |
| Base | `create-next-app`: App Router, TypeScript, Tailwind v4, ESLint |
| Backend | Nenhum. O submit da captura só avança para a confirmação |
| Fotos do passo Objetivo | Unsplash via `next/image` + `remotePatterns` |
| Testes | Nenhum nesta entrega |
| Ícones | `@phosphor-icons/react`, weight `duotone` |
| Fontes | `next/font/google`: Barlow (400/500/600/700) e Barlow Condensed (800) |

## Estrutura

```
app/layout.tsx        fontes + <html lang="pt-BR"> fundo void
app/page.tsx          server component, renderiza <Quiz/>
app/globals.css       @theme com tokens + keyframes + classes de animação
components/quiz/
  Quiz.tsx            client, dono do estado e dos efeitos; roteia a tela
  QuizFrame.tsx       coluna fixa: TopBar → conteúdo rolável (flex:1) → CtaBar
  TopBar.tsx          voltar + 6 segmentos de progresso + contador N/6
  CtaBar.tsx          botão pill full-width, estados habilitado/desabilitado
  screens/            Hero, Identificacao, Objetivo, Afirmacao, Perfil,
                      Compromisso, Atrito, Analise, Captura, Confirmacao
  ui/                 OptionCard, PhotoOptionCard, LikertScale, ChipGroup,
                      GateButton, TextField, PillButton
lib/quiz/
  types.ts            Screen, Mode, Answers, State, Action
  content.ts          copy literal, opções, cores por item, ganchos, config
  reducer.ts          transições, voltar, validação por tela (puro)
  phone.ts            máscara e validação do WhatsApp (puro)
  storage.ts          load/save/clear de `essent-quiz-v1`
```

Cada tela é um arquivo próprio: recebe `answers` + callbacks, não conhece o
reducer nem o storage. `Quiz.tsx` é o único lugar com efeitos.

## Estado

```ts
type State = {
  screen: 'hero'|'identificacao'|'objetivo'|'afirmacao'|'perfil'
        |'compromisso'|'atrito'|'analise'|'captura'|'confirmacao'
  mode: 'fundador'|'espera'
  answers: {
    identificacao: string|null; objetivo: string|null; afirmacao: 1|2|3|4|5|null
    tempoTreino: string|null; tempoDia: string|null
    compromisso: 'topo'|'nao'|null; nome: string; whats: string
  }
  whatsTouched: boolean
  analysisMs: number
}
```

`reducer.ts` expõe também `canAdvance(state)` (regra de validação por tela) e
`backTarget(state)` (destino do voltar, incluindo captura → compromisso no modo
fundador e captura → atrito no modo espera).

### Persistência

`screen`, `mode` e `answers` gravados em `localStorage` sob `essent-quiz-v1` a cada
mudança. No restore, `screen === 'analise'` volta como `compromisso`. Leitura
protegida por try/catch: storage ausente ou corrompido cai no estado inicial em
silêncio. Como o restore só acontece no cliente, a primeira renderização usa o
estado inicial e o estado salvo é aplicado num `useEffect` de montagem — evita
mismatch de hidratação.

### Efeitos (todos em `Quiz.tsx`)

- **Auto-avanço**: `setTimeout` de 380ms após seleção em identificação, objetivo,
  afirmação e compromisso. Desligável por `config.autoAdvance`. Não vale para
  perfil nem captura.
- **Análise**: `setInterval` de 60ms incrementando `analysisMs` até 6000, quando
  navega para a captura. Percentual = `min(100, round(ms / 5600 * 100))`;
  etapa ativa = `floor(ms / 1060)`.
- Ambos limpos em qualquer navegação e no unmount.

## Estilo

Tokens do handoff viram CSS variables em `@theme` (`--color-void`, `--color-panel`,
`--color-border`, `--color-orange`, …), então Tailwind gera as utilities
correspondentes. As cinco cores da paleta de apoio são **dado**, não classe: cada
opção carrega seu hex em `content.ts` e o componente aplica via `style`
(`borderColor`, fundo com a cor a 9–10%). Isso mantém a regra "uma cor por item"
sem gerar dezenas de classes arbitrárias.

Gradientes, glows, o halo cônico da análise, os três anéis e as keyframes
(`screenIn`, `popIn`, rotações, pulsos) ficam em `globals.css` como classes
nomeadas. Foco de teclado global: `outline: 2px solid #ff7a45; outline-offset: 2px`.

O toggle Moldura/Tela cheia do protótipo **não** é implementado — é ferramenta de
apresentação. A página ocupa a viewport e é desenhada para mobile 390×810.

## Fora de escopo

Envio ao CRM, analytics, testes automatizados, autenticação e o asset oficial do
logo (reproduzido como barra + wordmark, conforme o handoff).
