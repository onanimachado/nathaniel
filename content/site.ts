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

export type Unit = {
  slug: string;
  name: string;
  tag: string;
  description: string;
  cta: string;
  card: "blue" | "pink" | "yellow" | "white";
};

export const units: Unit[] = [
  {
    slug: "mona",
    name: "mona",
    tag: "Estúdio · design",
    description: "Identidade, direção de arte e tudo que precisa ficar bonito antes de rodar. Foi quem desenhou esta marca.",
    cta: "Ver trabalhos",
    card: "blue",
  },
  {
    slug: "cleitinho-records",
    name: "cleitinho records",
    tag: "Música · trilha",
    description: "Estúdio de gravação e trilha sonora original. O som que faz a imagem respirar.",
    cta: "Ouvir",
    card: "pink",
  },
  {
    slug: "nani-artclub",
    name: "nani artclub",
    tag: "Filme",
    description: "Direção de cena, roteiro e filme do set até a sala de edição.",
    cta: "Assistir",
    card: "yellow",
  },
  {
    slug: "myer",
    name: "myer",
    tag: "Foto",
    description: "Fotografia de pele reluzente, luz difusa e cromado de época, com um pouco de humor.",
    cta: "Ver fotos",
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
  { time: "20:00", title: "Nome do projeto", meta: "Cliente · filme de campanha · 2026", unit: "nani artclub", pill: "yellow" },
  { time: "20:30", title: "Nome do projeto", meta: "Cliente · trilha original · 2026", unit: "cleitinho records", pill: "blue" },
  { time: "21:00", title: "Nome do projeto", meta: "Cliente · identidade visual · 2026", unit: "mona", pill: "blue" },
  { time: "21:30", title: "Nome do projeto", meta: "Cliente · ensaio fotográfico · 2026", unit: "myer", pill: "white" },
] as const;

export const contact = {
  email: null as string | null, // a definir
  instagram: null as string | null, // a definir
  city: "Porto Alegre, RS",
};
