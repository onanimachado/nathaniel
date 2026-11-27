"use client";

import { useEffect, useRef, useState } from "react";
import s from "./NavMenu.module.css";

/*
 * Menu de tela cheia, no estilo do Vacation: o botão "Menu" abre uma tela azul com os links
 * grandes na fonte dos títulos. Fecha no "×", no Esc ou ao escolher um link.
 */
export type MenuLink = { key: string; label: string; href: string; current?: boolean };

export default function NavMenu({ label, close, links }: { label: string; close: string; links: MenuLink[] }) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      btn.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button ref={btn} type="button" className={s.toggle} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(true)}>
        {label}
      </button>
      <div id="site-menu" className={`${s.overlay} ${open ? s.isOpen : ""}`} role="dialog" aria-modal="true" aria-label={label} hidden={!open} data-lenis-prevent>
        <div className={`wrap ${s.inner}`}>
          <button type="button" className={s.close} onClick={() => setOpen(false)} aria-label={close}>
            {label} <span aria-hidden="true">×</span>
          </button>
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
      </div>
    </>
  );
}
