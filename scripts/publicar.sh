#!/usr/bin/env bash
# Publica o site no Cloudflare a partir do Terminal (sem ChatGPT/Codex).
# Uso: bash scripts/publicar.sh [--simular]
#   --simular  monta tudo e confere, mas NÃO publica.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

D1_ID="1bd91801-8598-485a-a32e-8e5a7fc82283"   # banco site-creator-d1

echo "1/3 Construindo o site..."
npx vinext build

echo "2/3 Ligando ao banco de dados real..."
node -e '
const fs = require("fs");
const p = "dist/server/wrangler.json";
const c = JSON.parse(fs.readFileSync(p, "utf8"));
c.d1_databases = [{ binding: "DB", database_name: "site-creator-d1", database_id: process.argv[1] }];
c.assets = { ...(c.assets || {}), binding: "ASSETS" };
c.images = { binding: "IMAGES" };
c.observability = { enabled: true, logs: { enabled: true } };
fs.writeFileSync(p, JSON.stringify(c));
console.log("   banco:", c.d1_databases[0].database_id, "| imagens:", !!c.images, "| arquivos:", c.assets.binding);
' "$D1_ID"

if [[ "${1:-}" == "--simular" ]]; then
  echo "3/3 Simulação (nada será publicado)..."
  npx wrangler deploy --dry-run
else
  echo "3/3 Publicando..."
  npx wrangler deploy
fi
