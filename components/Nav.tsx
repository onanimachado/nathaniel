import Image from "next/image";
import { localeInfo, locales, pathFor, type Dict, type Locale } from "@/lib/i18n";
import s from "./Nav.module.css";

function Roll({ children }: { children: string }) {
  return (
    <span className={s.roll}>
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

export default function Nav({ t, locale }: { t: Dict; locale: Locale }) {
  return (
    <header className={s.nav}>
      <div className={`wrap ${s.inner}`}>
        <a href="#topo" aria-label={t.nav.homeLabel}>
          <Image src="/brand/monograma-sombra-rosa.svg" alt="" width={38} height={43} priority />
        </a>
        <div className={s.mid}>
          <span>{t.nav.brand}</span>
          <i />
          <span>{t.nav.tagline}</span>
        </div>
        <ul>
          <li className={s.link}><a href="#servicos"><Roll>{t.nav.services}</Roll></a></li>
          <li className={s.link}><a href="#programacao"><Roll>{t.nav.works}</Roll></a></li>
          <li>
            <nav className={s.langs} aria-label={t.nav.language}>
              {locales.map((l) => (
                <a
                  key={l}
                  href={pathFor(l)}
                  hrefLang={localeInfo[l].htmlLang}
                  lang={localeInfo[l].htmlLang}
                  aria-label={localeInfo[l].name}
                  aria-current={l === locale ? "page" : undefined}
                  className={l === locale ? s.langActive : undefined}
                >
                  {localeInfo[l].label}
                </a>
              ))}
            </nav>
          </li>
          <li><a className="pill" href="#contato">{t.nav.cta}</a></li>
        </ul>
      </div>
    </header>
  );
}
