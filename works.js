/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.08}s`;

      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


/* ─── ACTIVE NAV HIGHLIGHT ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));


/* ─── COLOR SWATCH TOOLTIP ─── */
document.querySelectorAll('.swatch').forEach(swatch => {
  swatch.addEventListener('click', () => {
    const hex = swatch.title;
    navigator.clipboard.writeText(hex).then(() => {
      const tip = document.createElement('div');
      tip.textContent = `Copied ${hex}`;
      tip.style.cssText = `
        position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
        background: #1A1A1A; color: #fff; padding: 8px 18px;
        border-radius: 50px; font-size: 0.8rem; font-family: 'DM Sans', sans-serif;
        pointer-events: none; z-index: 9999;
        animation: fadeInOut 1.8s forwards;
      `;
      document.body.appendChild(tip);
      setTimeout(() => tip.remove(), 1800);
    });
  });
});

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInOut {
    0%   { opacity: 0; transform: translateX(-50%) translateY(6px); }
    15%  { opacity: 1; transform: translateX(-50%) translateY(0); }
    80%  { opacity: 1; }
    100% { opacity: 0; }
  }
`;
document.head.appendChild(style);


document.querySelector('.nav-logo')?.addEventListener('click', (e) => {
  if (window.location.pathname.endsWith('vroom.html')) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});