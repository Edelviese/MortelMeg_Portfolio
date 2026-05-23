// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// Stagger children inside graphic grid
document.querySelectorAll('.graphic-grid .reveal').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.has-dropdown').forEach(item => {
  const toggle = item.querySelector('.dropdown-toggle');

  toggle.addEventListener('click', (e) => {
    const href = toggle.getAttribute('href');
    const isOpen = item.classList.contains('open');

    if (isOpen) {
      window.location.href = href;
    } else {
      e.preventDefault();
      document.querySelectorAll('.has-dropdown.open').forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.add('open');
    }
  });

  document.addEventListener('click', (e) => {
    if (!item.contains(e.target)) {
      item.classList.remove('open');
    }
  });
});