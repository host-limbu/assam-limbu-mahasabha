/**
 * Hero Carousel — Smooth auto-scroll with touch support
 */
document.addEventListener('DOMContentLoaded', function() {

    const slider = document.getElementById('heroSlider');
    const dotsContainer = document.getElementById('heroDots');

    if (!slider) {
        console.warn('Hero slider not found.');
        return;
    }

    const slides = slider.querySelectorAll('.hero-slide');
    const totalSlides = slides.length;

    if (totalSlides === 0) {
        console.warn('No slides found.');
        return;
    }

    let currentIndex = 0;
    let autoPlayInterval = null;
    let isTransitioning = false;

    // Create dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.dataset.index = i;
        dot.addEventListener('click', function() {
            goToSlide(parseInt(this.dataset.index));
        });
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('.dot');

    function goToSlide(index) {
        if (isTransitioning || index === currentIndex) return;
        isTransitioning = true;
        currentIndex = index;
        const offset = -currentIndex * 100;
        slider.style.transform = 'translateX(' + offset + '%)';
        updateDots();
        setTimeout(function() {
            isTransitioning = false;
        }, 700); // matches CSS transition duration
    }

    function updateDots() {
        dots.forEach(function(dot, i) {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        const next = (currentIndex + 1) % totalSlides;
        goToSlide(next);
    }

    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 2000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Touch events for swipe
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    slider.addEventListener('touchstart', function(e) {
        stopAutoPlay();
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        isDragging = true;
    }, { passive: true });

    slider.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        const touch = e.touches[0];
        const diffX = touch.clientX - startX;
        const diffY = touch.clientY - startY;
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 20) {
            e.preventDefault();
        }
    }, { passive: false });

    slider.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        isDragging = false;
        const touch = e.changedTouches[0];
        const diffX = touch.clientX - startX;
        if (Math.abs(diffX) > 50) {
            if (diffX < 0) {
                nextSlide();
            } else {
                const prev = (currentIndex - 1 + totalSlides) % totalSlides;
                goToSlide(prev);
            }
        }
        startAutoPlay();
    }, { passive: true });

    // Mouse drag for desktop
    let mouseDown = false;
    let mouseStartX = 0;

    slider.addEventListener('mousedown', function(e) {
        stopAutoPlay();
        mouseDown = true;
        mouseStartX = e.clientX;
    });

    slider.addEventListener('mousemove', function(e) {
        if (!mouseDown) return;
        const diffX = e.clientX - mouseStartX;
        if (Math.abs(diffX) > 20) {
            e.preventDefault();
        }
    });

    slider.addEventListener('mouseup', function(e) {
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

    slider.addEventListener('mouseleave', function() {
        if (mouseDown) {
            mouseDown = false;
            startAutoPlay();
        }
    });

    // Pause on hover (desktop)
    const carousel = document.querySelector('.hero-image');
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Start autoplay
    startAutoPlay();

    console.log('Hero carousel started with ' + totalSlides + ' slides.');
});
