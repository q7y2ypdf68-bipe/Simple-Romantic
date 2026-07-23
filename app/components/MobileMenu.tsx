"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

type MenuLink = {
  href: string;
  label: string;
};

export function MobileMenu({
  links,
  openLabel = "Abrir menu",
  closeLabel = "Fechar menu",
}: {
  links: MenuLink[];
  openLabel?: string;
  closeLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className={`mobile-menu${open ? " is-open" : ""}`}>
      <button
        className="mobile-menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav id={menuId} className="mobile-menu-panel" aria-label="Navegação para celular" hidden={!open}>
        {links.map((link) => (
          <Link key={`${link.href}-${link.label}`} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
