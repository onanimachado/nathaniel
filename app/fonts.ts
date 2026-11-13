import { Instrument_Serif, Questrial, Poppins, Yellowtail, VT323, Montserrat_Alternates } from "next/font/google";

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

/* Avant Garde com pegada retrô (letras apertadas): Montserrat Alternates é a alternativa livre mais próxima. */
export const retro = Montserrat_Alternates({ weight: ["500", "600"], subsets: ["latin"], variable: "--font-retro", display: "swap" });

export const fontVariables = [title, text, sub, script, vhs, retro].map((f) => f.variable).join(" ");
