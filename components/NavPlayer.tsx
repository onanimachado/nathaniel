"use client";

import { useEffect, useRef, useState } from "react";
import { playlist } from "@/content/site";
import s from "./NavPlayer.module.css";

/*
 * "Trilha do clima" no menu: um radinho com as barrinhas de equalizador mexendo, para instigar.
 * Ao clicar, abre embaixo do menu o player compacto do Spotify com a playlist da Muito Bala.
 * O player só carrega quando a pessoa abre (o site não fica mais pesado) e nada toca sozinho.
 */
export default function NavPlayer({ label, open: openLabel, close: closeLabel }: { label: string; open: string; close: string }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onDown = (e: PointerEvent) => { if (root.current && !root.current.contains(e.target as Node)) setOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("pointerdown", onDown); };
  }, [open]);

  return (
    <div className={s.root} ref={root}>
      <button
        type="button"
        className={s.btn}
        aria-expanded={open}
        aria-controls="nav-player"
        aria-label={open ? closeLabel : openLabel}
        onClick={() => { setLoaded(true); setOpen((v) => !v); }}
      >
        <span className={s.play} aria-hidden="true">{open ? "■" : "▶"}</span>
        <span className={s.label}>{label}</span>
        <span className={s.eq} aria-hidden="true"><i /><i /><i /><i /></span>
      </button>
      {/* fica montado depois de aberto: fechar o painel não interrompe a música */}
      <div id="nav-player" className={`${s.panel} ${open ? s.isOpen : ""}`} hidden={!open && !loaded} aria-hidden={!open}>
        {loaded && (
          <iframe
            title={label}
            src={`https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        )}
      </div>
    </div>
  );
}
