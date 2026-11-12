# Muito Bala · site

Site institucional da Muito Bala, produtora audiovisual de Porto Alegre. O que a Muito Bala faz: **estúdio de design**, **produção musical**, **produção de vídeo** e **fotografia**.

**[nov/2026] Serviços, não unidades.** Os títulos falam do serviço, sem nome de pessoa ou marca. Quem está à frente aparece só no texto: design com Monique Borba, produção musical com Leonardo Cassiano, produção de vídeo com Nani ArtClub. Fotografia ainda sem responsável, então o texto não cita ninguém. Os nomes antigos de unidade (mona, cleitinho records, myer) não são mais usados no site.

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

## Identidade visual (MIV 2026, Estúdio Mona)

- **Cores oficiais:** azul turquesa `#89D1E0`, rosa vibrante `#E972CB`, amarelo retrô `#E1CB57`, preto `#000000`, bege `#DFD1B7`, branco `#FBFCF3`. Não usar cor fora da paleta.
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
- Na comunicação pública a Muito Bala segue o próprio rumo: não contar histórias internas. A única menção à Nani ArtClub é como responsável pela produção de vídeo, no texto do card (pedido do Nani, nov/2026).

## Pendências

- E-mail de contato e @ do Instagram (`content/site.ts`, campo `contact`). O formulário ainda não envia.
- Cases reais para a grade de programação (`works` em `content/site.ts`).
- Licenças web das fontes originais.
- Fotos próprias para substituir os mockups em `public/miv/`.
