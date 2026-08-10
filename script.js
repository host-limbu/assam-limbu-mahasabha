/**
 * script.js – Global UI interactions for Assam Limbu Mahasabha
 * Handles: mobile hamburger, dropdown toggles, outside clicks, fade‑in animations.
 * No content rendering – all data is hardcoded in HTML.
 */

document.addEventListener('DOMContentLoaded', function () {

  // ============================================================
  // 1. MOBILE HAMBURGER MENU
  // ============================================================
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    // Toggle menu on button click
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked (mobile)
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ============================================================
  // 2. DROPDOWN TOGGLES (mobile & accessibility)
  // ============================================================
  document.querySelectorAll('.dropdown-toggle').forEach(function (btn) {
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

  // ============================================================
  // 3. CLOSE DROPDOWNS / MOBILE NAV ON OUTSIDE CLICK
  // ============================================================
  document.addEventListener('click', function (e) {
    // Close mobile nav if open and click outside
    if (mainNav && mainNav.classList.contains('open')) {
      if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }

    // Close dropdown menus if click outside
    document.querySelectorAll('.has-dropdown .dropdown-menu.open').forEach(function (menu) {
      const parent = menu.closest('.has-dropdown');
      if (parent && !parent.contains(e.target)) {
        menu.classList.remove('open');
        const toggle = parent.querySelector('.dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ============================================================
  // 4. FADE‑IN ANIMATION (IntersectionObserver)
  // ============================================================
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
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
    // Fallback: show all elements immediately
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ============================================================
  // 5. SMOOTH SCROLL FOR ANCHOR LINKS (optional)
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // ============================================================
  // 6. ADD FADE‑IN TO SECTIONS WITHOUT THE CLASS
  //     (so that any new section automatically gets animation)
  // ============================================================
  document.querySelectorAll('section:not(.fade-in)').forEach(function (section) {
    section.classList.add('fade-in');
  });

  // Re‑observe new fade‑in elements added dynamically
  // (This handles any sections that were added after DOMContentLoaded)
  // Note: For static pages, this is enough.

}); // end DOMContentLoaded
