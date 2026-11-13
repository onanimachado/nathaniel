import { contact, services } from "@/content/site";
import type { Dict } from "@/lib/i18n";

/*
 * Painel de orçamento (o "Enquire" do Jacob & Co). Abre por cima da página a partir de
 * qualquer botão com data-panel-open e monta a mensagem do WhatsApp com o que a pessoa
 * escolheu. Comportamento em lib/experience.ts.
 */
const optionFor = { video: "cinema", foto: "foto", musica: "musica", design: "design" } as const;

export default function Panel({ t }: { t: Dict }) {
  const p = t.panel;
  return (
    <div className="panel" data-panel hidden role="dialog" aria-modal="true" aria-labelledby="panel-title">
      <button type="button" className="panel__backdrop" data-panel-close aria-label={p.close} tabIndex={-1} />
      <div className="panel__sheet">
        <div className="panel__head">
          <p className="panel__kicker">{p.kicker}</p>
          <button type="button" className="panel__close" data-panel-close aria-label={p.close}>✕</button>
        </div>
        <h2 id="panel-title" className="panel__title">{p.title}</h2>
        <p className="panel__intro">{p.intro}</p>
        <form
          className="panel__form"
          data-lead
          data-whatsapp={contact.whatsapp ?? ""}
          data-missing={p.whatsappMissing}
          data-prefill={p.prefill}
          data-prefill-services={p.prefillServices}
          noValidate
        >
          <fieldset className="panel__checks">
            <legend>{p.needs}</legend>
            {services.map((sv) => {
              const label = t.contact.form.options[optionFor[sv.id]];
              return (
                <label key={sv.id}>
                  <input type="checkbox" name="servicos" value={label} id={`p-${sv.id}`} /> {label}
                </label>
              );
            })}
          </fieldset>
          <div className="panel__field">
            <label htmlFor="p-msg">{p.message}</label>
            <textarea id="p-msg" name="mensagem" placeholder={p.messagePlaceholder} />
          </div>
          <button className="pill" type="submit">{p.whatsapp}</button>
          <p className="panel__msg" data-lead-msg role="status" />
        </form>
      </div>
    </div>
  );
}
