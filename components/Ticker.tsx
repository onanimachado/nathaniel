import type { Dict } from "@/lib/i18n";
import s from "./Ticker.module.css";

type Phrase = { before: string; script?: string; after?: string; color?: string };

export default function Ticker({ t }: { t: Dict }) {
  const phrases = t.ticker as Phrase[];
  const items = [...phrases, ...phrases];
  return (
    <div className={s.ticker} aria-hidden="true">
      <div className={s.track}>
        {items.map((p, i) => (
          <span key={i}>
            {p.before}
            {p.script && (
              <>
                {" "}
                <b className={s[p.color ?? "pink"]}>{p.script}</b>
              </>
            )}
            {p.after && <> {p.after}</>}
          </span>
        ))}
      </div>
    </div>
  );
}
