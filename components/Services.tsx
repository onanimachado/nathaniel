import Image from "next/image";
import { coupon, services, type Service } from "@/content/site";
import type { Dict } from "@/lib/i18n";
import s from "./Services.module.css";

/*
 * O que a gente faz, em forma de cupons de revista recortáveis, no espírito dos
 * anúncios impressos do Vacation. Cada serviço tem um layout próprio.
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

function Cta({ card, label }: { card: Service["card"]; label: string }) {
  return <a className={`pill ${pillFor[card]} ${s.cta}`} href="#contato">{label}</a>;
}

export default function Services({ t }: { t: Dict }) {
  const items = t.services.items;
  const byId = Object.fromEntries(services.map((sv) => [sv.id, sv])) as Record<Service["id"], Service>;

  const ads: Record<Service["id"], React.ReactNode> = {
    video: (
      <article className={`${s.coupon} ${s.video}`} aria-labelledby="ad-video">
        <div className={s.videoPhoto}>
          <Image src={byId.video.image} alt="" fill sizes="(max-width: 860px) 90vw, 360px" />
        </div>
        <div className={s.videoSide}>
          <p className={s.videoBig}>{items.video.ad.big}</p>
          <ul className={s.formats} aria-hidden="true">{coupon.formats.map((f) => <li key={f}>{f}</li>)}</ul>
          <h3 id="ad-video" className={s.videoTitle}>{items.video.title}</h3>
          <p className={s.kicker}>{items.video.ad.kicker}</p>
        </div>
        <p className={s.timecode} aria-hidden="true">{coupon.timecode}</p>
        <div className={s.footRow}>
          <p className={s.fine}>{items.video.ad.headline}. {items.video.ad.fine}</p>
          <Cta card="yellow" label={items.video.cta} />
        </div>
      </article>
    ),
    foto: (
      <article className={`${s.coupon} ${s.foto}`} aria-labelledby="ad-foto">
        <div className={s.fotoText}>
          <p className={s.fotoBig}>{items.foto.ad.big}<span className={s.unit}>{items.foto.ad.unit}</span></p>
          <h3 id="ad-foto" className={s.fotoHead}>{items.foto.ad.headline}</h3>
          <p className={s.legal}>{items.foto.ad.fine}</p>
        </div>
        <div className={s.fotoSide}>
          <p className={s.code} aria-hidden="true">{coupon.code}</p>
          <div className={s.fotoPhoto}>
            <Image src={byId.foto.image} alt="" fill sizes="(max-width: 860px) 60vw, 240px" />
          </div>
          <Barcode digits={coupon.barcode} />
          <p className={s.barDigits} aria-hidden="true">{coupon.barcode}</p>
          <Cta card="white" label={items.foto.cta} />
        </div>
        <p className="sr-only">{items.foto.title}</p>
      </article>
    ),
    musica: (
      <article className={`${s.coupon} ${s.musica}`} aria-labelledby="ad-musica">
        <div className={s.musicaText}>
          <h3 id="ad-musica" className={s.musicaHead}>{items.musica.ad.headline}</h3>
          <p className={s.badge}>{items.musica.ad.badge}</p>
          <ol className={s.steps}>{items.musica.ad.steps.map((st, i) => <li key={i}>{st}</li>)}</ol>
          <Cta card="pink" label={items.musica.cta} />
        </div>
        <div className={s.musicaPhoto}>
          <Image src={byId.musica.image} alt="" fill sizes="(max-width: 860px) 70vw, 260px" />
        </div>
        <p className="sr-only">{items.musica.title}</p>
      </article>
    ),
    design: (
      <article className={`${s.coupon} ${s.design}`} aria-labelledby="ad-design">
        <div className={s.designPhoto}>
          <Image src={byId.design.image} alt="" fill sizes="(max-width: 860px) 90vw, 320px" />
        </div>
        <div className={s.designText}>
          <h3 id="ad-design" className={s.designWord}>{items.design.ad.word}</h3>
          <p className={s.designTag}>{items.design.ad.tagline}</p>
          <p className={s.designFeat}>{items.design.ad.featuring}</p>
          <Cta card="blue" label={items.design.cta} />
        </div>
        <p className={s.note}>{items.design.ad.note}</p>
      </article>
    ),
  };

  return (
    <section className={s.services} id="servicos" aria-labelledby="units-title">
      <div className="wrap">
        <div className="head2">
          <h2 className="serif" id="units-title">{t.services.titleLine1}<br />{t.services.titleLine2}</h2>
          <p>{t.services.intro}</p>
        </div>
        <div className={s.sheet}>
          <span className={s.scissors} aria-hidden="true">✂</span>
          {services.map((sv) => <div className={s.cell} key={sv.id}>{ads[sv.id]}</div>)}
        </div>
        <p className={s.hint}>{t.services.hint}</p>
      </div>
    </section>
  );
}
