"use client";

import { useState } from "react";
import s from "./Contact.module.css";

const services = [
  { id: "design", label: "Design" },
  { id: "musica", label: "Música" },
  { id: "filme", label: "Filme" },
  { id: "foto", label: "Foto" },
];

export default function LeadForm() {
  const [msg, setMsg] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setMsg("▶ Falta um e-mail válido para a gente responder.");
      return;
    }
    // TODO: enviar para o e-mail da Muito Bala (ex.: Route Handler + Resend) quando o e-mail for definido.
    setMsg("▶ Envio ainda não configurado: falta definir o e-mail que recebe as propostas.");
  }

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      <div className={s.field}>
        <label htmlFor="f-nome">Seu nome</label>
        <input id="f-nome" name="nome" autoComplete="name" placeholder="Como a gente te chama" />
      </div>
      <div className={s.field}>
        <label htmlFor="f-email">E-mail</label>
        <input id="f-email" name="email" type="email" autoComplete="email" placeholder="voce@marca.com.br" />
      </div>
      <fieldset className={s.checks}>
        <legend>O que você precisa</legend>
        {services.map((sv) => (
          <label key={sv.id}>
            <input type="checkbox" name="servicos" value={sv.id} id={`f-${sv.id}`} /> {sv.label}
          </label>
        ))}
      </fieldset>
      <div className={s.field}>
        <label htmlFor="f-msg">Sobre o projeto</label>
        <textarea id="f-msg" name="mensagem" placeholder="Prazo, ideia, referência, o que vier" />
      </div>
      <div>
        <button className="pill" type="submit">Enviar proposta</button>
      </div>
      <p className={s.msg} role="status">{msg}</p>
    </form>
  );
}
