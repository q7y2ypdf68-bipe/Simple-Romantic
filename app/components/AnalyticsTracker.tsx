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
