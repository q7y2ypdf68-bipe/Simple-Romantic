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
