// ============================================================
// HERO SLIDER — 5 images with auto-play, pause, swipe
// ============================================================

(function() {
    'use strict';

    function initHeroSlider() {
        const slider = document.querySelector('.hero-slider');
        if (!slider) return;

        const slides = slider.querySelectorAll('.hero-slide');
        const totalSlides = slides.length;
        if (totalSlides <= 1) return;

        let currentIndex = 0;
        let isAnimating = false;
        let isPaused = false;
        const slideInterval = 3000; // 3 seconds
        let animationId = null;
        let autoPlayInterval = null;

        // Touch state
        let touchStartX = 0;
        let touchEndX = 0;
        let isSwiping = false;

        // ---- Easing: slow start → fast middle → slow end ----
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        // ---- Go to a specific slide ----
        function goToSlide(index) {
            if (isAnimating || index === currentIndex) return;
            isAnimating = true;
            const targetIndex = index;
            const startIndex = currentIndex;
            const targetOffset = -targetIndex * 100;
            const duration = 800; // ms
            const startTime = performance.now();
            const startTransform = -startIndex * 100;

            function animateSlide(time) {
                const elapsed = time - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeInOutCubic(progress);
                const currentOffset = startTransform + (targetOffset - startTransform) * eased;
                slider.style.transform = `translateX(${currentOffset}%)`;

                if (progress < 1) {
                    animationId = requestAnimationFrame(animateSlide);
                } else {
                    slider.style.transform = `translateX(${targetOffset}%)`;
                    currentIndex = targetIndex;
                    isAnimating = false;
                    animationId = null;
                }
            }

            animationId = requestAnimationFrame(animateSlide);
        }

        // ---- Next/Prev ----
        function nextSlide() {
            if (isAnimating) return;
            const nextIndex = (currentIndex + 1) % totalSlides;
            goToSlide(nextIndex);
        }

        function prevSlide() {
            if (isAnimating) return;
            const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            goToSlide(prevIndex);
        }

        // ---- Auto-play controls ----
        function startAutoPlay() {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            if (isPaused) return;
            autoPlayInterval = setInterval(() => {
                if (!isPaused && !isAnimating) {
                    nextSlide();
                }
            }, slideInterval);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            isAnimating = false;
        }

        // ---- Toggle pause on click ----
        function togglePause(e) {
            if (isSwiping) return;
            isPaused = !isPaused;
            slider.classList.toggle('paused');
            if (isPaused) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        }

        // ---- Touch / Swipe ----
        function handleTouchStart(e) {
            touchStartX = e.changedTouches[0].screenX;
            isSwiping = false;
            if (!isPaused) {
                stopAutoPlay();
            }
        }

        function handleTouchMove(e) {
            const deltaX = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(deltaX) > 10) {
                e.preventDefault();
                isSwiping = true;
            }
        }

        function handleTouchEnd(e) {
            touchEndX = e.changedTouches[0].screenX;
            const deltaX = touchEndX - touchStartX;
            const threshold = 50;

            if (Math.abs(deltaX) > threshold) {
                isSwiping = true;
                if (deltaX < 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            } else {
                // It was a tap → toggle pause
                togglePause(e);
            }

            // Resume auto-play after 2 seconds if not paused
            setTimeout(() => {
                if (!isPaused) {
                    startAutoPlay();
                }
            }, 2000);
        }

        // ---- Mouse hover ----
        slider.addEventListener('mouseenter', () => {
            if (!isPaused) stopAutoPlay();
        });
        slider.addEventListener('mouseleave', () => {
            if (!isPaused) startAutoPlay();
        });

        // ---- Click toggles pause ----
        slider.addEventListener('click', togglePause);

        // ---- Touch events ----
        slider.addEventListener('touchstart', handleTouchStart, { passive: true });
        slider.addEventListener('touchmove', handleTouchMove, { passive: false });
        slider.addEventListener('touchend', handleTouchEnd, { passive: true });

        // ---- Start ----
        startAutoPlay();

        // ---- Cleanup ----
        window.addEventListener('beforeunload', stopAutoPlay);
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroSlider);
    } else {
        initHeroSlider();
    }

})();
