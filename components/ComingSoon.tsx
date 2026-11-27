import Image from "next/image";
import { contact } from "@/content/site";
import type { Dict } from "@/lib/i18n";
import Ticker from "./Ticker";
import s from "./ComingSoon.module.css";

/* Abertura "Em breve": o que o público vê no muitobala.com enquanto o site não é lançado. */
export default function ComingSoon({ t }: { t: Dict }) {
  const c = t.comingSoon;
  return (
    <div className={s.page}>
      <Ticker t={t} />
      <main className={s.soon}>
        <Image className={s.logo} src="/brand/logo-azul.svg" alt="Muito Bala" width={1256} height={1226} priority />
        <h1 className={s.title}>
          <span>{c.kicker}</span>
          <span>{c.line}</span>
        </h1>
        {contact.email && (
          <p className={s.contact}>
            {c.contact} <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        )}
      </main>
    </div>
  );
}
