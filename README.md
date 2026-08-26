# Quiz do Grupo Fundador — Essent

Quiz de diagnóstico de 9 telas usado como isca do funil de captação do Grupo Fundador
(ciclo concierge pré-lançamento do app Essent). O usuário responde 6 passos de conteúdo,
passa por uma tela de análise animada e deixa nome + WhatsApp. Quem recusa o compromisso
de 30 dias cai numa tela de atrito e pode voltar ao fluxo ou entrar na lista de espera.

## Rodar

```bash
npm install
npm run dev     # http://localhost:3000
```

Outros scripts: `npm run build`, `npm start`, `npm run lint`.

## Estrutura

```
app/                     layout (fontes), page, globals.css (tokens + keyframes)
components/quiz/
  Quiz.tsx               estado, timers e persistência — o único lugar com efeitos
  TopBar / CtaBar        moldura fixa
  screens/               as 11 telas
  ui/                    cards, chips, escala Likert, botões, tipografia
lib/quiz/
  content.ts             copy, opções, cores por item e config (vagas, dias, autoAdvance)
  reducer.ts             navegação e validação (puro)
  resultado.ts           diagnóstico derivado das respostas (puro)
  phone.ts               máscara e validação do WhatsApp (puro)
  storage.ts             persistência em `essent-quiz-v1`
  tokens.ts              paleta e helpers de cor
```

## Configuração

`lib/quiz/content.ts` → `config`: `vagas` (50), `dias` (7) e `autoAdvance` (true).

## Pendências antes de ir pro ar

- **Backend**: o submit da captura só avança para a confirmação. Ligar o envio de
  `nome`, `whats`, todas as respostas e o `mode` (`fundador` vs `espera`) — o `mode`
  é o que separa as duas audiências no CRM.
- **Fotos do passo Objetivo**: hoje são referências do Unsplash. Trocar pelos assets
  definitivos (76×76, servidos em 2×/3×).
- **Logo**: reproduzido como barra + wordmark. Substituir pelo asset oficial.

## Design de origem

O handoff está em `Quiz do Grupo Fundador.zip` (descompacte para `_proto/`, que é
ignorado pelo git). `design/Essent Quiz.dc.html` é o design canônico; onde o
`referencia-original.jsx` divergir, o `.dc.html` vence. O spec de implementação
está em `docs/superpowers/specs/2026-08-25-quiz-grupo-fundador-design.md`.
