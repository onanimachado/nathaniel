import { tickerPhrases } from "@/content/site";
import s from "./Ticker.module.css";

export default function Ticker() {
  const items = [...tickerPhrases, ...tickerPhrases];
  return (
    <div className={s.ticker} aria-hidden="true">
      <div className={s.track}>
        {items.map((p, i) => (
          <span key={i}>
            {p.before}
            {"script" in p && (
              <>
                {" "}
                <b className={s[p.color]}>{p.script}</b>
              </>
            )}
            {"after" in p && <> {p.after}</>}
          </span>
        ))}
      </div>
    </div>
  );
}
