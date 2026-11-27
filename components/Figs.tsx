import Image from "next/image";
import { figs } from "@/content/site";
import type { Dict } from "@/lib/i18n";
import Loop from "./Loop";
import s from "./Figs.module.css";

/*
 * Manual de instruções do clima / portfólio: uma fila infinita que desliza para o lado
 * (pedido do Nani, para caber o portfólio inteiro). Anda sozinha devagar, para com o mouse em cima
 * e pode ser arrastada, rolada para o lado ou deslizada no celular; ao chegar no fim, recomeça.
 */
export default function Figs({ t }: { t: Dict }) {
  const cards = figs.map((f, i) => {
    const tx = t.figs.items[i];
    return (
      <div className={s.fig} key={f.fig}>
        <div className={s.media}>
          <Image src={f.image} alt={tx.alt} fill sizes="(max-width: 860px) 78vw, 28vw" draggable={false} />
          <span className={s.cap}>FIG. {f.fig} · {tx.caption}</span>
        </div>
        <div className={s.body}>
          <span className="tag">{tx.pillar}</span>
          <h3>{tx.title}</h3>
          <p>{tx.text}</p>
        </div>
      </div>
    );
  });
  return (
    <section className={s.figs} data-bg="white" id="portfolio" aria-labelledby="figs-title">
      <div className="wrap">
        <div className="head2">
          <h2 className="serif" id="figs-title">{t.figs.title}</h2>
          <p>{t.figs.intro}</p>
        </div>
      </div>
      <Loop className={s.loop} trackClassName={s.track}>{cards}</Loop>
    </section>
  );
}
