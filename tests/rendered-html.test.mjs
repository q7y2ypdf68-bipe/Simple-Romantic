import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;
const googleVerificationMeta =
  /<meta(?=[^>]*\bname=["']google-site-verification["'])(?=[^>]*\bcontent=["']kv-3Y3TxawyrnteVacXO6PSW-LteDXtNq-sY1IOaeqQ["'])[^>]*>/i;

test("assigns an editorial WebP image to every blog article", async () => {
  const source = await readFile(new URL("../app/blog/posts.ts", import.meta.url), "utf8");
  const imagePaths = [...source.matchAll(/\bimage:\s*"([^"]+)"/g)].map((match) => match[1]);
  const articleSlugs = [...source.matchAll(/\bslug:\s*"([^"]+)"/g)].map((match) => match[1]);

  assert.equal(imagePaths.length, articleSlugs.length);
  assert.ok(imagePaths.every((path) => path.startsWith("/images/blog/") && path.endsWith(".webp")));
});

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("permissions-policy"), "camera=(), geolocation=(), microphone=()");
  const html = await response.text();
  assert.match(html, developmentPreviewMeta);
  assert.match(html, googleVerificationMeta);
});

test("renders the newest last-minute date article with both internal actions", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("article-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/blog/encontro-romantico-de-ultima-hora", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Encontro romântico de última hora: 12 ideias fáceis para hoje/i);
  assert.match(html, /href=["']\/#encontrar["']/i);
  assert.match(html, /href=["']\/guia["']/i);
  assert.match(html, /Compartilhar este artigo/i);
  assert.match(html, /Artigos relacionados/i);
  assert.match(html, /Caminho da página/i);
});

test("includes the newest article in the sitemap", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("sitemap-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/sitemap.xml"),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  const xml = await response.text();
  assert.match(xml, /\/blog\/encontro-romantico-de-ultima-hora/);
  assert.match(xml, /<lastmod>2026-07-31<\/lastmod>/);
});

test("rejects incomplete form submissions before persistence", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("forms-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
  const ctx = {
    waitUntil() {},
    passThroughOnException() {},
  };

  for (const path of ["/api/guide", "/api/community", "/api/contact"]) {
    const response = await worker.fetch(
      new Request(`http://localhost${path}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({}),
      }),
      env,
      ctx,
    );
    assert.equal(response.status, 400, `${path} should reject an incomplete submission`);
  }
});

test("renders blog discovery tools and collection structured data", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("blog-tools-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/blog", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Pesquisar no blog/i);
  assert.match(html, /Mostrar mais conteúdos/i);
  assert.match(html, /ItemList/);
});

test("serves a discoverable RSS feed with every currently visible editorial article", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("rss-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/rss.xml"),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /application\/rss\+xml/);
  const xml = await response.text();
  const source = await readFile(new URL("../app/blog/posts.ts", import.meta.url), "utf8");
  const publishDates = [...source.matchAll(/\bpublishedIso:\s*"(\d{4}-\d{2}-\d{2})"/g)].map((match) => match[1]);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Lisbon",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const getPart = (type) => parts.find((part) => part.type === type)?.value ?? "";
  const todayInLisbon = `${getPart("year")}-${getPart("month")}-${getPart("day")}`;
  const visibleArticleCount = publishDates.filter((date) => date <= todayInLisbon).length;
  assert.equal((xml.match(/<item>/g) || []).length, visibleArticleCount);
  assert.match(xml, /Blog Simple &amp; Romantic/);
});

test("serves lightweight WebP images for the main visual areas", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  for (const filename of ["hero-park.webp", "beach-walk.webp", "viewpoint-surprise.webp"]) {
    assert.match(page, new RegExp(filename.replace(".", "\\.")));
    const details = await stat(new URL(`../public/images/${filename}`, import.meta.url));
    assert.ok(details.size < 500_000, `${filename} should remain lightweight`);
  }
  assert.doesNotMatch(page, /hero-park\.png|beach-walk\.png|viewpoint-surprise\.png/);
});

test("accepts harmless honeypot requests without writing personal data", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("honeypot-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const ctx = { waitUntil() {}, passThroughOnException() {} };
  for (const path of ["/api/guide", "/api/community", "/api/contact"]) {
    const response = await worker.fetch(
      new Request(`http://localhost${path}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ website: "bot.example" }),
      }),
      env,
      ctx,
    );
    assert.ok(response.status === 200 || response.status === 201);
  }
});

test("analytics ignores private routes without requiring persistence", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("analytics-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/api/analytics", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path: "/admin", source: "Direto" }),
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 202);
});

