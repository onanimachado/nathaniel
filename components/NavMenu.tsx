"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import MenuBar from "./MenuBar";
import s from "./NavMenu.module.css";

/*
 * Menu no estilo do Vacation: o botão "Menu" abre um véu azul translúcido sobre a página, com os links
 * no canto superior esquerdo, na fonte dos títulos. Fecha no "×", no Esc ou ao escolher um link.
 * Por cima continua a faixa corrida do topo (top), no meio o monograma MB e, embaixo, a barra com
 * o que está tocando, os dials de edição e o play (MenuBar), como o "Vibe Generator" do Vacation.
 */
export type MenuLink = { key: string; label: string; href: string; current?: boolean };

type BarLabels = React.ComponentProps<typeof MenuBar>["t"];

export default function NavMenu({ label, close, links, top, homeHref, homeLabel, bar }: {
  label: string; close: string; links: MenuLink[]; top: React.ReactNode; homeHref: string; homeLabel: string; bar: BarLabels;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const btn = useRef<HTMLButtonElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const toggle = btn.current;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <button ref={btn} type="button" className={s.toggle} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(true)}>
        {label}
      </button>
      {/* a tela do menu vai direto no <body>, fora do cabeçalho, para não herdar os estilos dele */}
      {mounted && createPortal(
      <div id="site-menu" className={`${s.overlay} ${open ? s.isOpen : ""}`} role="dialog" aria-modal="true" aria-label={label} hidden={!open} data-lenis-prevent>
        {top}
        <div className={`wrap ${s.inner}`}>
          <div className={s.head}>
            <button type="button" className={s.close} onClick={() => setOpen(false)} aria-label={close}>
              {label} <span aria-hidden="true">×</span>
            </button>
            <a className={s.logo} href={homeHref} aria-label={homeLabel} onClick={() => setOpen(false)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/monograma-sombra-rosa.svg" alt="" width={64} height={72} />
            </a>
          </div>
          <nav>
            <ul className={s.list}>
              {links.map((l, i) => (
                <li key={l.key}>
                  <a
                    ref={i === 0 ? first : undefined}
                    href={l.href}
                    aria-current={l.current ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <MenuBar t={bar} />
      </div>,
      document.body)}
    </>
  );
}
