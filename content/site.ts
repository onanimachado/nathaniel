/*
 * Conteúdo da home. Enquanto não houver painel de conteúdo (CMS),
 * edite os textos aqui. Regra de escrita da marca: português do Brasil,
 * texto corrido, sem travessão.
 */

export const tickerPhrases = [
  { before: "Num mundo meia boca, seja", script: "Muito Bala!", color: "pink" },
  { before: "Bem-vindo ao nosso clima" },
  { before: "A gente vê", script: "a limonada", after: "onde todos enxergam limão", color: "yellow" },
  { before: "Design · Música · Filme · Foto" },
  { before: "Nada é tão quente quanto uma marca que faz o mercado", script: "subir a régua", color: "blue" },
] as const;

/*
 * O que a gente faz. O título fala do serviço; quem está à frente
 * aparece só no texto (pedido do Nani, nov/2026).
 */
export type Service = {
  id: string;
  title: string;
  tag: string;
  description: string;
  cta: string;
  card: "blue" | "pink" | "yellow" | "white";
};

export const services: Service[] = [
  {
    id: "design",
    title: "Estúdio de design",
    tag: "Identidade · arte",
    description: "Identidade, direção de arte e tudo que precisa ficar bonito antes de rodar. Por aqui, quem desenha é Monique Borba.",
    cta: "Ver trabalhos",
    card: "blue",
  },
  {
    id: "musica",
    title: "Produção musical",
    tag: "Gravação · trilha",
    description: "Estúdio de gravação e trilha sonora original, o som que faz a imagem respirar. Nos fones, Leonardo Cassiano.",
    cta: "Ouvir",
    card: "pink",
  },
  {
    id: "video",
    title: "Produção de vídeo",
    tag: "Direção · filme",
    description: "Direção de cena, roteiro e filme, do set até a sala de edição. Atrás da câmera, Nani ArtClub.",
    cta: "Assistir",
    card: "yellow",
  },
  {
    id: "foto",
    title: "Fotografia",
    tag: "Ensaio · still",
    description: "Pele reluzente, luz difusa e cromado de época, com um pouco de humor. Do ensaio de marca ao still de produto.",
    cta: "Pedir orçamento",
    card: "white",
  },
];

export const figs = [
  {
    fig: 5,
    pillar: "Ousada",
    title: "Sem medo do ridículo",
    text: "Muito bala é a própria régua. A gente se arrisca a fazer diferente, abraça o besta e o cômico, e transforma isso em imagem que ninguém esquece.",
    image: "/miv/sol.jpg",
    alt: "Costas bronzeadas com a marca Muito Bala desenhada pelo sol, à beira da piscina",
    caption: "marca de sol",
  },
  {
    fig: 6,
    pillar: "Intensa",
    title: "Analógico de verdade",
    text: "Handycam, Cybershot, vinil e fita cassete. Não é saudade. É a prova de que dá para fazer alguém parar e olhar com calma, e que isso continua funcionando muito bem.",
    image: "/miv/disco.jpg",
    alt: "Disco de vinil com capa azul e o logo Muito Bala em rosa",
    caption: "lado A",
  },
  {
    fig: 7,
    pillar: "Jovem",
    title: "Trabalho sério, sensação leve",
    text: "O nosso forte é a experiência. Set tranquilo, conversa franca e entrega no prazo. Você sai do projeto com o material pronto e com vontade de voltar.",
    image: "/miv/jardim.jpg",
    alt: "Jardineiro de terno claro podando uma escultura de arbusto no formato do monograma MB",
    caption: "cliente satisfeito, ambiente natural",
  },
];

export const posts = [
  { image: "/miv/post1.jpg", alt: "Post: Num mundo meia boca, seja Muito Bala!" },
  { image: "/miv/post2.jpg", alt: "Post: Nada é tão quente quanto uma marca que faz o mercado subir a régua" },
  { image: "/miv/post3.jpg", alt: "Post: A gente vê a limonada onde todos enxergam limão" },
];

/* EXEMPLOS DE LAYOUT: substituir pelos cases reais. */
export const works = [
  { time: "20:00", title: "Nome do projeto", meta: "Cliente · filme de campanha · 2026", service: "Produção de vídeo", pill: "yellow" },
  { time: "20:30", title: "Nome do projeto", meta: "Cliente · trilha original · 2026", service: "Produção musical", pill: "blue" },
  { time: "21:00", title: "Nome do projeto", meta: "Cliente · identidade visual · 2026", service: "Estúdio de design", pill: "blue" },
  { time: "21:30", title: "Nome do projeto", meta: "Cliente · ensaio fotográfico · 2026", service: "Fotografia", pill: "white" },
] as const;

/*
 * Faixa de marcas com quem a Muito Bala já trabalhou.
 * Sem "logo", a faixa mostra o nome escrito. Para usar o logo, salve o arquivo
 * em public/clientes/ (SVG de preferência, em uma cor só) e preencha "logo".
 */
/* "height" é a altura do logo na faixa (px, no desktop), ajustada à mão para que todos tenham o mesmo peso visual. */
export type Client = { name: string; logo?: { src: string; ratio: number; height: number } };

export const clients: Client[] = [
  { name: "Grupo RBS", logo: { src: "/clientes/grupo-rbs.svg", ratio: 1975 / 537, height: 34 } },
  { name: "Planeta Atlântida" },
  { name: "Espartano Skatepark", logo: { src: "/clientes/espartano.svg", ratio: 2320 / 703, height: 54 } },
  { name: "JBL", logo: { src: "/clientes/jbl.svg", ratio: 1960 / 1133, height: 44 } },
  { name: "Agência HOC", logo: { src: "/clientes/hoc.svg", ratio: 1655 / 457, height: 30 } },
  { name: "Gauchão" },
  { name: "Maia Entretenimento" },
  { name: "happn" },
  { name: "Zero Hora" },
  { name: "Perky" },
  { name: "STU", logo: { src: "/clientes/stu.svg", ratio: 2848 / 1304, height: 40 } },
  { name: "Unimed" },
];

export const contact = {
  email: null as string | null, // a definir
  instagram: null as string | null, // a definir
  city: "Porto Alegre, RS",
};
