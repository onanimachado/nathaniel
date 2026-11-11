import Image from "next/image";
import { units, contact } from "@/content/site";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className="wrap">
        <div className={s.top}>
          <Image src="/brand/logo-sombra-rosa.svg" alt="Muito Bala" width={566} height={541} />
          <h2>Nossa vibe <span className="script">é o produto.</span></h2>
        </div>
        <div className={s.grid}>
          <div>
            <h3>Unidades</h3>
            <ul>{units.map((u) => <li key={u.slug}>{u.name}</li>)}</ul>
          </div>
          <div>
            <h3>Navegar</h3>
            <ul>
              <li><a href="#unidades">Unidades</a></li>
              <li><a href="#programacao">Trabalhos</a></li>
              <li><a href="#contato">Orçamento</a></li>
            </ul>
          </div>
          <div>
            <h3>Redes</h3>
            <ul>
              <li>Instagram {contact.instagram ?? <span className="todo">@ a definir</span>}</li>
              <li>YouTube</li>
              <li>Spotify</li>
            </ul>
          </div>
          <div>
            <h3>Fale com a casa</h3>
            <ul>
              <li>{contact.email ?? <>E-mail <span className="todo">a definir</span></>}</li>
              <li>{contact.city}</li>
            </ul>
          </div>
        </div>
        <div className={s.bottom}>
          <span>Muito Bala. O seu paraíso audiovisual.</span>
          <span>© {new Date().getFullYear()} Muito Bala™</span>
        </div>
      </div>
    </footer>
  );
}
