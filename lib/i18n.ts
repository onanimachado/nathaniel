import pt from "@/content/locales/pt.json";
import en from "@/content/locales/en.json";
import es from "@/content/locales/es.json";

/*
 * Idiomas do site. Português fica em "/", inglês em "/en" e espanhol em "/es".
 * Os textos ficam em content/locales/<idioma>.json, sempre com as mesmas chaves.
 */
export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export type Dict = typeof pt;

const dictionaries: Record<Locale, Dict> = { pt, en, es };

export const localeInfo: Record<Locale, { label: string; name: string; htmlLang: string; ogLocale: string }> = {
  pt: { label: "PT", name: "Português", htmlLang: "pt-BR", ogLocale: "pt_BR" },
  en: { label: "EN", name: "English", htmlLang: "en", ogLocale: "en_US" },
  es: { label: "ES", name: "Español", htmlLang: "es", ogLocale: "es_ES" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

export function pathFor(locale: Locale): string {
  return locale === "pt" ? "/" : `/${locale}`;
}

/* Endereço de uma página interna: português sem prefixo, os outros idiomas com /en ou /es. */
export function pagePath(locale: Locale, slug?: string): string {
  if (!slug) return pathFor(locale);
  return locale === "pt" ? `/${slug}` : `/${locale}/${slug}`;
}

/* Link para uma parte da home (âncora), funcionando também de dentro das páginas internas. */
export function homeAnchor(locale: Locale, id: string): string {
  return `${pathFor(locale)}#${id}`;
}
