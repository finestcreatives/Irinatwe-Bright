// CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
if (cursor && ring) {
  let mx = 0;
  let my = 0;
  let rx = 0;
  let ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx - 5 + 'px';
    cursor.style.top = my - 5 + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx - 18 + 'px';
    ring.style.top = ry - 18 + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .portfolio-item, .service-card').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2.5)';
      ring.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      ring.style.transform = 'scale(1)';
    });
  });
}

// SCROLL REVEAL
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = i * 0.08 + 's';
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// MOBILE NAV
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const sectionNavLinks = document.querySelectorAll('.nav-links a[data-section]');

function setMenuState(isOpen) {
  if (!navToggle || !navLinks) return;

  navLinks.classList.toggle('menu-open', isOpen);
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  document.body.classList.toggle('menu-active', isOpen);
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = !navLinks.classList.contains('menu-open');
    setMenuState(isOpen);
    if (isOpen) {
      const firstMenuLink = navLinks.querySelector('a[data-section]');
      if (firstMenuLink) firstMenuLink.focus();
    }
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target === navLinks) setMenuState(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('menu-open')) {
      setMenuState(false);
      navToggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1200) {
      setMenuState(false);
    }
  });
}

// ACTIVE SECTION LINK
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const activeId = entry.target.id;
    sectionNavLinks.forEach((link) => {
      const isActive = link.getAttribute('data-section') === activeId;
      link.classList.toggle('active-link', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  });
}, { threshold: 0.45 });

['portfolio', 'services', 'about', 'contact'].forEach((id) => {
  const section = document.getElementById(id);
  if (section) sectionObserver.observe(section);
});

// HERO CARD PARALLAX
const c1 = document.querySelector('.card-1');
const c2 = document.querySelector('.card-2');
if ((c1 || c2) && window.matchMedia('(pointer: fine)').matches) {
  let px = 0;
  let py = 0;
  let raf = null;

  document.addEventListener('mousemove', (e) => {
    px = (e.clientX / window.innerWidth - 0.5) * 20;
    py = (e.clientY / window.innerHeight - 0.5) * 20;

    if (raf) return;
    raf = requestAnimationFrame(() => {
      if (c1) c1.style.transform = `rotate(-3deg) translate(${px * 0.5}px, ${py * 0.5}px)`;
      if (c2) c2.style.transform = `rotate(2deg) translate(${px * 0.8}px, ${py * 0.8}px)`;
      raf = null;
    });
  });
}
