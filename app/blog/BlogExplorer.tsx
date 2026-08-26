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

export function BlogExplorer({ items, locale = "pt" }: { items: BlogListItem[]; locale?: "pt" | "es" }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("TODOS");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const allCategory = locale === "es" ? "TODOS" : "TODOS";
  const categories = useMemo(() => [allCategory, ...Array.from(new Set(items.map((item) => item.category)))], [allCategory, items]);

  const filtered = useMemo(() => {
    const term = normalize(query.trim());
    return items.filter((item) => {
    const matchesCategory = category === allCategory || item.category === category;
      const haystack = normalize(`${item.title} ${item.excerpt} ${item.category}`);
      return matchesCategory && (!term || haystack.includes(term));
    });
  }, [allCategory, category, items, query]);

  function chooseCategory(nextCategory: string) {
    setCategory(nextCategory);
    setVisibleCount(PAGE_SIZE);
  }

  return <div className="blog-explorer">
    <div className="blog-tools">
      <label className="blog-search">
        <span>{locale === "es" ? "Buscar en el blog" : "Pesquisar no blog"}</span>
        <div><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE); }} placeholder={locale === "es" ? "Ej.: pícnic, lluvia, sorpresa…" : "Ex.: piquenique, chuva, surpresa…"} type="search" /></div>
      </label>
      <div className="blog-categories" aria-label={locale === "es" ? "Filtrar por categoría" : "Filtrar por categoria"}>
        {categories.map((item) => <button aria-pressed={category === item} className={category === item ? "active" : ""} type="button" key={item} onClick={() => chooseCategory(item)}>{item === allCategory ? (locale === "es" ? "Todos" : "Todos") : item}</button>)}
      </div>
    </div>

    <p className="blog-results" role="status">{filtered.length} {locale === "es" ? (filtered.length === 1 ? "contenido encontrado" : "contenidos encontrados") : (filtered.length === 1 ? "conteúdo encontrado" : "conteúdos encontrados")}</p>

    {filtered.length > 0 ? <div className="blog-grid blog-grid-page">
      {filtered.slice(0, visibleCount).map((item) => <article className="blog-card" key={item.id}>
        {item.community ? <Link className="community-card-art" href={item.href}><span>♥</span><small>HISTÓRIA REAL</small></Link> : <Link className="blog-card-image" href={item.href}><Image unoptimized src={item.image!} alt={item.imageAlt!} fill sizes="(max-width: 700px) 100vw, 33vw" /></Link>}
        <div className="blog-card-copy"><p className="eyebrow">{item.category}</p><h2><Link href={item.href}>{item.title}</Link></h2><p>{item.excerpt}</p><div className="blog-card-meta"><span>{item.meta}</span><Link href={item.href}>{locale === "es" ? `Leer ${item.community ? "historia" : "artículo"}` : `Ler ${item.community ? "história" : "artigo"}`} →</Link></div></div>
      </article>)}
    </div> : <div className="blog-empty"><span>♡</span><h2>{locale === "es" ? "No hemos encontrado contenido." : "Nenhum conteúdo encontrado."}</h2><p>{locale === "es" ? "Prueba otra palabra o elige una categoría distinta." : "Tente outra palavra ou escolha uma categoria diferente."}</p><button type="button" onClick={() => { setQuery(""); chooseCategory(allCategory); }}>{locale === "es" ? "Borrar búsqueda" : "Limpar pesquisa"}</button></div>}

    {visibleCount < filtered.length && <div className="blog-load-more"><button className="button primary" type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>{locale === "es" ? "Mostrar más contenidos" : "Mostrar mais conteúdos"} <span>↓</span></button></div>}
  </div>;
}
