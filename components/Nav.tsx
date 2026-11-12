import Image from "next/image";
import s from "./Nav.module.css";

function Roll({ children }: { children: string }) {
  return (
    <span className={s.roll}>
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

export default function Nav() {
  return (
    <header className={s.nav}>
      <div className={`wrap ${s.inner}`}>
        <a href="#topo" aria-label="Muito Bala, início">
          <Image src="/brand/monograma-sombra-rosa.svg" alt="" width={38} height={43} priority />
        </a>
        <div className={s.mid}>
          <span>Muito Bala</span>
          <i />
          <span>Produtora audiovisual</span>
        </div>
        <ul>
          <li className={s.link}><a href="#servicos"><Roll>O que a gente faz</Roll></a></li>
          <li className={s.link}><a href="#programacao"><Roll>Trabalhos</Roll></a></li>
          <li><a className="pill" href="#contato">Fazer orçamento</a></li>
        </ul>
      </div>
    </header>
  );
}
