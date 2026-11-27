import { works } from "@/content/site";
import type { Dict } from "@/lib/i18n";
import s from "./Guide.module.css";

/* "Previsão do tempo" (antes "Grade de programação"): a agenda, com data, evento e botão para assistir ou comprar ingresso. Item "Agenda" do menu leva aqui. */
export default function Guide({ t }: { t: Dict }) {
  return (
    <section className={s.guide} data-bg="pink" id="agenda" aria-labelledby="guide-title">
      <div className="wrap">
        <div className="head2">
          <h2 className="serif" id="guide-title">{t.guide.title}</h2>
          <p>{t.guide.intro}</p>
        </div>
        <ol className={s.list}>
          {works.map((w, i) => {
            const tx = t.guide.items[i] as { kicker?: string; title: string; meta?: string; date: string; cta: string };
            return (
              <li className={s.row} key={w.date}>
                <time dateTime={w.date}>{tx.date}</time>
                <div>
                  {tx.kicker && <p className={s.kicker}>{tx.kicker}:</p>}
                  <h3>{tx.title}</h3>
                  {tx.meta && <p>{tx.meta}</p>}
                </div>
                {w.href ? (
                  <a className={`pill pill--${w.pill}`} href={w.href} target="_blank" rel="noopener noreferrer">{tx.cta} ↗</a>
                ) : (
                  <span className={`pill pill--${w.pill} ${s.soon}`} data-soon={t.guide.soon} tabIndex={0} aria-label={`${tx.cta}. ${t.guide.soon}`}>{tx.cta}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
