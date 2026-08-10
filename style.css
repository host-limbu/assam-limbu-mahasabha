/* ============================================================
   STYLE.CSS — COMPLETE GLOBAL DESIGN SYSTEM
   ============================================================ */

/* ---------- ROOT VARIABLES ---------- */
:root {
  /* Colors */
  --color-primary: #1a3a5c;
  --color-primary-light: #2c5a7a;
  --color-secondary: #c9a96e;
  --color-background: #fafaf8;
  --color-surface: #ffffff;
  --color-text: #1e1e1e;
  --color-text-muted: #6a6a6a;
  --color-border: #d0d0d0;
  --color-footer: #1a1a1a;
  --color-footer-text: #e8e8e8;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --spacing-xxl: 5rem;

  /* Border */
  --border-width: 1px;
  --border-color: var(--color-border);
  --border-default: var(--border-width) solid var(--border-color);
  --radius: 5px;

  /* Shadows */
  --shadow-subtle: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-hover: 0 6px 20px rgba(0, 0, 0, 0.08);

  /* Typography */
  --font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  --font-size-base: 1rem;
  --line-height: 1.6;

  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-smooth: 0.3s ease;
}

/* ---------- RESET & BASE ---------- */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  line-height: var(--line-height);
  color: var(--color-text);
  background: var(--color-background);
  -webkit-font-smoothing: antialiased;
}

/* ---------- SITE SHELL — FULL VIEWPORT ---------- */
.site-shell {
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  background: var(--color-background);
}

/* ---------- FULL-WIDTH SECTIONS ---------- */
.full-width {
  width: 100%;
  margin: 0;
  padding: 0;
}

/* ---------- INNER CONTENT CONTAINER ---------- */
.inner-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  width: 100%;
}

/* ---------- TYPOGRAPHY ---------- */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: var(--spacing-sm);
  color: var(--color-primary);
}

h1 { font-size: 2.8rem; }
h2 { font-size: 2.2rem; }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.2rem; }

p {
  margin-bottom: var(--spacing-md);
  text-align: left;
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}
a:hover {
  color: var(--color-primary-light);
  text-decoration: underline;
}

ul, ol {
  padding-left: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* ---------- SECTION TITLES ---------- */
.section-title {
  font-size: 2rem;
  margin-bottom: var(--spacing-lg);
  border-bottom: 2px solid var(--color-secondary);
  padding-bottom: var(--spacing-sm);
  display: inline-block;
}

/* ---------- HEADER — FULL WIDTH ---------- */
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: var(--border-default);
  transition: background var(--transition-smooth);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-sm) var(--spacing-lg);
  min-height: 70px;
  width: 100%;
}

/* Brand */
.site-brand a {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--color-primary);
}
.brand-main {
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.01em;
}
.brand-sub {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-weight: 400;
}

/* Navigation */
.main-nav {
  display: flex;
  align-items: center;
}
.nav-list {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  list-style: none;
  padding: 0;
  margin: 0;
}
.nav-list > li {
  position: relative;
}
.nav-list a,
.nav-list .dropdown-toggle {
  display: block;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-text);
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: var(--radius);
  transition: background var(--transition-fast), color var(--transition-fast);
  font-family: inherit;
}
.nav-list a:hover,
.nav-list .dropdown-toggle:hover {
  background: var(--color-border);
  color: var(--color-primary);
}
.nav-list a.active {
  background: var(--color-primary);
  color: var(--color-surface);
}
.nav-list .dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-list .dropdown-toggle::after {
  content: "▾";
  font-size: 0.7rem;
  margin-left: 4px;
}

