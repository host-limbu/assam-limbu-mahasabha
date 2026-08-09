/* ============================================================
   carousel.js — Full-width image carousel
   Auto-scrolling with manual controls and indicators
   ============================================================ */

(function() {
    'use strict';

    // ---------- DOM READY ----------
    document.addEventListener('DOMContentLoaded', function() {

        var carousel = document.querySelector('.hero-carousel');
        if (!carousel) return;

        var track = carousel.querySelector('.carousel-track');
        var slides = carousel.querySelectorAll('.carousel-slide');
        var prevBtn = carousel.querySelector('.carousel-btn.prev');
        var nextBtn = carousel.querySelector('.carousel-btn.next');
        var indicatorsContainer = carousel.querySelector('.carousel-indicators');

        if (!track || slides.length === 0) return;

        var currentIndex = 0;
        var totalSlides = slides.length;
        var autoPlayInterval = null;
        var AUTO_PLAY_DELAY = 5000;
        var isTransitioning = false;

        // ---------- Create indicators if they don't exist ----------
        if (!indicatorsContainer) {
            var newContainer = document.createElement('div');
            newContainer.className = 'carousel-indicators';
            for (var i = 0; i < totalSlides; i++) {
                var dot = document.createElement('button');
                dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Slide ' + (i + 1));
                dot.dataset.index = i;
                newContainer.appendChild(dot);
            }
            carousel.appendChild(newContainer);
        }

        // Get indicators (either existing or newly created)
        var dots = carousel.querySelectorAll('.carousel-dot');

        // ---------- Update carousel position ----------
        function goToSlide(index, skipTransition) {
            // Clamp index
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            if (isTransitioning && !skipTransition) return;

            currentIndex = index;

            // Move track
            if (skipTransition) {
                track.style.transition = 'none';
            } else {
                track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }

            track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

            if (skipTransition) {
                // Force reflow
                track.offsetHeight;
                track.style.transition = '';
            }

            // Update dots
            dots.forEach(function(dot, i) {
                dot.classList.toggle('active', i === currentIndex);
            });

            // Update ARIA labels on slides for accessibility
            slides.forEach(function(slide, i) {
                slide.setAttribute('aria-hidden', i !== currentIndex);
            });

            isTransitioning = false;
        }

        // ---------- Next / Previous ----------
        function nextSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            goToSlide(currentIndex - 1);
        }

        // ---------- Auto-play ----------
        function startAutoPlay() {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!prefersReducedMotion) {
                autoPlayInterval = setInterval(nextSlide, AUTO_PLAY_DELAY);
            }
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        // ---------- Event listeners ----------
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                prevSlide();
                resetAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                nextSlide();
                resetAutoPlay();
            });
        }

        // Dot clicks
        dots.forEach(function(dot) {
            dot.addEventListener('click', function() {
                var index = parseInt(this.dataset.index, 10);
                if (!isNaN(index) && index !== currentIndex && !isTransitioning) {
                    isTransitioning = true;
                    goToSlide(index);
                    resetAutoPlay();
                }
            });
        });

        // Keyboard navigation
        carousel.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
                resetAutoPlay();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
                resetAutoPlay();
            }
        });

        // Pause on hover
        carousel.addEventListener('mouseenter', function() {
            stopAutoPlay();
        });

        carousel.addEventListener('mouseleave', function() {
            startAutoPlay();
        });

        // Pause on touch interaction
        carousel.addEventListener('touchstart', function() {
            stopAutoPlay();
        }, { passive: true });

        carousel.addEventListener('touchend', function() {
            setTimeout(startAutoPlay, 3000);
        }, { passive: true });

        // ---------- Initialize ----------
        // Set initial state
        goToSlide(0, true);

        // Start auto-play
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
            startAutoPlay();
        }

        // Stop auto-play when page is hidden
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                if (!prefersReducedMotion) {
                    startAutoPlay();
                }
            }
        });

        // ---------- Handle window resize ----------
        var resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
            }, 150);
        });

        // ---------- Handle image loading ----------
        var images = carousel.querySelectorAll('img');
        if (images.length > 0) {
            var imagesLoaded = 0;
            images.forEach(function(img) {
                if (img.complete) {
                    imagesLoaded++;
                } else {
                    img.addEventListener('load', function() {
                        imagesLoaded++;
                        if (imagesLoaded === images.length) {
                            track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
                        }
                    });
                    img.addEventListener('error', function() {
                        imagesLoaded++;
                        if (imagesLoaded === images.length) {
                            track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
                        }
                    });
                }
            });
        }

        console.log('Carousel initialized with ' + totalSlides + ' slides.');

    });

})();
