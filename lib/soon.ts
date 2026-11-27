import { comingSoon } from "@/content/site";

/* Abertura "Em breve": vale só na produção da Vercel (muitobala.com). A prévia e o computador local mostram o site. */
export const showSoon = comingSoon && (process.env.VERCEL_ENV === "production" || process.env.FORCE_COMING_SOON === "1");
