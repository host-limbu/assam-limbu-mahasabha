// ============================================================
// HERO SLIDER — smooth, touch‑friendly, 2s interval, no click pause
// ============================================================

(function() {
    'use strict';

    function initHeroSlider() {
        const slider = document.querySelector('.hero-slider');
        if (!slider) return;

        const slides = slider.querySelectorAll('.hero-slide');
        const total = slides.length;
        if (total <= 1) return;

        let current = 0;
        let isAnimating = false;
        let autoTimer = null;
        let timeoutId = null;

        // ---- Smooth goTo ----
        function goTo(index) {
            if (isAnimating || index === current) return;
            isAnimating = true;
            const target = -index * 100;
            slider.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            slider.style.transform = 'translateX(' + target + '%)';

            const onEnd = function() {
                slider.removeEventListener('transitionend', onEnd);
                current = index;
                isAnimating = false;
                updateDots();
            };
            slider.addEventListener('transitionend', onEnd);
        }

        function next() {
            const nextIndex = (current + 1) % total;
            goTo(nextIndex);
        }

        // ---- Auto-play ----
        function startAuto() {
            stopAuto();
            autoTimer = setInterval(next, 2000); // 2 seconds
        }

        function stopAuto() {
            if (autoTimer) {
                clearInterval(autoTimer);
                autoTimer = null;
            }
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        }

        function resumeAfter(delay) {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(function() {
                startAuto();
            }, delay || 3000);
        }

        // ---- Dots ----
        function createDots() {
            const dotsContainer = document.getElementById('heroDots');
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('button');
                dot.className = 'dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('data-index', i);
                dot.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'), 10);
                    if (index !== current) {
                        stopAuto();
                        goTo(index);
                        resumeAfter(4000);
                    }
                });
                dotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            const dots = document.querySelectorAll('.hero-dots .dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === current);
            });
        }

        // ---- Touch / Swipe ----
        let startX = 0, startY = 0;
        let isDragging = false;
        let dragOffset = 0;

        function onTouchStart(e) {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            isDragging = true;
            dragOffset = 0;
            stopAuto();
            slider.style.transition = 'none';
        }

        function onTouchMove(e) {
            if (!isDragging) return;
            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;

            if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) return;
            if (Math.abs(deltaX) < Math.abs(deltaY)) return;

            e.preventDefault();
            dragOffset = deltaX;
            const base = -current * 100;
            const move = base + (deltaX / slider.parentElement.offsetWidth) * 100;
            slider.style.transform = 'translateX(' + move + '%)';
        }

        function onTouchEnd(e) {
            if (!isDragging) return;
            isDragging = false;
            const threshold = 50;

            if (Math.abs(dragOffset) > threshold) {
                if (dragOffset < 0) {
                    const nextIndex = (current + 1) % total;
                    goTo(nextIndex);
                } else {
                    const prevIndex = (current - 1 + total) % total;
                    goTo(prevIndex);
                }
            } else {
                goTo(current);
            }

            if (!isAnimating) {
                resumeAfter(4000);
            }
        }

        // ---- Mouse hover pause ----
        const container = slider.closest('.hero-image') || slider.parentElement;
        container.addEventListener('mouseenter', function() {
            stopAuto();
        });
        container.addEventListener('mouseleave', function() {
            startAuto();
        });

        // ---- Touch events ----
        slider.addEventListener('touchstart', onTouchStart, { passive: true });
        slider.addEventListener('touchmove', onTouchMove, { passive: false });
        slider.addEventListener('touchend', onTouchEnd, { passive: true });

        // ---- Init ----
        createDots();
        startAuto();

        // ---- Cleanup ----
        window.addEventListener('beforeunload', function() {
            stopAuto();
            slider.removeEventListener('touchstart', onTouchStart);
            slider.removeEventListener('touchmove', onTouchMove);
            slider.removeEventListener('touchend', onTouchEnd);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroSlider);
    } else {
        initHeroSlider();
    }

})();
