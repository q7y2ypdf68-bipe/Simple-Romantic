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

export function BlogExplorer({ items, locale = "pt" }: { items: BlogListItem[]; locale?: "pt" | "es" | "en" }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("TODOS");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const allCategory = "TODOS";
  const tx = (pt: string, es: string, en: string) => locale === "es" ? es : locale === "en" ? en : pt;
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
        <span>{tx("Pesquisar no blog", "Buscar en el blog", "Search the blog")}</span>
        <div><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE); }} placeholder={tx("Ex.: piquenique, chuva, surpresa…", "Ej.: pícnic, lluvia, sorpresa…", "E.g. picnic, rain, surprise…")} type="search" /></div>
      </label>
      <div className={`blog-categories${showAllCategories ? " expanded" : ""}`} aria-label={tx("Filtrar por categoria", "Filtrar por categoría", "Filter by category")}>
        {categories.map((item, index) => <button aria-pressed={category === item} className={`${category === item ? "active" : ""}${index > 6 && category !== item ? " cat-extra" : ""}`.trim()} type="button" key={item} onClick={() => chooseCategory(item)}>{item === allCategory ? tx("Todos", "Todos", "All") : item}</button>)}
        {categories.length > 7 && <button className="cat-more" type="button" aria-expanded={showAllCategories} onClick={() => setShowAllCategories((value) => !value)}>{showAllCategories ? tx("Menos categorias", "Menos categorías", "Fewer categories") : tx("Mais categorias", "Más categorías", "More categories")}</button>}
      </div>
    </div>

    <p className="blog-results" role="status">{filtered.length} {locale === "es" ? (filtered.length === 1 ? "contenido encontrado" : "contenidos encontrados") : locale === "en" ? (filtered.length === 1 ? "item found" : "items found") : (filtered.length === 1 ? "conteúdo encontrado" : "conteúdos encontrados")}</p>

    {filtered.length > 0 ? <div className="blog-grid blog-grid-page">
      {filtered.slice(0, visibleCount).map((item) => <article className="blog-card" key={item.id}>
        {item.community ? <Link className="community-card-art" href={item.href}><span>♥</span><small>HISTÓRIA REAL</small></Link> : <Link className="blog-card-image" href={item.href}><Image unoptimized src={item.image!} alt={item.imageAlt!} fill sizes="(max-width: 700px) 100vw, 33vw" /></Link>}
        <div className="blog-card-copy"><p className="eyebrow">{item.category}</p><h2><Link href={item.href}>{item.title}</Link></h2><p>{item.excerpt}</p><div className="blog-card-meta"><span>{item.meta}</span><Link href={item.href}>{locale === "es" ? `Leer ${item.community ? "historia" : "artículo"}` : locale === "en" ? `Read ${item.community ? "story" : "article"}` : `Ler ${item.community ? "história" : "artigo"}`} →</Link></div></div>
      </article>)}
    </div> : <div className="blog-empty"><span>♡</span><h2>{tx("Nenhum conteúdo encontrado.", "No hemos encontrado contenido.", "Nothing found.")}</h2><p>{tx("Tente outra palavra ou escolha uma categoria diferente.", "Prueba otra palabra o elige una categoría distinta.", "Try another word or pick a different category.")}</p><button type="button" onClick={() => { setQuery(""); chooseCategory(allCategory); }}>{tx("Limpar pesquisa", "Borrar búsqueda", "Clear search")}</button></div>}

    {visibleCount < filtered.length && <div className="blog-load-more"><button className="button primary" type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>{tx("Mostrar mais conteúdos", "Mostrar más contenidos", "Show more")} <span>↓</span></button></div>}
  </div>;
}
