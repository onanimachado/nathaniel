"use client";

import { useSyncExternalStore } from "react";
import { playlist } from "@/content/site";

/*
 * Player da "Trilha do clima", compartilhado entre o botão de play do menu e a barra do menu aberto.
 * Um player do Spotify invisível, controlado pela API de embed (open.spotify.com/embed/iframe-api/v1).
 * Nada toca sozinho: os navegadores só deixam tocar depois de um clique. Se o Spotify não começar
 * a tocar em 3 s, a playlist abre numa aba nova.
 * A API de embed informa posição e duração, mas não o nome da faixa.
 */

type Update = { isPaused: boolean; isBuffering?: boolean; position?: number; duration?: number };
type Controller = { togglePlay: () => void; addListener: (ev: string, cb: (e: { data: Update }) => void) => void };
type IFrameAPI = { createController: (el: HTMLElement, opts: Record<string, unknown>, cb: (c: Controller) => void) => void };
declare global {
  interface Window { onSpotifyIframeApiReady?: (api: IFrameAPI) => void; __mbSpotify?: Promise<IFrameAPI> }
}

export type PlayerState = { playing: boolean; position: number; duration: number };
let state: PlayerState = { playing: false, position: 0, duration: 0 };
const listeners = new Set<() => void>();
const emit = (next: Partial<PlayerState>) => { state = { ...state, ...next }; listeners.forEach((l) => l()); };

let ctrl: Controller | null = null;
let preparing: Promise<Controller> | null = null;
let started = false;

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

export function preparePlayer(): Promise<Controller> {
  if (preparing) return preparing;
  preparing = loadApi().then(
    (api) =>
      new Promise<Controller>((resolve) => {
        const host = document.createElement("div");
        host.setAttribute("aria-hidden", "true");
        host.style.cssText = "position:fixed;left:0;bottom:0;width:300px;height:80px;opacity:0;pointer-events:none;z-index:-1;overflow:hidden";
        const el = document.createElement("div");
        host.appendChild(el);
        document.body.appendChild(host);
        api.createController(el, { uri: `spotify:playlist:${playlist.id}`, width: 300, height: 80 }, (c) => {
          ctrl = c;
          c.addListener("playback_update", (e) => {
            if (!e.data.isPaused) started = true;
            emit({ playing: !e.data.isPaused, position: e.data.position ?? state.position, duration: e.data.duration ?? state.duration });
          });
          resolve(c);
        });
      }),
  );
  return preparing;
}

export function togglePlayer() {
  const fallback = () => window.open(playlist.url, "_blank", "noopener,noreferrer");
  const wasPlaying = state.playing;
  const go = (c: Controller) => {
    c.togglePlay();
    if (!wasPlaying) setTimeout(() => { if (!started) fallback(); }, 3000);
  };
  if (ctrl) go(ctrl);
  else preparePlayer().then(go);
}

const subscribe = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; };
const server: PlayerState = { playing: false, position: 0, duration: 0 };
export function usePlayer(): PlayerState {
  return useSyncExternalStore(subscribe, () => state, () => server);
}

export function formatTime(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
