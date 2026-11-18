import type { Dict } from "@/lib/i18n";
import s from "./Ticker.module.css";

/* Faixa corrida no topo, no espírito da faixa do Vacation: fundo amarelo, fonte dos títulos em caixa alta, só duas frases. */
const REPEAT = 6; // repetições por metade da faixa, para cobrir telas largas sem buraco no laço

export default function Ticker({ t }: { t: Dict }) {
  const phrases = t.ticker as string[];
  const half = Array.from({ length: REPEAT }, () => phrases).flat();
  const items = [...half, ...half];
  return (
    <div className={s.ticker} aria-hidden="true">
      <div className={s.track}>
        {items.map((p, i) => <span key={i}>{p}</span>)}
      </div>
    </div>
  );
}
