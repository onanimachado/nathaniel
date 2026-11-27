import { works } from "@/content/site";
import type { Dict } from "@/lib/i18n";
import s from "./Guide.module.css";

/* "Previsão do tempo" (antes "Grade de programação"): a agenda, no formato de grade de TV. Item "Agenda" do menu leva aqui. */
export default function Guide({ t }: { t: Dict }) {
  return (
    <section className={s.guide} data-bg="pink" id="agenda" aria-labelledby="guide-title">
      <div className="wrap">
        <div className="head2">
          <h2 className="serif" id="guide-title">{t.guide.title}</h2>
          <p>
            {t.guide.intro} <span className="todo">{t.guide.todo}</span>
          </p>
        </div>
        <ol className={s.list}>
          {works.map((w, i) => {
            const tx = t.guide.items[i];
            return (
              <li className={s.row} key={w.time}>
                <time>{w.time}</time>
                <div>
                  <h3>{tx.title}</h3>
                  <p>{tx.meta}</p>
                </div>
                <span className={`pill pill--${w.pill}`}>{tx.service}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
