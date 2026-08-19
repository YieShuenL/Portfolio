(() => {
  const header = document.querySelector('.site-header');
  const flightPath = document.querySelector('.flight-path');
  const starfield = document.querySelector('#stars');
  const links = [...document.querySelectorAll('nav a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const createStars = () => {
    if (!starfield || starfield.children.length) return;
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < 120; index += 1) {
      const star = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = 1.5 + Math.random() * 3;
      const colors = ['#ffffff', '#00ff41', '#00d4ff', '#ffd700', '#ff6b9d'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      star.style.cssText = `position:absolute;left:${x}%;top:${y}%;width:${size}px;height:${size}px;background:${color};border-radius:50%;opacity:${0.2 + Math.random() * 0.5};animation:twinkle ${duration}s ${delay}s ease-in-out infinite;box-shadow:0 0 ${size * 2}px ${color};`;
      fragment.appendChild(star);
    }
    starfield.appendChild(fragment);
  };
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  const updateFlight = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    flightPath?.style.setProperty('--flight', progress.toFixed(4));
  };
  const updateNav = () => {
    const active = [...sections].reverse().find(section => section.getBoundingClientRect().top <= 140);
    links.forEach(link => link.toggleAttribute('aria-current', Boolean(active && link.getAttribute('href') === `#${active.id}`)));
  };
  window.addEventListener('scroll', () => { updateHeader(); updateNav(); updateFlight(); }, { passive: true });
  window.addEventListener('resize', updateFlight, { passive: true });
  createStars(); updateHeader(); updateNav(); updateFlight();
})();
