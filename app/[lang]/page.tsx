import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Manifest from "@/components/Manifest";
import Services from "@/components/Services";
import Thesis from "@/components/Thesis";
import Figs from "@/components/Figs";
import Guide from "@/components/Guide";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <>
      <Ticker t={t} />
      <Nav t={t} locale={lang} />
      <main id="topo">
        <Hero t={t} />
        <Clients t={t} />
        <Manifest t={t} />
        <Services t={t} />
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
