// Copy rules: honest status claims, recruiter-scannable headings, real proof points.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8').replace(/\r\n/g, '\n');
const html = read('index.html');
const main = html.slice(html.indexOf('<main>'), html.indexOf('</main>'));
const text = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&#39;/g, "'").replace(/\s+/g, ' ');
const pageText = text(main);
// Blocks = paragraphs, list items, definitions: the unit a reader sees a claim in.
// A project card counts as one block: its status line and its title read together.
const cards = [...main.matchAll(/<article class="case">([\s\S]*?)<\/article>/g)].map((m) => text(m[1].replace(/<figure[\s\S]*?<\/figure>/g, '')));
const rest = main.replace(/<article class="case">[\s\S]*?<\/article>/g, '').split(/<\/(?:p|li|dd|h3|div)>/).map(text);
const htmlBlocks = [...cards, ...rest].join('\n');
// Same unit in Markdown: a numbered project section is one block, everything else line by line.
const mdBlocks = read('index.md').split(/\n(?=#{2,3} )/)
  .map((s) => (/^### \d\d /.test(s) ? s.replace(/\n/g, ' ') : s)).join('\n');
const sources = { 'index.html': htmlBlocks, 'index.md': mdBlocks, 'llms.txt': read('llms.txt') };

test('"production" is only claimed for the payroll and competitive-watch automations', () => {
  for (const [name, body] of Object.entries(sources)) {
    for (const sentence of body.split('\n')) {
      if (!/production|en prod\b|in production/i.test(sentence)) continue;
      if (/not put into service|Do not describe|ne jamais/i.test(sentence)) continue;
      assert.match(sentence, /paie|payroll|veille|competitive watch|automatisation|automations?|Deux outils/i, `${name}: "${sentence.trim()}"`);
    }
  }
});

test('no unmastered technologies are claimed', () => {
  for (const [name, body] of Object.entries(sources)) {
    const claims = name === 'llms.txt' ? body.replace(/He does not claim[^\n]*/, '') : body;
    assert.doesNotMatch(claims, /LangChain|LangGraph|PyTorch|pgvector|fine-tun|\bC\+\+/i, name);
  }
});

test('skim view (headings only) tells who, what and the proof', () => {
  const headings = [...main.matchAll(/<h[123][^>]*>([\s\S]*?)<\/h[123]>/g)].map((m) => text(m[1])).join(' | ');
  for (const term of [/Anis Ahmed Zaid/, /Ingénieur IA/, /LLM/, /RAG/, /production/, /Assistant email/, /Parcours/, /Compétences/]) {
    assert.match(headings, term, `${term} missing from headings: ${headings}`);
  }
});

test('first screen states concrete proof points', () => {
  const hero = main.slice(0, main.indexOf('<section'));
  for (const proof of ['16/16', '100 %', 'en production', 'hackathon LCL', 'ALTEN Labs', 'IA générative']) {
    assert.ok(text(hero).includes(proof), proof);
  }
});

test('every project states its status and its tools', () => {
  const cases = [...main.matchAll(/<article class="case">([\s\S]*?)<\/article>/g)].map((m) => m[1]);
  assert.equal(cases.length, 4);
  for (const c of cases) {
    assert.match(text(c), /Livré au client|En production|Projet d'école/);
    assert.match(c, /<dt>Outils<\/dt>/);
  }
});

test('copy has no long dashes and no runaway sentences', () => {
  assert.doesNotMatch(pageText, /[—–]/);
  const paragraphs = [...main.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => text(m[1]));
  const longest = Math.max(...paragraphs.flatMap((p) => p.split(/(?<=[.!?])\s+/)).map((s) => s.trim().split(' ').length));
  assert.ok(longest <= 45, `longest sentence ${longest} words`);
});
