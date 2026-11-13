import Image from "next/image";
import { services, type Service } from "@/content/site";
import type { Dict } from "@/lib/i18n";
import s from "./Services.module.css";

/*
 * O que a gente faz: uma fila de cupons recortáveis, no espírito dos anúncios impressos
 * do Vacation, mas enxutos. Cada cupom tem só o essencial: foto, nome do serviço em
 * destaque, uma linha curta e o botão.
 */

/* Botão com a cor complementar ao fundo do cupom (MIV p. 10). */
const pillFor: Record<Service["card"], string> = { yellow: "", white: "pill--blue", pink: "pill--blue", blue: "" };

export default function Services({ t }: { t: Dict }) {
  const it = t.services.items;
  return (
    <section className={s.services} id="servicos" aria-labelledby="units-title">
      <div className="wrap">
        <div className={`head2 ${s.head}`}>
          <h2 className="serif" id="units-title">{t.services.titleLine1}<br />{t.services.titleLine2}</h2>
          <p>{t.services.intro}</p>
        </div>
        <div className={s.sheet}>
          <span className={s.scissors} aria-hidden="true">✂</span>
          <ul className={s.row}>
            {services.map((sv) => (
              <li className={s.cell} key={sv.id}>
                <article className={`${s.coupon} ${s[sv.card]}`} aria-labelledby={`ad-${sv.id}`}>
                  <div className={s.photo}>
                    <Image src={sv.image} alt="" fill sizes="(max-width: 1100px) 280px, 22vw" />
                  </div>
                  <h3 id={`ad-${sv.id}`} className={s.title}>{it[sv.id].title}</h3>
                  <p className={s.line}>{it[sv.id].line}</p>
                  <a className={`pill ${pillFor[sv.card]} ${s.cta}`} href="#contato">{it[sv.id].cta}</a>
                </article>
              </li>
            ))}
          </ul>
        </div>
        <p className={s.hint}>{t.services.hint}</p>
      </div>
    </section>
  );
}
