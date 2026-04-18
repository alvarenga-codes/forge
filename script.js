const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .method-card').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    cursor.style.background = 'var(--acid)';
    ring.style.opacity = '0';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = 'transparent';
    ring.style.opacity = '1';
  });
});

// ─── NAV SCROLL ──────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── REVEAL ON SCROLL ────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach((el) => io.observe(el));

// ─── COUNT-UP ────────────────────────────────
function animateCount(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const countEls = document.querySelectorAll('.count');
const countIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCount(e.target);
        countIO.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 }
);
countEls.forEach((el) => countIO.observe(el));

// ─── PARALLAX HERO ───────────────────────────
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const heroLeft = document.querySelector('.hero-left');
  if (heroLeft) {
    heroLeft.style.transform = `translateY(${y * 0.18}px)`;
  }
  const glow = document.querySelector('.hero-glow');
  if (glow) {
    glow.style.transform = `translateX(-50%) translateY(${-y * 0.1}px)`;
  }
});

// ─── MODAL CONTACT ───────────────────────────
const contact = document.getElementById('btn-contact');
const modal = document.querySelector('#modal');
const closeBtn = document.querySelector('.modal-close');

contact.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});