test("tracks every public service area while excluding private response lookups", async () => {
  const source = await readFile(new URL("../app/api/analytics/route.ts", import.meta.url), "utf8");
  for (const route of ["loja", "tienda", "comunidad", "contacto", "privacidad", "normas-de-la-comunidad"]) {
    assert.match(source, new RegExp(route));
  }
  const tracker = await readFile(new URL("../app/components/AnalyticsTracker.tsx", import.meta.url), "utf8");
  assert.match(tracker, /\/entre-nos\/resposta/);
  assert.match(tracker, /\/es\/entre-nos\/respuesta/);
});

test("documents listening retention and exposes self-service deletion", async () => {
  const [privacy, form, lookup, retention] = await Promise.all([
    readFile(new URL("../app/privacidade/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/entre-nos/ListeningForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/entre-nos/resposta/ResponseLookup.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/listening-retention.ts", import.meta.url), "utf8"),
  ]);

  assert.match(privacy, /até 180 dias depois do envio/i);
  assert.match(privacy, /até 90 dias depois da resposta/i);
  assert.match(form, /Autorizo expressamente o tratamento deste relato/i);
  assert.match(lookup, /Eliminar meu relato agora/i);
  assert.match(retention, /LISTENING_CONSENT_VERSION/);
});

test("rejects deletion attempts without a valid private listening code", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("listening-delete-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/api/listening?code=invalido", { method: "DELETE" }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 400);
});

test("provides a complete Spanish guide with thirty translated ideas", async () => {
  const guide = JSON.parse(await readFile(new URL("../content/guide-es-es.json", import.meta.url), "utf8"));
  assert.equal(guide.length, 30);
  assert.equal(guide[0].title, "Atardecer en el parque");
  assert.equal(guide[29].title, "Nuestra cita propia");
});

test("keeps Spanish navigation inside the Spanish experience", async () => {
  const [home, chrome] = await Promise.all([
    readFile(new URL("../app/es/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/es/blog/BlogChromeEs.tsx", import.meta.url), "utf8"),
  ]);
  for (const route of ["/es/guia", "/es/comunidad", "/es/entre-nos", "/es/privacidad", "/es/terminos", "/es/contacto"]) {
    assert.match(`${home}\n${chrome}`, new RegExp(route.replaceAll("/", "\\/")));
  }
  assert.doesNotMatch(`${home}\n${chrome}`, /href="\/(guia|entre-nos|privacidade|termos|contato)"/);
});

test("renders Spanish listening safety and consent information", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("spanish-listening-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/es/entre-nos", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html[^>]+lang="es-ES"/i);
  assert.match(html, /Emergencias:<\/b>[^<]*<a[^>]*>112<\/a>/i);
  assert.match(html, /conducta suicida/i);
  assert.match(html, />024<\/a>/i);
  assert.match(html, />016<\/a>/i);
  assert.match(html, /Autorizo expresamente el tratamiento de este relato/i);
});

test("stores and surfaces the language of Spanish messages", async () => {
  const [schema, listeningApi, communityApi, contactApi, listeningAdmin, communityAdmin, contactAdmin] = await Promise.all([
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/listening/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/community/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/contact/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/admin/escuta/ListeningDashboard.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/admin/AdminDashboard.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/admin/contatos/page.tsx", import.meta.url), "utf8"),
  ]);
  assert.ok((schema.match(/language: text\("language"\)/g) || []).length >= 3);
  for (const source of [listeningApi, communityApi, contactApi, listeningAdmin, communityAdmin, contactAdmin]) assert.match(source, /es-ES/);
});

test("adds every public Spanish service page to the sitemap", async () => {
  const source = await readFile(new URL("../app/sitemap.xml/route.ts", import.meta.url), "utf8");
  for (const route of ["/es/guia", "/es/comunidad", "/es/entre-nos", "/es/contacto", "/es/privacidad", "/es/terminos", "/es/normas-de-la-comunidad"]) {
    assert.match(source, new RegExp(route.replaceAll("/", "\\/")));
  }
});

