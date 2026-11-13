import type { Dict, Locale, Page } from "@/lib/i18n";
import Ticker from "./Ticker";
import Nav from "./Nav";
import Footer from "./Footer";
import Panel from "./Panel";
import Experience from "./Experience";

/* Estrutura comum a todas as páginas: faixa do topo, menu, rodapé, painel de orçamento e pontinhos. */
export default function Shell({ t, locale, page, children }: { t: Dict; locale: Locale; page: Page; children: React.ReactNode }) {
  return (
    <>
      <Ticker t={t} />
      <Nav t={t} locale={locale} page={page} />
      <main id="topo">{children}</main>
      <Footer t={t} locale={locale} />
      <nav className="dots" data-dots aria-label={t.nav.chapters} />
      <Panel t={t} />
      <Experience />
    </>
  );
}
