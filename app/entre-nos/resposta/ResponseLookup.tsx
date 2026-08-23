"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Lookup = { status: "new" | "read" | "responded" | "archived"; response: string | null; respondedAt: string | null; alias: string | null; expiresAt: string | null };

export function ResponseLookup({ initialCode = "" }: { initialCode?: string }) {
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState<Lookup | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  async function lookup(event: FormEvent) {
    event.preventDefault();
    setBusy(true); setError(""); setResult(null); setDeleted(false);
    try {
      const response = await fetch(`/api/listening?code=${encodeURIComponent(code)}`);
      const payload = await response.json() as Lookup & { error?: string };
      if (!response.ok) throw new Error(payload.error || "Código não encontrado.");
      setResult(payload);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível consultar agora.");
    } finally { setBusy(false); }
  }

  async function deleteReport() {
    if (!window.confirm("Deseja eliminar definitivamente seu relato e qualquer resposta? Esta ação não pode ser desfeita.")) return;
    setDeleting(true); setError("");
    try {
      const response = await fetch(`/api/listening?code=${encodeURIComponent(code)}`, { method: "DELETE" });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Não foi possível eliminar agora.");
      setResult(null); setCode(""); setDeleted(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível eliminar agora.");
    } finally { setDeleting(false); }
  }

  return <div className="response-card">
    <form onSubmit={lookup}><label><span>Seu código particular</span><input value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} minLength={10} maxLength={40} placeholder="SR-XXXX-XXXX-XXXX-XXXX-XXXX" autoComplete="off" required /></label><button className="button primary" disabled={busy}>{busy ? "Consultando…" : "Consultar"}<span>→</span></button></form>
    {error && <p className="response-error" role="alert">{error}</p>}
    {deleted && <p className="response-deleted" role="status">Seu relato e a resposta vinculada foram eliminados definitivamente.</p>}
    {result && <article className={`response-result ${result.status}`}>
      <p className="eyebrow">{result.status === "responded" ? "DEIXAMOS UMA PALAVRA PARA VOCÊ" : result.status === "read" ? "SEU RELATO FOI LIDO" : result.status === "archived" ? "ACOLHIMENTO ENCERRADO" : "SEU RELATO ESTÁ CONOSCO"}</p>
      <h2>{result.status === "responded" ? `${result.alias ? `${result.alias}, ` : ""}obrigado por voltar.` : result.status === "read" ? "Nós lemos com atenção." : "Ele aguarda nossa leitura."}</h2>
      {result.response ? <div className="response-letter">{result.response.split("\n").map((paragraph) => paragraph.trim() && <p key={paragraph}>{paragraph}</p>)}</div> : <p>{result.status === "read" ? "Se você pediu uma palavra, estamos preparando a resposta com cuidado. Volte novamente usando o mesmo código." : "Não há uma resposta disponível neste momento. Você pode consultar novamente mais tarde."}</p>}
      {result.expiresAt && <p className="response-expiry">Eliminação automática prevista até {new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(result.expiresAt))}.</p>}
      <button className="response-delete" type="button" disabled={deleting} onClick={deleteReport}>{deleting ? "Eliminando…" : "Eliminar meu relato agora"}</button>
    </article>}
    <p className="response-help">Perdeu o código? Por segurança, não conseguimos recuperá-lo. Você ainda pode <Link href="/entre-nos">enviar um novo relato</Link>.</p>
  </div>;
}
