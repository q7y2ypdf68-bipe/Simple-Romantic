import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple & Romantic — Momentos simples, memórias bonitas",
  description: "Encontros acessíveis, lugares bonitos e pequenas surpresas para casais reais, com orçamentos reais.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" style={{ colorScheme: "light", backgroundColor: "#fffefe" }}><head><meta name="color-scheme" content="only light" /><meta name="supported-color-schemes" content="light" /><meta name="theme-color" content="#fffefe" /></head><body style={{ backgroundColor: "#fffefe", color: "#3b2636" }}>{children}</body></html>;
}
