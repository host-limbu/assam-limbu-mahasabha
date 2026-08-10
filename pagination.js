/**
 * pagination.js – Static HTML pagination for event cards
 * Paginates existing .event-card elements inside a container.
 * No content rendering – works with hardcoded HTML cards.
 * 
 * Usage: initPaginationStatic('containerId', itemsPerPage);
 */

function initPaginationStatic(containerId, itemsPerPage = 6) {
    const container = document.getElementById(containerId);
    const controlsContainer = document.getElementById('paginationControls');

    if (!container || !controlsContainer) {
        console.warn('Pagination container or controls container not found.');
        return;
    }

    // Get all event cards (static HTML)
    const cards = container.querySelectorAll('.event-card');
    const totalItems = cards.length;

    if (totalItems === 0) {
        controlsContainer.innerHTML = '<p style="text-align:center;color:var(--color-grey-dark);">No events to display.</p>';
        return;
    }

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    let currentPage = 1;

    // Show specific page
    function showPage(page) {
        // Hide all cards
        cards.forEach(c => c.style.display = 'none');

        // Show cards for current page
        const start = (page - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, totalItems);
        for (let i = start; i < end; i++) {
            cards[i].style.display = 'block';
            // Re-trigger fade-in if already visible
            if (!cards[i].classList.contains('visible')) {
                cards[i].classList.add('visible');
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
        prevBtn.addEventListener('click', function() {
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
            pageBtn.addEventListener('click', function() {
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
        nextBtn.addEventListener('click', function() {
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

    // Return control object for external use
    return {
        goToPage: function(page) {
            if (page >= 1 && page <= totalPages) {
                currentPage = page;
                showPage(currentPage);
            }
        },
        getCurrentPage: function() { return currentPage; },
        getTotalPages: function() { return totalPages; },
        getTotalItems: function() { return totalItems; }
    };
}
