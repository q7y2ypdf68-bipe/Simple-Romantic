"use client";

import { useEffect } from "react";

export function LanguageSetter({ lang }: { lang: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => { document.documentElement.lang = previous || "pt-BR"; };
  }, [lang]);
  return null;
}
