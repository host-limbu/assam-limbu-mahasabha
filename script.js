/**
 * script.js – Pure UI interactions for Assam Limbu Mahasabha
 * No content rendering – all data is hardcoded in HTML.
 */

document.addEventListener('DOMContentLoaded', function () {
  // ---- Mobile hamburger toggle ----
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Dropdown toggles ----
  document.querySelectorAll('.dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = this.closest('.has-dropdown');
      if (!parent) return;
      const menu = parent.querySelector('.dropdown-menu');
      if (!menu) return;
      const isOpen = menu.classList.toggle('open');
      this.setAttribute('aria-expanded', isOpen);
    });
  });

  // ---- Close on outside click ----
  document.addEventListener('click', function (e) {
    if (mainNav && mainNav.classList.contains('open')) {
      if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }

    document.querySelectorAll('.has-dropdown .dropdown-menu.open').forEach(menu => {
      const parent = menu.closest('.has-dropdown');
      if (parent && !parent.contains(e.target)) {
        menu.classList.remove('open');
        const toggle = parent.querySelector('.dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ---- Fade-in animation ----
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add('visible'));
  }
});
