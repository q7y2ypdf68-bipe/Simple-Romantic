"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export type BlogListItem = {
  id: string;
  href: string;
  title: string;
  excerpt: string;
  category: string;
  meta: string;
  image?: string;
  imageAlt?: string;
  community?: boolean;
};

const PAGE_SIZE = 9;

function normalize(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase("pt-BR");
}

export function BlogExplorer({ items }: { items: BlogListItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("TODOS");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const categories = useMemo(() => ["TODOS", ...Array.from(new Set(items.map((item) => item.category)))], [items]);

  const filtered = useMemo(() => {
    const term = normalize(query.trim());
    return items.filter((item) => {
      const matchesCategory = category === "TODOS" || item.category === category;
      const haystack = normalize(`${item.title} ${item.excerpt} ${item.category}`);
      return matchesCategory && (!term || haystack.includes(term));
    });
  }, [category, items, query]);

  function chooseCategory(nextCategory: string) {
    setCategory(nextCategory);
    setVisibleCount(PAGE_SIZE);
  }

  return <div className="blog-explorer">
    <div className="blog-tools">
      <label className="blog-search">
        <span>Pesquisar no blog</span>
        <div><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE); }} placeholder="Ex.: piquenique, chuva, surpresa…" type="search" /></div>
      </label>
      <div className="blog-categories" aria-label="Filtrar por categoria">
        {categories.map((item) => <button className={category === item ? "active" : ""} type="button" key={item} onClick={() => chooseCategory(item)}>{item === "TODOS" ? "Todos" : item}</button>)}
      </div>
    </div>

    <p className="blog-results" role="status">{filtered.length} {filtered.length === 1 ? "conteúdo encontrado" : "conteúdos encontrados"}</p>

    {filtered.length > 0 ? <div className="blog-grid blog-grid-page">
      {filtered.slice(0, visibleCount).map((item) => <article className="blog-card" key={item.id}>
        {item.community ? <Link className="community-card-art" href={item.href}><span>♥</span><small>HISTÓRIA REAL</small></Link> : <Link className="blog-card-image" href={item.href}><Image unoptimized src={item.image!} alt={item.imageAlt!} fill sizes="(max-width: 700px) 100vw, 33vw" /></Link>}
        <div className="blog-card-copy"><p className="eyebrow">{item.category}</p><h2><Link href={item.href}>{item.title}</Link></h2><p>{item.excerpt}</p><div className="blog-card-meta"><span>{item.meta}</span><Link href={item.href}>Ler {item.community ? "história" : "artigo"} →</Link></div></div>
      </article>)}
    </div> : <div className="blog-empty"><span>♡</span><h2>Nenhum conteúdo encontrado.</h2><p>Tente outra palavra ou escolha uma categoria diferente.</p><button type="button" onClick={() => { setQuery(""); chooseCategory("TODOS"); }}>Limpar pesquisa</button></div>}

    {visibleCount < filtered.length && <div className="blog-load-more"><button className="button primary" type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>Mostrar mais conteúdos <span>↓</span></button></div>}
  </div>;
}
