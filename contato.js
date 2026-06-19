// ============================================
// CONFIGURAÇÃO — edite apenas aqui
// ============================================

// Número do WhatsApp da ONG (somente dígitos, com DDI e DDD)
// Exemplo: 5551934566444 (Brasil + 51 + número)
const WHATSAPP_NUMERO = '5551980112304'; // SUBSTITUA PELO NÚMERO REAL

// ============================================
// FORMULÁRIO → REDIRECIONA PARA WHATSAPP
// ============================================
const form = document.getElementById('form-contato');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome     = document.getElementById('nome').value.trim();
  const email    = document.getElementById('email').value.trim();
  const assunto  = document.getElementById('assunto').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  // Validação simples
  if (!nome || !email || !assunto || !mensagem) {
    mostrarAviso('Por favor, preencha todos os campos.');
    return;
  }

  if (!validarEmail(email)) {
    mostrarAviso('Por favor, insira um e-mail válido.');
    return;
  }

  // Monta o texto da mensagem para o WhatsApp
  const texto = `Olá! Meu nome é *${nome}*.\n\n` +
    `*E-mail:* ${email}\n` +
    `*Assunto:* ${assunto}\n\n` +
    `*Mensagem:*\n${mensagem}`;

  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank', 'noopener');
});

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function mostrarAviso(msg) {
  let aviso = document.getElementById('form-aviso');
  if (!aviso) {
    aviso = document.createElement('p');
    aviso.id = 'form-aviso';
    aviso.style.cssText = 'color:#e0558a; font-size:0.88rem; font-weight:700; margin-top:-6px;';
    form.insertBefore(aviso, form.querySelector('button'));
  }
  aviso.textContent = msg;
  setTimeout(() => { aviso.textContent = ''; }, 4000);
}

// ============================================
// FAQ ACCORDION
// ============================================
const perguntas = document.querySelectorAll('.faq__pergunta');

perguntas.forEach(btn => {
  btn.addEventListener('click', () => {
    const aberto = btn.getAttribute('aria-expanded') === 'true';
    const resposta = btn.nextElementSibling;

    // Fecha todas as outras
    perguntas.forEach(outro => {
      if (outro !== btn) {
        outro.setAttribute('aria-expanded', 'false');
        const r = outro.nextElementSibling;
        r.setAttribute('hidden', '');
      }
    });

    // Alterna a atual
    if (aberto) {
      btn.setAttribute('aria-expanded', 'false');
      resposta.setAttribute('hidden', '');
    } else {
      btn.setAttribute('aria-expanded', 'true');
      resposta.removeAttribute('hidden');
    }
  });
});

// ============================================
// ANIMAÇÕES DE ENTRADA
// ============================================
const animEls = document.querySelectorAll(
  '.cont-hero__content, .canais, .form-wrap, ' +
  '.localizacao__mapa, .localizacao__horario, .faq__item'
);

const obsContato = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.07}s`;
      entry.target.classList.add('visible');
      obsContato.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  obsContato.observe(el);
});

document.head.insertAdjacentHTML('beforeend', `
  <style>.visible { opacity: 1 !important; transform: none !important; }</style>
`);
