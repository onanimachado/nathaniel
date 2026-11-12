import { works } from "@/content/site";
import s from "./Guide.module.css";

export default function Guide() {
  return (
    <section className={s.guide} id="programacao" aria-labelledby="guide-title">
      <div className="wrap">
        <div className="head2">
          <h2 className="serif" id="guide-title">Grade de programação</h2>
          <p>
            Os trabalhos entram como numa grade de TV: horário, título e o que a gente fez.{" "}
            <span className="todo">EXEMPLOS DE LAYOUT</span>
          </p>
        </div>
        <ol className={s.list}>
          {works.map((w) => (
            <li className={s.row} key={w.time}>
              <time>{w.time}</time>
              <div>
                <h3>{w.title}</h3>
                <p>{w.meta}</p>
              </div>
              <span className={`pill pill--${w.pill}`}>{w.service}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
