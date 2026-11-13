import Image from "next/image";
import { coupon, services, type Service } from "@/content/site";
import type { Dict } from "@/lib/i18n";
import s from "./Services.module.css";

/*
 * O que a gente faz: uma fila de cupons de revista, no espírito dos anúncios impressos
 * do Vacation. O título de cada cupom é o próprio serviço, sempre em destaque e no mesmo
 * lugar; os detalhes de anúncio (24 FPS, 36 POSES, passo a passo, letra miúda) vêm depois.
 */

/* Botão com a cor complementar ao fundo do cupom (MIV p. 10). */
const pillFor: Record<Service["card"], string> = { yellow: "", white: "pill--blue", pink: "pill--blue", blue: "" };

/* Código de barras decorativo, gerado a partir dos dígitos. */
function Barcode({ digits }: { digits: string }) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  const seq = digits.replace(/\D/g, "").split("").map(Number);
  [1, 1, 1].forEach((w) => { bars.push({ x, w }); x += w * 2; });
  seq.forEach((d, i) => {
    const pattern = [(d % 3) + 1, ((d + i) % 2) + 1, ((d * 7) % 3) + 1];
    pattern.forEach((w, j) => { if (j % 2 === 0) bars.push({ x, w }); x += w + 1; });
  });
  [1, 1, 1].forEach((w) => { bars.push({ x, w }); x += w * 2; });
  return (
    <svg className={s.barcode} viewBox={`0 0 ${x} 40`} preserveAspectRatio="none" aria-hidden="true">
      {bars.map((b, i) => <rect key={i} x={b.x} y={0} width={b.w} height={40} fill="currentColor" />)}
    </svg>
  );
}

export default function Services({ t }: { t: Dict }) {
  const it = t.services.items;

  /* Cabeçalho do anúncio, foto com selo e detalhes de cada serviço. */
  const parts: Record<Service["id"], { sub: string; stamp?: React.ReactNode; extra: React.ReactNode }> = {
    video: {
      sub: it.video.ad.headline,
      stamp: <span className={`${s.stamp} ${s.stampPink}`}>{it.video.ad.big}</span>,
      extra: (
        <>
          <ul className={s.formats} aria-hidden="true">{coupon.formats.map((f) => <li key={f}>{f}</li>)}</ul>
          <p className={s.timecode} aria-hidden="true">{coupon.timecode}</p>
          <p className={s.fine}>{it.video.ad.fine}</p>
        </>
      ),
    },
    foto: {
      sub: it.foto.ad.headline,
      stamp: (
        <span className={`${s.stamp} ${s.stampBlue}`}>
          {it.foto.ad.big}
          <small>{it.foto.ad.unit}</small>
        </span>
      ),
      extra: (
        <>
          <p className={s.fine}>{it.foto.ad.fine}</p>
          <div className={s.barRow} aria-hidden="true">
            <Barcode digits={coupon.barcode} />
            <span>{coupon.code}</span>
          </div>
        </>
      ),
    },
    musica: {
      sub: it.musica.ad.headline,
      extra: (
        <>
          <p className={s.badge}>{it.musica.ad.badge}</p>
          <ol className={s.steps}>{it.musica.ad.steps.map((st, i) => <li key={i}>{st}</li>)}</ol>
        </>
      ),
    },
    design: {
      sub: it.design.ad.tagline,
      extra: (
        <>
          <p className={s.feat}>{it.design.ad.featuring}</p>
          <p className={s.fine}>{it.design.ad.note}</p>
        </>
      ),
    },
  };

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
            {services.map((sv, i) => {
              const p = parts[sv.id];
              return (
                <li className={s.cell} key={sv.id}>
                  <article className={`${s.coupon} ${s[sv.card]}`} aria-labelledby={`ad-${sv.id}`}>
                    <p className={s.fig} aria-hidden="true">FIG. {i + 1}</p>
                    <h3 id={`ad-${sv.id}`} className={s.title}>{it[sv.id].title}</h3>
                    <p className={s.sub}>{p.sub}</p>
                    <div className={s.photo}>
                      <Image src={sv.image} alt="" fill sizes="(max-width: 1100px) 300px, 22vw" />
                      {p.stamp}
                    </div>
                    <div className={s.extra}>{p.extra}</div>
                    <a className={`pill ${pillFor[sv.card]} ${s.cta}`} href="#contato">{it[sv.id].cta}</a>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
        <p className={s.hint}>{t.services.hint}</p>
      </div>
    </section>
  );
}
