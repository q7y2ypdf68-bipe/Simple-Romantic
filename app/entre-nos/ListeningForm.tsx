"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Result = { accessCode: string };

export function ListeningForm() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setError("");
    setCopied(false);

    try {
      const response = await fetch("/api/listening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alias: data.get("alias"),
          need: data.get("need"),
          message: data.get("message"),
          publicationConsent: data.get("publicationConsent") === "on",
          adult: data.get("adult") === "on",
          consent: data.get("consent") === "on",
          website: data.get("website"),
        }),
      });
      const payload = await response.json() as { accessCode?: string; error?: string };
      if (!response.ok || !payload.accessCode) throw new Error(payload.error || "Não foi possível enviar agora.");
      form.reset();
      setResult({ accessCode: payload.accessCode });
      setState("success");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível enviar agora.");
      setState("error");
    }
  }

  async function copyCode() {
    if (!result) return;
    await navigator.clipboard.writeText(result.accessCode);
    setCopied(true);
  }

  if (state === "success" && result) return <div className="listening-success" role="status">
    <span aria-hidden="true">♥</span>
    <p className="eyebrow">RECEBEMOS SUAS PALAVRAS</p>
    <h2>Obrigado por confiar em nós.</h2>
    <p>Guarde este código. Ele é particular e será necessário para consultar o acolhimento:</p>
    <button className="listening-code" type="button" onClick={copyCode}><strong>{result.accessCode}</strong><small>{copied ? "Código copiado" : "Clique para copiar"}</small></button>
    <p className="listening-code-warning">Não publique nem compartilhe este código. Quem o possuir poderá consultar nossa resposta.</p>
    <Link className="button primary" href={`/entre-nos/resposta?codigo=${encodeURIComponent(result.accessCode)}`}>Consultar depois <span>→</span></Link>
  </div>;

  return <form className="listening-form" onSubmit={submit}>
    <label><span>Como gostaria de ser chamado? <small>(opcional)</small></span><input name="alias" maxLength={60} placeholder="Um nome, apelido ou deixe em branco" /></label>
    <fieldset><legend>O que você precisa neste momento?</legend><div className="listening-needs">
      <label><input type="radio" name="need" value="listen" defaultChecked /><span><strong>Só preciso desabafar</strong><small>Quero colocar em palavras e ser lido.</small></span></label>
      <label><input type="radio" name="need" value="comfort" /><span><strong>Uma palavra de acolhimento</strong><small>Gostaria de receber conforto e coragem.</small></span></label>
      <label><input type="radio" name="need" value="reflection" /><span><strong>Uma reflexão cuidadosa</strong><small>Gostaria de outro olhar sobre o que contei.</small></span></label>
    </div></fieldset>
    <label><span>Conte o que está no seu coração</span><textarea name="message" minLength={80} maxLength={5000} rows={10} required placeholder="Escreva no seu tempo. Não precisa organizar tudo antes de começar…" /><small>De 80 a 5.000 caracteres. Não inclua dados pessoais ou informações que identifiquem terceiros.</small></label>
    <label className="listening-check optional"><input name="publicationConsent" type="checkbox" /><span><strong>Talvez minha experiência possa ajudar alguém.</strong> Autorizo que o relato seja considerado para publicação anônima, depois de revisado e sem detalhes identificáveis. Esta escolha é opcional e não garante publicação.</span></label>
    <label className="listening-check"><input name="adult" type="checkbox" required /><span>Confirmo que tenho 18 anos ou mais.</span></label>
    <label className="listening-check"><input name="consent" type="checkbox" required /><span>Autorizo expressamente o tratamento deste relato, que pode conter informações íntimas, para que ele seja lido e, quando solicitado, respondido. Entendi os prazos de eliminação, sei que posso apagar o relato antes usando meu código e li os <Link href="/termos">Termos</Link> e a <Link href="/privacidade">Política de Privacidade</Link>.</span></label>
    <label className="community-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <button className="button primary" type="submit" disabled={state === "sending"}>{state === "sending" ? "Enviando com cuidado…" : "Enviar meu relato"}<span>→</span></button>
    <p className="listening-retention-note">Relatos aguardando leitura são conservados por até 180 dias. Depois de uma resposta, por até 90 dias. Você pode eliminá-los antes usando o código particular.</p>
    <p className="listening-form-message" role="status" aria-live="polite">{state === "error" ? error : ""}</p>
  </form>;
}