/* Dropdown */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: var(--color-surface);
  border: var(--border-default);
  border-radius: var(--radius);
  box-shadow: var(--shadow-subtle);
  padding: var(--spacing-sm) 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-6px);
  transition: opacity var(--transition-smooth), transform var(--transition-smooth), visibility 0s var(--transition-smooth);
  z-index: 100;
  list-style: none;
}
.has-dropdown:hover .dropdown-menu,
.has-dropdown:focus-within .dropdown-menu,
.dropdown-menu.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  transition: opacity var(--transition-smooth), transform var(--transition-smooth), visibility 0s 0s;
}
.dropdown-menu li a {
  padding: var(--spacing-sm) var(--spacing-lg);
  font-weight: 400;
  color: var(--color-text);
  border-radius: 0;
  display: block;
}
.dropdown-menu li a:hover {
  background: var(--color-border);
}

/* Mobile toggle */
.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: var(--radius);
}
.hamburger-line {
  display: block;
  width: 26px;
  height: 2px;
  background: var(--color-primary);
  transition: var(--transition-fast);
}
.nav-toggle[aria-expanded="true"] .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.nav-toggle[aria-expanded="true"] .hamburger-line:nth-child(2) {
  opacity: 0;
}
.nav-toggle[aria-expanded="true"] .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Language Switcher */
.language-switcher {
  position: relative;
  margin-left: var(--spacing-md);
}
.lang-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: var(--border-default);
  border-radius: var(--radius);
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.85rem;
  cursor: pointer;
  font-family: inherit;
  color: var(--color-text);
  transition: background var(--transition-fast);
}
.lang-btn:hover {
  background: var(--color-border);
}
.lang-btn svg {
  flex-shrink: 0;
}
.lang-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 120px;
  background: var(--color-surface);
  border: var(--border-default);
  border-radius: var(--radius);
  box-shadow: var(--shadow-subtle);
  padding: var(--spacing-sm) 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity var(--transition-smooth), transform var(--transition-smooth), visibility 0s var(--transition-smooth);
  list-style: none;
  z-index: 100;
}
.language-switcher:hover .lang-dropdown,
.language-switcher:focus-within .lang-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.lang-dropdown li a {
  display: block;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 0.9rem;
  color: var(--color-text);
}
.lang-dropdown li a:hover {
  background: var(--color-border);
}

/* ---------- MOBILE NAV ---------- */
@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }
  .main-nav {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: var(--color-surface);
    border-bottom: var(--border-default);
    box-shadow: var(--shadow-subtle);
    padding: var(--spacing-md) 0;
    display: none;
  }
  .main-nav.open {
    display: block;
  }
  .nav-list {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
  .nav-list > li {
    border-bottom: var(--border-default);
  }
  .nav-list a,
  .nav-list .dropdown-toggle {
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: 0;
    width: 100%;
    text-align: left;
  }
  .dropdown-menu {
    position: static;
    box-shadow: none;
    border: none;
    border-top: var(--border-default);
    border-radius: 0;
    padding: 0;
    background: var(--color-background);
    opacity: 1;
    visibility: visible;
    transform: none;
    display: none;
  }
  .dropdown-menu.open {
    display: block;
  }
  .dropdown-menu li a {
    padding-left: var(--spacing-xl);
  }
  .has-dropdown .dropdown-toggle::after {
    float: right;
  }
  .language-switcher {
    margin-left: 0;
  }
}

/* ---------- HERO ---------- */
.hero-section {
  padding: var(--spacing-xxl) 0 var(--spacing-xl);
  background: var(--color-surface);
  border-bottom: var(--border-default);
}
.hero-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 0 var(--spacing-lg);
}
.hero-content h1 {
  font-size: 3.2rem;
  margin-bottom: var(--spacing-sm);
}
.hero-sub {
  font-size: 1.25rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-md);
}
.hero-desc {
  font-size: 1.1rem;
  color: var(--color-text-muted);
  max-width: 700px;
  margin: 0 auto;
}

