// ============================================================
// HERO SLIDER — lightweight, smooth, no click pause
// ============================================================

(function() {
    'use strict';

    const SLIDE_INTERVAL = 2500; // ms
    const SWIPE_THRESHOLD = 50;   // px

    function initHeroSlider() {
        const slider = document.querySelector('.hero-slider');
        if (!slider) return;

        const slides = slider.querySelectorAll('.hero-slide');
        const total = slides.length;
        if (total <= 1) return;

        let current = 0;
        let isAnimating = false;
        let autoTimer = null;
        let startX = 0;

        // ---- Navigate ----
        function goTo(index) {
            if (isAnimating || index === current) return;
            isAnimating = true;
            const target = -index * 100;
            slider.style.transition = 'transform 0.4s ease';
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
            goTo((current + 1) % total);
        }

        // ---- Auto-play ----
        function startAuto() {
            stopAuto();
            autoTimer = setInterval(next, SLIDE_INTERVAL);
        }

        function stopAuto() {
            if (autoTimer) {
                clearInterval(autoTimer);
                autoTimer = null;
            }
        }

        // ---- Dots ----
        function createDots() {
            const container = document.getElementById('heroDots');
            if (!container) return;
            container.innerHTML = '';
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('button');
                dot.className = 'dot' + (i === 0 ? ' active' : '');
                dot.dataset.index = i;
                dot.addEventListener('click', function() {
                    const idx = parseInt(this.dataset.index, 10);
                    if (idx !== current) goTo(idx);
                });
                container.appendChild(dot);
            }
        }

        function updateDots() {
            document.querySelectorAll('.hero-dots .dot').forEach((d, i) => {
                d.classList.toggle('active', i === current);
            });
        }

        // ---- Touch swipe ----
        function onTouchStart(e) {
            startX = e.touches[0].clientX;
        }

        function onTouchMove(e) {
            const deltaX = e.touches[0].clientX - startX;
            if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
            e.preventDefault();
            const target = deltaX < 0 ? (current + 1) % total : (current - 1 + total) % total;
            goTo(target);
            // Reset start to prevent multiple swipes
            startX = e.touches[0].clientX;
        }

        // ---- Mouse hover pause ----
        const container = slider.closest('.hero-image') || slider.parentElement;
        container.addEventListener('mouseenter', stopAuto);
        container.addEventListener('mouseleave', startAuto);

        // ---- Touch events ----
        slider.addEventListener('touchstart', onTouchStart, { passive: true });
        slider.addEventListener('touchmove', onTouchMove, { passive: false });

        // ---- Init ----
        createDots();
        startAuto();

        // ---- Cleanup ----
        window.addEventListener('beforeunload', stopAuto);
    }

    // ---- Start ----
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroSlider);
    } else {
        initHeroSlider();
    }

})();
