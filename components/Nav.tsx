import Image from "next/image";
import { login } from "@/content/site";
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

/* Entrada de login: link quando o endereço existir; enquanto não, botão que avisa "Em breve". */
function Enter({ href, label, title, soon, className }: { href: string | null; label: string; title: string; soon: string; className: string }) {
  if (href) return <a className={className} href={href} aria-label={title}>{label}</a>;
  return <button type="button" className={className} aria-label={`${title}. ${soon}`} aria-disabled="true" data-soon={soon}>{label}</button>;
}

export default function Nav({ t, locale }: { t: Dict; locale: Locale }) {
  const n = t.nav;
  const entries = [
    { key: "partner", href: login.partner, label: n.partner, title: n.partnerLabel },
    { key: "artist", href: login.artist, label: n.artist, title: n.artistLabel },
  ];
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
          {entries.map((e) => (
            <li key={e.key} className={s.enter}>
              <Enter className={`pill ${s.ghost}`} href={e.href} label={e.label} title={e.title} soon={n.soon} />
            </li>
          ))}
          <li className={s.enterMenu}>
            <details>
              <summary className={`pill ${s.ghost}`}>{n.login}</summary>
              <div className={s.menu}>
                {entries.map((e) => (
                  <Enter key={e.key} className={`pill ${s.ghost}`} href={e.href} label={e.label} title={e.title} soon={n.soon} />
                ))}
              </div>
            </details>
          </li>
          <li><a className="pill" href="#contato">{t.nav.cta}</a></li>
        </ul>
      </div>
    </header>
  );
}
