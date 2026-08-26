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

---

## Adendo: tela de Resultado (posterior ao handoff)

> Atualizado: a tela foi redesenhada a partir de `diagnostico.html`. O texto abaixo
> descreve a versão original; as diferenças estão na seção seguinte.

Tela nova, não prevista no handoff, inserida entre a **análise** e a **captura**
no fluxo fundador. Motivo: a análise de 6s promete um diagnóstico e a captura
entregava um formulário — o resultado paga essa promessa antes de pedir o
contato. O fluxo de lista de espera não passa por ela.

**Regra de conteúdo: nenhum número é inventado.** Toda linha sai de uma resposta
que o usuário deu, em `lib/quiz/resultado.ts`:

| Sinal | Vira |
| --- | --- |
| `identificacao` | nome e texto do perfil (4 variantes) |
| `afirmacao` | medidor de consistência, **invertido** — a afirmação do passo 3 é negativa, então concordar 5 significa consistência 20% |
| `tempoDia` | medidor de tempo |
| `tempoTreino` | medidor de base |
| `objetivo` | linha de fechamento, via o gancho já existente |

O **menor medidor vira o gargalo** (empate resolve na ordem consistência →
tempo → base), e o gargalo escolhe o texto que emenda no serviço. Dois usuários
diferentes recebem vereditos diferentes.

Uma exceção de tom: quem escolheu "nunca comecei de verdade" recebe outra nota
de consistência — acusar de não sustentar uma rotina que ele nunca teve seria
falso e desmotivador.

### Integração

- `Screen` ganha `"resultado"`; a análise passa a navegar para ela em vez da captura.
- Sem barra de topo (preserva a contagem de 6 passos); com CTA.
- Voltar da captura no fluxo fundador vai para o resultado, não mais para o compromisso.
- Persiste normalmente — diferente da análise, é derivável das respostas.
- **Divergência de copy assumida:** o CTA do resultado é "Quero minha vaga" e o da
  captura virou "Confirmar minha vaga". O handoff fixa "Quero minha vaga" na captura,
  mas mantê-lo deixaria dois CTAs idênticos em telas seguidas.

### Redesign a partir de `diagnostico.html`

O documento `diagnostico.html` na raiz substituiu o design acima. É referência de
design, não código de produção. Mudou tanto a forma quanto o conteúdo:

**Forma.** Faixa de foto de 190px no topo, escolhida pelo objetivo, com scrim que
escurece o topo e dissolve a imagem no fundo do app, e a assinatura ESSENT sobre
ela. As barras de progresso saíram: as métricas viraram tipográficas — rótulo
versaleto à esquerda, valor em Barlow Condensed 19px à direita, nota na linha de
baixo. O box do gargalo virou filete laranja + texto em itálico. Corpo com 22px
de padding lateral e headline de 34px.

**Conteúdo.** O veredito passou a ser uma matriz **dor × objetivo** (16
combinações, headline e sub próprios) em vez de depender só da dor. O gargalo
passou a vir da dor — direção / sustentação / ajuste / base — e não mais do menor
medidor, então a paleta de apoio saiu da tela: ela é laranja e neutros.

**Uma correção sobre o documento.** O `diagnostico.html` calcula a consistência
como `afirmacao * 20`, o que inverte o sentido da pergunta: a afirmação do passo 3
é negativa ("não consigo manter consistência"), então quem responde 5 (concordo
totalmente) receberia "100% — consistência não é o seu problema". A implementação
mantém `(6 - afirmacao) * 20` e reindexa as notas do documento pelo percentual, o
que preserva toda a copy e corrige o sentido. Reverter para o comportamento
literal do documento é uma linha em `lib/quiz/resultado.ts`.

A foto do resultado reusa a mesma imagem do card do passo 2, num recorte largo
(`heroPhoto` em `content.ts`) — o objetivo que ele escolheu volta como abertura do
diagnóstico. Trocar por assets próprios é só mudar esse campo.
