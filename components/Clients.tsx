import Image from "next/image";
import { clients } from "@/content/site";
import type { Dict } from "@/lib/i18n";
import s from "./Clients.module.css";

/*
 * Faixa de marcas no espírito da faixa de imprensa do Vacation. O movimento (anda sozinha,
 * para com o mouse, arrasta e acelera com a rolagem) fica em lib/experience.ts.
 */
export default function Clients({ t }: { t: Dict }) {
  return (
    <div className={s.clients} role="region" aria-labelledby="clients-title">
      <h2 className="sr-only" id="clients-title">{t.clients.title}</h2>
      <div className={s.viewport} data-marquee>
        <div className={s.track} data-marquee-track>
          <ul className={s.list}>
            {clients.map((c) => (
              <li className={s.slide} key={c.name}>
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
      </div>
    </div>
  );
}
