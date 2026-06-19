// ============================================
// ANIMAÇÕES DE ENTRADA (Intersection Observer)
// ============================================
const animEls = document.querySelectorAll(
  '.sobre-hero__content, .quem-somos-sobre__inner, ' +
  '.mvv__card, .historia__item, ' +
  '.impacto__item, .ajudar-sobre__col'
);

const obsSobre = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.08}s`;
      entry.target.classList.add('visible');
      obsSobre.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  obsSobre.observe(el);
});

document.head.insertAdjacentHTML('beforeend', `
  <style>
    .visible { opacity: 1 !important; transform: none !important; }
  </style>
`);

// ============================================
// CONTADOR ANIMADO (Nosso Impacto)
// ============================================
function animarContador(el, valorFinal, prefixo = '', sufixo = '') {
  const duracao = 1800;
  const inicio = performance.now();
  const ehNumero = !isNaN(parseInt(valorFinal));

  if (!ehNumero) return; // "ações" não é número, pula

  const numFinal = parseInt(valorFinal);

  function atualizar(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const easing = 1 - Math.pow(1 - progresso, 3); // ease-out cubic
    const atual = Math.floor(easing * numFinal);
    el.textContent = prefixo + atual.toLocaleString('pt-BR') + sufixo;
    if (progresso < 1) requestAnimationFrame(atualizar);
  }

  requestAnimationFrame(atualizar);
}

const obsImpacto = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numeros = entry.target.querySelectorAll('.impacto__numero');
      numeros.forEach(el => {
        const texto = el.textContent.trim();
        // Ex: "+200" → prefixo "+", valor 200
        const match = texto.match(/^(\+?)(\d+)(.*)$/);
        if (match) {
          animarContador(el, match[2], match[1], match[3]);
        }
      });
      obsImpacto.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const secaoImpacto = document.querySelector('.impacto');
if (secaoImpacto) obsImpacto.observe(secaoImpacto);
