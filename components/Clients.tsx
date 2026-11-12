import Image from "next/image";
import { clients } from "@/content/site";
import s from "./Clients.module.css";

/* Faixa de marcas em movimento contínuo, na linha da faixa de imprensa do Vacation. */
export default function Clients() {
  const row = clients.map((c) => (
    <li key={c.name} className={s.item}>
      {c.logo ? (
        <Image
          src={c.logo.src}
          alt={c.name}
          width={Math.round(c.logo.height * c.logo.ratio)}
          height={c.logo.height}
          className={s.logo}
          style={{ "--h": `${c.logo.height}px` } as React.CSSProperties}
        />
      ) : (
        <span>{c.name}</span>
      )}
    </li>
  ));

  return (
    <section className={s.clients} aria-labelledby="clients-title">
      <p className={s.label} id="clients-title">Já fizemos clima com</p>
      <div className={s.viewport}>
        <ul className={s.track}>{row}</ul>
        <ul className={s.track} aria-hidden="true">{row}</ul>
      </div>
    </section>
  );
}
