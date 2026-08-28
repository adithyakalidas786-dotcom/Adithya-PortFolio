document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((element) => revealObserver.observe(element));

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  menuButton?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  document.querySelectorAll('.magnetic').forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      const bounds = button.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
      const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
      button.style.transform = `translate(${x}px, ${y}px)`;
    });
    button.addEventListener('pointerleave', () => { button.style.transform = ''; });
  });

  const glow = document.querySelector('.cursor-glow');
  let particleTick = 0;
  window.addEventListener('pointermove', (event) => {
    if (glow) {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }
    if (window.innerWidth > 799 && ++particleTick % 5 === 0) {
      const particle = document.createElement('span');
      particle.className = 'spider-particle';
      particle.style.left = `${event.clientX + (Math.random() * 12 - 6)}px`;
      particle.style.top = `${event.clientY + (Math.random() * 12 - 6)}px`;
      document.body.appendChild(particle);
      window.setTimeout(() => particle.remove(), 700);
    }
  });

  document.querySelectorAll('.tile-play').forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.toggle('is-playing');
      button.innerHTML = button.classList.contains('is-playing') ? '<i data-lucide="pause"></i>' : '<i data-lucide="play"></i>';
      if (window.lucide) lucide.createIcons();
    });
  });
});
