import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifest from "@/components/Manifest";
import UnitsTable from "@/components/UnitsTable";
import Thesis from "@/components/Thesis";
import Figs from "@/components/Figs";
import Posts from "@/components/Posts";
import Guide from "@/components/Guide";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";

export default function Home() {
  return (
    <>
      <Ticker />
      <Nav />
      <main id="topo">
        <Hero />
        <Manifest />
        <UnitsTable />
        <Thesis />
        <Figs />
        <Posts />
        <Guide />
        <Contact />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
