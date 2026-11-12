import s from "./Manifest.module.css";

export default function Manifest() {
  return (
    <section className={s.manifest} aria-labelledby="clima-title">
      <div className="wrap">
        <h2 className={`serif ${s.big}`} id="clima-title" data-drift="60">O clima</h2>
        <hr className={s.rule} />
        <div className={s.grid}>
          <p className={`serif ${s.h}`}>
            Coisa boa pede <span className="script">um pouco mais.</span>
          </p>
          <div className={s.text}>
            <p>
              A internet ensinou todo mundo a passar o dedo em três segundos. A gente filma em handycam, grava em fita e
              revela com calma, porque o que é bom de verdade recompensa quem fica.
            </p>
            <p>
              Quem fica até o fim é exatamente quem a sua marca queria encontrar. Trabalho sério, sensação leve, e aqui
              tudo é possível.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
