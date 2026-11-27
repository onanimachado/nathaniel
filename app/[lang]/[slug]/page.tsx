import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale, localeInfo, locales, pagePath, pathFor } from "@/lib/i18n";
import { pageSlugs } from "@/content/site";
import { showSoon } from "@/lib/soon";
import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import ComingSoon from "@/components/ComingSoon";
import s from "./page.module.css";

/* Páginas do menu (Loja, História, Governança, Comunidade, Projetos Sociais). Por enquanto, "em breve". */
type Slug = (typeof pageSlugs)[number];
const isSlug = (v: string): v is Slug => (pageSlugs as readonly string[]).includes(v);

export const dynamicParams = false;

export function generateStaticParams() {
  return pageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isSlug(slug)) return {};
  const t = getDict(lang);
  if (showSoon) return { title: t.comingSoon.metaTitle, robots: { index: false, follow: false } };
  return {
    title: `${t.menu.items[slug]} · Muito Bala`,
    description: t.menu.intros[slug],
    alternates: {
      canonical: pagePath(lang, slug),
      languages: Object.fromEntries(locales.map((l) => [localeInfo[l].htmlLang, pagePath(l, slug)])),
    },
  };
}

export default async function MenuPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isSlug(slug)) notFound();
  const t = getDict(lang);
  if (showSoon) return <ComingSoon t={t} />;
  return (
    <>
      <Ticker t={t} />
      <Nav t={t} locale={lang} slug={slug} />
      <main id="topo">
        <section className={s.page} data-bg="beige" aria-labelledby="page-title">
          <div className="wrap">
            <p className={s.kicker}>{t.menu.soon}</p>
            <h1 id="page-title" className={`serif ${s.title}`}>{t.menu.items[slug]}</h1>
            <p className={s.intro}>{t.menu.intros[slug]}</p>
            <a className="pill pill--blue" href={pathFor(lang)}>{t.menu.back}</a>
          </div>
        </section>
      </main>
      <Footer t={t} locale={lang} />
      <Motion />
    </>
  );
}
