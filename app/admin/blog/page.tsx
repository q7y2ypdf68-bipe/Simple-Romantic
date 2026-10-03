import type { Metadata } from "next";
import Link from "next/link";
import { AdminNavigation } from "../AdminNavigation";
import { requireAdminUser } from "../admin-auth";
import { listAllDbRows } from "../../blog/posts-db";
import { serializeBody } from "../../blog/post-format";
import { lisbonToday } from "../../blog/post-format";
import { blogPosts as fixedPosts } from "../../blog/posts";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Blog · Painel", robots: { index: false, follow: false, noarchive: true } };

const errors: Record<string, string> = {
  campos: "Preencha título, resumo, categoria e endereço.",
  data: "Escolha uma data de publicação.",
  slug: "Já existe um texto com esse endereço. Mude o campo “Endereço”.",
  tipo: "A imagem precisa ser WEBP, JPG ou PNG.",
  tamanho: "A imagem passa de 1,4 MB. Reduza e envie de novo.",
  texto: "O texto está vazio.",
};
const notices: Record<string, string> = { salvo: "Salvo.", excluido: "Texto excluído." };

type SearchParams = { editar?: string; novo?: string; erro?: string; aviso?: string };

export default async function AdminBlogPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  await requireAdminUser("/admin/blog");
  const { editar, novo, erro, aviso } = await searchParams;
  let rows: Awaited<ReturnType<typeof listAllDbRows>> = [];
  let dbError = false;
  try {
    rows = await listAllDbRows();
  } catch {
    dbError = true;
  }
  const today = lisbonToday();
  const editing = editar ? rows.find((row) => row.id === Number(editar)) : undefined;
  const showForm = Boolean(editing) || novo === "1";
  const intro = editing ? serializeBody(JSON.parse(editing.intro || "[]"), JSON.parse(editing.sections || "[]")) : "";

  return <main className="admin-shell">
    <header className="admin-header"><Link className="brand" href="/"><span className="brand-heart">♥</span><span className="brand-name"><strong>simple</strong><i>& romantic</i><small>PAINEL ADMINISTRATIVO</small></span></Link><AdminNavigation active="blog" /></header>
    <section className="admin-main">
      <div className="admin-title"><div><p className="eyebrow">BLOG</p><h1>Textos da semana</h1><p>O texto aparece no site sozinho na data escolhida (horário de Lisboa). Antes disso, fica guardado e invisível.</p></div><div className="admin-total"><strong>{rows.length}</strong><span>textos no painel</span></div></div>
      {dbError && <p role="alert" className="admin-form-error">Não consegui ler o banco de dados. Confirme se a migração 0007 foi aplicada.</p>}
      {aviso && notices[aviso] && <p className="admin-form-ok" role="status">{notices[aviso]}</p>}
      {erro && errors[erro] && <p role="alert" className="admin-form-error">{errors[erro]}</p>}

      {showForm ? <form className="blog-admin-form" method="post" action="/api/admin/blog" encType="multipart/form-data">
        {editing && <input type="hidden" name="id" value={editing.id} />}
        <h2>{editing ? "Editar texto" : "Novo texto"}</h2>
        <label>Título<input name="titulo" required defaultValue={editing?.title} /></label>
        <label>Título para o Google (opcional)<input name="seo" defaultValue={editing?.seoTitle ?? ""} /></label>
        <label>Endereço (vira /blog/…)<input name="slug" defaultValue={editing?.slug} placeholder="deixe vazio para gerar do título" /></label>
        <label>Resumo (aparece na lista e no Google)<textarea name="resumo" rows={3} required defaultValue={editing?.excerpt} /></label>
        <div className="blog-admin-row">
          <label>Categoria<input name="categoria" required defaultValue={editing?.category} placeholder="CONSELHO DA SEMANA" /></label>
          <label>Série<select name="serie" defaultValue={editing?.series ?? ""}><option value="">—</option><option>CONSELHO DA SEMANA</option><option>IDEIAS E GUIAS</option><option>CONTOS</option></select></label>
          <label>Tempo de leitura<input name="leitura" defaultValue={editing?.readTime} placeholder="4 min de leitura" /></label>
        </div>
        <div className="blog-admin-row">
          <label>Data de publicação<input name="data" type="date" required defaultValue={editing?.publishedIso ?? ""} /></label>
          <label>Situação<select name="status" defaultValue={editing?.status === "draft" ? "rascunho" : "publicado"}><option value="publicado">Programado / publicado</option><option value="rascunho">Rascunho (nunca aparece)</option></select></label>
        </div>
        <fieldset><legend>Imagem do texto (única, sem reaproveitar)</legend>
          {editing?.image && <p><img src={editing.image} alt="" width={160} /> <small>{editing.image}</small></p>}
          <input name="imagem" type="file" accept="image/webp,image/jpeg,image/png" />
          <label>Descrição da imagem (acessibilidade)<input name="imagem_alt" defaultValue={editing?.imageAlt} /></label>
        </fieldset>
        <div className="blog-admin-row">
          <label>Aviso de conteúdo<select name="aviso_rotulo" defaultValue={editing?.contentNoticeLabel ?? ""}><option value="">Nenhum</option><option>CONTO FICTÍCIO</option><option>INSPIRADO EM FATOS</option><option>HISTÓRIA REAL</option></select></label>
          <label>Texto do aviso<input name="aviso_texto" defaultValue={editing?.contentNoticeText ?? ""} /></label>
        </div>
        <label>Texto<textarea name="texto" rows={22} required defaultValue={intro} /></label>
        <p className="blog-admin-help">Como escrever: parágrafos separados por uma linha em branco. Uma linha começando com <code>## </code> cria um subtítulo. Linhas começando com <code>- </code> viram lista.</p>
        <div className="edit-actions"><button type="submit">Salvar</button><Link href="/admin/blog">Cancelar</Link></div>
        {editing && <button className="blog-admin-delete" type="submit" name="acao" value="excluir" formNoValidate>Excluir este texto</button>}
      </form> : <>
        <p><Link className="button primary" href="/admin/blog?novo=1">Novo texto</Link></p>
        <div className="admin-list">
          {rows.length === 0 && <div className="admin-empty"><span>♡</span><h2>Nenhum texto no painel ainda.</h2><p>Os {fixedPosts.length} textos antigos continuam no site normalmente.</p></div>}
          {rows.map((row) => {
            const state = row.status === "draft" ? "Rascunho" : row.publishedIso && row.publishedIso <= today ? "No ar" : `Programado para ${row.published}`;
            return <article className="submission-card" key={row.id}><div className="submission-card-top"><div className="submission-tags"><span className="status pending">{state}</span><span>{row.category}</span></div><time>{row.published}</time></div><h2>{row.title}</h2><p className="submission-content">{row.excerpt}</p><p><Link className="published-link" href={`/admin/blog?editar=${row.id}`}>Editar →</Link></p></article>;
          })}
        </div>
      </>}
    </section>
  </main>;
}
