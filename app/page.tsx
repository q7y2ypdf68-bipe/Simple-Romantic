import { coupleMetadata } from "./horoscopo-og";
import type { Metadata } from "next";
import Home from "./HomeClient";
import { getVisiblePosts } from "./blog/posts-db";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ casal?: string | string[] }> }): Promise<Metadata> {
  return coupleMetadata("pt", (await searchParams).casal);
}

export default async function Page() {
  // A página inicial só mostra os 3 mais recentes; o texto completo não precisa ir para o navegador.
  const latest = (await getVisiblePosts()).slice(0, 3).map((post) => ({ ...post, intro: [], sections: [] }));
  return <Home blogPosts={latest} />;
}
