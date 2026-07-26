"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AdminNavigation } from "./AdminNavigation";

type Status = "pending" | "approved" | "published" | "rejected";
type Kind = "story" | "idea" | "surprise";

export type Submission = {
  id: number;
  kind: string;
  authorName: string | null;
  email: string;
  title: string;
  content: string;
  location: string | null;
  anonymous: boolean;
  status: string;
  createdAt: string;
  updatedAt: string | null;
  publishedAt: string | null;
};

const statusLabels: Record<Status, string> = {
  pending: "Aguardando",
  approved: "Aprovada",
  published: "Publicada",
  rejected: "Rejeitada",
};

const kindLabels: Record<Kind, string> = {
  story: "História",
  idea: "Ideia de encontro",
  surprise: "Surpresa",
};

export default function AdminDashboard({ initialSubmissions, userName }: { initialSubmissions: Submission[]; userName: string }) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [filter, setFilter] = useState<"all" | Status>("pending");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [notice, setNotice] = useState("");

  const visible = useMemo(() => filter === "all" ? submissions : submissions.filter((item) => item.status === filter), [filter, submissions]);
  const counts = useMemo(() => ({
    all: submissions.length,
    pending: submissions.filter((item) => item.status === "pending").length,
    approved: submissions.filter((item) => item.status === "approved").length,
    published: submissions.filter((item) => item.status === "published").length,
    rejected: submissions.filter((item) => item.status === "rejected").length,
  }), [submissions]);

  async function updateSubmission(id: number, changes: Partial<Submission>, successMessage: string) {
    setBusyId(id);
    setNotice("");
    try {
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
      const data = await response.json() as { submission?: Submission; error?: string };
      if (!response.ok || !data.submission) throw new Error(data.error || "Não foi possível atualizar.");
      setSubmissions((items) => items.map((item) => item.id === id ? data.submission! : item));
      setEditingId(null);
      setNotice(successMessage);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Não foi possível atualizar.");
    } finally {
      setBusyId(null);
    }
  }

  async function deleteSubmission(item: Submission) {
    if (!window.confirm(`Excluir definitivamente “${item.title}”?`)) return;
    setBusyId(item.id);
    setNotice("");
    try {
      const response = await fetch(`/api/admin/submissions/${item.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Não foi possível excluir a contribuição.");
      setSubmissions((items) => items.filter((submission) => submission.id !== item.id));
      setNotice("Contribuição excluída.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Não foi possível excluir.");
    } finally {
      setBusyId(null);
    }
  }

  return <main className="admin-shell">
    <header className="admin-header">
      <Link className="brand" href="/"><span className="brand-heart">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i><small>PAINEL ADMINISTRATIVO</small></span></Link>
      <AdminNavigation active="community" />
    </header>

    <section className="admin-main">
      <div className="admin-title"><div><p className="eyebrow">COMUNIDADE · MODERAÇÃO</p><h1>Histórias e ideias recebidas</h1><p>Olá, {userName}. Revise cada contribuição antes de aprovar ou publicar.</p></div><div className="admin-total"><strong>{counts.pending}</strong><span>aguardando sua revisão</span></div></div>

      <div className="admin-stats" aria-label="Resumo das contribuições">
        {(["all", "pending", "approved", "published", "rejected"] as const).map((status) => <button className={filter === status ? "active" : ""} key={status} onClick={() => setFilter(status)}><strong>{counts[status]}</strong><span>{status === "all" ? "Todas" : statusLabels[status]}</span></button>)}
      </div>

      <p className="admin-notice" role="status" aria-live="polite">{notice}</p>

      <div className="admin-list">
        {visible.length === 0 && <div className="admin-empty"><span>♡</span><h2>Nenhuma contribuição aqui.</h2><p>Quando houver novos envios, eles aparecerão nesta área.</p></div>}
        {visible.map((item) => <article className="submission-card" key={item.id}>
          <div className="submission-card-top"><div className="submission-tags"><span className={`status ${item.status}`}>{statusLabels[item.status as Status] || item.status}</span><span>{kindLabels[item.kind as Kind] || item.kind}</span>{item.anonymous && <span>Anônima</span>}</div><time>{formatDate(item.createdAt)}</time></div>
          {editingId === item.id ? <EditForm item={item} disabled={busyId === item.id} onCancel={() => setEditingId(null)} onSave={(changes) => updateSubmission(item.id, changes, "Alterações salvas.")} /> : <>
            <h2>{item.title}</h2>
            <p className="submission-content">{item.content}</p>
            <dl><div><dt>Autoria</dt><dd>{item.anonymous ? "Publicação anônima" : item.authorName || "Nome não informado"}</dd></div><div><dt>Local</dt><dd>{item.location || "Não informado"}</dd></div><div><dt>E-mail privado</dt><dd>{item.email}</dd></div></dl>
            {item.status === "published" && <Link className="published-link" href={`/blog/historias/${item.id}`}>Abrir publicação →</Link>}
          </>}
          {editingId !== item.id && <div className="submission-actions">
            <button onClick={() => setEditingId(item.id)}>Editar</button>
            {item.status !== "approved" && item.status !== "published" && <button onClick={() => updateSubmission(item.id, { status: "approved" }, "Contribuição aprovada.")}>Aprovar</button>}
            {item.status !== "published" && <button className="publish" onClick={() => updateSubmission(item.id, { status: "published" }, "Contribuição publicada no blog.")}>Publicar</button>}
            {item.status !== "rejected" && <button onClick={() => updateSubmission(item.id, { status: "rejected" }, "Contribuição rejeitada.")}>Rejeitar</button>}
            {item.status !== "pending" && <button onClick={() => updateSubmission(item.id, { status: "pending" }, "Contribuição devolvida à fila.")}>Voltar à fila</button>}
            <button className="danger" onClick={() => deleteSubmission(item)}>Excluir</button>
          </div>}
        </article>)}
      </div>
    </section>
  </main>;
}

function EditForm({ item, disabled, onCancel, onSave }: { item: Submission; disabled: boolean; onCancel: () => void; onSave: (changes: Partial<Submission>) => void }) {
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);
  const [authorName, setAuthorName] = useState(item.authorName || "");
  const [location, setLocation] = useState(item.location || "");
  const [anonymous, setAnonymous] = useState(item.anonymous);

  return <form className="submission-edit" onSubmit={(event) => { event.preventDefault(); onSave({ title, content, authorName, location, anonymous }); }}>
    <label><span>Título</span><input value={title} minLength={4} maxLength={120} onChange={(event) => setTitle(event.target.value)} required /></label>
    <label><span>História ou ideia</span><textarea value={content} minLength={40} maxLength={3000} rows={8} onChange={(event) => setContent(event.target.value)} required /></label>
    <div><label><span>Nome ou apelido</span><input value={authorName} maxLength={80} onChange={(event) => setAuthorName(event.target.value)} /></label><label><span>Cidade e país</span><input value={location} maxLength={120} onChange={(event) => setLocation(event.target.value)} /></label></div>
    <label className="edit-check"><input type="checkbox" checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} /><span>Publicar anonimamente</span></label>
    <div className="edit-actions"><button type="button" onClick={onCancel}>Cancelar</button><button className="publish" type="submit" disabled={disabled}>{disabled ? "Salvando…" : "Salvar alterações"}</button></div>
  </form>;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
