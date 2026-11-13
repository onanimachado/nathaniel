import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, hrefFor, isLocale, localeInfo, locales } from "@/lib/i18n";
import Shell from "@/components/Shell";
import Guide from "@/components/Guide";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: getDict(lang).works.metaTitle,
    alternates: { canonical: hrefFor(lang, "trabalhos"), languages: Object.fromEntries(locales.map((l) => [localeInfo[l].htmlLang, hrefFor(l, "trabalhos")])) },
  };
}

/* Trabalhos: a grade de programação com os cases. */
export default async function Works({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <Shell t={t} locale={lang} page="trabalhos">
      <Guide t={t} />
    </Shell>
  );
}