/* ---------- HORIZONTAL SCROLL ---------- */
.image-scroll-section {
  padding: var(--spacing-xl) 0;
  background: var(--color-background);
  border-bottom: var(--border-default);
}
.image-scroll-section .section-header {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}
.scroll-wrapper {
  overflow-x: auto;
  padding: var(--spacing-md) 0;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
}
.scroll-track {
  display: flex;
  gap: var(--spacing-lg);
  padding: 0 var(--spacing-lg);
  width: max-content;
}
.scroll-card {
  flex: 0 0 240px;
  border: var(--border-default);
  border-radius: var(--radius);
  background: var(--color-surface);
  box-shadow: var(--shadow-subtle);
  overflow: hidden;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}
.scroll-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}
.scroll-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  background: var(--color-border);
}
.scroll-card span {
  display: block;
  padding: var(--spacing-md);
  font-weight: 500;
  text-align: center;
}

/* ---------- ABOUT ---------- */
.about-section {
  padding: var(--spacing-xl) 0;
  background: var(--color-surface);
  border-bottom: var(--border-default);
}
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
}
.about-text p {
  margin-bottom: var(--spacing-md);
}
.about-highlights {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}
.highlight-item {
  background: var(--color-background);
  border: var(--border-default);
  border-radius: var(--radius);
  padding: var(--spacing-lg);
  text-align: center;
}
.highlight-number {
  display: block;
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-primary);
}
.highlight-label {
  font-size: 0.95rem;
  color: var(--color-text-muted);
}

/* ---------- FULL WIDTH IMAGE ---------- */
.full-image-section {
  padding: var(--spacing-xl) 0;
  background: var(--color-background);
  border-bottom: var(--border-default);
}
.full-image-wrapper {
  border: var(--border-default);
  border-radius: var(--radius);
  overflow: hidden;
  margin: 0 var(--spacing-lg);
}
.full-image-wrapper img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  background: var(--color-border);
}

/* ---------- RECENT EVENTS ---------- */
.recent-events-section {
  padding: var(--spacing-xl) 0;
  background: var(--color-surface);
  border-bottom: var(--border-default);
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: var(--spacing-lg);
}
.view-all-link {
  font-weight: 500;
  color: var(--color-primary-light);
  border: var(--border-default);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius);
  transition: background var(--transition-fast);
}
.view-all-link:hover {
  background: var(--color-border);
  text-decoration: none;
}
.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}
.event-card {
  border: var(--border-default);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--color-surface);
  box-shadow: var(--shadow-subtle);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}
.event-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}
.event-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  background: var(--color-border);
}
.event-card-body {
  padding: var(--spacing-md);
}
.event-card-body h3 {
  font-size: 1.2rem;
  margin-bottom: var(--spacing-xs);
}
.event-date {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-sm);
}
.event-desc {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-md);
}
.event-link {
  font-weight: 500;
  color: var(--color-primary-light);
}

/* ---------- DIRECTORY ---------- */
.directory-section {
  padding: var(--spacing-xl) 0;
  background: var(--color-background);
  border-bottom: var(--border-default);
}
.directory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}
.directory-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--spacing-lg);
  border: var(--border-default);
  border-radius: var(--radius);
  background: var(--color-surface);
  box-shadow: var(--shadow-subtle);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}
.directory-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  text-decoration: none;
}
.dir-icon {
  margin-bottom: var(--spacing-sm);
  color: var(--color-primary);
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}
.directory-card h3 {
  font-size: 1.1rem;
  margin-bottom: var(--spacing-xs);
}
.directory-card p {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-bottom: 0;
}

/* ---------- LEADERSHIP ---------- */
.leadership-section {
  padding: var(--spacing-xl) 0;
  background: var(--color-surface);
  border-bottom: var(--border-default);
}
.leadership-desc {
  max-width: 700px;
  margin-bottom: var(--spacing-xl);
  color: var(--color-text-muted);
}
.leadership-group {
  margin-bottom: var(--spacing-xl);
}
.group-title {
  font-size: 1.5rem;
  border-bottom: var(--border-default);
  padding-bottom: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}
