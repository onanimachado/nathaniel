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
  // Vídeo enviado pelo Nani (nov/2026): 11 s em loop, mudo, comprimido para 1600px (~4 MB).
  video: "/video/abertura.mp4" as string | null,
  poster: "/video/abertura.jpg" as string | null,
};


/*
 * O que a gente faz: a ordem e a cor de cada card. Título, etiqueta, texto e botão
 * de cada serviço ficam em services.items.<id> nos arquivos de idioma.
 */
export type Service = { id: "design" | "musica" | "video" | "foto"; card: "blue" | "pink" | "yellow" | "white"; image: string };

// Ordem pedida pelo Nani (nov/2026): cinema, foto, música, design.
// Cada serviço é um cupom: foto, nome do serviço, uma linha e botão (components/Services.tsx).
// Imagens [nov/2026]: anúncios impressos vintage escolhidos pelo Nani como referência (câmera, boné, walkman, computador), em public/servicos.
export const services: Service[] = [
  { id: "video", card: "yellow", image: "/servicos/cinema.jpg" },
  { id: "foto", card: "white", image: "/servicos/foto.jpg" },
  { id: "musica", card: "pink", image: "/servicos/musica.jpg" },
  { id: "design", card: "blue", image: "/servicos/design.jpg" },
];

/* Figuras do "manual de instruções do clima". Textos em figs.items, na mesma ordem. */
// [nov/2026] Vai receber o portfólio da empresa: trocar estas imagens provisórias do MIV pelos trabalhos.
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
  { name: "Gauchão", logo: { src: "/clientes/gauchao.svg", ratio: 2751 / 1383, height: 56 } },
  { name: "Planeta Atlântida", logo: { src: "/clientes/planeta-atlantida.svg", ratio: 2351 / 2179, height: 78 }, focus: true },
  { name: "Globo", logo: { src: "/clientes/globo.svg", ratio: 1, height: 62 }, focus: true },
  { name: "JBL", logo: { src: "/clientes/jbl.svg", ratio: 1960 / 1133, height: 62 }, focus: true },
  { name: "Grupo RBS", logo: { src: "/clientes/grupo-rbs.svg", ratio: 1975 / 537, height: 42 } },
  { name: "Unimed", logo: { src: "/clientes/unimed.svg", ratio: 2765 / 551, height: 38 } },
  { name: "Espartano Skatepark", logo: { src: "/clientes/espartano.svg", ratio: 2320 / 703, height: 54 } },
  { name: "Agência HOC", logo: { src: "/clientes/hoc.svg", ratio: 1655 / 457, height: 30 } },
  { name: "Perky", logo: { src: "/clientes/perky.svg", ratio: 2485 / 521, height: 30 } },
];

/* Playlist do Spotify da Muito Bala (seção "Trilha do clima"). */
export const playlist = {
  id: "1pgBP7kPflzDkkuXH5YSWu",
  url: "https://open.spotify.com/playlist/1pgBP7kPflzDkkuXH5YSWu",
};

// Entradas de login no menu: Parceiro (quem contrata, o cliente) e Artista (freelancer).
// Endereços ainda não definidos: enquanto forem null, os botões mostram "Em breve".
export const login = {
  partner: null as string | null,
  artist: null as string | null,
};

// Página de abertura "Em breve" [nov/2026]: com true, o muitobala.com (produção) mostra só a
// abertura e esconde o site. O link de prévia da Vercel (branch site-base) continua mostrando o site
// inteiro, para revisão. Para lançar o site, trocar para false e publicar.
export const comingSoon = true;

// Menu de tela cheia [nov/2026], no estilo do Vacation. Ordem pedida pelo Nani.
// "page": página própria (muitobala.com/<slug>, hoje com aviso de "em breve"); "section": parte da home.
export const menuPages = [
  { slug: "loja", kind: "page" },
  { slug: "historia", kind: "page" },
  { slug: "governanca", kind: "page" },
  { slug: "portfolio", kind: "section" },
  { slug: "comunidade", kind: "page" },
  { slug: "projetos-sociais", kind: "page" },
] as const;
// Barra de baixo do menu aberto [nov/2026]: dials de edição de foto, como o "Vibe Generator" do Vacation.
// Os valores iniciais são os pedidos pelo Nani e representam o tratamento atual do site; arrastar muda a página de verdade.
// Nomes iguais nos três idiomas, como em programa de edição.
export const dials = [
  { id: "clarify", name: "Clarify", value: -30 },
  { id: "saturation", name: "Saturation", value: 12 },
  { id: "contrast", name: "Contrast", value: -10 },
  { id: "grain", name: "Grain", value: 12 },
] as const;
export type DialId = (typeof dials)[number]["id"];

export type MenuSlug = (typeof menuPages)[number]["slug"];
export const pageSlugs = menuPages.filter((m) => m.kind === "page").map((m) => m.slug);

export const contact = {
  // Número do WhatsApp com DDI e DDD, só dígitos (ex.: "5551999999999"). A definir.
  whatsapp: null as string | null,
  email: "nani@muitobala.com" as string | null,
  instagram: null as string | null, // a definir
  city: "Porto Alegre, RS",
};

/* Link de orçamento [nov/2026]: o formulário de contato saiu do site. Com WhatsApp definido,
   o pedido vai para o WhatsApp (ação principal da marca); enquanto isso, abre um e-mail. */
export function quoteHref(subject: string): string {
  if (contact.whatsapp) return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(subject)}`;
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;
}
