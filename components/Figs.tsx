import Image from "next/image";
import { figs } from "@/content/site";
import s from "./Figs.module.css";

export default function Figs() {
  return (
    <section className={s.figs} aria-labelledby="figs-title">
      <div className="wrap">
        <div className="head2">
          <h2 className="serif" id="figs-title">Manual de instruções do clima</h2>
          <p>Três coisas que vêm de fábrica em todo projeto Muito Bala.</p>
        </div>
        {figs.map((f) => (
          <div className={s.fig} key={f.fig}>
            <div className={s.media} data-parallax-img>
              <Image src={f.image} alt={f.alt} fill sizes="(max-width: 820px) 100vw, 50vw" />
              <span className={s.cap}>FIG. {f.fig} · {f.caption}</span>
            </div>
            <div className={s.body}>
              <span className="tag">{f.pillar}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
