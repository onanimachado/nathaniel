import LeadForm from "./LeadForm";
import s from "./Contact.module.css";

export default function Contact() {
  return (
    <section className={s.contact} id="contato" aria-labelledby="contact-title">
      <div className="wrap">
        {/* Composição tipográfica do MIV p. 18 */}
        <div className={s.dont} aria-hidden="true">
          <span className={s.l1}>Don’t TALK To Us</span>
          <span className={s.l2}>UNLESS <span className="script">You</span> ARE</span>
          <span className={s.l3} data-drift="70">“Muito Bala”</span>
        </div>
        <div className={s.grid}>
          <div className={s.intro}>
            <h3 id="contact-title">Vamos fazer algo muito bala?</h3>
            <p>
              Conta o que você tem em mente e do que precisa. A gente responde com uma proposta clara, sem
              enrolação e com o clima de sempre.
            </p>
            <p className="sub" style={{ fontSize: 12 }}>Porto Alegre · atendimento em todo o Brasil</p>
            <div className={s.swatches} aria-hidden="true">
              <i style={{ background: "var(--blue)" }} />
              <i style={{ background: "var(--black)" }} />
              <i style={{ background: "var(--pink)" }} />
              <i style={{ background: "var(--yellow)" }} />
            </div>
          </div>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
