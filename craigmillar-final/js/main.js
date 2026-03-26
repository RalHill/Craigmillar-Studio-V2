/* ============================================================
   CRAIGMILLAR STUDIO — main.js
   Shared across all pages
   ============================================================ */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── NAV SCROLL ── */
  var nav = document.getElementById('nav');
  if (nav) {
    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── MOBILE MENU ── */
  var ham = document.getElementById('ham');
  var mob = document.getElementById('mob');
  if (ham && mob) {
    ham.addEventListener('click', function () {
      var open = ham.classList.toggle('open');
      mob.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mob.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        ham.classList.remove('open');
        mob.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── SCROLL REVEAL ── */
  var revealEls = document.querySelectorAll('.rv');
  if (reduceMotion) {
    revealEls.forEach(function (el) {
      el.classList.add('on');
    });
  } else if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('on');
    });
  }

  /* ── FAQ ACCORDION ── */
  window.toggleFaq = function (el) {
    var item = el.parentElement;
    var wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function (i) {
      i.classList.remove('open');
    });
    if (!wasOpen) item.classList.add('open');
  };

})();
