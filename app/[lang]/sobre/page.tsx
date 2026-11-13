import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, hrefFor, isLocale, localeInfo, locales } from "@/lib/i18n";
import Shell from "@/components/Shell";
import Manifest from "@/components/Manifest";
import Thesis from "@/components/Thesis";
import Figs from "@/components/Figs";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: getDict(lang).about.metaTitle,
    alternates: { canonical: hrefFor(lang, "sobre"), languages: Object.fromEntries(locales.map((l) => [localeInfo[l].htmlLang, hrefFor(l, "sobre")])) },
  };
}

/* Sobre: o clima, a tese e o manual de instruções do clima. */
export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <Shell t={t} locale={lang} page="sobre">
      <Manifest t={t} />
      <Thesis t={t} />
      <Figs t={t} />
    </Shell>
  );
}
