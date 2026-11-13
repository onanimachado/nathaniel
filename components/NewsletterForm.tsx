"use client";

import { useState } from "react";
import s from "./Footer.module.css";

/* Linha da newsletter do rodapé. Ainda não envia: avisa que falta configurar. */
export default function NewsletterForm({ label, placeholder, submit, missing, invalid }: { label: string; placeholder: string; submit: string; missing: string; invalid: string }) {
  const [msg, setMsg] = useState("");
  return (
    <form
      className={s.newsletter}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const v = String(new FormData(e.currentTarget).get("email") ?? "").trim();
        setMsg(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? missing : invalid);
      }}
    >
      <label className={`${s.cell} ${s.head}`} htmlFor="news-email">{label}</label>
      <input className={`${s.cell} ${s.input}`} id="news-email" name="email" type="email" autoComplete="email" placeholder={placeholder} />
      <button className={`${s.cell} ${s.head} ${s.submit}`} type="submit">{submit}</button>
      {msg && <p className={s.msg} role="status">{msg}</p>}
    </form>
  );
}
