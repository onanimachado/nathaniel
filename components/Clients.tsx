"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { clients } from "@/content/site";
import s from "./Clients.module.css";

/* Velocidade base (px por segundo) e quanto a rolagem da página empurra a faixa. */
const BASE_SPEED = 55;
const SCROLL_BOOST = 1.3;

/*
 * Faixa de marcas no espírito da faixa de imprensa do Vacation: anda sozinha em loop,
 * para com o mouse em cima e pode ser arrastada. Além disso, acelera junto com a
 * rolagem da página, para que numa rolagem só todas as marcas passem pela tela.
 */
export default function Clients() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const vp = viewport.current;
    const el = track.current;
    if (!vp || !el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let x = 0;
    let last = performance.now();
    let lastY = window.scrollY;
    let hover = false;
    let dragging = false;
    let dragStartX = 0;
    let dragStartOffset = 0;
    let raf = 0;

    const frame = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (!dragging && !reduce) {
        if (!hover) x -= (BASE_SPEED * dt) / 1000;
        x -= dy * SCROLL_BOOST;
      }
      const half = el.scrollWidth / 2;
      if (half > 0) x = (((x % half) + half) % half) - half;
      el.style.transform = `translate3d(${x}px, 0, 0)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const enter = () => (hover = true);
    const leave = () => (hover = false);
    const down = (e: PointerEvent) => {
      dragging = true;
      dragStartX = e.clientX;
      dragStartOffset = x;
      vp.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (dragging) x = dragStartOffset + (e.clientX - dragStartX);
    };
    const up = () => (dragging = false);

    vp.addEventListener("pointerenter", enter);
    vp.addEventListener("pointerleave", leave);
    vp.addEventListener("pointerdown", down);
    vp.addEventListener("pointermove", move);
    vp.addEventListener("pointerup", up);
    vp.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(raf);
      vp.removeEventListener("pointerenter", enter);
      vp.removeEventListener("pointerleave", leave);
      vp.removeEventListener("pointerdown", down);
      vp.removeEventListener("pointermove", move);
      vp.removeEventListener("pointerup", up);
      vp.removeEventListener("pointercancel", up);
    };
  }, []);

  const list = (hidden: boolean) => (
    <ul className={s.list} aria-hidden={hidden || undefined}>
      {clients.map((c) => (
        <li className={s.slide} key={c.name}>
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
    <section className={s.clients} aria-labelledby="clients-title">
      <h2 className="sr-only" id="clients-title">Marcas com quem a Muito Bala já trabalhou</h2>
      <div className={s.viewport} ref={viewport}>
        <div className={s.track} ref={track}>
          {list(false)}
          {list(true)}
        </div>
      </div>
    </section>
  );
}
