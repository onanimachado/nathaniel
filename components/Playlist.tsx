import { playlist } from "@/content/site";
import type { Dict } from "@/lib/i18n";
import s from "./Playlist.module.css";

/* Trilha do clima: a playlist da Muito Bala, com o player do Spotify num "toca-fitas". */
export default function Playlist({ t }: { t: Dict }) {
  const p = t.playlist;
  return (
    <section className={s.playlist} id="playlist" data-bg="pink" aria-labelledby="playlist-title">
      <div className={`wrap ${s.grid}`}>
        <div className={s.text}>
          <p className={s.kicker}>{p.kicker}</p>
          <h2 id="playlist-title" className="serif">{p.title}</h2>
          <p>{p.text}</p>
          <a className="pill pill--blue" href={playlist.url} target="_blank" rel="noopener noreferrer">{p.open} ↗</a>
        </div>
        <div className={s.deck}>
          <iframe
            title={p.title}
            src={`https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      </div>
    </section>
  );
}
