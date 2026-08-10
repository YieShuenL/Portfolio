/* ============================================================
   LIGHTBOX — Click screenshot to enlarge, click overlay / ESC to close
   ============================================================ */
(function () {
  'use strict';

  let overlay = null;

  function createOverlay() {
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.92); z-index: 10000;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; opacity: 0; transition: opacity 0.3s;
    `;

    const img = document.createElement('img');
    img.style.cssText = `
      max-width: 95%; max-height: 95%; object-fit: contain;
      border: 2px solid rgba(0, 255, 65, 0.3);
      box-shadow: 0 0 40px rgba(0, 255, 65, 0.2);
      transform: scale(0.9); transition: transform 0.3s;
    `;
    overlay.appendChild(img);

    const hint = document.createElement('div');
    hint.textContent = 'Click anywhere or press ESC to close';
    hint.style.cssText = `
      position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
      font-family: 'VT323', monospace; font-size: 1.4rem; color: #888;
      pointer-events: none;
    `;
    overlay.appendChild(hint);

    document.body.appendChild(overlay);

    // Close on overlay click
    overlay.addEventListener('click', closeLightbox);
    // Close on ESC
    document.addEventListener('keydown', handleKey);

    return overlay;
  }

  function openLightbox(src) {
    const el = createOverlay();
    const img = el.querySelector('img');
    img.src = src;
    el.style.display = 'flex';
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      img.style.transform = 'scale(1)';
    });
  }

  function closeLightbox() {
    if (!overlay) return;
    const img = overlay.querySelector('img');
    overlay.style.opacity = '0';
    img.style.transform = 'scale(0.9)';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 300);
  }

  function handleKey(e) {
    if (e.key === 'Escape') closeLightbox();
  }

  // Attach to all gallery images
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.gallery img').forEach(function (img) {
      img.addEventListener('click', function () {
        openLightbox(img.src);
      });
    });
  });

  // Also handle dynamically added images
  if (document.readyState !== 'loading') {
    document.querySelectorAll('.gallery img').forEach(function (img) {
      img.addEventListener('click', function () {
        openLightbox(img.src);
      });
    });
  }
})();
