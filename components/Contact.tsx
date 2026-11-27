import type { Dict } from "@/lib/i18n";
import LeadForm from "./LeadForm";
import s from "./Contact.module.css";

export default function Contact({ t }: { t: Dict }) {
  return (
    <section className={s.contact} data-bg="beige" id="contato" aria-labelledby="contact-title">
      <div className="wrap">
        <div className={s.grid}>
          <div className={s.intro}>
            <h3 id="contact-title">{t.contact.title}</h3>
            <p>{t.contact.intro}</p>
            <p className="sub" style={{ fontSize: 12 }}>{t.contact.area}</p>
            <div className={s.swatches} aria-hidden="true">
              <i style={{ background: "var(--blue)" }} />
              <i style={{ background: "var(--black)" }} />
              <i style={{ background: "var(--pink)" }} />
              <i style={{ background: "var(--yellow)" }} />
            </div>
          </div>
          <LeadForm t={t.contact.form} />
        </div>
      </div>
    </section>
  );
}
