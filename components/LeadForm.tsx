"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n";
import s from "./Contact.module.css";

const serviceIds = ["cinema", "foto", "musica", "design"] as const;

export default function LeadForm({ t }: { t: Dict["contact"]["form"] }) {
  const [msg, setMsg] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setMsg(t.errorEmail);
      return;
    }
    // TODO: enviar para o e-mail da Muito Bala (ex.: Route Handler + Resend) quando o e-mail for definido.
    setMsg(t.notConfigured);
  }

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      <div className={s.field}>
        <label htmlFor="f-nome">{t.name}</label>
        <input id="f-nome" name="nome" autoComplete="name" placeholder={t.namePlaceholder} />
      </div>
      <div className={s.field}>
        <label htmlFor="f-email">{t.email}</label>
        <input id="f-email" name="email" type="email" autoComplete="email" placeholder={t.emailPlaceholder} />
      </div>
      <fieldset className={s.checks}>
        <legend>{t.needs}</legend>
        {serviceIds.map((id) => (
          <label key={id}>
            <input type="checkbox" name="servicos" value={id} id={`f-${id}`} /> {t.options[id]}
          </label>
        ))}
      </fieldset>
      <div className={s.field}>
        <label htmlFor="f-msg">{t.about}</label>
        <textarea id="f-msg" name="mensagem" placeholder={t.aboutPlaceholder} />
      </div>
      <div>
        <button className="pill" type="submit">{t.submit}</button>
      </div>
      <p className={s.msg} role="status">{msg}</p>
    </form>
  );
}
