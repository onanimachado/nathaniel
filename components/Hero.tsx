import Image from "next/image";
import { hero } from "@/content/site";
import type { Dict } from "@/lib/i18n";
import s from "./Hero.module.css";

/*
 * Abertura: só o logo, no centro. Atrás roda o vídeo (hero.video em content/site.ts),
 * como na abertura do Vacation. Sem vídeo, fica o degradê da capa do MIV.
 */
export default function Hero({ t }: { t: Dict }) {
  return (
    <div className={s.hero} data-hero>
      {hero.video && (
        <video className={s.video} autoPlay muted loop playsInline preload="auto" poster={hero.poster ?? undefined} aria-hidden="true">
          <source src={hero.video} type="video/mp4" />
        </video>
      )}
      {hero.video && <div className={s.tint} aria-hidden="true" />}
      <h1 id="hero-title" className="sr-only">{t.hero.title}</h1>
      <div className={s.center}>
        <div className={s.logo} data-hero-logo>
          <Image src="/brand/logo-azul.svg" alt={t.hero.title} width={1256} height={1226} priority />
        </div>
      </div>
    </div>
  );
}
