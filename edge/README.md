# Edge layer: Markdown negotiation

GitHub Pages serves static files only: it cannot return Markdown for `Accept: text/markdown`,
add `Vary: Accept`, or send a Markdown 404 body. `worker.js` is a Cloudflare Worker that does this
in front of GitHub Pages:

| Request | Response |
|---|---|
| `GET /` with `Accept: text/markdown` | `index.md`, `200`, `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept` |
| `GET /missing` with `Accept: text/markdown` | Markdown error body linking `index.md`, `llms.txt`, `sitemap.xml`, `404` |
| Any request with `Accept: text/html` | Unchanged GitHub Pages response, plus `Vary: Accept` |

Tests: `npm test` from the repo root (`tests/edge.test.mjs`).

## Mise en place (Cloudflare devant GitHub Pages)

DNS publics relevés le 25/10/2026 (Namecheap). Ils doivent tous exister dans Cloudflare avant de changer les serveurs de noms.

| Type | Nom | Valeur | Proxy Cloudflare |
|---|---|---|---|
| A | `@` | 185.199.108.153 | Proxied (orange) |
| A | `@` | 185.199.109.153 | Proxied |
| A | `@` | 185.199.110.153 | Proxied |
| A | `@` | 185.199.111.153 | Proxied |
| CNAME | `www` | anisahmedzaid.github.io | Proxied |
| MX | `@` | smtp.google.com (priorité 1) | DNS only (gris, toujours) |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` | n/a |
| TXT | `@` | `google-site-verification=6lV9_F_65RcBscEWWWD4vdorLFDZsBmCIf7YSklbetg` | n/a |
| TXT | `@` | `google-site-verification=98X9VbutLiUmpLF97Xv2qol93cQWN37E4qeb_kdXSIU` | n/a |

Plus tout enregistrement visible dans Namecheap > Advanced DNS qui n'est pas dans ce tableau
(DKIM `google._domainkey`, DMARC, sous-domaines d'envoi pour l'outil de cold email, etc.) : la
liste publique ne peut pas les montrer tous.

1. **Cloudflare** : créer un compte gratuit, « Add a domain » `anisahmedzaid.com`, plan Free,
   import automatique des DNS. Comparer avec le tableau et avec Namecheap, ajouter ce qui manque.
2. **Réglages Cloudflare à faire avant l'activation**
   - SSL/TLS > Overview : **Full** (pas Flexible, pas Strict).
   - Security > Bots : désactiver « Block AI bots », « AI Labyrinth », « Bot Fight Mode » ; ne pas activer le robots.txt géré.
   - Scrape Shield : désactiver « Email Address Obfuscation » (sinon les liens `mailto:` sont réécrits).
   - Speed : « Rocket Loader » désactivé.
3. **Namecheap** : Domain List > anisahmedzaid.com > Nameservers > « Custom DNS », coller les deux
   serveurs donnés par Cloudflare. Attendre l'email « active » de Cloudflare (quelques minutes à quelques heures).
4. **Contrôle** : le site s'ouvre en HTTPS, un email de test vers contact@anisahmedzaid.com arrive.
5. **Worker** : `npx wrangler login` (navigateur), puis `npx wrangler deploy --config edge/wrangler.toml`.
6. **Vérification**
   - `curl -sS -L -i -H 'Accept: text/markdown' https://anisahmedzaid.com/` → 200, `text/markdown`, `Vary: Accept`
   - `curl -sS -L -i -H 'Accept: text/html' https://anisahmedzaid.com/` → 200, `text/html`
   - `curl -sS -L -i -H 'Accept: text/markdown' https://anisahmedzaid.com/nope` → 404, corps Markdown

Retour arrière : remettre « Namecheap BasicDNS » dans Namecheap, puis vérifier que les
enregistrements du tableau y sont toujours.
