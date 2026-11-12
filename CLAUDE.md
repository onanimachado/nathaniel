# Muito Bala · site

Site institucional da Muito Bala, produtora audiovisual de Porto Alegre. O que a Muito Bala faz: **design**, **produção musical**, **produção cinematográfica** e **fotografia**.

**Público e posicionamento [nov/2026].** Nicho principal: música (cobertura de festivais, shows e eventos de grande porte). Secundário: vender diretores de cena para o mercado publicitário, com a Muito Bala na curadoria e na produção. Fechar com a Muito Bala é comprar status: o site precisa ser o mais bonito e a marca a mais inteligente que a pessoa já viu, com atenção a mínimos detalhes. Referência de público e estética: Sticky Fingers, Ocean Alley, Mac DeMarco, o universo australiano de surf (grão, cores lavadas de sol, vintage). Ação principal desejada: mandar mensagem no WhatsApp para orçar.

**[nov/2026] Serviços, não unidades.** Os títulos dos cards são minimalistas, com ponto final: "Design.", "Produção Musical.", "Produção Cinematográfica.", "Fotografia." Sem nome de pessoa ou marca no título. Quem está à frente aparece só no texto: design com Monique Borba, produção musical com Leonardo Cassiano, produção cinematográfica com Nani ArtClub. Fotografia ainda sem responsável, então o texto não cita ninguém. Os nomes antigos de unidade (mona, cleitinho records, myer) não são mais usados no site.

## Comandos

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção (roda lint e checagem de tipos)
```

## Estrutura

- `app/` páginas (App Router). `app/globals.css` guarda os tokens do design system e as classes base (`.serif`, `.script`, `.pill`, `.tag`). `app/fonts.ts` carrega as fontes.
- `components/` uma seção da home por arquivo, cada uma com o seu `.module.css`.
- `content/site.ts` todos os textos e listas da home. Edite o conteúdo aqui, não nos componentes.
- `public/brand/` logos em SVG extraídos do MIV. `public/miv/` imagens de mockup do MIV, provisórias.
- Abertura: só o logo no centro, com vídeo atrás (`hero` em `content/site.ts`; arquivo MP4 em `public/video/`).
- `public/clientes/` logos das marcas da faixa de clientes, vetorizados em preto a partir de imagens enviadas pelo Nani. A altura de cada um (`clients` em `content/site.ts`) foi ajustada à mão para o mesmo peso visual. A faixa copia o comportamento da faixa de imprensa do Vacation (Embla + AutoScroll).

## Identidade visual (MIV 2026, Estúdio Mona)

- **Cores oficiais:** azul turquesa `#89D1E0`, rosa vibrante `#E972CB`, amarelo retrô `#E1CB57`, preto `#000000`, bege `#DFD1B7`, branco `#FBFCF3`. Não usar cor fora da paleta.
- **[nov/2026] Versão fosca na tela:** a pedido do Nani, o site usa a paleta com ~30% menos saturação (`#8EC5D1`, `#D67BBF`, `#CBBA63`, preto de tinta `#1C1A17`, branco papel `#F4F0E4`), com grão de filme por cima de tudo e fotos levemente dessaturadas. Os SVGs de `public/brand` e `public/clientes` também usam essas cores. Para impressão, valem os originais do manual.
- **Combinações:** texto sempre preto sobre as cores (branco só sobre preto). Botões em pílula com a cor complementar ao fundo: rosa sobre azul, azul sobre rosa, rosa sobre amarelo, azul sobre branco, rosa sobre bege. Proibido título azul chapado sobre rosa.
- **Tipografia:** Rocky Condensed nos títulos, Avant Garde em textos e subtítulos, Brush Script nos detalhes (script rosa ou azul, contorno e sombra pretos). Hoje o site usa substitutos livres (Instrument Serif, Questrial/Poppins, Yellowtail). Com as licenças web, trocar em `app/fonts.ts` por `next/font/local` mantendo as variáveis CSS.
- **Logo:** usar sempre os arquivos originais. Não alterar proporção, posição dos elementos, tipografia ou cores, não rotacionar, não distorcer, não adicionar efeitos nem elementos. Sobre foto ou fora da paleta, usar a versão preta ou branca.
- **Estética:** Miami dos anos 90, verão, MTV, analógico (handycam, Cybershot, vinil, cassete), grading puxado para azul cristalino e magenta, sempre com humor. O analógico não é nostalgia: é prova de que consumo contemplativo funciona.
- **Pilares:** ousada, intensa, jovem.

## Tom de voz

- Português do Brasil, texto corrido, linguagem madura. Nada de bio em tópicos ou emoji em lista.
- Pop, bem-humorado, leve e confiante. Nunca acadêmico.
- **Não usar travessão (em-dash) em textos da marca.**
- Preservar literalmente frases que o Nani especificar.
- Slogans: "bem-vindo ao nosso clima" (abertura), "nossa vibe é o produto" (fechamento). Assinatura: "Muito Bala. O seu paraíso audiovisual."
- Tese comercial: "Não entregamos audiência. Entregamos a audiência certa, pré-filtrada pela própria exigência do conteúdo."
- Na comunicação pública a Muito Bala segue o próprio rumo: não contar histórias internas. A única menção à Nani ArtClub é como responsável pela produção cinematográfica, no texto do card (pedido do Nani, nov/2026).

## Pendências

- E-mail de contato e @ do Instagram (`content/site.ts`, campo `contact`). O formulário ainda não envia.
- Cases reais para a grade de programação (`works` em `content/site.ts`).
- Licenças web das fontes originais.
- Fotos próprias para substituir os mockups em `public/miv/`.
