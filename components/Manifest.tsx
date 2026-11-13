import type { Dict } from "@/lib/i18n";
import s from "./Manifest.module.css";

/*
 * Seção que antes trazia o manifesto: agora só "beach of vibe production", em duas linhas,
 * na letra script da marca (pedido do Nani). O texto completo do manifesto continua
 * guardado em manifest.stanzas nos arquivos de idioma, caso volte a ser usado.
 */
export default function Manifest({ t }: { t: Dict }) {
  const [l1, l2] = t.manifest.beach;
  return (
    <section className={s.manifest} id="manifesto" data-bg="beige" aria-label={`${l1} ${l2}`}>
      <div className="wrap">
        <p className={`script ${s.beach}`}>
          <span>{l1}</span>
          <span>{l2}</span>
        </p>
      </div>
    </section>
  );
}
