/* ============================================================
   script.js — Global JavaScript for Assam Limbu Mahasabha
   Single responsive navbar with dropdown support
   ============================================================ */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {

        // ============================================================
        // 1. SINGLE NAVBAR TOGGLE (mobile)
        // ============================================================
        var navToggle = document.querySelector('.nav-toggle');
        var navList = document.querySelector('.nav-list');

        if (navToggle && navList) {
            navToggle.addEventListener('click', function() {
                var expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
                this.setAttribute('aria-expanded', expanded);
                navList.classList.toggle('open');
            });

            // Close nav on link click (mobile)
            var navLinks = navList.querySelectorAll('.nav-link');
            navLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        navToggle.setAttribute('aria-expanded', 'false');
                        navList.classList.remove('open');
                    }
                });
            });

            // Close on outside click
            document.addEventListener('click', function(e) {
                var header = document.querySelector('.site-header');
                if (header && !header.contains(e.target) && navList.classList.contains('open')) {
                    navToggle.setAttribute('aria-expanded', 'false');
                    navList.classList.remove('open');
                }
            });
        }

        // ============================================================
        // 2. DROPDOWN NAVIGATION (desktop hover + mobile click)
        // ============================================================
        var dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        dropdownToggles.forEach(function(toggle) {
            var parentLi = toggle.closest('.dropdown');
            if (!parentLi) return;

            // Desktop hover
            if (!isTouchDevice) {
                parentLi.addEventListener('mouseenter', function() {
                    var menu = this.querySelector('.dropdown-menu');
                    if (menu && window.innerWidth > 768) {
                        menu.style.display = 'block';
                        menu.setAttribute('aria-hidden', 'false');
                    }
                });

                parentLi.addEventListener('mouseleave', function() {
                    var menu = this.querySelector('.dropdown-menu');
                    if (menu && window.innerWidth > 768) {
                        menu.style.display = 'none';
                        menu.setAttribute('aria-hidden', 'true');
                    }
                });
            }

            // Click/tap for mobile
            toggle.addEventListener('click', function(e) {
                if (isTouchDevice || window.innerWidth <= 768) {
                    e.preventDefault();
                    var menu = parentLi.querySelector('.dropdown-menu');
                    if (menu) {
                        var isOpen = menu.classList.contains('open');
                        // Close other dropdowns
                        var allMenus = parentLi.closest('.nav-list').querySelectorAll('.dropdown-menu');
                        allMenus.forEach(function(m) {
                            if (m !== menu) {
                                m.classList.remove('open');
                                m.style.display = 'none';
                                m.setAttribute('aria-hidden', 'true');
                            }
                        });
                        if (isOpen) {
                            menu.classList.remove('open');
                            menu.style.display = 'none';
                            menu.setAttribute('aria-hidden', 'true');
                        } else {
                            menu.classList.add('open');
                            menu.style.display = 'block';
                            menu.setAttribute('aria-hidden', 'false');
                        }
                    }
                }
            });

            // Escape key
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    var menu = parentLi.querySelector('.dropdown-menu');
                    if (menu && menu.classList.contains('open')) {
                        menu.classList.remove('open');
                        menu.style.display = 'none';
                        menu.setAttribute('aria-hidden', 'true');
                        toggle.focus();
                    }
                }
            });
        });

        // Close dropdowns on outside click
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
                    menu.classList.remove('open');
                    menu.style.display = 'none';
                    menu.setAttribute('aria-hidden', 'true');
                });
            }
        });

        // ============================================================
        // 3. SEARCH / FILTER SYSTEM
        // ============================================================
        var searchInputs = document.querySelectorAll('.search-input');
        var SEARCH_DELAY = 300;
        var searchTimeout = null;

        function getSearchableItems() {
            var main = document.querySelector('main');
            if (!main) return [];

            var selectors = [
                '.update-card', '.event-card', '.committee-highlight-card',
                '.document-card', '.contact-info-card',
                '.intro-text p', '.section-subtitle',
                '.update-title', '.event-title', '.highlight-name', '.highlight-desc',
                '.document-title', '.document-desc', '.contact-value'
            ];
            var items = [];
            selectors.forEach(function(sel) {
                document.querySelectorAll(sel).forEach(function(el) {
                    items.push(el);
                });
            });
            document.querySelectorAll('.section, .membership-cta-section').forEach(function(el) {
                items.push(el);
            });
            return items;
        }

        function performSearch(query) {
            var trimmed = query.trim().toLowerCase();
            var items = getSearchableItems();

            if (trimmed === '') {
                items.forEach(function(item) {
                    item.style.display = '';
                    if (item.classList.contains('section') || item.classList.contains('membership-cta-section')) {
                        var children = item.querySelectorAll('.update-card, .event-card, .committee-highlight-card, .document-card, .contact-info-card');
                        children.forEach(function(child) {
                            child.style.display = '';
                        });
                    }
                });
                return;
            }

            var containers = [];
            document.querySelectorAll('.update-card, .event-card, .committee-highlight-card, .document-card, .contact-info-card').forEach(function(el) {
                containers.push(el);
            });
            document.querySelectorAll('.section, .membership-cta-section').forEach(function(el) {
                containers.push(el);
            });

            var matchingItems = new Set();

            containers.forEach(function(container) {
                var text = container.textContent.toLowerCase();
                if (text.includes(trimmed)) {
                    matchingItems.add(container);
                }
            });

            containers.forEach(function(container) {
                if (matchingItems.has(container)) {
                    container.style.display = '';
                } else {
                    container.style.display = 'none';
                }
            });

            document.querySelectorAll('.update-card, .event-card, .committee-highlight-card, .document-card, .contact-info-card').forEach(function(card) {
                var parent = card.closest('.section') || card.closest('.membership-cta-section');
                if (parent) {
                    card.style.display = '';
                } else {
                    card.style.display = '';
                }
            });
        }

        searchInputs.forEach(function(input) {
            input.addEventListener('input', function(e) {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(function() {
                    performSearch(e.target.value);
                }, SEARCH_DELAY);
            });

            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    clearTimeout(searchTimeout);
                    performSearch(e.target.value);
                }
            });
        });

        // ============================================================
        // 4. SCROLL REVEAL (Intersection Observer)
        // ============================================================
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            var revealElements = document.querySelectorAll(
                '.section, .membership-cta-section, ' +
                '.update-card, .event-card, .committee-highlight-card, ' +
                '.document-card, .contact-info-card, ' +
                '.gallery-preview-item, .gallery-item'
            );

            revealElements.forEach(function(el) {
                if (!el.classList.contains('reveal')) {
                    el.classList.add('reveal');
                }
            });

            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.10,
                rootMargin: '0px 0px -30px 0px'
            });

            document.querySelectorAll('.reveal').forEach(function(el) {
                observer.observe(el);
            });
        } else {
            var style = document.createElement('style');
            style.textContent = '.reveal { opacity: 1 !important; transform: translateY(0) !important; transition: none !important; }';
            document.head.appendChild(style);
        }

        // ============================================================
        // 5. ACTIVE NAV LINK HIGHLIGHTING
        // ============================================================
        var currentPath = window.location.pathname;
        var navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(function(link) {
            var href = link.getAttribute('href');
            if (!href) return;

            var current = currentPath;
            if (current.startsWith('/')) {
                current = current.substring(1);
            }
            if (current === '') current = 'index.html';

            if (href === 'index.html' || href === '') {
                if (current === 'index.html' || current === '') {
                    link.classList.add('active');
                }
            } else {
                if (current.endsWith(href) || current === href) {
                    link.classList.add('active');
                }
                var lastPart = current.split('/').pop();
                if (lastPart && href.endsWith(lastPart)) {
                    link.classList.add('active');
                }
                if (href.endsWith('/') && current.startsWith(href)) {
                    link.classList.add('active');
                }
            }
        });

        // ============================================================
        // 6. SMOOTH SCROLL FOR ANCHOR LINKS
        // ============================================================
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;
                var targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    var headerOffset = 80;
                    var elementPosition = targetEl.getBoundingClientRect().top;
                    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        console.log('Assam Limbu Mahasabha — global script initialized.');

    });

})();
