import type { Dict } from "@/lib/i18n";
import s from "./Manifest.module.css";

export default function Manifest({ t }: { t: Dict }) {
  const m = t.manifest;
  return (
    <section className={s.manifest} aria-labelledby="clima-title">
      <div className="wrap">
        <h2 className={`serif ${s.big}`} id="clima-title" data-drift="60">{m.title}</h2>
        <hr className={s.rule} />
        <div className={s.grid}>
          <p className={`serif ${s.h}`}>
            {m.headBefore} <span className="script">{m.headScript}</span>
          </p>
          <div className={s.text}>
            <p>{m.p1}</p>
            <p>{m.p2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
