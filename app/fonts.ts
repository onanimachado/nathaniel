import { Instrument_Serif, Questrial, Poppins, Yellowtail, VT323, Belleza } from "next/font/google";

/*
 * Substitutos livres das fontes do MIV:
 *   Rocky Condensed (títulos)        -> Instrument Serif
 *   Avant Garde (textos)             -> Questrial / Poppins (subtítulos)
 *   Brush Script (detalhes)          -> Yellowtail
 * Com as licenças web das originais, troque por next/font/local mantendo as mesmas variáveis.
 */
export const title = Instrument_Serif({ weight: "400", subsets: ["latin"], variable: "--font-title", display: "swap" });
export const text = Questrial({ weight: "400", subsets: ["latin"], variable: "--font-text", display: "swap" });
export const sub = Poppins({ weight: ["600", "700"], subsets: ["latin"], variable: "--font-sub", display: "swap" });
export const script = Yellowtail({ weight: "400", subsets: ["latin"], variable: "--font-script", display: "swap" });
export const vhs = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vhs", display: "swap" });

/* Estilo Optima, como o "Miami, U.S.A." do Vacation (usado em "Porto Alegre, BRA.") */
export const place = Belleza({ weight: "400", subsets: ["latin"], variable: "--font-place", display: "swap" });

export const fontVariables = [title, text, sub, script, vhs, place].map((f) => f.variable).join(" ");
