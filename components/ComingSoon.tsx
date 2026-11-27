import type { Dict } from "@/lib/i18n";
import s from "./ComingSoon.module.css";

/*
 * Abertura "Em breve": o que o público vê no muitobala.com enquanto o site não é lançado.
 * Só a frase e as cores (degradê rosa para bege), sem nome, logo, faixa ou e-mail (pedido do Nani).
 */
export default function ComingSoon({ t }: { t: Dict }) {
  const c = t.comingSoon;
  return (
    <main className={s.soon}>
      <h1 className={s.title}>
        <span>{c.kicker}</span>
        <span>{c.line}</span>
      </h1>
    </main>
  );
}
