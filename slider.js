// ============================================================
// HERO SLIDER — smooth, touch‑friendly, 2s interval
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
        let isPaused = false;
        let autoTimer = null;
        let timeoutId = null;

        // ---- Smooth goTo ----
        function goTo(index) {
            if (isAnimating || index === current) return;
            isAnimating = true;
            const target = -index * 100;
            slider.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            slider.style.transform = 'translateX(' + target + '%)';

            const onEnd = function() {
                slider.removeEventListener('transitionend', onEnd);
                current = index;
                isAnimating = false;
            };
            slider.addEventListener('transitionend', onEnd);
        }

        function next() {
            if (isPaused) return;
            const nextIndex = (current + 1) % total;
            goTo(nextIndex);
        }

        // ---- Auto-play ----
        function startAuto() {
            stopAuto();
            if (isPaused) return;
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
                if (!isPaused) startAuto();
            }, delay || 3000);
        }

        // ---- Pause toggle ----
        function togglePause() {
            isPaused = !isPaused;
            if (isPaused) {
                stopAuto();
            } else {
                startAuto();
            }
        }

        // ---- Touch / Swipe (smooth) ----
        let startX = 0, startY = 0, currentX = 0;
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

            // Only horizontal swipe
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
                // Snap back
                goTo(current);
            }

            // Resume auto after 4s
            if (!isPaused) {
                resumeAfter(4000);
            }
        }

        // ---- Mouse hover pause ----
        const container = slider.closest('.hero-image') || slider.parentElement;
        container.addEventListener('mouseenter', function() {
            if (!isPaused) stopAuto();
        });
        container.addEventListener('mouseleave', function() {
            if (!isPaused) {
                stopAuto();
                startAuto();
            }
        });

        // ---- Click toggles pause ----
        container.addEventListener('click', togglePause);

        // ---- Touch events ----
        slider.addEventListener('touchstart', onTouchStart, { passive: true });
        slider.addEventListener('touchmove', onTouchMove, { passive: false });
        slider.addEventListener('touchend', onTouchEnd, { passive: true });

        // ---- Start ----
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
