/* ============================================================
   GAME-STYLE PORTFOLIO — Interactive Engine
   SPA Router · Starfield · Transitions · Easter Eggs
   ============================================================ */

(function () {
  'use strict';

  // --- Routes ---
  const ROUTES = [
    'home', 'projects', 'about',
    'be-brave', 'claw-machine', 'dungeon-escape',
    'furious-and-fast', 'repeat-system'
  ];

  let currentRoute = 'home';
  let isTransitioning = false;

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

    // Add twinkle keyframes if not already present
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

    const decorCount = 6;
    for (let i = 0; i < decorCount; i++) {
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
  //  SPA ROUTER
  // ==========================================================
  function navigate(route) {
    if (isTransitioning) return;
    if (route === currentRoute) return;

    const targetPage = document.getElementById('page-' + route);
    if (!targetPage) {
      // Fallback to home
      route = 'home';
    }

    isTransitioning = true;

    // Find current active page
    const currentPage = document.querySelector('.page.active');
    const newPage = document.getElementById('page-' + route);

    if (currentPage && currentPage !== newPage) {
      // Exit current page
      currentPage.classList.add('exiting');
      currentPage.addEventListener('animationend', function handler() {
        currentPage.removeEventListener('animationend', handler);
        currentPage.classList.remove('active', 'exiting');

        // Enter new page
        newPage.classList.add('active');
        newPage.scrollTop = 0;
        window.scrollTo(0, 0);

        isTransitioning = false;
      }, { once: true });
    } else if (!currentPage) {
      // First load
      newPage.classList.add('active');
      isTransitioning = false;
    } else {
      // Same page
      isTransitioning = false;
      return;
    }

    // Update route and hash
    currentRoute = route;
    if (window.location.hash !== '#' + route) {
      history.pushState(null, '', '#' + route);
    }

    // Update nav active state
    updateNavActive(route);

    // Update title
    updateTitle(route);
  }

  function updateNavActive(route) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
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
      'about': 'About — Yie Shuen Lai',
      'be-brave': 'Be Brave — Yie Shuen Lai',
      'claw-machine': 'Claw Machine — Yie Shuen Lai',
      'dungeon-escape': 'Dungeon Escape — Yie Shuen Lai',
      'furious-and-fast': 'Furious & Fast — Yie Shuen Lai',
      'repeat-system': 'Repeat System Action — Yie Shuen Lai'
    };
    document.title = titles[route] || titles['home'];
  }

  // ==========================================================
  //  KEYBOARD SHORTCUTS
  // ==========================================================
  function handleKeyboard(e) {
    // Don't trigger if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'Enter':
        if (currentRoute === 'home') {
          navigate('projects');
        }
        break;
      case 'Escape':
        if (currentRoute !== 'home' && currentRoute !== 'projects' && currentRoute !== 'about') {
          navigate('projects');
        } else if (currentRoute === 'projects' || currentRoute === 'about') {
          navigate('home');
        }
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
  //  HASH CHANGE HANDLER
  // ==========================================================
  function handleHashChange() {
    const hash = window.location.hash.replace('#', '') || 'home';
    if (ROUTES.includes(hash)) {
      navigate(hash);
    } else {
      // Unknown route, go home
      navigate('home');
    }
  }

  // ==========================================================
  //  CLICK OUTSIDE NAV HANDLER
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
    const konami = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let pos = 0;

    document.addEventListener('keydown', function (e) {
      if (e.key === konami[pos]) {
        pos++;
        if (pos === konami.length) {
          activateEasterEgg();
          pos = 0;
        }
      } else {
        pos = 0;
        // Check if the wrong key could be the start
        if (e.key === konami[0]) pos = 1;
      }
    });
  }

  function activateEasterEgg() {
    // Rainbow flash effect
    const body = document.body;
    const colors = ['#ff0000', '#ff7700', '#ffff00', '#00ff00', '#0000ff', '#8b00ff'];
    let i = 0;

    const interval = setInterval(() => {
      body.style.backgroundColor = colors[i];
      i++;
      if (i >= colors.length) {
        clearInterval(interval);
        body.style.backgroundColor = '';
        // Show secret message
        showSecretMessage();
      }
    }, 100);
  }

  function showSecretMessage() {
    const msg = document.createElement('div');
    msg.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: var(--font-pixel);
      font-size: 2rem;
      color: var(--neon-gold);
      text-shadow: 0 0 20px var(--neon-gold);
      z-index: 10000;
      pointer-events: none;
      animation: fadeOut 3s forwards;
      text-align: center;
    `;
    msg.textContent = '🏆 ACHIEVEMENT UNLOCKED 🏆\nYou found the secret!';
    document.body.appendChild(msg);

    // Add fadeOut keyframe
    if (!document.getElementById('fadeout-style')) {
      const style = document.createElement('style');
      style.id = 'fadeout-style';
      style.textContent = `
        @keyframes fadeOut {
          0%, 70% { opacity: 1; }
          100% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    setTimeout(() => msg.remove(), 3500);
  }

  // ==========================================================
  //  EXPOSE TO GLOBAL SCOPE (for onclick attributes)
  // ==========================================================
  window.navigate = navigate;

  // ==========================================================
  //  INITIALIZATION
  // ==========================================================
  function init() {
    createStarfield();
    spawnPixelDecorations();
    setupKonamiCode();

    // Set up event listeners
    document.addEventListener('keydown', handleKeyboard);
    window.addEventListener('hashchange', handleHashChange);
    document.getElementById('navbar').addEventListener('click', handleNavClicks);

    // Load initial route from hash
    const hash = window.location.hash.replace('#', '') || 'home';
    if (ROUTES.includes(hash)) {
      navigate(hash);
    } else {
      navigate('home');
    }

    console.log('%c🎮 Yie Shuen Lai — Game Developer Portfolio %cReady!',
      'color: #00ff41; font-size: 16px;', 'color: #e0e0e0;');
    console.log('%cTry the Konami Code: ↑↑↓↓←→←→BA',
      'color: #888; font-size: 11px;');
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
