"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { clients } from "@/content/site";
import type { Dict } from "@/lib/i18n";
import s from "./Clients.module.css";

/* Quantos px a faixa anda para cada px que ela sobe ou desce na tela. */
const SCROLL_FACTOR = 1.1;

/*
 * Faixa de marcas no espírito da faixa de imprensa do Vacation: anda sozinha em loop,
 * para com o mouse em cima e pode ser arrastada. Além disso, acelera junto com a
 * rolagem da página, para que numa rolagem só todas as marcas passem pela tela.
 */
export default function Clients({ t }: { t: Dict }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const vp = viewport.current;
    const el = track.current;
    if (!vp || !el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const focus = Array.from(el.querySelectorAll<HTMLElement>("[data-focus]"));
    let raf = 0;

    /*
     * A faixa anda só com a rolagem: a posição é função direta de onde a faixa está na tela.
     * Quando ela passa pelo meio da tela, as marcas em destaque (Planeta Atlântida e JBL)
     * ficam exatamente no centro. Rolando para baixo, os logos correm para a esquerda.
     */
    const place = () => {
      raf = 0;
      const half = el.scrollWidth / 2;
      if (!half || !focus.length) return;
      const first = focus[0];
      const last = focus[focus.length - 1];
      const focusCenter = (first.offsetLeft + last.offsetLeft + last.offsetWidth) / 2;
      const r = vp.getBoundingClientRect();
      const offset = reduce ? 0 : (r.top + r.height / 2 - window.innerHeight / 2) * SCROLL_FACTOR;
      let x = vp.clientWidth / 2 - focusCenter + offset;
      x = (((x % half) + half) % half) - half;
      el.style.transform = `translate3d(${x}px, 0, 0)`;
    };
    const request = () => { if (!raf) raf = requestAnimationFrame(place); };
    place();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  const list = (hidden: boolean) => (
    <ul className={s.list} aria-hidden={hidden || undefined}>
      {clients.map((c) => (
        <li className={s.slide} key={c.name} data-focus={c.focus && !hidden ? "" : undefined}>
          {c.logo ? (
            <Image
              src={c.logo.src}
              alt={hidden ? "" : c.name}
              width={Math.round(c.logo.height * c.logo.ratio)}
              height={c.logo.height}
              className={s.logo}
              style={{ "--h": `${c.logo.height}px` } as React.CSSProperties}
              draggable={false}
            />
          ) : (
            <span className={s.name}>{c.name}</span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <section className={s.clients} data-bg="beige" aria-labelledby="clients-title">
      <h2 className="sr-only" id="clients-title">{t.clients.title}</h2>
      <div className={s.viewport} ref={viewport}>
        <div className={s.track} ref={track}>
          {list(false)}
          {list(true)}
        </div>
      </div>
    </section>
  );
}
