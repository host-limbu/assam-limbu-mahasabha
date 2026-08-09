/* ============================================================
   script.js — Global JavaScript for Assam Limbu Mahasabha
   Shared across all pages.
   ============================================================ */

(function() {
    'use strict';

    // ---------- DOM READY ----------
    document.addEventListener('DOMContentLoaded', function() {

        // ============================================================
        // 1. MOBILE NAVIGATION TOGGLE
        // ============================================================
        const toggleBtn = document.querySelector('.mobile-toggle');
        const mobileNav = document.querySelector('.mobile-nav');

        if (toggleBtn && mobileNav) {
            toggleBtn.addEventListener('click', function() {
                const expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
                this.setAttribute('aria-expanded', expanded);
                mobileNav.classList.toggle('open');
                mobileNav.setAttribute('aria-hidden', !expanded);
            });

            // Close mobile nav on link click (for better UX)
            const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
            mobileLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    mobileNav.classList.remove('open');
                    mobileNav.setAttribute('aria-hidden', 'true');
                });
            });

            // Close on outside click (optional, but good)
            document.addEventListener('click', function(e) {
                const header = document.querySelector('.site-header');
                if (header && !header.contains(e.target) && mobileNav.classList.contains('open')) {
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    mobileNav.classList.remove('open');
                    mobileNav.setAttribute('aria-hidden', 'true');
                }
            });
        }

        // ============================================================
        // 2. SEARCH / FILTER SYSTEM (lightweight, frontend)
        //    Searches through visible text content on the current page.
        //    Works with the header search inputs (both desktop and mobile).
        // ============================================================
        const searchInputs = document.querySelectorAll('.search-input');
        const SEARCH_DELAY = 300;
        let searchTimeout = null;

        // Get all searchable content containers on the page.
        // We target main content sections, excluding header/footer.
        function getSearchableItems() {
            const main = document.querySelector('main');
            if (!main) return [];

            // We'll search within all text-bearing elements inside main,
            // but we want to show/hide entire sections or cards.
            // Simpler approach: collect all .section, .hero-section, etc.
            // But for a demo, we can filter cards, articles, or any container with text.
            // We'll collect all elements that have a class like 'update-card', 'event-card', 'committee-highlight-card', etc.
            // Also include paragraph texts.
            const selectors = [
                '.update-card', '.event-card', '.committee-highlight-card',
                '.document-card', '.contact-info-card', '.stat-card',
                '.intro-text p', '.hero-description', '.section-subtitle',
                '.update-title', '.event-title', '.highlight-name', '.highlight-desc',
                '.document-title', '.document-desc', '.contact-value', '.cta-description'
            ];
            let items = [];
            selectors.forEach(function(sel) {
                document.querySelectorAll(sel).forEach(function(el) {
                    items.push(el);
                });
            });
            // Also include whole sections as fallback
            document.querySelectorAll('.section, .hero-section, .membership-cta-section').forEach(function(el) {
                items.push(el);
            });
            return items;
        }

        function performSearch(query) {
            const trimmed = query.trim().toLowerCase();
            const items = getSearchableItems();

            if (trimmed === '') {
                // Show everything
                items.forEach(function(item) {
                    item.style.display = '';
                    // If it's a section, make sure children are visible
                    if (item.classList.contains('section') || item.classList.contains('hero-section') || item.classList.contains('membership-cta-section')) {
                        // Ensure all children are visible
                        const children = item.querySelectorAll('.update-card, .event-card, .committee-highlight-card, .document-card, .contact-info-card, .stat-card');
                        children.forEach(function(child) {
                            child.style.display = '';
                        });
                    }
                });
                // Also show any hidden cards inside sections
                document.querySelectorAll('.update-card, .event-card, .committee-highlight-card, .document-card, .contact-info-card, .stat-card').forEach(function(card) {
                    if (card.closest('.section') || card.closest('.hero-section') || card.closest('.membership-cta-section')) {
                        // Already handled by parent, but ensure they are visible if parent is visible
                        // Actually we set display on the parent, so children inherit.
                    }
                });
                return;
            }

            // We need to match items that contain the query in their text content.
            // We'll use a map to track visibility.
            const allCards = document.querySelectorAll('.update-card, .event-card, .committee-highlight-card, .document-card, .contact-info-card, .stat-card');
            // Also include whole sections if they match (less granular)
            const allSections = document.querySelectorAll('.section, .hero-section, .membership-cta-section');

            // First, hide all cards and sections by default, then show matches.
            // But we only want to hide those that are inside 'main' or visible area.
            // Better approach: iterate over items and set display based on match.

            // However, items are mixed (cards, paragraphs, sections). We'll set display on the items themselves.
            // But if we set display:none on a paragraph, it might leave gaps.
            // Better: hide the parent card/section if no child matches.
            // For simplicity, we'll operate on cards and sections directly.

            // We'll collect all parent containers that we care about.
            const containers = [];
            document.querySelectorAll('.update-card, .event-card, .committee-highlight-card, .document-card, .contact-info-card, .stat-card').forEach(function(el) {
                containers.push(el);
            });
            // Also include sections (for hero, intro, etc.)
            document.querySelectorAll('.section, .hero-section, .membership-cta-section').forEach(function(el) {
                containers.push(el);
            });

            // We'll use a Set to track matching items.
            const matchingItems = new Set();

            containers.forEach(function(container) {
                const text = container.textContent.toLowerCase();
                if (text.includes(trimmed)) {
                    matchingItems.add(container);
                }
            });

            // Now show matching items, hide others
            containers.forEach(function(container) {
                if (matchingItems.has(container)) {
                    container.style.display = '';
                } else {
                    container.style.display = 'none';
                }
            });

            // If a section is hidden, we might want to hide its children automatically (they are already hidden via display:none on parent).
            // But if a section is visible, ensure its children are visible (they might have been hidden by previous searches)
            // However, we set display on the container itself, so children inherit.
            // But we also need to ensure that if a section is shown, all its child cards are shown.
            // Actually, we only set display on the section, not on individual cards. So cards inside a shown section will be visible.
            // But if we previously hid a card directly, we need to clear that.
            // We'll just reset all card displays to '' and let the parent display decide.
            document.querySelectorAll('.update-card, .event-card, .committee-highlight-card, .document-card, .contact-info-card, .stat-card').forEach(function(card) {
                // If the card is inside a container that is displayed, it will be visible.
                // We need to ensure we don't override the parent.
                const parent = card.closest('.section') || card.closest('.hero-section') || card.closest('.membership-cta-section');
                if (parent) {
                    // If parent is hidden, card will be hidden via parent display.
                    // If parent is visible, we need to ensure card is not hidden.
                    // We'll set card display to '' so it inherits from parent.
                    card.style.display = '';
                } else {
                    // If no parent, just reset.
                    card.style.display = '';
                }
            });

            // If no matches, we might want to show a "no results" message? But for simplicity, we leave it empty.
            // We can also add a message, but not required.
        }

        // Attach event listeners to all search inputs
        searchInputs.forEach(function(input) {
            input.addEventListener('input', function(e) {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(function() {
                    performSearch(e.target.value);
                }, SEARCH_DELAY);
            });

            // Also trigger search on 'Enter' key (instant)
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    clearTimeout(searchTimeout);
                    performSearch(e.target.value);
                }
            });
        });

        // ============================================================
        // 3. SCROLL REVEAL (Intersection Observer)
        // ============================================================
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            // Select all elements that should be revealed.
            // We'll target sections, and child cards.
            const revealElements = document.querySelectorAll(
                '.section, .hero-section, .membership-cta-section, ' +
                '.update-card, .event-card, .committee-highlight-card, ' +
                '.document-card, .contact-info-card, .stat-card, ' +
                '.intro-grid, .gallery-preview-item'
            );

            // Add .reveal class to these elements, but avoid double-adding.
            revealElements.forEach(function(el) {
                // Skip if it's a section that contains many cards, we want to reveal the section itself.
                // But we also want to reveal cards individually. So we add to both.
                // To avoid flash, we set initial opacity to 0 via CSS class.
                // The class .reveal is already defined in CSS.
                // We'll add the class if not already present.
                if (!el.classList.contains('reveal')) {
                    el.classList.add('reveal');
                }
            });

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Optionally unobserve after reveal for performance
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.10,
                rootMargin: '0px 0px -30px 0px'
            });

            // Observe all .reveal elements
            document.querySelectorAll('.reveal').forEach(function(el) {
                observer.observe(el);
            });

            // Also, for elements that might be added dynamically, we need to observe them later.
            // But we are static, so this is fine.
        } else {
            // If user prefers reduced motion, we make all elements visible immediately.
            // The .reveal class sets opacity 0, so we override.
            const style = document.createElement('style');
            style.textContent = '.reveal { opacity: 1 !important; transform: translateY(0) !important; transition: none !important; }';
            document.head.appendChild(style);
        }

        // ============================================================
        // 4. ACTIVE NAV LINK HIGHLIGHTING (simple)
        //    Highlights the current page link in the navigation.
        // ============================================================
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

        navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            if (!href) return;

            // Normalize paths for comparison
            // For root index.html, we need to match /index.html or /
            let current = currentPath;
            // Remove trailing slash for comparison
            if (current.endsWith('/') && current.length > 1) {
                current = current.slice(0, -1);
            }
            // If current is just '/', treat as index.html
            if (current === '') current = '/';

            let linkHref = href;
            if (linkHref.startsWith('/')) {
                // absolute path
            } else {
                // relative path - we need to resolve relative to root
                // But we are using absolute paths starting with / in the navigation.
                // So this won't be hit for main nav, but for mobile maybe.
            }

            // If linkHref is '/index.html' or '/', we need to handle root.
            // We'll check if the current path ends with the link href, or if it's root.
            if (linkHref === '/' || linkHref === '/index.html') {
                if (current === '/' || current === '/index.html' || current.endsWith('/index.html')) {
                    link.classList.add('active');
                }
            } else {
                // For other pages, check if current path ends with the link href.
                // But careful: /about/about.html vs /about/
                if (current.endsWith(linkHref) || current === linkHref) {
                    link.classList.add('active');
                }
                // Also handle case where current is '/about' but link is '/about/about.html'? No, we use exact.
                // For safety, if the linkHref is the last part of the path.
                const lastPart = current.split('/').pop();
                if (lastPart && linkHref.endsWith(lastPart)) {
                    link.classList.add('active');
                }
            }
        });

        // ============================================================
        // 5. BONUS: Smooth scroll for internal anchor links (if any)
        // ============================================================
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = targetEl.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
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
