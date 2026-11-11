import s from "./Thesis.module.css";

export default function Thesis() {
  return (
    <section className={s.thesis} aria-label="Nossa tese">
      <div className="wrap">
        <h2 className={`serif ${s.h}`}>
          Não Entregamos Audiência. Entregamos <span className="script">a audiência certa</span> Pré-Filtrada Pelo
          Próprio Conteúdo.
        </h2>
        <p className={s.sign}>Muito Bala. O seu paraíso audiovisual.</p>
      </div>
    </section>
  );
}
