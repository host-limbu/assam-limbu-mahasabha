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

    // Close menu on link click (mobile)
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Dropdown toggles (mobile & accessibility) ----
  document.querySelectorAll('.dropdown-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var parent = this.closest('.has-dropdown');
      if (!parent) return;
      var menu = parent.querySelector('.dropdown-menu');
      if (!menu) return;
      var isOpen = menu.classList.toggle('open');
      this.setAttribute('aria-expanded', isOpen);
    });
  });

  // ---- Close dropdowns / mobile nav when clicking outside ----
  document.addEventListener('click', function (e) {
    // Close mobile nav
    if (mainNav && mainNav.classList.contains('open')) {
      if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }

    // Close dropdown menus
    document.querySelectorAll('.has-dropdown .dropdown-menu.open').forEach(function (menu) {
      var parent = menu.closest('.has-dropdown');
      if (parent && !parent.contains(e.target)) {
        menu.classList.remove('open');
        var toggle = parent.querySelector('.dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ---- Fade-in animation (Intersection Observer) ----
  var fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }
});
