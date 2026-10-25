// Static files that GitHub Pages serves for agents.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
// Git may check files out with CRLF on Windows; GitHub Pages serves the LF version.
const read = (p) => readFileSync(new URL(p, root), 'utf8').replace(/\r\n/g, '\n');
const SITE = 'https://anisahmedzaid.com';

test('.nojekyll is present so .md and .txt files are served raw', () => {
  assert.ok(existsSync(new URL('.nojekyll', root)));
});

test('llms.txt follows the llmstxt.org structure and gives when-to-use guidance', () => {
  const txt = read('llms.txt');
  const lines = txt.split('\n');
  assert.match(lines[0], /^# \S/, 'starts with an H1');
  assert.equal(lines.filter((l) => /^# /.test(l)).length, 1, 'exactly one H1');
  assert.match(txt.split('\n\n')[1], /^> /, 'blockquote summary right after the H1');
  const h2 = lines.filter((l) => /^## /.test(l));
  assert.ok(h2.includes('## When to use this site'));
  // Each H2 section is a list of "- [name](url): notes" items.
  const sections = txt.split(/^## .*$/m).slice(1);
  for (const s of sections) {
    for (const item of s.split('\n').filter((l) => l.startsWith('- '))) {
      assert.match(item, /^- \[[^\]]+\]\((https:\/\/|mailto:)[^)]+\)(: .+)?$/, item);
    }
  }
  assert.match(txt, /Use when/);
  assert.match(txt, /contact@anisahmedzaid\.com/);
  assert.doesNotMatch(txt, /[—–]/, 'no long dashes');
});

test('index.md mirrors the homepage projects and links back', () => {
  const md = read('index.md');
  const html = read('index.html');
  assert.match(md, /^# Anis Ahmed Zaid/);
  const titles = [...html.matchAll(/<article class="case">[\s\S]*?<h3>(.*?)<\/h3>/g)].map((m) => m[1]);
  assert.ok(titles.length >= 3);
  for (const t of titles) assert.ok(md.includes(t.replace(/&#39;|&apos;/g, "'")), t);
  for (const link of ['/cv/CV-Anis-Ahmed-Zaid.pdf', '/llms.txt']) assert.ok(md.includes(SITE + link), link);
  assert.doesNotMatch(md, /[—–]/);
});

test('homepage advertises the Markdown twin and llms.txt', () => {
  const html = read('index.html');
  assert.match(html, /<link rel="alternate" type="text\/markdown" href="https:\/\/anisahmedzaid\.com\/index\.md"/);
  assert.match(html, /href="https:\/\/anisahmedzaid\.com\/llms\.txt"/);
});

test('JSON-LD is a ProfilePage whose main entity is the Person, with a description', () => {
  const html = read('index.html');
  const block = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
  const { '@graph': graph } = JSON.parse(block);
  const byType = Object.fromEntries(graph.map((n) => [n['@type'], n]));
  const person = byType.Person;
  assert.equal(person.name, 'Anis Ahmed Zaid');
  assert.ok(typeof person.description === 'string' && person.description.length > 50);
  assert.equal(byType.ProfilePage.mainEntity['@id'], person['@id']);
  assert.equal(byType.ProfilePage.isPartOf['@id'], byType.WebSite['@id']);
});

test('brand name is in the title, h1 and visible intro', () => {
  const html = read('index.html');
  assert.match(html, /<title>Anis Ahmed Zaid · /);
  assert.match(html, /<h1><span class="sr-only">Anis Ahmed Zaid, <\/span>Ingénieur IA\./);
  assert.match(html, /Je suis Anis Ahmed Zaid, diplômé de l'ENSICAEN/);
  assert.match(read('css/site.css'), /\.sr-only \{/);
});

test('portrait is on the page and in the Person JSON-LD', () => {
  const html = read('index.html');
  const img = html.match(/<picture class="portrait">[\s\S]*?<img ([^>]*)>/)[1];
  assert.match(img, /alt="Portrait d'Anis Ahmed Zaid[^"]*"/);
  assert.match(img, /width="\d+" height="\d+"/, 'explicit size avoids layout shift');
  const block = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
  const person = JSON.parse(block)['@graph'].find((n) => n['@type'] === 'Person');
  assert.match(person.image.url, /^https:\/\/anisahmedzaid\.com\/img\/.+\.jpg$/);
  const local = person.image.url.replace('https://anisahmedzaid.com/', '');
  for (const f of [local, ...[...html.matchAll(/\/(img\/[^ "]+\.(?:jpg|png|webp))/g)].map((m) => m[1])]) {
    assert.ok(existsSync(new URL(f, root)), f);
  }
});

test('meta description is under 160 characters and names the person', () => {
  const desc = read('index.html').match(/<meta name="description" content="([^"]*)">/)[1];
  assert.ok(desc.length <= 160, `${desc.length} chars`);
  assert.match(desc, /^Anis Ahmed Zaid/);
});

test('sitemap only lists indexable pages', () => {
  const locs = [...read('sitemap.xml').matchAll(/<loc>https:\/\/anisahmedzaid\.com\/(.*?)<\/loc>/g)].map((m) => m[1]);
  assert.ok(locs.includes(''));
  for (const path of locs.filter(Boolean)) {
    assert.doesNotMatch(read(path), /<meta name="robots" content="noindex/, `${path} is noindex`);
  }
});

test('custom 404 page explains the error and links to agent resources', () => {
  const page = read('404.html');
  assert.match(page, /Page introuvable/);
  for (const link of ['/index.md', '/llms.txt', '/sitemap.xml']) assert.ok(page.includes(`href="${link}"`), link);
});
