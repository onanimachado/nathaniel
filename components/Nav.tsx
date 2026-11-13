import Image from "next/image";
import { hrefFor, localeInfo, locales, type Dict, type Locale, type Page } from "@/lib/i18n";
import s from "./Nav.module.css";

function Roll({ children }: { children: string }) {
  return (
    <span className={s.roll}>
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

export default function Nav({ t, locale, page }: { t: Dict; locale: Locale; page: Page }) {
  const home = hrefFor(locale);
  return (
    <header className={s.nav}>
      <div className={`wrap ${s.inner}`}>
        <a href={home} aria-label={t.nav.homeLabel}>
          <Image src="/brand/monograma-sombra-rosa.svg" alt="" width={38} height={43} priority />
        </a>
        <div className={s.mid}>
          <span>{t.nav.brand}</span>
          <i />
          <span>{t.nav.tagline}</span>
        </div>
        <ul>
          <li className={s.link}><a href={`${home === "/" ? "" : home}/#servicos`}><Roll>{t.nav.services}</Roll></a></li>
          <li className={s.link}><a href={hrefFor(locale, "trabalhos")} aria-current={page === "trabalhos" ? "page" : undefined}><Roll>{t.nav.works}</Roll></a></li>
          <li className={s.link}><a href={hrefFor(locale, "sobre")} aria-current={page === "sobre" ? "page" : undefined}><Roll>{t.nav.about}</Roll></a></li>
          <li>
            <nav className={s.langs} aria-label={t.nav.language}>
              {locales.map((l) => (
                <a
                  key={l}
                  href={hrefFor(l, page)}
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
          <li><button type="button" className="pill" data-panel-open>{t.nav.cta}</button></li>
        </ul>
      </div>
    </header>
  );
}
