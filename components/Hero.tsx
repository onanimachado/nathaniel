"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import s from "./Hero.module.css";

function useTimecode() {
  const [tc, setTc] = useState("0:00:00");
  useEffect(() => {
    const t0 = Date.now();
    const id = setInterval(() => {
      const sec = Math.floor((Date.now() - t0) / 1000);
      setTc(`${Math.floor(sec / 3600)}:${String(Math.floor(sec / 60) % 60).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return tc;
}

export default function Hero() {
  const tc = useTimecode();
  const logo = useRef<HTMLDivElement>(null);
  const today = new Date()
    .toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    .replace(",", "")
    .toUpperCase();

  function onMove(e: React.PointerEvent<HTMLElement>) {
    if (!logo.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    logo.current.style.transform = `translate(${x * 14}px, ${y * 10}px)`;
  }

  return (
    <section className={s.hero} onPointerMove={onMove} aria-labelledby="hero-title">
      <div className="wrap">
        <div className={s.runhead}>
          <span>Produtora audiovisual</span>
          <span>Porto Alegre · 2026</span>
        </div>
        <div className={s.grid}>
          <div data-parallax="60">
          <div className={s.logo} ref={logo}>
            <h1 id="hero-title" className="sr-only">Muito Bala</h1>
            <Image src="/brand/logo-azul.svg" alt="Muito Bala" width={1256} height={1226} priority />
          </div>
          </div>
          <div className={s.side}>
            <p className="serif" style={{ fontSize: "clamp(40px, 4.6vw, 78px)" }}>Bem-vindo ao</p>
            <p className={`script ${s.script}`}>nosso clima.</p>
            <p className={s.lead}>
              Design, música, filme e foto com cara de verão em Miami dos anos 90 e calma de quem ainda presta atenção.
            </p>
            <div className={s.tv} data-parallax="-40">
              <Image
                src="/miv/neon.jpg"
                alt="Fachada noturna com o letreiro Muito Bala em neon rosa"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                priority
              />
              <span className={`${s.osd} ${s.tl}`}>▶ PLAY</span>
              <span className={`${s.osd} ${s.tr}`}><i className={s.rec} />REC</span>
              <span className={`${s.osd} ${s.bl}`}>SP {tc}</span>
              <span className={`${s.osd} ${s.br}`} suppressHydrationWarning>{today}</span>
            </div>
            <div className={s.actions}>
              <a className="pill pill--blue" href="#servicos">Ver o que a gente faz</a>
              <a className="pill pill--white" href="#contato">Bora fazer um projeto</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
