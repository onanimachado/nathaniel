import Image from "next/image";
import { services, contact } from "@/content/site";
import { hrefFor, type Dict, type Locale } from "@/lib/i18n";
import s from "./Footer.module.css";

export default function Footer({ t, locale }: { t: Dict; locale: Locale }) {
  const home = hrefFor(locale);
  const f = t.footer;
  return (
    <footer className={s.footer}>
      <div className="wrap">
        <div className={s.top}>
          <div>
            <Image src="/brand/logo-rosa.svg" alt="Muito Bala" width={1256} height={1226} />
          </div>
          <h2>{f.titleBefore} <span className="script">{f.titleScript}</span></h2>
        </div>
        <div className={s.grid}>
          <div>
            <h3>{f.services}</h3>
            <ul>{services.map((sv) => <li key={sv.id}>{t.services.items[sv.id].title.replace(/\.$/, "")}</li>)}</ul>
          </div>
          <div>
            <h3>{f.navigate}</h3>
            <ul>
              <li><a href={`${home === "/" ? "" : home}/#servicos`}>{t.nav.services}</a></li>
              <li><a href={hrefFor(locale, "trabalhos")}>{t.nav.works}</a></li>
              <li><a href={hrefFor(locale, "sobre")}>{t.nav.about}</a></li>
              <li><button type="button" className={s.linkBtn} data-panel-open>{f.quote}</button></li>
            </ul>
          </div>
          <div>
            <h3>{f.social}</h3>
            <ul>
              <li>Instagram {contact.instagram ?? <span className="todo">{f.atToDefine}</span>}</li>
              <li>YouTube</li>
              <li>Spotify</li>
            </ul>
          </div>
          <div>
            <h3>{f.talk}</h3>
            <ul>
              <li>{contact.email ?? <>{f.email} <span className="todo">{f.toDefine}</span></>}</li>
              <li>{contact.city}</li>
            </ul>
          </div>
        </div>
        <div className={s.bottom}>
          <span>{f.sign}</span>
          <span>© {new Date().getFullYear()} Muito Bala™</span>
        </div>
      </div>
    </footer>
  );
}
