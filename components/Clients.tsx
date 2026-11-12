"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { clients } from "@/content/site";
import s from "./Clients.module.css";

/*
 * Faixa de marcas no mesmo comportamento da faixa de imprensa do Vacation:
 * carrossel em loop que anda sozinho, para quando o mouse passa por cima
 * e pode ser arrastado com mouse ou dedo. Cada logo ocupa uma célula de mesma largura.
 */
export default function Clients() {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [ref] = useEmblaCarousel({ loop: true, dragFree: true, align: "start" }, [
    AutoScroll({ speed: 0.45, startDelay: 0, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true, active: !reduce }),
  ]);

  return (
    <section className={s.clients} aria-labelledby="clients-title">
      <h2 className="sr-only" id="clients-title">Marcas com quem a Muito Bala já trabalhou</h2>
      <div className={s.viewport} ref={ref} role="region" aria-roledescription="carrossel" aria-label="Marcas" tabIndex={0}>
        <ul className={s.container}>
          {clients.map((c, i) => (
            <li className={s.slide} key={c.name} aria-roledescription="slide" aria-label={`Marca ${i + 1} de ${clients.length}`}>
              {c.logo ? (
                <Image
                  src={c.logo.src}
                  alt={c.name}
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
      </div>
    </section>
  );
}
