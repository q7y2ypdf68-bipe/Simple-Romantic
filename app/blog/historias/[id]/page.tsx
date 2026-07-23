import type { Metadata } from "next";
import Link from "next/link";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { BlogFooter, BlogHeader } from "../../BlogChrome";

export const dynamic = "force-dynamic";

async function getStory(id: number) {
  if (!Number.isInteger(id) || id < 1) return null;
  const [{ getDb }, { communitySubmissions }] = await Promise.all([
    import("../../../../db"),
    import("../../../../db/schema"),
  ]);
  const [story] = await getDb().select().from(communitySubmissions).where(and(eq(communitySubmissions.id, id), eq(communitySubmissions.status, "published"))).limit(1);
  return story || null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const story = await getStory(Number(id));
  if (!story) return {};
  return {
    title: story.title,
    description: story.content.slice(0, 155),
    alternates: { canonical: `/blog/historias/${story.id}` },
    robots: { index: true, follow: true },
  };
}

export default async function CommunityStoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const story = await getStory(Number(id));
  if (!story) notFound();

  const author = story.anonymous ? "História publicada anonimamente" : story.authorName || "Leitor(a) da comunidade";
  const category = story.kind === "idea" ? "IDEIA DA COMUNIDADE" : story.kind === "surprise" ? "SURPRESA DA COMUNIDADE" : "HISTÓRIA DA COMUNIDADE";

  return <main className="article-page community-article">
    <BlogHeader />
    <article>
      <header className="article-header section"><Link className="article-back" href="/blog">← Voltar ao blog</Link><p className="eyebrow">{category}</p><h1>{story.title}</h1><p className="article-deck">{author}{story.location ? ` · ${story.location}` : ""}</p><div className="article-meta"><span>{formatDate(story.publishedAt || story.createdAt)}</span></div></header>
      <div className="community-article-visual"><span>“</span><strong>Histórias reais.<br />Inspiração compartilhada.</strong><small>SIMPLE & ROMANTIC</small></div>
      <div className="article-body">
        {story.content.split(/\n+/).filter(Boolean).map((paragraph) => <p className="article-intro" key={paragraph}>{paragraph}</p>)}
        <aside className="article-cta"><p className="eyebrow">SUA HISTÓRIA TAMBÉM IMPORTA</p><h2>Viveu um momento que pode inspirar alguém?</h2><p>Compartilhe sua história ou ideia. Toda contribuição passa por revisão antes de ser publicada.</p><Link className="button primary" href="/#comunidade">Compartilhar com a gente <span>→</span></Link></aside>
      </div>
    </article>
    <BlogFooter />
  </main>;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(value));
}
