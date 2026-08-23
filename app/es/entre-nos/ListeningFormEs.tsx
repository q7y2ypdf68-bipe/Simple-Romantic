"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export function ListeningFormEs() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending"); setError(""); setCopied(false);
    try {
      const response = await fetch("/api/listening", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ alias: data.get("alias"), need: data.get("need"), message: data.get("message"), publicationConsent: data.get("publicationConsent") === "on", adult: data.get("adult") === "on", consent: data.get("consent") === "on", website: data.get("website"), language: "es-ES" }) });
      const payload = await response.json() as { accessCode?: string };
      if (!response.ok || !payload.accessCode) throw new Error("No hemos podido enviar el relato. Revisa los campos e inténtalo de nuevo.");
      form.reset(); setCode(payload.accessCode); setState("success");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "No hemos podido enviarlo ahora."); setState("error"); }
  }

  async function copyCode() { await navigator.clipboard.writeText(code); setCopied(true); }

  if (state === "success") return <div className="listening-success" role="status"><span aria-hidden="true">♥</span><p className="eyebrow">HEMOS RECIBIDO TUS PALABRAS</p><h2>Gracias por confiar en nosotros.</h2><p>Guarda este código privado. Lo necesitarás para consultar la respuesta:</p><button className="listening-code" type="button" onClick={copyCode}><strong>{code}</strong><small>{copied ? "Código copiado" : "Pulsa para copiar"}</small></button><p className="listening-code-warning">No publiques ni compartas este código. Quien lo tenga podrá consultar nuestra respuesta.</p><Link className="button primary" href={`/es/entre-nos/respuesta?codigo=${encodeURIComponent(code)}`}>Consultar más adelante <span>→</span></Link></div>;

  return <form className="listening-form" onSubmit={submit}>
    <label><span>¿Cómo quieres que te llamemos? <small>(opcional)</small></span><input name="alias" maxLength={60} placeholder="Un nombre, alias o déjalo en blanco" /></label>
    <fieldset><legend>¿Qué necesitas en este momento?</legend><div className="listening-needs">
      <label><input type="radio" name="need" value="listen" defaultChecked /><span><strong>Solo necesito desahogarme</strong><small>Quiero ponerlo en palabras y que alguien lo lea.</small></span></label>
      <label><input type="radio" name="need" value="comfort" /><span><strong>Una palabra de apoyo</strong><small>Me gustaría recibir consuelo y ánimo.</small></span></label>
      <label><input type="radio" name="need" value="reflection" /><span><strong>Una reflexión cuidadosa</strong><small>Me gustaría conocer otra mirada sobre lo que cuento.</small></span></label>
    </div></fieldset>
    <label><span>Cuéntanos qué tienes en el corazón</span><textarea name="message" minLength={80} maxLength={5000} rows={10} required placeholder="Escribe a tu ritmo. No tienes que ordenarlo todo antes de empezar…" /><small>De 80 a 5.000 caracteres. No incluyas datos personales ni información que identifique a terceras personas.</small></label>
    <label className="listening-check optional"><input name="publicationConsent" type="checkbox" /><span><strong>Quizá mi experiencia pueda ayudar a alguien.</strong> Autorizo que se valore para una publicación anónima, tras su revisión y sin datos identificativos. Es opcional y no garantiza la publicación.</span></label>
    <label className="listening-check"><input name="adult" type="checkbox" required /><span>Confirmo que tengo 18 años o más.</span></label>
    <label className="listening-check"><input name="consent" type="checkbox" required /><span>Autorizo expresamente el tratamiento de este relato, que puede incluir información íntima, para que sea leído y, si lo solicito, respondido. Conozco los plazos de eliminación, sé que puedo borrarlo antes con mi código y he leído las <Link href="/es/terminos">Condiciones</Link> y la <Link href="/es/privacidad">Política de privacidad</Link>.</span></label>
    <label className="community-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <button className="button primary" type="submit" disabled={state === "sending"}>{state === "sending" ? "Enviando con cuidado…" : "Enviar mi relato"}<span>→</span></button>
    <p className="listening-retention-note">Los relatos pendientes se conservan hasta 180 días; después de una respuesta, hasta 90 días. Puedes borrarlos antes con el código privado.</p>
    <p className="listening-form-message" role="status" aria-live="polite">{state === "error" ? error : ""}</p>
  </form>;
}
