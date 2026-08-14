/**
 * Hero Carousel — Smooth auto-scroll with touch support
 */
(function() {
    'use strict';

    const track = document.getElementById('heroTrack');
    const dotsContainer = document.getElementById('heroDots');

    if (!track || !dotsContainer) return;

    const slides = track.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoPlayInterval = null;
    let isTransitioning = false;

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.dataset.index = i;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function goToSlide(index) {
        if (isTransitioning || index === currentIndex) return;
        isTransitioning = true;
        currentIndex = index;
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        updateDots();
        setTimeout(() => { isTransitioning = false; }, 700); // match transition duration
    }

    function updateDots() {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        const next = (currentIndex + 1) % totalSlides;
        goToSlide(next);
    }

    // Auto-play
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 2000); // 2 seconds
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Touch / swipe support
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        stopAutoPlay();
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        isDragging = true;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const diffX = touch.clientX - startX;
        const diffY = touch.clientY - startY;
        // Only horizontal swipe
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 20) {
            e.preventDefault();
        }
    }, { passive: false });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const touch = e.changedTouches[0];
        const diffX = touch.clientX - startX;
        if (Math.abs(diffX) > 50) {
            if (diffX < 0) {
                // swipe left → next
                nextSlide();
            } else {
                // swipe right → previous
                const prev = (currentIndex - 1 + totalSlides) % totalSlides;
                goToSlide(prev);
            }
        }
        startAutoPlay();
    }, { passive: true });

    // Mouse drag for desktop (optional)
    let mouseDown = false;
    let mouseStartX = 0;
    track.addEventListener('mousedown', (e) => {
        stopAutoPlay();
        mouseDown = true;
        mouseStartX = e.clientX;
    });

    track.addEventListener('mousemove', (e) => {
        if (!mouseDown) return;
        const diffX = e.clientX - mouseStartX;
        if (Math.abs(diffX) > 20) {
            e.preventDefault();
        }
    });

    track.addEventListener('mouseup', (e) => {
        if (!mouseDown) return;
        mouseDown = false;
        const diffX = e.clientX - mouseStartX;
        if (Math.abs(diffX) > 50) {
            if (diffX < 0) nextSlide();
            else {
                const prev = (currentIndex - 1 + totalSlides) % totalSlides;
                goToSlide(prev);
            }
        }
        startAutoPlay();
    });

    track.addEventListener('mouseleave', () => {
        if (mouseDown) {
            mouseDown = false;
            startAutoPlay();
        }
    });

    // Start auto-play
    startAutoPlay();

    // Pause on hover (optional)
    const carousel = document.getElementById('heroCarousel');
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Expose goToSlide for debugging if needed
    window.heroCarousel = { goToSlide, nextSlide, currentIndex: () => currentIndex };

})();
