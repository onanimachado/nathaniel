"use client";

import { useEffect } from "react";
import { preparePlayer, togglePlayer, usePlayer } from "@/lib/player";
import s from "./NavPlayer.module.css";

/*
 * "Trilha do clima" no menu: só o botão de play, sem texto nem equalizador (pedido do Nani).
 * Toca e pausa a playlist pelo player compartilhado (lib/player.ts), o mesmo da barra do menu aberto.
 * O player é preparado quando o navegador fica livre (ou quando a pessoa passa o mouse no botão).
 */
export default function NavPlayer({ label, open: playLabel, close: pauseLabel }: { label: string; open: string; close: string }) {
  const { playing } = usePlayer();

  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const go = () => { preparePlayer(); };
    if (w.requestIdleCallback) w.requestIdleCallback(go, { timeout: 4000 });
    else setTimeout(go, 2500);
  }, []);

  return (
    <div className={s.root}>
      <button
        type="button"
        className={`${s.btn} ${playing ? s.isPlaying : ""}`}
        aria-pressed={playing}
        aria-label={playing ? pauseLabel : playLabel}
        title={label}
        onClick={togglePlayer}
        onPointerEnter={() => { preparePlayer(); }}
        onFocus={() => { preparePlayer(); }}
      >
        <span className={s.play} aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
      </button>
    </div>
  );
}
