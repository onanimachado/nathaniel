"use client";

import { useRef } from "react";
import { services, type Service } from "@/content/site";
import type { Dict } from "@/lib/i18n";
import s from "./UnitsTable.module.css";

/* Posição inicial de cada card na mesa (desktop). */
const layout = [
  { left: "3%", top: 46, rot: -5 },
  { left: "27%", top: 170, rot: 4 },
  { left: "51%", top: 36, rot: -3 },
  { left: "74%", top: 180, rot: 6 },
];

/* Combinações de cor do MIV p. 10: script e botão contrastando com o fundo do card. */
const style: Record<Service["card"], { script: string; pill: string }> = {
  blue: { script: "", pill: "" },
  pink: { script: "script--blue", pill: "pill--blue" },
  yellow: { script: "", pill: "" },
  white: { script: "", pill: "pill--blue" },
};

export default function UnitsTable({ t }: { t: Dict }) {
  const table = useRef<HTMLDivElement>(null);
  const z = useRef(10);

  function onPointerDown(e: React.PointerEvent<HTMLElement>) {
    if (window.matchMedia("(max-width: 980px)").matches || !table.current) return;
    const card = e.currentTarget;
    const t = table.current;
    card.setPointerCapture(e.pointerId);
    card.classList.add(s.drag);
    card.style.zIndex = String(++z.current);
    card.style.transform = "rotate(0deg) scale(1.03)";
    const sx = e.clientX, sy = e.clientY, bl = card.offsetLeft, bt = card.offsetTop;

    const move = (ev: PointerEvent) => {
      const ml = t.clientWidth - card.offsetWidth;
      const mt = t.clientHeight - card.offsetHeight;
      card.style.left = `${Math.max(0, Math.min(ml, bl + ev.clientX - sx))}px`;
      card.style.top = `${Math.max(0, Math.min(mt, bt + ev.clientY - sy))}px`;
    };
    const end = () => {
      card.classList.remove(s.drag);
      card.style.transform = `rotate(${(Math.random() * 10 - 5).toFixed(1)}deg)`;
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerup", end);
      card.removeEventListener("pointercancel", end);
    };
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerup", end);
    card.addEventListener("pointercancel", end);
  }

  return (
    <section className={s.units} id="servicos" aria-labelledby="units-title">
      <div className="wrap">
        <div className="head2">
          <h2 className="serif" id="units-title">{t.services.titleLine1}<br />{t.services.titleLine2}</h2>
          <p>{t.services.intro}</p>
        </div>
        <div className={s.table} ref={table}>
          {services.map((u, i) => {
            const tx = t.services.items[u.id];
            return (
            <article
              key={u.id}
              className={`${s.card} ${s[u.card]}`}
              style={{ left: layout[i].left, top: layout[i].top, transform: `rotate(${layout[i].rot}deg)` }}
              onPointerDown={onPointerDown}
            >
              <span className="tag">{tx.tag}</span>
              <h3 className={`script ${style[u.card].script}`}>{tx.title}</h3>
              <p>{tx.description}</p>
              <div className={s.foot}>
                <span className={s.fig}>FIG. {i + 1}</span>
                <span className={`pill ${style[u.card].pill}`}>{tx.cta}</span>
              </div>
            </article>
            );
          })}
          <p className={s.hint}>{t.services.hint}</p>
        </div>
      </div>
    </section>
  );
}
