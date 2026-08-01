"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AdminNavigation } from "../AdminNavigation";

type Status = "new" | "read" | "responded" | "archived";
type Need = "listen" | "comfort" | "reflection";

export type ListeningEntry = {
  id: number;
  accessCode: string;
  alias: string | null;
  need: string;
  message: string;
  publicationConsent: boolean;
  status: string;
  response: string | null;
  createdAt: string;
  updatedAt: string | null;
  respondedAt: string | null;
};

const statusLabels: Record<Status, string> = {
  new: "Novo",
  read: "Lido",
  responded: "Acolhido",
  archived: "Arquivado",
};

const needLabels: Record<Need, string> = {
  listen: "Só precisa desabafar",
  comfort: "Pediu acolhimento",
  reflection: "Pediu uma reflexão",
};

export default function ListeningDashboard({ initialEntries, userName }: { initialEntries: ListeningEntry[]; userName: string }) {
  const [entries, setEntries] = useState(initialEntries);
  const [filter, setFilter] = useState<"all" | Status>("new");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [drafts, setDrafts] = useState<Record<number, string>>(() => Object.fromEntries(initialEntries.map((entry) => [entry.id, entry.response || ""])));
  const [busyId, setBusyId] = useState<number | null>(null);
  const [notice, setNotice] = useState("");

  const visible = useMemo(() => filter === "all" ? entries : entries.filter((entry) => entry.status === filter), [entries, filter]);
  const counts = useMemo(() => ({
    all: entries.length,
    new: entries.filter((entry) => entry.status === "new").length,
    read: entries.filter((entry) => entry.status === "read").length,
    responded: entries.filter((entry) => entry.status === "responded").length,
    archived: entries.filter((entry) => entry.status === "archived").length,
  }), [entries]);

  async function updateEntry(id: number, changes: { status?: Status; response?: string }, successMessage: string) {
    setBusyId(id);
    setNotice("");
    try {
      const response = await fetch(`/api/admin/listening/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
      const data = await response.json() as { entry?: ListeningEntry; error?: string };
      if (!response.ok || !data.entry) throw new Error(data.error || "Não foi possível atualizar o relato.");
      setEntries((items) => items.map((item) => item.id === id ? data.entry! : item));
      setDrafts((current) => ({ ...current, [id]: data.entry!.response || "" }));
      setEditingId(null);
      setNotice(successMessage);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Não foi possível atualizar o relato.");
    } finally {
      setBusyId(null);
    }
  }

  async function deleteEntry(entry: ListeningEntry) {
    if (!window.confirm("Excluir definitivamente este relato e qualquer resposta associada? Esta ação não pode ser desfeita.")) return;
    setBusyId(entry.id);
    setNotice("");
    try {
      const response = await fetch(`/api/admin/listening/${entry.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Não foi possível excluir o relato.");
      setEntries((items) => items.filter((item) => item.id !== entry.id));
      setNotice("Relato excluído definitivamente.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Não foi possível excluir o relato.");
    } finally {
      setBusyId(null);
    }
  }

  return <main className="admin-shell">
    <header className="admin-header">
      <Link className="brand" href="/"><span className="brand-heart">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i><small>PAINEL ADMINISTRATIVO</small></span></Link>
      <AdminNavigation active="listening" />
    </header>

    <section className="admin-main">
      <div className="admin-title"><div><p className="eyebrow">ENTRE NÓS · ESCUTA PRIVADA</p><h1>Relatos recebidos</h1><p>Olá, {userName}. Leia com calma e só disponibilize uma resposta quando ela estiver pronta.</p></div><div className="admin-total"><strong>{counts.new}</strong><span>aguardando sua leitura</span></div></div>

      <div className="admin-stats" aria-label="Resumo dos relatos">
        {(["all", "new", "read", "responded", "archived"] as const).map((status) => <button className={filter === status ? "active" : ""} key={status} onClick={() => setFilter(status)}><strong>{counts[status]}</strong><span>{status === "all" ? "Todos" : statusLabels[status]}</span></button>)}
      </div>

      <p className="admin-notice" role="status" aria-live="polite">{notice}</p>

      <div className="admin-list">
        {visible.length === 0 && <div className="admin-empty"><span>♡</span><h2>Nenhum relato aqui.</h2><p>Quando alguém escrever, a mensagem aparecerá nesta área privada.</p></div>}
        {visible.map((entry) => <article className="submission-card listening-admin-card" key={entry.id}>
          <div className="submission-card-top"><div className="submission-tags"><span className={`status listening-${entry.status}`}>{statusLabels[entry.status as Status] || entry.status}</span><span>{needLabels[entry.need as Need] || entry.need}</span>{entry.publicationConsent && <span>Consente publicação anônima</span>}</div><time>{formatDate(entry.createdAt)}</time></div>
          <h2>{entry.alias || "Pessoa anônima"}</h2>
          <p className="submission-content">{entry.message}</p>
          <dl><div><dt>Código particular</dt><dd>{entry.accessCode}</dd></div><div><dt>Pedido</dt><dd>{needLabels[entry.need as Need] || entry.need}</dd></div><div><dt>Publicação futura</dt><dd>{entry.publicationConsent ? "Autorizou consideração anônima" : "Não autorizou"}</dd></div></dl>

          {editingId === entry.id ? <form className="submission-edit listening-response-editor" onSubmit={(event) => { event.preventDefault(); updateEntry(entry.id, { response: drafts[entry.id], status: "responded" }, "Acolhimento disponibilizado para consulta."); }}>
            <label><span>Sua palavra de acolhimento</span><textarea value={drafts[entry.id] || ""} minLength={20} maxLength={5000} rows={9} onChange={(event) => setDrafts((current) => ({ ...current, [entry.id]: event.target.value }))} required /><small>A pessoa verá somente esta resposta ao consultar o código. O relato original nunca é exibido na página pública.</small></label>
            <div className="edit-actions"><button type="button" onClick={() => setEditingId(null)}>Cancelar</button><button type="button" disabled={busyId === entry.id} onClick={() => updateEntry(entry.id, { response: drafts[entry.id] || "", status: "read" }, "Rascunho salvo; o relato continua marcado como lido.")}>Salvar rascunho</button><button className="publish" type="submit" disabled={busyId === entry.id}>{busyId === entry.id ? "Salvando…" : "Disponibilizar acolhimento"}</button></div>
          </form> : <>
            {entry.response && <div className="listening-admin-response"><strong>Resposta preparada</strong><p>{entry.response}</p></div>}
            <div className="submission-actions">
              {entry.status === "new" && <button onClick={() => updateEntry(entry.id, { status: "read" }, "Relato marcado como lido.")}>Marcar como lido</button>}
              <button className={entry.status === "responded" ? "" : "publish"} onClick={() => setEditingId(entry.id)}>{entry.response ? "Editar resposta" : "Escrever acolhimento"}</button>
              {entry.status !== "archived" && <button onClick={() => updateEntry(entry.id, { status: "archived" }, "Relato arquivado.")}>Arquivar</button>}
              {entry.status === "archived" && <button onClick={() => updateEntry(entry.id, { status: "read" }, "Relato reaberto.")}>Reabrir</button>}
              <button className="danger" disabled={busyId === entry.id} onClick={() => deleteEntry(entry)}>Excluir</button>
            </div>
          </>}
        </article>)}
      </div>
    </section>
  </main>;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
