// Static files that GitHub Pages serves for agents.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (p) => readFileSync(new URL(p, root), 'utf8');
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

test('Person JSON-LD is valid and has a description', () => {
  const html = read('index.html');
  const block = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
  const data = JSON.parse(block);
  assert.equal(data['@type'], 'Person');
  assert.equal(data.name, 'Anis Ahmed Zaid');
  assert.ok(typeof data.description === 'string' && data.description.length > 50);
});

test('h1 carries the brand name for search engines', () => {
  assert.match(read('index.html'), /<h1><span class="sr-only">Anis Ahmed Zaid, <\/span>Ingénieur IA\./);
  assert.match(read('css/site.css'), /\.sr-only \{/);
});

test('custom 404 page explains the error and links to agent resources', () => {
  const page = read('404.html');
  assert.match(page, /Page introuvable/);
  for (const link of ['/index.md', '/llms.txt', '/sitemap.xml']) assert.ok(page.includes(`href="${link}"`), link);
});
