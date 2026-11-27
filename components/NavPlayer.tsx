"use client";

import { useEffect, useRef, useState } from "react";
import { playlist } from "@/content/site";
import s from "./NavPlayer.module.css";

/*
 * "Trilha do clima" no menu: só o botão de play, sem texto nem equalizador (pedido do Nani). O botão toca e pausa a
 * playlist da Muito Bala direto, por um player do Spotify invisível controlado pela API de embed.
 * O player é preparado quando o navegador fica livre (ou quando a pessoa passa o mouse no botão),
 * para o clique tocar na hora. Nada toca sozinho: os navegadores só deixam tocar depois do clique.
 * Se o Spotify não conseguir tocar (alguns navegadores bloqueiam), a playlist abre numa aba nova.
 */

type Controller = {
  togglePlay: () => void;
  addListener: (ev: string, cb: (e: { data: { isPaused: boolean; isBuffering?: boolean } }) => void) => void;
};
type IFrameAPI = { createController: (el: HTMLElement, opts: Record<string, unknown>, cb: (c: Controller) => void) => void };
declare global {
  interface Window { onSpotifyIframeApiReady?: (api: IFrameAPI) => void; __mbSpotify?: Promise<IFrameAPI> }
}

function loadApi(): Promise<IFrameAPI> {
  if (window.__mbSpotify) return window.__mbSpotify;
  window.__mbSpotify = new Promise((resolve) => {
    window.onSpotifyIframeApiReady = resolve;
    const sc = document.createElement("script");
    sc.src = "https://open.spotify.com/embed/iframe-api/v1";
    sc.async = true;
    document.body.appendChild(sc);
  });
  return window.__mbSpotify;
}

export default function NavPlayer({ label, open: playLabel, close: pauseLabel }: { label: string; open: string; close: string }) {
  const [playing, setPlaying] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const ctrl = useRef<Controller | null>(null);
  const preparing = useRef<Promise<Controller> | null>(null);
  const started = useRef(false);

  const prepare = () => {
    if (preparing.current) return preparing.current;
    preparing.current = loadApi().then(
      (api) =>
        new Promise<Controller>((resolve) => {
          const el = document.createElement("div");
          host.current?.appendChild(el);
          api.createController(el, { uri: `spotify:playlist:${playlist.id}`, width: 300, height: 80 }, (c) => {
            ctrl.current = c;
            c.addListener("playback_update", (e) => {
              if (!e.data.isPaused) started.current = true;
              setPlaying(!e.data.isPaused);
            });
            resolve(c);
          });
        }),
    );
    return preparing.current;
  };

  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const go = () => { prepare(); };
    if (w.requestIdleCallback) w.requestIdleCallback(go, { timeout: 4000 });
    else setTimeout(go, 2500);
  }, []);

  const toggle = () => {
    const fallback = () => window.open(playlist.url, "_blank", "noopener,noreferrer");
    const c = ctrl.current;
    if (c) {
      const wasPlaying = playing;
      c.togglePlay();
      // se em 3 s o Spotify não começou a tocar, abre a playlist no Spotify
      if (!wasPlaying) setTimeout(() => { if (!started.current) fallback(); }, 3000);
      return;
    }
    // ainda carregando: tenta assim que ficar pronto, senão abre no Spotify
    prepare().then((c2) => { c2.togglePlay(); setTimeout(() => { if (!started.current) fallback(); }, 3000); });
  };

  return (
    <div className={s.root}>
      <button
        type="button"
        className={`${s.btn} ${playing ? s.isPlaying : ""}`}
        aria-pressed={playing}
        aria-label={playing ? pauseLabel : playLabel}
        title={label}
        onClick={toggle}
        onPointerEnter={prepare}
        onFocus={prepare}
      >
        <span className={s.play} aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
      </button>
      {/* player do Spotify invisível: só o som sai dele */}
      <div className={s.hidden} ref={host} aria-hidden="true" />
    </div>
  );
}
