// anisahmedzaid.com · small, dependency-free enhancements. The page reads fine without them.
document.documentElement.classList.add('js');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const NBSP = ' ';

// Navigation: scroll-edge fade once content slides under the bar
const header = document.getElementById('top');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Wayfinding: mark the section currently in view
const navLinks = [...document.querySelectorAll('.top nav a[href^="#"]')];
if (navLinks.length && 'IntersectionObserver' in window) {
  const byId = new Map(navLinks.map((a) => [a.getAttribute('href').slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const link = byId.get(e.target.id);
      if (!link) return;
      if (e.isIntersecting) {
        navLinks.forEach((a) => a.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'true');
      } else if (link.getAttribute('aria-current')) {
        link.removeAttribute('aria-current');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  byId.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  // The last section is short: at the very bottom, it is the one in view.
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 4) return;
    navLinks.forEach((a) => a.removeAttribute('aria-current'));
    navLinks[navLinks.length - 1].setAttribute('aria-current', 'true');
  }, { passive: true });
}

// Arrival: reveal blocks as they enter view (never hides content without JS)
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

// Day / night theme
const themeBtn = document.getElementById('themeBtn');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const syncTheme = () => {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (themeBtn) themeBtn.setAttribute('aria-label', dark ? 'Passer au thème clair' : 'Passer au thème sombre');
  if (themeMeta) themeMeta.setAttribute('content', dark ? '#000000' : '#f5f5f7');
};
syncTheme();
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    const apply = () => { root.setAttribute('data-theme', next); syncTheme(); };
    try { localStorage.setItem('theme', next); } catch (e) {}
    if (document.startViewTransition && !reduceMotion.matches) {
      document.startViewTransition(apply);
    } else if (!reduceMotion.matches) {
      root.classList.add('theme-fade');
      apply();
      setTimeout(() => root.classList.remove('theme-fade'), 500);
    } else {
      apply();
    }
  });
}

// "Comparez mon profil à votre offre": copy the detailed Markdown profile
const aiCopy = document.getElementById('aiCopy');
const aiStatus = document.getElementById('aiStatus');
// Fetched ahead of the click: browsers drop clipboard writes that come too long after the gesture.
const aiProfile = aiCopy ? fetch('/anis-ahmed-zaid.md').then((r) => r.text()) : null;
if (aiProfile) aiProfile.catch(() => {});
const copyFallback = (value) => {
  const area = Object.assign(document.createElement('textarea'), { value, readOnly: true });
  area.style.cssText = 'position:fixed;opacity:0';
  document.body.append(area);
  area.select();
  const ok = document.execCommand('copy');
  area.remove();
  if (!ok) throw new Error('copy failed');
};
if (aiCopy) {
  aiCopy.addEventListener('click', async () => {
    try {
      const md = await aiProfile;
      try { await navigator.clipboard.writeText(md); } catch (e) { copyFallback(md); }
      aiCopy.textContent = 'Copié';
      aiStatus.textContent = `Profil copié. Collez-le dans votre assistant IA avec votre offre.`;
      setTimeout(() => { aiCopy.textContent = 'Copier le profil'; }, 2400);
    } catch (e) {
      aiStatus.textContent = `Copie impossible${NBSP}: utilisez «${NBSP}Télécharger (.md)${NBSP}».`;
    }
  });
}

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const frenchSpaces = (s) => s.replace(/ ([:;?!»])/g, `${NBSP}$1`).replace(/« /g, `«${NBSP}`);

// A list of buttons where exactly one is pressed (segmented choice). Arrow keys move between them.
const choiceGroup = (container, labels, onSelect) => {
  const buttons = labels.map((html, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = html;
    b.addEventListener('click', () => select(i));
    container.appendChild(b);
    return b;
  });
  const select = (i) => {
    buttons.forEach((b, j) => b.setAttribute('aria-pressed', String(i === j)));
    // On narrow screens the choices scroll sideways: keep the chosen one in view, without moving the page.
    if (container.scrollWidth > container.clientWidth) {
      const left = buttons[i].offsetLeft - container.offsetLeft - 2;
      container.scrollTo({ left, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    }
    onSelect(i);
  };
  container.addEventListener('keydown', (e) => {
    const i = buttons.indexOf(document.activeElement);
    if (i < 0) return;
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (i + step + buttons.length) % buttons.length;
    buttons[next].focus();
    select(next);
  });
  select(0);
};

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

const inbox = document.getElementById('inbox');
const mailOut = document.getElementById('mailOut');
if (inbox && mailOut) {
  choiceGroup(inbox, MAILS.map((m) => `<strong>${esc(m.from)}</strong>${esc(m.subject)}`), (i) => {
    const m = MAILS[i];
    const draft = esc(frenchSpaces(m.draft)).replace(/\[([^\]]+)\]/g, '<mark>[$1]</mark>');
    mailOut.innerHTML = `
      <div class="swap">
        <div class="row"><span>Catégorie</span><span><span class="tag">${esc(m.category)}</span></span></div>
        <div class="row"><span>Ton</span><span>${esc(m.tone)}</span></div>
        <div class="row"><span>Résumé</span><span>${esc(m.summary)}</span></div>
        <div class="draft">${draft}</div>
        <div class="draft-state">Brouillon enregistré, en attente de relecture. Rien n'a été envoyé.</div>
      </div>`;
  });
}

// Demo 02 · which tool the RAG agent picks (illustrative questions)
const QUESTIONS = [
  { q: 'Combien coûte la formation X ?', tool: 'sql' },
  { q: 'Comment se déroule un stage pratique ?', tool: 'vector' },
  { q: 'Résume-moi la brochure de présentation.', tool: 'doc' },
];
const ragQuestions = document.getElementById('ragQuestions');
const ragFlow = document.getElementById('ragFlow');
if (ragQuestions && ragFlow) {
  const first = ragFlow.querySelector('.rag-step');
  const tools = ragFlow.querySelectorAll('[data-tool]');
  choiceGroup(ragQuestions, QUESTIONS.map((x) => esc(frenchSpaces(`« ${x.q} »`))), (i) => {
    const x = QUESTIONS[i];
    first.innerHTML = `<b>Question${NBSP}:</b> ${esc(frenchSpaces(x.q))}`;
    tools.forEach((t) => t.classList.toggle('on', t.dataset.tool === x.tool));
  });
}
