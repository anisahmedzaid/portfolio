// WCAG 2.x contrast ratio and APCA Lc (0.0.98G-4g constants).
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
export const wcag = (fg, bg) => {
  const L = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const [a, b] = [L(fg), L(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
};
export const apca = (fg, bg) => {
  const Y = ([r, g, b]) => { let y = 0.2126729 * (r / 255) ** 2.4 + 0.7151522 * (g / 255) ** 2.4 + 0.0721750 * (b / 255) ** 2.4; return y < 0.022 ? y + (0.022 - y) ** 1.414 : y; };
  const yt = Y(fg), yb = Y(bg);
  if (Math.abs(yb - yt) < 0.0005) return 0;
  if (yb > yt) { const s = (yb ** 0.56 - yt ** 0.57) * 1.14; return s < 0.1 ? 0 : (s - 0.027) * 100; }
  const s = (yb ** 0.65 - yt ** 0.62) * 1.14; return s > -0.1 ? 0 : (s + 0.027) * 100;
};
export const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
