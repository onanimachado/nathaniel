import Image from "next/image";
import { services } from "@/content/site";
import { hrefFor, type Dict, type Locale } from "@/lib/i18n";
import Hero from "./Hero";
import Clients from "./Clients";
import s from "./Chapters.module.css";

/* Botão com a cor complementar ao fundo do capítulo (MIV p. 10). */
const pillFor = { yellow: "", white: "pill--blue", pink: "pill--blue", blue: "" } as const;

/*
 * A home em capítulos de tela cheia que se empilham com a rolagem (interação do Jacob & Co),
 * com a cara do Vacation: cores da paleta, retícula de impressão, moldura pontilhada de cupom.
 * O movimento (empilhar, letras subindo, pontinhos) fica em lib/experience.ts.
 */
export default function Chapters({ t, locale }: { t: Dict; locale: Locale }) {
  const total = services.length + 2;
  const num = (i: number) => `${String(i).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const it = t.services.items;

  return (
    <div className={s.chapters}>
      <section className={`${s.chapter} ${s.opening}`} data-chapter={t.nav.opening} aria-labelledby="hero-title">
        <div className={s.inner} data-chapter-inner>
          <Hero t={t} />
          <Clients t={t} />
        </div>
      </section>

      {services.map((sv, i) => {
        const tx = it[sv.id];
        return (
          <section
            key={sv.id}
            id={i === 0 ? "servicos" : undefined}
            className={`${s.chapter} ${s.service} ${s[sv.card]}`}
            data-chapter={tx.title.replace(/\.$/, "")}
            aria-labelledby={`ch-${sv.id}`}
          >
            <div className={s.inner} data-chapter-inner>
              <div className={s.bg} data-chapter-bg>
                <Image src={sv.image} alt="" fill sizes="100vw" />
              </div>
              <div className={s.wash} aria-hidden="true" />
              <div className={s.frame} aria-hidden="true" />
              <div className={s.content}>
                <p className={s.meta} data-reveal>
                  <span className={s.num}>{num(i + 2)}</span>
                  <span>{tx.line}</span>
                </p>
                <h2 id={`ch-${sv.id}`} className={s.title} data-split>{tx.title}</h2>
                <div className={s.actions} data-reveal>
                  <button type="button" className={`pill ${pillFor[sv.card]}`} data-panel-open>{t.nav.cta}</button>
                  <a className={s.more} href={hrefFor(locale, "trabalhos")}>{tx.cta} →</a>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className={`${s.chapter} ${s.contact}`} data-chapter={t.nav.contactChapter} aria-labelledby="contact-title">
        <div className={s.inner} data-chapter-inner>
          <div className={s.frame} aria-hidden="true" />
          <div className={s.contactBody}>
            {/* Composição tipográfica do MIV p. 18 */}
            <div className={s.dont} aria-hidden="true">
              <span className={s.l1}>Don’t TALK To Us</span>
              <span className={s.l2}>UNLESS <span className="script">You</span> ARE</span>
              <span className={s.l3}>“Muito Bala”</span>
            </div>
            <h2 id="contact-title" className={s.contactTitle} data-reveal>{t.contact.title}</h2>
            <p className={s.contactIntro} data-reveal>{t.contact.intro}</p>
            <div data-reveal>
              <button type="button" className="pill" data-panel-open>{t.contact.cta}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
