"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MEASUREMENT_ID = "G-L6MFVBQ1XZ";
const CONSENT_STORAGE_KEY = "simple-romantic-analytics-consent";
const CONSENT_EVENT = "simple-romantic-analytics-consent-change";

type ConsentState = "granted" | "denied";
type GtagFunction = (...args: unknown[]) => void;

const consentInitialization = `
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });
  window.gtag("js", new Date());
`;

function parseConsent(value: string | null): ConsentState | null {
  return value === "granted" || value === "denied" ? value : null;
}

function getGtag(): GtagFunction | null {
  const candidate = (window as Window & { gtag?: GtagFunction }).gtag;
  return typeof candidate === "function" ? candidate : null;
}

export function AnalyticsConsent() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const configuredRef = useRef(false);

  useEffect(() => {
    let stored: ConsentState | null = null;
    try {
      stored = parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
    } catch {
      stored = null;
    }
    const frame = window.requestAnimationFrame(() => {
      setConsent(stored);
      setHasMounted(true);
    });

    function handleConsent(event: Event) {
      const next = parseConsent((event as CustomEvent<string>).detail);
      if (next) setConsent(next);
    }

    window.addEventListener(CONSENT_EVENT, handleConsent);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(CONSENT_EVENT, handleConsent);
    };
  }, []);

  useEffect(() => {
    if (consent !== "granted" || !scriptReady) return;
    const gtag = getGtag();
    if (!gtag) return;

    if (!configuredRef.current) {
      gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      gtag("config", MEASUREMENT_ID, { send_page_view: false });
      configuredRef.current = true;
    }
    if (pathname) {
      gtag("event", "page_view", {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [consent, pathname, scriptReady]);

  function chooseConsent(next: ConsentState) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, next);
    } catch {
      // The in-memory decision still applies when storage is unavailable.
    }
    setConsent(next);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: next }));
  }

  const googleScripts = hasMounted ? (
    <>
      <Script id="ga4-consent-initialization" strategy="afterInteractive">
        {consentInitialization}
      </Script>
      <Script
        id="ga4-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
    </>
  ) : null;

  return (
    <>
      {googleScripts}
      {hasMounted && consent === null && (
        <aside
          className="analytics-consent-banner"
          role="region"
          aria-labelledby="analytics-consent-title"
          aria-describedby="analytics-consent-description"
        >
          <div className="analytics-consent-copy">
            <p className="eyebrow">PRIVACIDADE</p>
            <h2 id="analytics-consent-title">Podemos entender melhor as visitas?</h2>
            <p id="analytics-consent-description">
              Usamos o Google Analytics para compreender as visitas e melhorar o conteúdo. Você escolhe se aceita.
            </p>
          </div>
          <div className="analytics-consent-actions">
            <button className="analytics-consent-button analytics-consent-accept" type="button" onClick={() => chooseConsent("granted")}>
              Aceitar Analytics
            </button>
            <button className="analytics-consent-button analytics-consent-decline" type="button" onClick={() => chooseConsent("denied")}>
              Recusar
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
