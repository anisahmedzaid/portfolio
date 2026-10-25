// Edge worker behaviour, with the GitHub Pages origin mocked.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import worker, { prefersMarkdown } from '../edge/worker.js';

const MD = '# Anis Ahmed Zaid\n\nProfil.';
const HTML = '<!DOCTYPE html><html></html>';
let calls;

beforeEach(() => {
  calls = [];
  globalThis.fetch = async (input) => {
    const url = new URL(typeof input === 'string' ? input : input.url);
    calls.push(url.pathname);
    if (url.pathname === '/index.md') return new Response(MD, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
    if (url.pathname === '/') return new Response(HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8', Vary: 'Accept-Encoding' } });
    return new Response('<h1>404</h1>', { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  };
});

const get = (path, accept, method = 'GET') =>
  worker.fetch(new Request(`https://anisahmedzaid.com${path}`, { method, headers: accept ? { Accept: accept } : {} }));

test('prefersMarkdown parses Accept with q-values', () => {
  assert.equal(prefersMarkdown('text/markdown'), true);
  assert.equal(prefersMarkdown('text/markdown, text/html;q=0.9'), true);
  assert.equal(prefersMarkdown('text/html, text/markdown;q=0.5'), false);
  assert.equal(prefersMarkdown('text/markdown;q=0'), false);
  assert.equal(prefersMarkdown('text/html,application/xhtml+xml,*/*;q=0.8'), false);
  assert.equal(prefersMarkdown('*/*'), false);
  assert.equal(prefersMarkdown(null), false);
});

test('homepage with Accept: text/markdown returns index.md as Markdown', async () => {
  const res = await get('/', 'text/markdown');
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.match(res.headers.get('Vary'), /\bAccept\b/);
  assert.equal(await res.text(), MD);
});

test('homepage with Accept: text/html stays HTML and gains Vary: Accept', async () => {
  const res = await get('/', 'text/html');
  assert.equal(res.status, 200);
  assert.match(res.headers.get('Content-Type'), /^text\/html/);
  assert.equal(res.headers.get('Vary'), 'Accept-Encoding, Accept');
  assert.equal(await res.text(), HTML);
});

test('missing path with Accept: text/markdown returns a Markdown 404 with links', async () => {
  const res = await get('/__probe-404', 'text/markdown');
  assert.equal(res.status, 404);
  assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.match(res.headers.get('Vary'), /\bAccept\b/);
  const body = await res.text();
  assert.ok(body.length >= 20);
  for (const link of ['/index.md', '/llms.txt', '/sitemap.xml']) assert.ok(body.includes(`https://anisahmedzaid.com${link}`), link);
});

test('missing path with HTML Accept keeps the origin 404 page', async () => {
  const res = await get('/__probe-404', 'text/html');
  assert.equal(res.status, 404);
  assert.match(res.headers.get('Content-Type'), /^text\/html/);
});

test('HEAD with Markdown Accept returns headers without body', async () => {
  const res = await get('/', 'text/markdown', 'HEAD');
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.equal(await res.text(), '');
});
