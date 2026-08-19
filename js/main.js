(() => {
  const header = document.querySelector('.site-header');
  const flightPath = document.querySelector('.flight-path');
  const starfield = document.querySelector('#starfield');
  const links = [...document.querySelectorAll('nav a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const createStars = () => {
    if (!starfield || starfield.children.length) return;
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < 82; index += 1) {
      const star = document.createElement('span');
      const size = 1 + ((index * 7) % 3);
      star.style.setProperty('--x', `${(index * 37) % 100}%`);
      star.style.setProperty('--y', `${(index * 61) % 100}%`);
      star.style.setProperty('--size', `${size}px`);
      star.style.setProperty('--delay', `${-((index * 0.37) % 5)}s`);
      star.style.setProperty('--duration', `${2.4 + ((index * 11) % 24) / 10}s`);
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
