// Header border once the page scrolls
const header = document.getElementById('top');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Day / night theme
const themeBtn = document.getElementById('themeBtn');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const syncTheme = () => {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  themeBtn.setAttribute('aria-label', dark ? 'Passer au thème clair' : 'Passer au thème sombre');
  themeMeta.setAttribute('content', dark ? '#141311' : '#f7f5f0');
};
if (themeBtn) {
  syncTheme();
  themeBtn.addEventListener('click', () => {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    const apply = () => { root.setAttribute('data-theme', next); syncTheme(); };
    try { localStorage.setItem('theme', next); } catch (e) {}
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (document.startViewTransition && !reduce) {
      document.startViewTransition(apply);
    } else if (!reduce) {
      root.classList.add('theme-fade');
      apply();
      setTimeout(() => root.classList.remove('theme-fade'), 500);
    } else {
      apply();
    }
  });
}

// Demo 01 · email triage (fictional emails, precomputed outputs)
const MAILS = [
  {
    from: 'Gestion Lavoie',
    subject: 'Bacs non ramassés depuis lundi',
    category: 'Ramassage manqué',
    tone: 'Frustré',
    summary: "Les bacs de l'immeuble n'ont pas été vidés lundi. Le gestionnaire demande un passage rapide.",
    draft: "Bonjour,\n\nMerci de nous avoir signalé ce ramassage manqué, et toutes nos excuses pour le désagrément. Nous organisons un nouveau passage le [date de passage à compléter].\n\nCordialement",
  },
  {
    from: 'David Miller',
    subject: 'When is my next pickup?',
    category: 'Faible priorité',
    tone: 'Neutre',
    summary: 'Un client demande la date de son prochain ramassage.',
    draft: "Hello David,\n\nThank you for your message. Your next pickup is scheduled on [date à compléter]. Feel free to reach out if you need anything else.\n\nBest regards",
  },
  {
    from: 'Résidences du Parc',
    subject: 'Demande de soumission pour 3 immeubles',
    category: 'Nouveau client',
    tone: 'Neutre',
    summary: 'Un propriétaire demande un devis pour la collecte de trois immeubles.',
    draft: "Bonjour,\n\nMerci pour votre demande. Pour vous préparer une soumission, pourriez-vous nous préciser [nombre de logements et fréquence souhaitée à compléter] ?\n\nCordialement",
  },
];

const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

const inbox = document.getElementById('inbox');
const mailOut = document.getElementById('mailOut');
if (inbox && mailOut) {
  const show = (i) => {
    const m = MAILS[i];
    inbox.querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-pressed', String(i === j)));
    const draft = esc(m.draft).replace(/\[([^\]]+)\]/g, '<mark>[$1]</mark>');
    mailOut.innerHTML = `
      <div class="fade">
        <div class="row"><span>Catégorie</span><span><span class="tag">${esc(m.category)}</span></span></div>
        <div class="row"><span>Ton</span><span>${esc(m.tone)}</span></div>
        <div class="row"><span>Résumé</span><span>${esc(m.summary)}</span></div>
        <div class="draft">${draft}</div>
        <div class="draft-state">Brouillon enregistré, en attente de relecture. Rien n'a été envoyé.</div>
      </div>`;
  };
  MAILS.forEach((m, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = `<strong>${esc(m.from)}</strong>${esc(m.subject)}`;
    b.addEventListener('click', () => show(i));
    inbox.appendChild(b);
  });
  show(0);
}

// Demo 03 · CLIP embedding space (illustrative 2D)
const QUERIES = [
  { text: 'des navires traversent la mer', k: 'navires', x: 372, y: 110 },
  { text: 'une étoile dans le ciel', k: 'comete', x: 368, y: 232 },
  { text: 'des cavaliers chargent', k: 'cavaliers', x: 200, y: 208 },
  { text: 'un repas entre seigneurs', k: 'repas', x: 140, y: 100 },
];
const queries = document.getElementById('queries');
const qMark = document.getElementById('clipQ');
const links = document.getElementById('clipLinks');
if (queries && qMark && links) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const select = (i) => {
    const q = QUERIES[i];
    queries.querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-pressed', String(i === j)));
    qMark.setAttribute('transform', `translate(${q.x},${q.y})`);
    links.innerHTML = '';
    document.querySelectorAll('.clip g[data-k]').forEach((g) => {
      const hit = g.dataset.k === q.k;
      g.classList.toggle('hit', hit);
      if (!hit) return;
      const c = g.querySelector('circle');
      const l = document.createElementNS(svgNS, 'line');
      l.setAttribute('class', 'link');
      l.setAttribute('x1', q.x); l.setAttribute('y1', q.y);
      l.setAttribute('x2', c.getAttribute('cx')); l.setAttribute('y2', c.getAttribute('cy'));
      links.appendChild(l);
    });
  };
  QUERIES.forEach((q, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = `« ${q.text} »`;
    b.addEventListener('click', () => select(i));
    queries.appendChild(b);
  });
  select(0);
}
