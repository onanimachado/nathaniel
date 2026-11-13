import type { Dict } from "@/lib/i18n";
import s from "./Thesis.module.css";

export default function Thesis({ t }: { t: Dict }) {
  const th = t.thesis;
  return (
    <section className={s.thesis} data-bg="blue" aria-labelledby="thesis-title">
      <div className="wrap">
        <h2 className={`serif ${s.h}`} id="thesis-title" data-parallax="-50">
          {th.before} <span className="script">{th.script}</span> {th.after}
        </h2>
        <p className={s.sign}>{th.sign}</p>
      </div>
    </section>
  );
}
