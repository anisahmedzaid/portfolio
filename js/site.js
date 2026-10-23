// Header border once the page scrolls
const header = document.getElementById('top');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Demo 01 · email triage (fictional emails, precomputed outputs)
const MAILS = [
  {
    from: 'Cabinet Martin',
    subject: 'Facture de mars introuvable',
    category: 'Facturation',
    summary: "Le client n'a pas reçu la facture de mars et demande qu'on la lui renvoie.",
    draft: "Bonjour,\n\nMerci pour votre message. Vous trouverez ci-joint la facture de mars ([numéro de facture à compléter]).\n\nN'hésitez pas à revenir vers nous si besoin.\n\nCordialement",
  },
  {
    from: 'Julie R.',
    subject: 'Disponibilités semaine prochaine ?',
    category: 'Demande de rendez-vous',
    summary: 'Une prospecte souhaite un rendez-vous la semaine prochaine pour présenter son projet.',
    draft: "Bonjour Julie,\n\nMerci pour votre intérêt. Nous pouvons vous proposer les créneaux suivants : [créneaux à proposer].\n\nDites-nous celui qui vous convient le mieux.\n\nCordialement",
  },
  {
    from: 'M. Bernard',
    subject: 'Commande reçue incomplète',
    category: 'Réclamation',
    summary: 'Le client signale une commande livrée incomplète et attend une solution.',
    draft: "Bonjour,\n\nNous sommes désolés pour ce désagrément. Pour traiter votre demande au plus vite, pourriez-vous nous indiquer [référence de la commande à vérifier] ?\n\nNous revenons vers vous dès que possible.\n\nCordialement",
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

// Demo 02 · voice agent (Retell web call, token from n8n webhook)
const TOKEN_URL = 'https://n8n.srv1623813.hstgr.cloud/webhook/demo-token';
const voice = document.getElementById('voice');
const voiceBtn = document.getElementById('voiceBtn');
const transcript = document.getElementById('transcript');
if (voice && voiceBtn) {
  const LABEL = "Lancer l'appel";
  let retell = null;
  let inCall = false;

  const end = () => {
    inCall = false;
    voice.classList.remove('live', 'talking');
    voiceBtn.textContent = LABEL;
    voiceBtn.disabled = false;
  };
  const render = (arr) => {
    if (!arr || !arr.length) return;
    transcript.innerHTML = '';
    arr.forEach((t) => {
      const d = document.createElement('div');
      d.className = t.role === 'agent' ? 'agent' : 'user';
      d.textContent = t.content || '';
      transcript.appendChild(d);
    });
    transcript.scrollTop = transcript.scrollHeight;
  };
  const start = async () => {
    voiceBtn.disabled = true;
    voiceBtn.textContent = 'Connexion…';
    try {
      const r = await fetch(TOKEN_URL, { cache: 'no-store' });
      if (r.status === 429) {
        voiceBtn.textContent = 'Réessayez plus tard';
        setTimeout(end, 2500);
        return;
      }
      const { access_token } = await r.json();
      if (!access_token) throw new Error('token');
      const { RetellWebClient } = await import('https://esm.sh/retell-client-js-sdk@2');
      retell = new RetellWebClient();
      retell.on('call_started', () => { inCall = true; voice.classList.add('live'); voiceBtn.textContent = 'Raccrocher'; voiceBtn.disabled = false; });
      retell.on('call_ended', end);
      retell.on('agent_start_talking', () => voice.classList.add('talking'));
      retell.on('agent_stop_talking', () => voice.classList.remove('talking'));
      retell.on('update', (u) => { if (u && u.transcript) render(u.transcript); });
      retell.on('error', end);
      await retell.startCall({ accessToken: access_token });
    } catch (e) {
      end();
    }
  };
  voiceBtn.addEventListener('click', () => {
    if (inCall) { if (retell) retell.stopCall(); end(); } else start();
  });
}
