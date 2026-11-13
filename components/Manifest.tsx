import type { Dict } from "@/lib/i18n";
import s from "./Manifest.module.css";

/* Manifesto da marca. Texto do Nani, preservado literalmente em português (content/locales). */
export default function Manifest({ t }: { t: Dict }) {
  const m = t.manifest;
  return (
    <section className={s.manifest} data-bg="beige" id="manifesto" aria-labelledby="manifest-title">
      <div className={`wrap ${s.grid}`}>
        <div className={s.side}>
          <p className={s.kicker}>{m.kicker}</p>
          <h2 id="manifest-title" className={`serif ${s.title}`}>{m.title}</h2>
        </div>
        <div className={s.body}>
          {m.stanzas.map((stanza, i) => (
            <div className={`${s.stanza} ${i === 0 ? s.lead : ""}`} key={i}>
              {stanza.map((line, j) => <p key={j}>{line}</p>)}
            </div>
          ))}
          <p className={`script ${s.welcome}`}>{m.welcome}</p>
          <p className={s.sign}>{m.sign}</p>
        </div>
      </div>
    </section>
  );
}
