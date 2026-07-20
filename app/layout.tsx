import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple & Romantic — Momentos simples, memórias bonitas",
  description: "Encontros acessíveis, lugares bonitos e pequenas surpresas para casais reais, com orçamentos reais.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><head><meta name="color-scheme" content="light only" /><meta name="supported-color-schemes" content="light" /></head><body>{children}</body></html>;
}
