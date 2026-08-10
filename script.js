/* ============================================================
   GLOBAL SCRIPT — Assam Limbu Mahasabha
   ============================================================ */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {

        // ==========================================================
        // 1. MOBILE NAV TOGGLE
        // ==========================================================
        const navToggle = document.querySelector('.mobile-nav-toggle');
        const nav = document.querySelector('.header-nav');
        if (navToggle && nav) {
            navToggle.addEventListener('click', function() {
                const isOpen = nav.classList.toggle('open');
                navToggle.classList.toggle('open');
                navToggle.setAttribute('aria-expanded', isOpen);
            });
        }

        // ==========================================================
        // 2. DROPDOWN TOGGLE ON MOBILE
        // ==========================================================
        document.querySelectorAll('.nav-dropdown > a').forEach(function(link) {
            link.addEventListener('click', function(e) {
                const nav = this.closest('.header-nav');
                if (nav && nav.classList.contains('open')) {
                    e.preventDefault();
                    const parent = this.closest('.nav-dropdown');
                    if (parent) {
                        parent.classList.toggle('open');
                    }
                }
            });
        });

        // ==========================================================
        // 3. LANGUAGE SELECTOR
        // ==========================================================
        const langSelector = document.querySelector('.language-selector');
        const langCurrent = langSelector ? langSelector.querySelector('.lang-current') : null;
        const langDropdown = langSelector ? langSelector.querySelector('.lang-dropdown') : null;

        if (langCurrent && langDropdown) {
            langCurrent.addEventListener('click', function(e) {
                e.stopPropagation();
                const isOpen = langSelector.classList.toggle('open');
                langCurrent.setAttribute('aria-expanded', isOpen);
            });

            langDropdown.querySelectorAll('li[role="option"]').forEach(function(item) {
                item.addEventListener('click', function() {
                    const lang = this.getAttribute('data-lang');
                    langDropdown.querySelectorAll('li[role="option"]').forEach(function(opt) {
                        opt.removeAttribute('aria-selected');
                    });
                    this.setAttribute('aria-selected', 'true');
                    const currentText = langCurrent.childNodes[0];
                    if (currentText) {
                        currentText.textContent = this.textContent.trim().split(' ')[0];
                    }
                    langSelector.classList.remove('open');
                    langCurrent.setAttribute('aria-expanded', 'false');
                    console.log('Language selected:', lang);
                });
            });

            document.addEventListener('click', function(e) {
                if (!langSelector.contains(e.target)) {
                    langSelector.classList.remove('open');
                    if (langCurrent) {
                        langCurrent.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        }

        // ==========================================================
        // 4. SEARCH OVERLAY
        // ==========================================================
        const searchToggle = document.querySelector('.search-toggle');
        const searchOverlay = document.querySelector('.search-overlay');
        const searchClose = document.querySelector('.search-close');
        const searchInput = searchOverlay ? searchOverlay.querySelector('input[type="search"]') : null;

        if (searchToggle && searchOverlay) {
            searchToggle.addEventListener('click', function() {
                searchOverlay.hidden = false;
                searchToggle.setAttribute('aria-expanded', 'true');
                if (searchInput) {
                    setTimeout(function() {
                        searchInput.focus();
                    }, 100);
                }
            });

            if (searchClose) {
                searchClose.addEventListener('click', function() {
                    searchOverlay.hidden = true;
                    searchToggle.setAttribute('aria-expanded', 'false');
                    if (searchInput) {
                        searchInput.value = '';
                    }
                });
            }

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && !searchOverlay.hidden) {
                    searchOverlay.hidden = true;
                    searchToggle.setAttribute('aria-expanded', 'false');
                    if (searchInput) {
                        searchInput.value = '';
                    }
                }
            });

            searchOverlay.addEventListener('click', function(e) {
                if (e.target === searchOverlay) {
                    searchOverlay.hidden = true;
                    searchToggle.setAttribute('aria-expanded', 'false');
                    if (searchInput) {
                        searchInput.value = '';
                    }
                }
            });
        }

        // ==========================================================
        // 5. HEADER SCROLL EFFECT
        // ==========================================================
        const header = document.querySelector('.site-header');
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScroll > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // ==========================================================
        // 6. FADE-IN SCROLL ANIMATION
        // ==========================================================
        const fadeElements = document.querySelectorAll('.fade-in');
        if (fadeElements.length > 0) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            });

            fadeElements.forEach(function(el) {
                observer.observe(el);
            });
        }

        function observeFadeElements() {
            document.querySelectorAll('.fade-in:not(.observed)').forEach(function(el) {
                el.classList.add('observed');
                const observer = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                }, {
                    threshold: 0.15,
                    rootMargin: '0px 0px -40px 0px'
                });
                observer.observe(el);
            });
        }

        observeFadeElements();

        // ==========================================================
        // 7. PAGINATION SYSTEM
        // ==========================================================

        function initPagination(containerSelector, itemsSelector, paginationId, itemsPerPage) {
            itemsPerPage = itemsPerPage || 4;
            const container = document.querySelector(containerSelector);
            if (!container) return;

            const items = container.querySelectorAll(itemsSelector);
            if (items.length === 0) return;

            const totalItems = items.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage);

            const paginationList = document.getElementById(paginationId);
            if (!paginationList) return;

            let currentPage = 1;

            function showPage(page) {
                currentPage = page;
                items.forEach(function(item, index) {
                    const start = (page - 1) * itemsPerPage;
                    const end = start + itemsPerPage;
                    if (index >= start && index < end) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
                renderPagination();
            }

            function renderPagination() {
                let html = '';
                if (totalPages <= 1) {
                    paginationList.innerHTML = '';
                    return;
                }

                html += '<li class="page-prev">';
                if (currentPage > 1) {
                    html += '<a href="#" data-page="' + (currentPage - 1) + '">&laquo;</a>';
                } else {
                    html += '<span class="page-dots">&laquo;</span>';
                }
                html += '</li>';

                for (let i = 1; i <= totalPages; i++) {
                    if (i === currentPage) {
                        html += '<li class="active"><span>' + i + '</span></li>';
                    } else {
                        html += '<li><a href="#" data-page="' + i + '">' + i + '</a></li>';
                    }
                }

                html += '<li class="page-next">';
                if (currentPage < totalPages) {
                    html += '<a href="#" data-page="' + (currentPage + 1) + '">&raquo;</a>';
                } else {
                    html += '<span class="page-dots">&raquo;</span>';
                }
                html += '</li>';

                paginationList.innerHTML = html;

                paginationList.querySelectorAll('a[data-page]').forEach(function(link) {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const page = parseInt(this.getAttribute('data-page'), 10);
                        if (page >= 1 && page <= totalPages) {
                            showPage(page);
                        }
                    });
                });
            }

            showPage(1);

            container._paginationRefresh = function() {
                const freshItems = container.querySelectorAll(itemsSelector);
                const newTotal = freshItems.length;
                const newTotalPages = Math.ceil(newTotal / itemsPerPage);
                if (currentPage > newTotalPages) {
                    currentPage = newTotalPages || 1;
                }
                freshItems.forEach(function(item, index) {
                    const start = (currentPage - 1) * itemsPerPage;
                    const end = start + itemsPerPage;
                    if (index >= start && index < end) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
                renderPagination();
            };

            const mutationObserver = new MutationObserver(function(mutations) {
                let shouldRefresh = false;
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                        const added = Array.from(mutation.addedNodes);
                        const removed = Array.from(mutation.removedNodes);
                        if (added.some(function(node) { return node.matches && node.matches(itemsSelector); }) ||
                            removed.some(function(node) { return node.matches && node.matches(itemsSelector); })) {
                            shouldRefresh = true;
                        }
                    }
                });
                if (shouldRefresh && container._paginationRefresh) {
                    container._paginationRefresh();
                }
            });

            mutationObserver.observe(container, { childList: true, subtree: true });
            container._paginationObserver = mutationObserver;
        }

        // Initialize pagination
        initPagination('#events-grid', '.event-card', 'events-pagination', 4);
        initPagination('#updates-grid', '.update-card', 'updates-pagination', 4);
        initPagination('#gallery-grid', '.gallery-item', 'gallery-pagination', 4);

        // ==========================================================
        // 8. STAT COUNTER ANIMATION
        // ==========================================================
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        if (statNumbers.length > 0) {
            const counterObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const target = parseInt(el.getAttribute('data-count'), 10);
                        if (!isNaN(target) && target > 0) {
                            let current = 0;
                            const step = Math.max(1, Math.floor(target / 40));
                            const interval = setInterval(function() {
                                current += step;
                                if (current >= target) {
                                    current = target;
                                    clearInterval(interval);
                                }
                                el.textContent = current;
                            }, 30);
                        }
                        counterObserver.unobserve(el);
                    }
                });
            }, { threshold: 0.5 });
            statNumbers.forEach(function(el) {
                counterObserver.observe(el);
            });
        }

        // ==========================================================
        // 9. SMOOTH SCROLL FOR ANCHOR LINKS
        // ==========================================================
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });

    });

})();
