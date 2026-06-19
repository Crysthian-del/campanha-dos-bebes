// ============================================
// VER MAIS FOTOS — expande o grid
// ============================================
const btnVerMais  = document.getElementById('btn-ver-mais');
const gridInner   = document.querySelector('.galeria-grid__inner');
const gridSection = document.querySelector('.galeria-grid');

btnVerMais.addEventListener('click', () => {
  const expandido = gridSection.classList.contains('galeria-grid--expandido');

  if (!expandido) {
    // Expande
    gridSection.classList.add('galeria-grid--expandido');
    btnVerMais.setAttribute('aria-expanded', 'true');
    btnVerMais.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/>
      </svg>
      Ver menos fotos
    `;

    // Anima cada foto extra com delay escalonado
    const extras = gridInner.querySelectorAll('.gal-item--extra');
    extras.forEach((el, i) => {
      setTimeout(() => el.classList.add('visivel'), i * 60);
    });

  } else {
    // Colapsa
    const extras = gridInner.querySelectorAll('.gal-item--extra');
    extras.forEach(el => el.classList.remove('visivel'));

    // Aguarda a transição antes de esconder
    setTimeout(() => {
      gridSection.classList.remove('galeria-grid--expandido');
    }, 450);

    btnVerMais.setAttribute('aria-expanded', 'false');
    btnVerMais.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="M21 15l-5-5L5 21"/>
      </svg>
      Ver mais fotos
    `;

    // Sobe até o grid ao colapsar
    setTimeout(() => {
      document.getElementById('galeria').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
});

// ============================================
// LIGHTBOX — abre ao clicar em qualquer foto
// ============================================
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightbox-img');
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxFechar  = document.getElementById('lightbox-fechar');
const lightboxPrev    = document.getElementById('lightbox-prev');
const lightboxNext    = document.getElementById('lightbox-next');
const lightboxContador= document.getElementById('lightbox-contador');

let indiceAtual = 0;
let fotosVisiveis = [];

// Coleta todas as fotos visíveis (atualiza ao expandir)
function atualizarFotos() {
  fotosVisiveis = Array.from(
    gridInner.querySelectorAll('.gal-item:not([style*="display: none"]) img')
  ).filter(img => {
    const item = img.closest('.gal-item');
    // Inclui extras apenas se estiverem visíveis
    if (item.classList.contains('gal-item--extra')) {
      return item.classList.contains('visivel');
    }
    return true;
  });
}

// Abre o lightbox na foto clicada
gridInner.addEventListener('click', (e) => {
  const img = e.target.closest('.gal-item img');
  if (!img) return;

  atualizarFotos();
  indiceAtual = fotosVisiveis.indexOf(img);
  abrirLightbox(indiceAtual);
});

function abrirLightbox(indice) {
  const img = fotosVisiveis[indice];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxContador.textContent = `${indice + 1} / ${fotosVisiveis.length}`;
  lightbox.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
}

function fecharLightbox() {
  lightbox.setAttribute('hidden', '');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

function navegarLightbox(direcao) {
  atualizarFotos();
  indiceAtual = (indiceAtual + direcao + fotosVisiveis.length) % fotosVisiveis.length;
  lightboxImg.style.animation = 'none';
  requestAnimationFrame(() => {
    lightboxImg.style.animation = '';
    abrirLightbox(indiceAtual);
  });
}

lightboxFechar.addEventListener('click', fecharLightbox);
lightboxOverlay.addEventListener('click', fecharLightbox);
lightboxPrev.addEventListener('click', () => navegarLightbox(-1));
lightboxNext.addEventListener('click', () => navegarLightbox(1));

// Teclado: setas e ESC
document.addEventListener('keydown', (e) => {
  if (lightbox.hasAttribute('hidden')) return;
  if (e.key === 'Escape')     fecharLightbox();
  if (e.key === 'ArrowLeft')  navegarLightbox(-1);
  if (e.key === 'ArrowRight') navegarLightbox(1);
});

// ============================================
// ANIMAÇÃO DE ENTRADA DAS FOTOS INICIAIS
// ============================================
const fotasIniciais = gridInner.querySelectorAll('.gal-item:not(.gal-item--extra)');

const obsGal = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.05}s`;
      entry.target.classList.add('visible');
      obsGal.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fotasIniciais.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  obsGal.observe(el);
});

document.head.insertAdjacentHTML('beforeend', `
  <style>.visible { opacity: 1 !important; transform: none !important; }</style>
`);
