import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Manifest from "@/components/Manifest";
import Services from "@/components/Services";
import Playlist from "@/components/Playlist";
import Thesis from "@/components/Thesis";
import Figs from "@/components/Figs";
import Guide from "@/components/Guide";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import ComingSoon from "@/components/ComingSoon";
import { comingSoon } from "@/content/site";

/* No ar (produção da Vercel) mostra só a abertura "Em breve"; a prévia e o computador local mostram o site. */
const showSoon = comingSoon && (process.env.VERCEL_ENV === "production" || process.env.FORCE_COMING_SOON === "1");

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  if (showSoon) return <ComingSoon t={t} />;
  return (
    <>
      <Ticker t={t} />
      <Nav t={t} locale={lang} />
      <main id="topo">
        <Hero t={t} />
        <Clients t={t} />
        <Manifest t={t} />
        <Services t={t} />
        <Playlist t={t} />
        <Thesis t={t} />
        <Figs t={t} />
        <Guide t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
      <Motion />
    </>
  );
}
