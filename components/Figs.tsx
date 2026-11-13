import Image from "next/image";
import { figs } from "@/content/site";
import type { Dict } from "@/lib/i18n";
import s from "./Figs.module.css";

export default function Figs({ t }: { t: Dict }) {
  return (
    <section className={s.figs} aria-labelledby="figs-title">
      <div className="wrap">
        <div className="head2">
          <h2 className="serif" id="figs-title">{t.figs.title}</h2>
          <p>{t.figs.intro}</p>
        </div>
        {figs.map((f, i) => {
          const tx = t.figs.items[i];
          return (
            <div className={s.fig} key={f.fig}>
              <div className={s.media} data-parallax-img>
                <Image src={f.image} alt={tx.alt} fill sizes="(max-width: 820px) 100vw, 50vw" />
                <span className={s.cap}>FIG. {f.fig} · {tx.caption}</span>
              </div>
              <div className={s.body}>
                <span className="tag">{tx.pillar}</span>
                <h3>{tx.title}</h3>
                <p>{tx.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
