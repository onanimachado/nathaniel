/*
 * Dados da home que não dependem de idioma (imagens, cores, logos, contatos).
 * Os TEXTOS ficam em content/locales/pt.json, en.json e es.json.
 * Regra de escrita da marca: texto corrido, sem travessão, em todos os idiomas.
 */

/*
 * Vídeo da abertura. Coloque o MP4 em public/video/ e preencha "video" (ex.: "/video/abertura.mp4").
 * "poster" é a imagem que aparece enquanto o vídeo carrega.
 */
export const hero = {
  video: null as string | null,
  poster: null as string | null,
};


/*
 * O que a gente faz: a ordem e a cor de cada card. Título, etiqueta, texto e botão
 * de cada serviço ficam em services.items.<id> nos arquivos de idioma.
 */
export type Service = { id: "design" | "musica" | "video" | "foto"; card: "blue" | "pink" | "yellow" | "white"; image: string };

// Ordem pedida pelo Nani (nov/2026): cinema, foto, música, design.
// Cada serviço é um cupom: foto, nome do serviço, uma linha e botão (components/Services.tsx). Imagens provisórias do MIV.
export const services: Service[] = [
  { id: "video", card: "yellow", image: "/miv/neon.jpg" },
  { id: "foto", card: "white", image: "/miv/sol.jpg" },
  { id: "musica", card: "pink", image: "/miv/disco.jpg" },
  { id: "design", card: "blue", image: "/miv/jardim.jpg" },
];

/* Figuras do "manual de instruções do clima". Textos em figs.items, na mesma ordem. */
export const figs = [
  { fig: 5, image: "/miv/sol.jpg" },
  { fig: 6, image: "/miv/disco.jpg" },
  { fig: 7, image: "/miv/jardim.jpg" },
];

/* EXEMPLOS DE LAYOUT: substituir pelos cases reais. Textos em guide.items, na mesma ordem. */
export const works = [
  { time: "20:00", pill: "yellow" },
  { time: "20:30", pill: "white" },
  { time: "21:00", pill: "blue" },
  { time: "21:30", pill: "blue" },
] as const;

/*
 * Faixa de marcas com quem a Muito Bala já trabalhou.
 * Sem "logo", a faixa mostra o nome escrito. Para usar o logo, salve o arquivo
 * em public/clientes/ (SVG de preferência, em uma cor só) e preencha "logo".
 */
/* "height" é a altura do logo na faixa (px, no desktop), ajustada à mão para que todos tenham o mesmo peso visual. */
export type Client = { name: string; logo?: { src: string; ratio: number; height: number }; focus?: boolean };

export const clients: Client[] = [
  // A faixa anda com a rolagem e, quando passa pelo meio da tela, Planeta Atlântida e JBL
  // (focus) ficam no centro (pedido do Nani). STU e Grupo RBS logo ao lado.
  { name: "Maia Entretenimento", logo: { src: "/clientes/maia.svg", ratio: 2117 / 864, height: 38 } },
  { name: "happn", logo: { src: "/clientes/happn.svg", ratio: 3820 / 1250, height: 36 } },
  { name: "Zero Hora", logo: { src: "/clientes/zero-hora.svg", ratio: 2106 / 269, height: 22 } },
  { name: "STU", logo: { src: "/clientes/stu.svg", ratio: 2848 / 1304, height: 58 } },
  { name: "Planeta Atlântida", logo: { src: "/clientes/planeta-atlantida.svg", ratio: 2351 / 2179, height: 78 }, focus: true },
  { name: "JBL", logo: { src: "/clientes/jbl.svg", ratio: 1960 / 1133, height: 62 }, focus: true },
  { name: "Grupo RBS", logo: { src: "/clientes/grupo-rbs.svg", ratio: 1975 / 537, height: 42 } },
  { name: "Unimed", logo: { src: "/clientes/unimed.svg", ratio: 2765 / 551, height: 38 } },
  { name: "Gauchão", logo: { src: "/clientes/gauchao.svg", ratio: 2751 / 1383, height: 56 } },
  { name: "Espartano Skatepark", logo: { src: "/clientes/espartano.svg", ratio: 2320 / 703, height: 54 } },
  { name: "Agência HOC", logo: { src: "/clientes/hoc.svg", ratio: 1655 / 457, height: 30 } },
  { name: "Perky", logo: { src: "/clientes/perky.svg", ratio: 2485 / 521, height: 30 } },
];

/* Playlist do Spotify da Muito Bala (seção "Trilha do clima"). */
export const playlist = {
  id: "1pgBP7kPflzDkkuXH5YSWu",
  url: "https://open.spotify.com/playlist/1pgBP7kPflzDkkuXH5YSWu",
};

export const contact = {
  email: null as string | null, // a definir
  instagram: null as string | null, // a definir
  city: "Porto Alegre, RS",
};
