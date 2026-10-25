# Edge layer: Markdown negotiation

GitHub Pages serves static files only: it cannot return Markdown for `Accept: text/markdown`,
add `Vary: Accept`, or send a Markdown 404 body. `worker.js` is a Cloudflare Worker that does this
in front of GitHub Pages:

| Request | Response |
|---|---|
| `GET /` with `Accept: text/markdown` | `index.md`, `200`, `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept` |
| `GET /missing` with `Accept: text/markdown` | Markdown error body linking `index.md`, `llms.txt`, `sitemap.xml`, `404` |
| Any request with `Accept: text/html` | Unchanged GitHub Pages response, plus `Vary: Accept` |

Tests: `node --test` from the repo root (`tests/edge.test.mjs`).

## Deployment (not done yet: needs Anis's Cloudflare account)

1. Create a free Cloudflare account, add the site `anisahmedzaid.com`, and let it import the DNS records.
   Keep the four GitHub Pages `A` records (185.199.108-111.153) and the `www` CNAME, all **proxied** (orange cloud).
2. At Namecheap, replace the nameservers with the two given by Cloudflare. Wait for activation.
3. In Cloudflare, SSL/TLS mode: **Full**. GitHub Pages keeps its own certificate and "Enforce HTTPS".
4. Deploy: `npx wrangler login`, then `npx wrangler deploy --config edge/wrangler.toml`.
5. Verify:
   - `curl -sS -i -H 'Accept: text/markdown' https://anisahmedzaid.com/` → 200, `text/markdown`, `Vary: Accept`
   - `curl -sS -i -H 'Accept: text/html' https://anisahmedzaid.com/` → 200, `text/html`
   - `curl -sS -i -H 'Accept: text/markdown' https://anisahmedzaid.com/nope` → 404, Markdown body
