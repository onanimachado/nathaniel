import Image from "next/image";
import { contact, playlist, services } from "@/content/site";
import type { Dict } from "@/lib/i18n";
import NewsletterForm from "./NewsletterForm";
import s from "./Footer.module.css";

/* Rodapé no formato do rodapé do Vacation: grade com bordas, newsletter, letra miúda e links com quadradinhos. */
export default function Footer({ t }: { t: Dict }) {
  const f = t.footer;
  const email = contact.email ?? f.toDefine;
  const fill = (text: string) => {
    const [a, b] = text.split("{email}");
    return <>{a}<strong>{email}</strong>{b}</>;
  };
  const social: { label: string; href?: string }[] = [
    { label: f.social.instagram, href: contact.instagram ? `https://instagram.com/${contact.instagram.replace("@", "")}` : undefined },
    { label: f.social.youtube },
    { label: f.social.spotify, href: playlist.url },
    { label: f.social.whatsapp, href: contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : undefined },
    { label: f.social.work },
  ];

  return (
    <footer className={s.footer} data-bg="blue">
      <div className="wrap">
        <div className={s.board}>
          <div className={s.top}>
            <div className={s.colWide}>
              <p className={`${s.cell} ${s.head} ${s.brand}`}>
                <span>{t.nav.brand}</span>
                <i aria-hidden="true" />
                <span>{t.nav.tagline}</span>
                <Image className={s.mark} src="/brand/monograma-sombra-rosa.svg" alt="" width={26} height={30} />
              </p>
              <div className={`${s.cell} ${s.info}`}>
                <p>{fill(f.info)}</p>
                <p>{fill(f.jobs)}</p>
              </div>
            </div>
            <div className={s.col}>
              <p className={`${s.cell} ${s.head}`}>{f.services}</p>
              <ul className={`${s.cell} ${s.links}`}>
                {services.map((sv) => <li key={sv.id}><a href="#servicos">{t.services.items[sv.id].title.replace(/\.$/, "")}</a></li>)}
              </ul>
            </div>
            <div className={s.col}>
              <p className={`${s.cell} ${s.head}`}>{f.company}</p>
              <ul className={`${s.cell} ${s.links}`}>
                <li><a href="#programacao">{f.links.works}</a></li>
                <li><a href="#playlist">{f.links.playlist}</a></li>
                <li><a href="#contato">{f.links.quote}</a></li>
              </ul>
            </div>
          </div>
          <NewsletterForm label={f.newsletter} placeholder={f.emailPlaceholder} submit={f.submit} missing={f.newsletterMissing} invalid={f.newsletterInvalid} />
          <p className={`${s.cell} ${s.fine}`}>{f.fine}</p>
          <ul className={`${s.cell} ${s.social}`}>
            {social.map((it) => (
              <li key={it.label}>
                <span className={s.box} aria-hidden="true" />
                {it.href ? <a href={it.href} target="_blank" rel="noopener noreferrer">{it.label}</a> : <span>{it.label}</span>}
              </li>
            ))}
          </ul>
        </div>
        <div className={s.bottom}>
          <Image className={s.logo} src="/brand/logo-rosa.svg" alt="Muito Bala" width={1256} height={1226} />
          <p>{f.sign}</p>
          <p>© {new Date().getFullYear()} {f.address}</p>
        </div>
      </div>
    </footer>
  );
}
