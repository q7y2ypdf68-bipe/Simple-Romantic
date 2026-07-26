"use client";
import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending"); setErrorMessage(""); const form = event.currentTarget; const data = new FormData(form);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(data)) });
      const result = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(result.error); form.reset(); setStatus("success");
    } catch (error) { setErrorMessage(error instanceof Error ? error.message : ""); setStatus("error"); }
  }
  return <form className="contact-form" onSubmit={submit}><label><span>Nome ou apelido (opcional)</span><input name="name" maxLength={80} autoComplete="name" /></label><label><span>Seu e-mail</span><input name="email" type="email" maxLength={160} required autoComplete="email" /></label><label><span>Assunto</span><input name="subject" minLength={4} maxLength={120} required /></label><label><span>Mensagem</span><textarea name="message" minLength={20} maxLength={2000} rows={7} required /></label><label className="community-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label><button className="button primary" disabled={status === "sending"}>{status === "sending" ? "Enviando…" : "Enviar mensagem"} <span>→</span></button><p className={`community-message ${status}`} role="status" aria-live="polite">{status === "success" ? "Mensagem recebida. Obrigado por falar com a gente!" : status === "error" ? errorMessage || "Não foi possível enviar agora. Tente novamente." : ""}</p></form>;
}
