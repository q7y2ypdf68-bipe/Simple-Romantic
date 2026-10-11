"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef("");

  useEffect(() => {
    const privatePaths = ["/entre-nos/resposta", "/es/entre-nos/respuesta"];
    if (!pathname || pathname.startsWith("/admin") || privatePaths.some((path) => pathname.startsWith(path)) || lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    let source = "Direto";
    if (document.referrer) {
      try {
        const referrer = new URL(document.referrer);
        source = referrer.hostname === window.location.hostname ? "Interno" : referrer.hostname;
      } catch {
        source = "Outro";
      }
    }

    // Links marcados por nós (ex.: ?utm_source=whatsapp) dizem de onde veio a visita
    // melhor do que o referenciador, que o WhatsApp, e-mails e apps costumam esconder.
    try {
      const tagged = new URLSearchParams(window.location.search).get("utm_source");
      const clean = (tagged || "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 30);
      if (clean) source = `utm-${clean}`;
    } catch {
      // Sem marcação, vale a origem pelo referenciador.
    }

    const payload = JSON.stringify({ path: pathname, source });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics", new Blob([payload], { type: "application/json" }));
      return;
    }

    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    });
  }, [pathname]);

  return null;
}
