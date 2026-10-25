// Colour tokens in css/site.css must keep text readable in both themes.
// Targets: WCAG 2.2 AA (4.5:1 text, 3:1 large text) and APCA Lc 75 body / 45 display.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { wcag, apca, hex } from './contrast.mjs';

const css = readFileSync(new URL('../css/site.css', import.meta.url), 'utf8');
const block = (selector) => css.slice(css.indexOf(selector)).split('}')[0];
const tokens = (selector) => Object.fromEntries([...block(selector).matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
const light = tokens(':root {');
const themes = { light, dark: { ...light, ...tokens('[data-theme="dark"] {') } };

// [text token, background token, min WCAG ratio, min APCA Lc]
const PAIRS = [
  ['ink', 'paper', 7, 90], ['ink', 'card', 7, 90],
  ['ink-2', 'paper', 4.5, 75], ['ink-2', 'card', 4.5, 75],
  ['ink-3', 'paper', 4.5, 75], ['ink-3', 'card', 4.5, 75],
  ['accent', 'paper', 4.5, 75], ['accent', 'card', 4.5, 75],
  ['accent-ink', 'accent-soft', 4.5, 75],
  ['ink-display', 'paper', 3, 45],
  ['paper', 'ink', 4.5, 75],
];

for (const [name, t] of Object.entries(themes)) {
  for (const [fg, bg, minW, minLc] of PAIRS) {
    test(`${name}: --${fg} on --${bg} stays readable`, () => {
      assert.ok(t[fg] && t[bg], `missing token --${fg} or --${bg}`);
      const r = wcag(hex(t[fg]), hex(t[bg]));
      const lc = Math.abs(apca(hex(t[fg]), hex(t[bg])));
      assert.ok(r >= minW, `WCAG ${r.toFixed(2)}:1 < ${minW}:1`);
      assert.ok(lc >= minLc, `APCA Lc ${lc.toFixed(0)} < ${minLc}`);
    });
  }
}

test('known contrast regressions stay fixed', () => {
  assert.match(css, /\.case \.body > \.lede \{ color: var\(--ink\); \}/, 'project lede must not inherit --ink-2');
  assert.match(css, /\.mail-out \.row > span:first-child/, 'row label selector must not match the category tag');
  assert.doesNotMatch(css, /font-size: 1[0-3]px/, 'no text under 14px');
});
