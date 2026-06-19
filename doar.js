// ============================================
// COPIAR CHAVE PIX
// ============================================

// Substitua pelo valor real da chave Pix
const CHAVE_PIX = 'campanhadosbebes2@gmail.com';

function copiarChavePix() {
  navigator.clipboard.writeText(CHAVE_PIX)
    .then(() => mostrarToast('Chave Pix copiada! ✓'))
    .catch(() => {
      // fallback para navegadores sem clipboard API
      const el = document.createElement('textarea');
      el.value = CHAVE_PIX;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      mostrarToast('Chave Pix copiada! ✓');
    });
}

function mostrarToast(msg) {
  let toast = document.getElementById('toast-pix');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-pix';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ============================================
// ANIMAÇÕES DE ENTRADA
// ============================================
const animEls = document.querySelectorAll(
  '.formas__card, .necessarios__item, ' +
  '.fale-conosco__contato, .fale-conosco__whatsapp, ' +
  '.voluntario__conteudo'
);

const obsDoar = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.07}s`;
      entry.target.classList.add('visible');
      obsDoar.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  obsDoar.observe(el);
});

document.head.insertAdjacentHTML('beforeend', `
  <style>
    .visible { opacity: 1 !important; transform: none !important; }
  </style>
`);
