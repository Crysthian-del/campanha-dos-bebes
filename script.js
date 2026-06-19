// ============================================
// MENU HAMBURGUER (mobile)
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.navbar__links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);

  // Animação das barras → X
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Fecha menu ao clicar em um link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// ============================================
// ANIMAÇÃO DE ENTRADA (Intersection Observer)
// ============================================
const animTargets = document.querySelectorAll(
  '.hero__content, .quem-somos__inner, .galeria__item, ' +
  '.acoes__card, .ajudar__card, .contato__texto'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animTargets.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.03}s, transform 0.55s ease ${i * 0.03}s`;
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // Hero entra imediatamente
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'none';
  }
});

// Classe que torna visível
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .visible {
      opacity: 1 !important;
      transform: none !important;
    }
  </style>
`);

// ============================================
// NAVBAR: muda cor ao rolar
// ============================================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.18)';
  } else {
    navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.10)';
  }
});
