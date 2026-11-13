"use client";

import Image from "next/image";
import { useRef } from "react";
import { hero } from "@/content/site";
import type { Dict } from "@/lib/i18n";
import s from "./Hero.module.css";

/*
 * Abertura: só o logo, no centro. Atrás roda o vídeo (hero.video em content/site.ts),
 * como na abertura do Vacation. Sem vídeo, fica o degradê da capa do MIV.
 */
export default function Hero({ t }: { t: Dict }) {
  const logo = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLElement>) {
    if (!logo.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    logo.current.style.transform = `translate(${x * 14}px, ${y * 10}px)`;
  }

  return (
    <section className={s.hero} onPointerMove={onMove} aria-labelledby="hero-title">
      {hero.video && (
        <video className={s.video} autoPlay muted loop playsInline preload="auto" poster={hero.poster ?? undefined} aria-hidden="true">
          <source src={hero.video} type="video/mp4" />
        </video>
      )}
      {hero.video && <div className={s.tint} aria-hidden="true" />}
      <h1 id="hero-title" className="sr-only">{t.hero.title}</h1>
      <div className={s.center} data-parallax="40">
        <div className={s.logo} ref={logo}>
          <Image src="/brand/logo-azul.svg" alt={t.hero.title} width={1256} height={1226} priority />
        </div>
        {/* "Porto Alegre, BRA." em leve arco, no estilo do "Miami, U.S.A." do Vacation */}
        <svg className={s.place} viewBox="0 0 640 150" role="img" aria-label={t.hero.place}>
          <defs>
            <path id="place-arc" d="M 30 132 Q 300 60 620 52" />
          </defs>
          <text>
            <textPath href="#place-arc">{t.hero.place}</textPath>
          </text>
        </svg>
      </div>
    </section>
  );
}
