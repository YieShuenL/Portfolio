/* ============================================================
   GAME-STYLE PORTFOLIO — Interactive Engine
   CSS :target routing · Starfield · Easter Eggs
   ============================================================ */

(function () {
  'use strict';

  const SPA_ROUTES = { home: 1, projects: 1, websites: 1, about: 1 };
  let currentRoute = 'home';

  // ==========================================================
  //  STARFIELD BACKGROUND
  // ==========================================================
  function createStarfield() {
    const container = document.getElementById('stars');
    if (!container) return;

    const starCount = 120;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = 1.5 + Math.random() * 3;
      const colors = ['#ffffff', '#00ff41', '#00d4ff', '#ffd700', '#ff6b9d'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      star.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        opacity: ${0.2 + Math.random() * 0.5};
        animation: twinkle ${duration}s ${delay}s ease-in-out infinite;
        box-shadow: 0 0 ${size * 2}px ${color};
      `;

      frag.appendChild(star);
    }

    container.appendChild(frag);

    if (!document.getElementById('twinkle-style')) {
      const style = document.createElement('style');
      style.id = 'twinkle-style';
      style.textContent = `
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.8); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ==========================================================
  //  PIXEL DECORATIONS
  // ==========================================================
  function spawnPixelDecorations() {
    const container = document.getElementById('app');
    if (!container) return;

    for (let i = 0; i < 6; i++) {
      const decor = document.createElement('div');
      decor.className = 'pixel-decor';
      const x = 5 + Math.random() * 90;
      const y = 10 + Math.random() * 80;
      const delay = Math.random() * 6;
      const size = 8 + Math.random() * 16;

      decor.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: var(--neon-green);
        animation-delay: ${delay}s;
        animation-duration: ${4 + Math.random() * 4}s;
        box-shadow: 0 0 ${size}px rgba(0, 255, 65, 0.3);
      `;

      container.appendChild(decor);
    }
  }

  // ==========================================================
  //  ROUTER — CSS :target handles display, JS handles metadata
  // ==========================================================
  function navigate(route) {
    if (route === currentRoute) return;
    if (!SPA_ROUTES[route]) route = 'home';
    window.location.hash = '#' + route;
    // hashchange event fires → handleHashChange updates metadata
  }

  function updateNavActive(route) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkRoute = link.getAttribute('data-route');
      if (linkRoute === route || (route !== 'home' && route !== 'projects' && route !== 'about' && linkRoute === 'projects')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function updateTitle(route) {
    const titles = {
      'home': 'Yie Shuen Lai — Game Developer Portfolio',
      'projects': 'Projects — Yie Shuen Lai',
      'websites': 'Websites — Yie Shuen Lai',
      'about': 'About — Yie Shuen Lai'
    };
    document.title = titles[route] || titles['home'];
  }

  // ==========================================================
  //  HASH CHANGE — sync metadata when hash changes
  // ==========================================================
  function handleHashChange() {
    const hash = window.location.hash.replace('#', '') || 'home';
    if (SPA_ROUTES[hash]) {
      currentRoute = hash;
      updateNavActive(hash);
      updateTitle(hash);
      window.scrollTo(0, 0);
    }
  }

  // ==========================================================
  //  KEYBOARD SHORTCUTS
  // ==========================================================
  function handleKeyboard(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'Enter':
        if (currentRoute === 'home') navigate('projects');
        break;
      case 'Escape':
        if (currentRoute === 'projects' || currentRoute === 'websites' || currentRoute === 'about') navigate('home');
        break;
      case 'h':
        if (!e.ctrlKey && !e.metaKey) navigate('home');
        break;
      case 'p':
        if (!e.ctrlKey && !e.metaKey) navigate('projects');
        break;
      case 'a':
        if (!e.ctrlKey && !e.metaKey) navigate('about');
        break;
    }
  }

  // ==========================================================
  //  NAV CLICKS
  // ==========================================================
  function handleNavClicks(e) {
    const link = e.target.closest('.nav-link');
    if (link) {
      e.preventDefault();
      const route = link.getAttribute('data-route');
      if (route) navigate(route);
    }
  }

  // ==========================================================
  //  EASTER EGG: Konami Code
  // ==========================================================
  function setupKonamiCode() {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let pos = 0;

    document.addEventListener('keydown', function (e) {
      if (e.key === konami[pos]) {
        pos++;
        if (pos === konami.length) {
          activateEasterEgg();
          pos = 0;
        }
      } else {
        pos = (e.key === konami[0]) ? 1 : 0;
      }
    });
  }

  function activateEasterEgg() {
    const body = document.body;
    const colors = ['#ff0000', '#ff7700', '#ffff00', '#00ff00', '#0000ff', '#8b00ff'];
    let i = 0;

    const interval = setInterval(() => {
      body.style.backgroundColor = colors[i];
      i++;
      if (i >= colors.length) {
        clearInterval(interval);
        body.style.backgroundColor = '';
        showSecretMessage();
      }
    }, 100);
  }

  function showSecretMessage() {
    const msg = document.createElement('div');
    msg.style.cssText = `
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      font-family: var(--font-pixel); font-size: 2rem; color: var(--neon-gold);
      text-shadow: 0 0 20px var(--neon-gold); z-index: 10000;
      pointer-events: none; animation: fadeOut 3s forwards; text-align: center;
    `;
    msg.textContent = '🏆 ACHIEVEMENT UNLOCKED 🏆\nYou found the secret!';
    document.body.appendChild(msg);

    if (!document.getElementById('fadeout-style')) {
      const style = document.createElement('style');
      style.id = 'fadeout-style';
      style.textContent = '@keyframes fadeOut { 0%,70% { opacity:1 } 100% { opacity:0 } }';
      document.head.appendChild(style);
    }

    setTimeout(() => msg.remove(), 3500);
  }

  // ==========================================================
  //  EXPOSE FOR onclick ATTRIBUTES
  // ==========================================================
  window.navigate = navigate;

  // ==========================================================
  //  INIT
  // ==========================================================
  function init() {
    createStarfield();
    spawnPixelDecorations();
    setupKonamiCode();

    document.addEventListener('keydown', handleKeyboard);
    window.addEventListener('hashchange', handleHashChange);
    document.getElementById('navbar').addEventListener('click', handleNavClicks);

    // Sync current route from hash (CSS :target already shows correct page)
    const hash = window.location.hash.replace('#', '') || 'home';
    currentRoute = SPA_ROUTES[hash] ? hash : 'home';
    updateNavActive(currentRoute);
    updateTitle(currentRoute);

    console.log('%c🎮 Yie Shuen Lai — Game Developer Portfolio %cReady!',
      'color: #00ff41; font-size: 16px;', 'color: #e0e0e0;');
    console.log('%cTry the Konami Code: ↑↑↓↓←→←→BA',
      'color: #888; font-size: 11px;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
