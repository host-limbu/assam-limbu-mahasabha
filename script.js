/**
 * script.js — Global JavaScript for Assam Limbu Mahasabha
 * Handles: navigation, dropdowns, language switcher, fade-in, pagination
 */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ============================================================
    // 1. MOBILE HAMBURGER MENU
    // ============================================================
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = mainNav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when clicking a link (mobile)
        mainNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mainNav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ============================================================
    // 2. DROPDOWN MENUS (Mobile click + Desktop hover support)
    // ============================================================
    document.querySelectorAll('.dropdown-toggle').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            // Only handle clicks on mobile or when dropdown is explicitly toggled
            // Desktop hover is handled by CSS, but we need click for mobile
            const parent = this.closest('.has-dropdown');
            if (!parent) return;

            // Check if we're on mobile (nav toggle is visible)
            const isMobile = window.getComputedStyle(navToggle).display !== 'none';

            if (isMobile) {
                e.preventDefault();
                const menu = parent.querySelector('.dropdown-menu');
                if (!menu) return;
                const isOpen = menu.classList.toggle('open');
                this.setAttribute('aria-expanded', isOpen);
            }
        });
    });

    // ============================================================
    // 3. CLOSE MENUS / DROPDOWNS ON OUTSIDE CLICK
    // ============================================================
    document.addEventListener('click', function (e) {
        // Close mobile nav
        if (mainNav && mainNav.classList.contains('open')) {
            if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
                mainNav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        }

        // Close mobile dropdowns
        document.querySelectorAll('.has-dropdown .dropdown-menu.open').forEach(function (menu) {
            const parent = menu.closest('.has-dropdown');
            if (parent && !parent.contains(e.target)) {
                menu.classList.remove('open');
                const toggle = parent.querySelector('.dropdown-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close language dropdown
        const langSwitcher = document.querySelector('.language-switcher');
        if (langSwitcher) {
            const dropdown = langSwitcher.querySelector('.lang-dropdown');
            if (dropdown && dropdown.style.visibility === 'visible') {
                if (!langSwitcher.contains(e.target)) {
                    dropdown.style.visibility = 'hidden';
                    dropdown.style.opacity = '0';
                }
            }
        }
    });

    // ============================================================
    // 4. LANGUAGE SWITCHER (with accessibility)
    // ============================================================
    const langBtn = document.querySelector('.lang-btn');
    const langDropdown = document.querySelector('.lang-dropdown');

    if (langBtn && langDropdown) {
        // Toggle on click
        langBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const isVisible = langDropdown.style.visibility === 'visible';
            langDropdown.style.visibility = isVisible ? 'hidden' : 'visible';
            langDropdown.style.opacity = isVisible ? '0' : '1';
            langBtn.setAttribute('aria-expanded', !isVisible);
        });

        // Close when a language is selected
        langDropdown.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const lang = this.getAttribute('lang');
                // Update button text
                const langSpan = langBtn.querySelector('span');
                if (langSpan) {
                    const langMap = {
                        'en': 'EN',
                        'hi': 'HI',
                        'as': 'AS',
                        'ne': 'NE'
                    };
                    langSpan.textContent = langMap[lang] || lang.toUpperCase();
                }
                // Close dropdown
                langDropdown.style.visibility = 'hidden';
                langDropdown.style.opacity = '0';
                langBtn.setAttribute('aria-expanded', 'false');
                // Future: implement actual language switching
                console.log('Language selected:', lang);
            });
        });

        // Close on Escape key
        langBtn.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                langDropdown.style.visibility = 'hidden';
                langDropdown.style.opacity = '0';
                langBtn.setAttribute('aria-expanded', 'false');
                langBtn.focus();
            }
        });
    }

    // ============================================================
    // 5. FADE-IN ANIMATION (IntersectionObserver)
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
        // Fallback: show all immediately
        fadeElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // ============================================================
    // 6. PAGINATION — Dynamic, 4 items per page
    // ============================================================
    /**
     * initPagination — Paginates .event-card, .update-card, or any grid items
     * @param {string} containerId - ID of the container holding the items
     * @param {number} itemsPerPage - Number of items per page (default: 4)
     * @param {string} itemSelector - CSS selector for items (default: '.event-card')
     */
    function initPagination(containerId, itemsPerPage, itemSelector) {
        itemsPerPage = itemsPerPage || 4;
        itemSelector = itemSelector || '.event-card';

        const container = document.getElementById(containerId);
        if (!container) return;

        const controlsContainer = document.getElementById('paginationControls');
        if (!controlsContainer) return;

        // Get all items (static HTML)
        const items = container.querySelectorAll(itemSelector);
        const totalItems = items.length;

        if (totalItems === 0) {
            controlsContainer.innerHTML = '<p style="text-align:center;color:var(--color-text-muted);">No items to display.</p>';
            return;
        }

        const totalPages = Math.ceil(totalItems / itemsPerPage);
        let currentPage = 1;

        // Show specific page
        function showPage(page) {
            // Hide all items
            items.forEach(function (item) {
                item.style.display = 'none';
            });

            // Show items for current page
            const start = (page - 1) * itemsPerPage;
            const end = Math.min(start + itemsPerPage, totalItems);
            for (let i = start; i < end; i++) {
                items[i].style.display = 'block';
                // Re-trigger fade-in
                if (!items[i].classList.contains('visible')) {
                    items[i].classList.add('visible');
                }
            }

            renderControls(page);
        }

        // Render pagination controls
        function renderControls(page) {
            controlsContainer.innerHTML = '';
            if (totalPages <= 1) return;

            // Previous button
            const prevBtn = document.createElement('button');
            prevBtn.textContent = 'Previous';
            prevBtn.disabled = page === 1;
            prevBtn.addEventListener('click', function () {
                if (page > 1) {
                    currentPage = page - 1;
                    showPage(currentPage);
                    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
            controlsContainer.appendChild(prevBtn);

            // Numbered page buttons
            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.textContent = i;
                if (i === page) {
                    pageBtn.classList.add('active');
                }
                pageBtn.addEventListener('click', function () {
                    currentPage = i;
                    showPage(currentPage);
                    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
                controlsContainer.appendChild(pageBtn);
            }

            // Next button
            const nextBtn = document.createElement('button');
            nextBtn.textContent = 'Next';
            nextBtn.disabled = page === totalPages;
            nextBtn.addEventListener('click', function () {
                if (page < totalPages) {
                    currentPage = page + 1;
                    showPage(currentPage);
                    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
            controlsContainer.appendChild(nextBtn);
        }

        // Initial render: show page 1
        showPage(1);

        // Return control object
        return {
            goToPage: function (page) {
                if (page >= 1 && page <= totalPages) {
                    currentPage = page;
                    showPage(currentPage);
                }
            },
            getCurrentPage: function () { return currentPage; },
            getTotalPages: function () { return totalPages; },
            getTotalItems: function () { return totalItems; }
        };
    }

    // Expose pagination to global scope for use in other pages
    window.initPagination = initPagination;

    // ============================================================
    // 7. AUTO-INIT PAGINATION (if container exists)
    // ============================================================
    // Check if events container exists and has items
    const eventsContainer = document.getElementById('eventsContainer');
    if (eventsContainer) {
        // Check if there are any items
        const items = eventsContainer.querySelectorAll('.event-card');
        if (items.length > 4) {
            // Only initialize if more than 4 items
            initPagination('eventsContainer', 4, '.event-card');
        } else {
            // Show all items if 4 or fewer
            items.forEach(function (item) {
                item.style.display = 'block';
            });
            // Hide pagination controls if not needed
            const controls = document.getElementById('paginationControls');
            if (controls) controls.innerHTML = '';
        }
    }

    // ============================================================
    // 8. KEYBOARD ACCESSIBILITY — Close on Escape
    // ============================================================
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            // Close mobile nav
            if (mainNav && mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
            // Close mobile dropdowns
            document.querySelectorAll('.has-dropdown .dropdown-menu.open').forEach(function (menu) {
                menu.classList.remove('open');
                const toggle = menu.closest('.has-dropdown').querySelector('.dropdown-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            });
            // Close language dropdown
            if (langDropdown && langDropdown.style.visibility === 'visible') {
                langDropdown.style.visibility = 'hidden';
                langDropdown.style.opacity = '0';
                if (langBtn) langBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // ============================================================
    // 9. CONSOLE LOG — Confirm script loaded
    // ============================================================
    console.log('Assam Limbu Mahasabha — script.js loaded successfully.');

}); // End DOMContentLoaded
