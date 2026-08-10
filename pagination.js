/**
 * pagination.js – Reusable event pagination system
 * (Not used in static pages, but kept for file-list completeness.)
 */

function initPagination(containerId, eventsArray, itemsPerPage = 6) {
  const container = document.getElementById(containerId);
  const controlsContainer = document.getElementById('paginationControls');

  if (!container || !controlsContainer) {
    console.warn('Pagination container or controls container not found.');
    return;
  }

  let currentPage = 1;
  const totalItems = eventsArray.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  function renderPage(page) {
    container.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, totalItems);
    const pageEvents = eventsArray.slice(start, end);

    if (pageEvents.length === 0) {
      container.innerHTML = '<p>No events to display.</p>';
    } else {
      pageEvents.forEach(ev => {
        const card = document.createElement('article');
        card.className = 'event-card fade-in';
        card.innerHTML = `
          <img src="#" alt="${ev.title}" />
          <div class="event-card-body">
            <h3>${ev.title}</h3>
            <p class="event-date">${ev.date}</p>
            <p class="event-desc">${ev.desc}</p>
            <a href="#" class="event-link">Read More</a>
          </div>
        `;
        container.appendChild(card);
      });
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });
      container.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }

    renderControls(page);
  }

  function renderControls(activePage) {
    controlsContainer.innerHTML = '';
    if (totalPages <= 1) return;

    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = activePage === 1;
    prevBtn.addEventListener('click', () => {
      if (activePage > 1) {
        currentPage = activePage - 1;
        renderPage(currentPage);
      }
    });
    controlsContainer.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.textContent = i;
      if (i === activePage) {
        pageBtn.classList.add('active');
      }
      pageBtn.addEventListener('click', () => {
        currentPage = i;
        renderPage(currentPage);
      });
      controlsContainer.appendChild(pageBtn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.disabled = activePage === totalPages;
    nextBtn.addEventListener('click', () => {
      if (activePage < totalPages) {
        currentPage = activePage + 1;
        renderPage(currentPage);
      }
    });
    controlsContainer.appendChild(nextBtn);
  }

  renderPage(1);

  return {
    goToPage: (page) => {
      if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderPage(currentPage);
      }
    },
    getCurrentPage: () => currentPage,
    getTotalPages: () => totalPages
  };
}
