"use client";

import { useEffect } from "react";

// Tira da barra de endereço as etiquetas de rastreio que Instagram/Facebook/Google
// acrescentam no clique (utm_*, fbclid, gclid...). A página e o canonical não mudam.
const TRACKING = /^(utm_.+|fbclid|gclid|igshid|igsh|mc_cid|mc_eid)$/i;

export function CleanUrl() {
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      let changed = false;
      for (const key of Array.from(url.searchParams.keys())) {
        if (TRACKING.test(key)) {
          url.searchParams.delete(key);
          changed = true;
        }
      }
      if (changed) window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    } catch {
      /* sem problema: a URL só fica como veio */
    }
  }, []);
  return null;
}