test("publishes a bilingual store foundation without pretending commerce is active", async () => {
  const [portuguese, spanish, sitemap, ptChrome, esChrome] = await Promise.all([
    readFile(new URL("../app/loja/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/es/tienda/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.xml/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/blog/BlogChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/es/blog/BlogChromeEs.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(portuguese, /ainda não existem vendas nem encomendas/i);
  assert.match(spanish, /todavía no hay ventas ni pedidos/i);
  assert.match(portuguese, /Intimidade e bem-estar 18\+/);
  assert.match(spanish, /Intimidad y bienestar 18\+/);
  assert.doesNotMatch(`${portuguese}\n${spanish}`, /checkout|adicionar ao carrinho|añadir al carrito/i);
  for (const [source, route] of [[sitemap, "/loja"], [sitemap, "/es/tienda"], [ptChrome, "/loja"], [esChrome, "/es/tienda"]]) {
    assert.match(source, new RegExp(route.replaceAll("/", "\\/")));
  }
});

test("keeps SEO language pairs reciprocal and private analytics paths untracked", async () => {
  const [guide, privacy, article, tracker] = await Promise.all([
    readFile(new URL("../app/guia/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/privacidade/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/blog/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/AnalyticsTracker.tsx", import.meta.url), "utf8"),
  ]);
  for (const source of [guide, privacy, article]) {
    assert.match(source, /"pt-BR"/);
    assert.match(source, /"es-ES"/);
  }
  assert.match(tracker, /\/entre-nos\/resposta/);
  assert.match(tracker, /\/es\/entre-nos\/respuesta/);
});

test("explains internal views, unique visitors and Google clicks in the private dashboard", async () => {
  const dashboard = await readFile(new URL("../app/admin/painel/page.tsx", import.meta.url), "utf8");
  assert.match(dashboard, /Visualizações internas/);
  assert.match(dashboard, /Visitantes únicos/);
  assert.match(dashboard, /Cliques no Google/);
  assert.match(dashboard, /Search Console/);
});

test("covers every high-risk surface in the final dark-theme cascade", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const auditStart = css.indexOf("Dark-theme audit: final cascade layer");
  assert.ok(auditStart > 0);
  const audit = css.slice(auditStart);
  for (const selector of [
    ".blog-welcome-copy",
    ".community-steps article",
    ".community-form label>span",
    ".blog-page .blog-card:nth-child(3n+1)",
    ".blog-categories button.active",
    ".listening-success",
    ".listening-code",
    ".admin-stats button.active",
    ".submission-actions button",
    ".submission-edit textarea",
    ".admin-denied>div",
  ]) assert.ok(audit.includes(selector), `missing final dark override for ${selector}`);
  assert.match(audit, /input::placeholder/);
  assert.match(audit, /\.how \.section-heading h2/);
});

test("locks finder and listening contrast in both themes", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const packageStart = css.indexOf("Contrast package — finder and listening form");
  assert.ok(packageStart > 0, "contrast package must exist");
  const packageCss = css.slice(packageStart);
  for (const selector of [
    ".finder .section-heading h2",
    ".finder-form strong",
    "html[data-theme=\"dark\"] .finder",
    "html[data-theme=\"dark\"] .finder-form",
    "html[data-theme=\"dark\"] .location-field input",
    ".listening-form-intro",
    ".listening-form",
    "html[data-theme=\"dark\"] .listening-form-intro",
    "html[data-theme=\"dark\"] .listening-form",
  ]) assert.ok(packageCss.includes(selector), `missing scoped contrast rule for ${selector}`);
  assert.match(packageCss, /html\[data-theme="dark"\] \.finder\{[^}]*!important/);
  assert.match(packageCss, /html\[data-theme="dark"\] \.finder-form\{[^}]*!important/);
});

test("keeps the secondary header controls prominent in light mode and scoped in dark mode", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const controlsStart = css.indexOf("Header controls — stronger hierarchy in light mode");
  assert.ok(controlsStart > 0);
  const controls = css.slice(controlsStart);
  for (const selector of [
    ".blog-site-header .theme-toggle",
    ".blog-site-header .language-shortcut",
    ".blog-site-header .back-home",
    "html[data-theme=\"dark\"] .blog-site-header .theme-toggle",
    "html[data-theme=\"dark\"] .blog-site-header .language-shortcut",
    "html[data-theme=\"dark\"] .blog-site-header .back-home",
  ]) assert.ok(controls.includes(selector), `missing header-control rule for ${selector}`);
  assert.match(controls, /\.blog-site-header \.back-home\{[^}]*color:#fff/);
  assert.match(controls, /outline:3px solid #ffd45b/);
});
