/* ==========================================================
   script.js — Minimal interactivity: header state / smooth anchors / reveal animations
   ========================================================== */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Element references ---------- */
  var header     = document.getElementById('siteHeader');
  var progressEl = document.getElementById('progressBar');
  var menuToggle = document.getElementById('menuToggle');
  var nav        = document.getElementById('mainNav');
  var heroInner  = document.getElementById('heroInner');

  /* ---------- Header state + reading progress + Hero parallax ---------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset;

      if (header) header.classList.toggle('scrolled', y > 40);

      if (progressEl) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progressEl.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
      }

      if (heroInner && !prefersReduced && y < window.innerHeight) {
        heroInner.style.transform = 'translateY(' + (y * 0.16) + 'px)';
        heroInner.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.9));
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  function closeMenu() {
    document.body.classList.remove('menu-open', 'no-scroll');
    if (menuToggle) { menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Open menu'); }
  }
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      document.body.classList.toggle('no-scroll', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Scroll reveal ---------- */
  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });

    document.querySelectorAll('[data-reveal], [data-reveal-mask]').forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll('[data-reveal], [data-reveal-mask]').forEach(function (el) {
      el.classList.add('in');
    });
  }

  /* ---------- Nav highlight (follow current section) ---------- */
  var navLinks = document.querySelectorAll('[data-nav]');
  var sections = ['hero', 'about', 'products', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && navLinks.length && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var key = entry.target.id === 'hero' ? 'top' : entry.target.id;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('data-nav') === key);
        });
      });
    }, { rootMargin: '-42% 0px -52% 0px' });
    sections.forEach(function (sec) { spy.observe(sec); });
  }
})();
