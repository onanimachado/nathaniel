import type { Dict } from "@/lib/i18n";
import s from "./Manifest.module.css";

/*
 * Seção que antes trazia o manifesto: agora só "O seu paraíso audiovisual.", em duas linhas,
 * na fonte dos títulos, Rocky (pedido do Nani; o "Welcome To the Groovy Beach." que ficava aqui
 * foi para o título da seção de serviços). O texto completo do manifesto continua guardado em
 * manifest.stanzas nos arquivos de idioma, caso volte a ser usado.
 */
export default function Manifest({ t }: { t: Dict }) {
  const [l1, l2] = t.manifest.beach;
  return (
    <section className={s.manifest} id="manifesto" data-bg="beige" aria-label={`${l1} ${l2}`}>
      <div className="wrap">
        <p className={s.beach}>
          <span>{l1}</span>
          <span>{l2}</span>
        </p>
      </div>
    </section>
  );
}
