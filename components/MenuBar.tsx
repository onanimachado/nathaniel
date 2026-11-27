"use client";

import { useState } from "react";
import { dials, type DialId } from "@/content/site";
import { formatTime, togglePlayer, usePlayer } from "@/lib/player";
import s from "./MenuBar.module.css";

/*
 * Barra de baixo do menu aberto, no espírito do "Vibe Generator" do Vacation, com o layout da marca:
 * à esquerda o que está tocando, no meio quatro dials de edição de foto (Clarify, Saturation,
 * Contrast, Grain) e à direita o play/pausa da trilha. Os dials mexem na página de verdade:
 * os valores iniciais são o tratamento atual do site e arrastar aplica a diferença.
 */
type Labels = { nowPlaying: string; paused: string; track: string; trackBy: string; play: string; pause: string; grade: string };

const base = Object.fromEntries(dials.map((d) => [d.id, d.value])) as Record<DialId, number>;

function apply(v: Record<DialId, number>) {
  const main = document.querySelector("main");
  const sat = 1 + (v.saturation - base.saturation) / 100;
  const con = 1 + (v.contrast - base.contrast) / 100;
  const clar = v.clarify - base.clarify; // negativo suaviza, positivo dá punch
  const parts: string[] = [];
  if (sat !== 1) parts.push(`saturate(${sat.toFixed(2)})`);
  if (con !== 1 || clar > 0) parts.push(`contrast(${(con * (1 + Math.max(0, clar) / 200)).toFixed(3)})`);
  if (clar < 0) parts.push(`blur(${(-clar / 60).toFixed(2)}px)`);
  if (main) main.style.filter = parts.join(" ");
  const grain = Math.min(0.6, Math.max(0, 0.16 * (1 + (v.grain - base.grain) / 40)));
  document.documentElement.style.setProperty("--grain", grain.toFixed(3));
}

export default function MenuBar({ t }: { t: Labels }) {
  const { playing, position, duration } = usePlayer();
  const [vals, setVals] = useState<Record<DialId, number>>(base);
  const set = (id: DialId, n: number) => {
    const next = { ...vals, [id]: n };
    setVals(next);
    apply(next);
  };

  return (
    <div className={s.bar}>
      <div className={`${s.cell} ${s.now}`}>
        <span className={s.kicker}>{playing ? t.nowPlaying : t.paused}</span>
        <strong>{t.track}</strong>
        <span className={s.meta}>
          {t.trackBy}
          {duration > 0 && <> · {formatTime(position)} / {formatTime(duration)}</>}
        </span>
      </div>
      <div className={s.dials} role="group" aria-label={t.grade}>
        {dials.map((d) => {
          const v = vals[d.id];
          return (
            <label className={`${s.cell} ${s.dial}`} key={d.id}>
              <span className={s.top}>
                <span>{d.name}</span>
                <span className={s.val}>{v > 0 ? `+${v}` : v}</span>
              </span>
              <input
                type="range"
                min={-100}
                max={100}
                step={1}
                value={v}
                onChange={(e) => set(d.id, Number(e.target.value))}
                onDoubleClick={() => set(d.id, base[d.id])}
                style={{ "--p": `${(v + 100) / 2}%` } as React.CSSProperties}
              />
            </label>
          );
        })}
      </div>
      <div className={`${s.cell} ${s.playCell}`}>
        <button type="button" className={`${s.play} ${playing ? s.isPlaying : ""}`} onClick={togglePlayer} aria-pressed={playing} aria-label={playing ? t.pause : t.play}>
          <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
        </button>
      </div>
    </div>
  );
}