.leadership-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-lg);
}
.leadership-card {
  border: var(--border-default);
  border-radius: var(--radius);
  padding: var(--spacing-md);
  text-align: center;
  background: var(--color-surface);
  box-shadow: var(--shadow-subtle);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}
.leadership-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}
.leadership-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto var(--spacing-md);
  border: var(--border-default);
  background: var(--color-border);
}
.leadership-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.leadership-designation {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-primary-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-xs);
}
.leadership-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
}
.leadership-desc-small {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-bottom: 0;
}

/* ---------- FOOTER — FULL WIDTH ---------- */
.site-footer {
  width: 100%;
  background: var(--color-footer);
  color: var(--color-footer-text);
  padding: var(--spacing-xl) 0 var(--spacing-md);
}
.site-footer a {
  color: var(--color-secondary);
}
.site-footer a:hover {
  color: var(--color-surface);
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}
.footer-brand-main {
  display: block;
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: var(--spacing-xs);
}
.footer-brand-sub {
  display: block;
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: var(--spacing-md);
}
.footer-links h4,
.footer-contact h4 {
  color: var(--color-secondary);
  margin-bottom: var(--spacing-sm);
}
.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-links ul li {
  margin-bottom: var(--spacing-xs);
}
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: var(--spacing-md);
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.8;
}

/* ---------- PAGINATION ---------- */
.pagination-controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-xl);
  padding: var(--spacing-md) 0;
  border-top: var(--border-default);
}
.pagination-controls button {
  padding: var(--spacing-sm) var(--spacing-md);
  border: var(--border-default);
  border-radius: var(--radius);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 0.95rem;
  cursor: pointer;
  transition: background var(--transition-fast), border-color var(--transition-fast);
  min-width: 40px;
  text-align: center;
  font-family: inherit;
}
.pagination-controls button:hover:not(:disabled) {
  background: var(--color-border);
}
.pagination-controls button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.pagination-controls button.active {
  background: var(--color-primary);
  color: var(--color-surface);
  border-color: var(--color-primary);
}
.pagination-controls button.active:hover {
  background: var(--color-primary);
}

/* ---------- FADE-IN ANIMATION ---------- */
.fade-in {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .fade-in {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

/* ---------- RESPONSIVE ---------- */
@media (max-width: 768px) {
  .inner-container {
    padding: 0 var(--spacing-md);
  }
  .hero-content h1 {
    font-size: 2.2rem;
  }
  .hero-sub {
    font-size: 1rem;
  }
  .section-title {
    font-size: 1.6rem;
  }
  .about-grid {
    grid-template-columns: 1fr;
  }
  .about-highlights {
    grid-template-columns: 1fr 1fr;
  }
  .footer-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  .full-image-wrapper {
    margin: 0 var(--spacing-md);
  }
  .full-image-wrapper img {
    height: 200px;
  }
  .scroll-card {
    flex: 0 0 180px;
  }
  .scroll-card img {
    height: 120px;
  }
  .leadership-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
  .event-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 480px) {
  :root {
    --spacing-lg: 1rem;
    --spacing-xl: 1.5rem;
  }
  .header-inner {
    padding: var(--spacing-sm) var(--spacing-md);
  }
  .brand-main {
    font-size: 1rem;
  }
  .brand-sub {
    font-size: 0.7rem;
  }
  .hero-content h1 {
    font-size: 1.8rem;
  }
  .hero-desc {
    font-size: 0.95rem;
  }
  .section-title {
    font-size: 1.4rem;
  }
  .about-highlights {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-sm);
  }
  .highlight-item {
    padding: var(--spacing-md);
  }
  .highlight-number {
    font-size: 1.6rem;
  }
  .directory-grid {
    grid-template-columns: 1fr 1fr;
  }
  .leadership-grid {
    grid-template-columns: 1fr 1fr;
  }
  .event-grid {
    grid-template-columns: 1fr;
  }
  .full-image-wrapper img {
    height: 160px;
  }
  .pagination-controls button {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.85rem;
    min-width: 32px;
  }
}
