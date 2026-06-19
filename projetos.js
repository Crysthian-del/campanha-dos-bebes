// ============================================
// ANIMAÇÕES DE ENTRADA (Intersection Observer)
// ============================================
const animEls = document.querySelectorAll(
  '.proj-hero__content, .proj-card, ' +
  '.arrecadados__item, .transformacao__conteudo'
);

const obsProjetos = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.07}s`;
      entry.target.classList.add('visible');
      obsProjetos.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  obsProjetos.observe(el);
});

document.head.insertAdjacentHTML('beforeend', `
  <style>
    .visible { opacity: 1 !important; transform: none !important; }
  </style>
`);
