// Cloudflare Worker in front of GitHub Pages: Markdown content negotiation.
// GitHub Pages cannot vary responses on the Accept header, so this edge layer
// serves /index.md for `Accept: text/markdown` on the homepage and a Markdown
// 404 body for missing paths. Everything else passes through to the origin.

const SITE = 'https://anisahmedzaid.com';
const MD_TYPE = 'text/markdown; charset=utf-8';

// Paths that have a Markdown twin in the repo.
const MARKDOWN_TWINS = {
  '/': '/index.md',
  '/index.html': '/index.md',
};

const NOT_FOUND_MD = `# 404 · Page introuvable

Cette adresse n'existe pas sur anisahmedzaid.com (page not found). Le site tient sur une seule page.

- Profil complet en Markdown : ${SITE}/index.md
- Guide pour les agents : ${SITE}/llms.txt
- Plan du site : ${SITE}/sitemap.xml
`;

// Returns the q-value the Accept header gives to `type`, or 0 when absent.
// Exact types win over `type/*`, which wins over `*/*`.
function qualityFor(accept, type) {
  const [major] = type.split('/');
  let best = { specificity: -1, q: 0 };
  for (const part of accept.split(',')) {
    const [range, ...params] = part.trim().toLowerCase().split(';').map((s) => s.trim());
    if (!range) continue;
    let specificity;
    if (range === type) specificity = 2;
    else if (range === `${major}/*`) specificity = 1;
    else if (range === '*/*') specificity = 0;
    else continue;
    const qParam = params.find((p) => p.startsWith('q='));
    const q = qParam ? Number.parseFloat(qParam.slice(2)) : 1;
    if (specificity > best.specificity) best = { specificity, q: Number.isNaN(q) ? 0 : q };
  }
  return best.q;
}

// Markdown only when the client names it explicitly and ranks it at least as high as HTML.
export function prefersMarkdown(accept) {
  if (!accept || !/text\/markdown/i.test(accept)) return false;
  const md = qualityFor(accept, 'text/markdown');
  return md > 0 && md >= qualityFor(accept, 'text/html');
}

function addVary(headers) {
  const current = headers.get('Vary');
  if (!current) headers.set('Vary', 'Accept');
  else if (!/(^|,)\s*accept\s*(,|$)/i.test(current)) headers.set('Vary', `${current}, Accept`);
  return headers;
}

function withVary(response) {
  const headers = addVary(new Headers(response.headers));
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function markdown(body, status, method) {
  const headers = new Headers({ 'Content-Type': MD_TYPE, Vary: 'Accept', 'Cache-Control': 'public, max-age=600' });
  return new Response(method === 'HEAD' ? null : body, { status, headers });
}

export default {
  async fetch(request) {
    const { method } = request;
    if (method !== 'GET' && method !== 'HEAD') return fetch(request);
    if (!prefersMarkdown(request.headers.get('Accept'))) return withVary(await fetch(request));

    const url = new URL(request.url);
    const twin = MARKDOWN_TWINS[url.pathname] ?? (url.pathname.endsWith('.md') ? url.pathname : null);
    if (twin) {
      const res = await fetch(new Request(new URL(twin, url), { method: 'GET' }));
      if (res.ok) return markdown(await res.text(), 200, method);
    }

    const res = await fetch(request);
    if (res.status === 404) return markdown(NOT_FOUND_MD, 404, method);
    return withVary(res);
  },
};
