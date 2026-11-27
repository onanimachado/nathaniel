"use client";

import { Children, useEffect, useRef } from "react";

/*
 * Fila infinita na horizontal. Repete os itens algumas vezes e, quando a rolagem passa de uma
 * volta inteira, salta uma volta para trás ou para a frente sem que se perceba.
 * Anda sozinha devagar (menos com "reduzir movimento"), para com o mouse em cima ou durante o toque,
 * e aceita arrastar com o mouse, rolar para o lado no trackpad e deslizar no celular.
 */
const COPIES = 5;
const SPEED = 0.35; // px por quadro

export default function Loop({ children, className, trackClassName }: { children: React.ReactNode; className?: string; trackClassName?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  useEffect(() => {
    const el = box.current, tr = track.current;
    if (!el || !tr) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lap = () => tr.scrollWidth / COPIES;
    let paused = false, raf = 0, dragging = false, startX = 0, startLeft = 0, moved = false;

    const wrap = () => {
      const w = lap();
      if (!w) return;
      if (el.scrollLeft < w) el.scrollLeft += w;
      else if (el.scrollLeft >= w * 2) el.scrollLeft -= w;
    };
    el.scrollLeft = lap();
    // posição com casas decimais: o navegador arredonda scrollLeft, e 0,35 px por quadro se perderia
    let pos = el.scrollLeft;
    const tick = () => {
      if (Math.abs(el.scrollLeft - pos) > 1) pos = el.scrollLeft; // a pessoa rolou ou arrastou
      if (!paused && !dragging && !reduce && !document.hidden) {
        pos += SPEED;
        el.scrollLeft = pos;
      }
      wrap();
      if (Math.abs(el.scrollLeft - pos) > 1) pos = el.scrollLeft; // depois do salto de volta
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const enter = () => { paused = true; };
    const leave = () => { paused = false; dragging = false; };
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return; // no toque, a rolagem nativa já resolve
      dragging = true; moved = false; startX = e.clientX; startLeft = el.scrollLeft;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      el.scrollLeft = startLeft - dx;
    };
    const up = () => { dragging = false; };
    const click = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } };
    const touch = () => { paused = true; };
    const touchEnd = () => { setTimeout(() => { paused = false; }, 1500); };
    const resize = () => { el.scrollLeft = lap() + (el.scrollLeft % lap()); };

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("click", click, true);
    el.addEventListener("touchstart", touch, { passive: true });
    el.addEventListener("touchend", touchEnd);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("click", click, true);
      el.removeEventListener("touchstart", touch);
      el.removeEventListener("touchend", touchEnd);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={box} className={className} data-lenis-prevent-wheel data-lenis-prevent-touch>
      <div ref={track} className={trackClassName}>
        {Array.from({ length: COPIES }, (_, c) =>
          items.map((it, i) => (
            <div key={`${c}-${i}`} aria-hidden={c !== 1 || undefined} style={{ display: "contents" }}>
              {it}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
