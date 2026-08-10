/**
 * language.js – Runtime multilingual translation system
 * Uses LibreTranslate public API (no key required).
 * Batches translations, caches in localStorage, preserves DOM structure.
 */

(function() {
  'use strict';

  // ─── CONFIG ────────────────────────────────────────────────
  const API_URL = 'https://libretranslate.com/translate';
  const STORAGE_KEY = 'siteLanguage';
  const CACHE_PREFIX = 'translation_cache_';
  const SUPPORTED_LANGUAGES = {
    en: 'English',
    hi: 'हिन्दी',
    as: 'অসমীয়া',
    ne: 'नेपाली'
  };

  let currentLanguage = localStorage.getItem(STORAGE_KEY) || 'en';
  let isTranslating = false;

  // ─── DOM HELPERS ────────────────────────────────────────────

  /** Get all user-visible text nodes and attributes from the page */
  function getVisibleTextNodes() {
    const elements = document.querySelectorAll(
      'body *:not(script):not(style):not(noscript):not(meta):not(link):not(head)'
    );
    const items = [];

    elements.forEach(el => {
      // Skip hidden elements
      if (el.offsetParent === null) return;
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') return;

      // Text content
      const text = el.textContent.trim();
      if (text && el.children.length === 0) {
        items.push({ element: el, type: 'text', original: text });
      }

      // Input placeholders
      if (el.tagName === 'INPUT' && el.placeholder) {
        items.push({ element: el, type: 'placeholder', original: el.placeholder });
      }

      // Input values (except buttons, submit, etc.)
      if (el.tagName === 'INPUT' && el.type !== 'submit' && el.type !== 'button' && el.value) {
        items.push({ element: el, type: 'value', original: el.value });
      }

      // Button text
      if (el.tagName === 'BUTTON' && el.textContent.trim() && el.children.length === 0) {
        // Avoid duplicate with text nodes
      }

      // Alt text
      if (el.tagName === 'IMG' && el.alt && !el.alt.startsWith('data:image')) {
        items.push({ element: el, type: 'alt', original: el.alt });
      }

      // Title attributes
      if (el.title) {
        items.push({ element: el, type: 'title', original: el.title });
      }

      // Aria-label
      if (el.hasAttribute('aria-label') && el.getAttribute('aria-label')) {
        items.push({ element: el, type: 'aria-label', original: el.getAttribute('aria-label') });
      }
    });

    return items;
  }

  /** Collect all unique strings for translation */
  function collectUniqueStrings(items) {
    const unique = new Map();
    items.forEach(item => {
      const key = item.original;
      if (!unique.has(key)) {
        unique.set(key, []);
      }
      unique.get(key).push(item);
    });
    return unique;
  }

  /** Translate a batch of strings via API */
  async function translateBatch(strings, targetLang) {
    if (!strings.length || targetLang === 'en') return {};

    const payload = strings.map(text => ({
      q: text,
      source: 'en',
      target: targetLang,
      format: 'text'
    }));

    try {
      // For LibreTranslate batch, we need to send multiple requests or use one per text.
      // To avoid rate limits, we send one request per string (but can be parallelized)
      const results = await Promise.all(
        payload.map(async (p) => {
          const cacheKey = CACHE_PREFIX + targetLang + '_' + p.q;
          const cached = localStorage.getItem(cacheKey);
          if (cached) return { original: p.q, translated: cached };

          const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(p)
          });

          if (!response.ok) {
            console.warn('Translation API error:', response.status);
            return { original: p.q, translated: p.q };
          }

          const data = await response.json();
          const translated = data.translatedText || p.q;
          // Cache the result
          localStorage.setItem(cacheKey, translated);
          return { original: p.q, translated };
        })
      );

      const map = {};
      results.forEach(r => { map[r.original] = r.translated; });
      return map;
    } catch (err) {
      console.warn('Translation failed:', err);
      return {};
    }
  }

  // ─── TRANSLATION ENGINE ─────────────────────────────────────

  /** Main translate function */
  async function translatePage(lang) {
    if (isTranslating) return;
    if (lang === 'en') {
      // Restore original text (remove any applied translations)
      restoreOriginalText();
      currentLanguage = 'en';
      localStorage.setItem(STORAGE_KEY, 'en');
      updateSelectorValue('en');
      return;
    }

    isTranslating = true;

    // Collect visible text items
    const items = getVisibleTextNodes();
    const uniqueMap = collectUniqueStrings(items);
    const uniqueStrings = Array.from(uniqueMap.keys()).filter(s => s.length > 0);

    if (!uniqueStrings.length) {
      isTranslating = false;
      return;
    }

    // Translate
    const translationMap = await translateBatch(uniqueStrings, lang);

    // Apply translations
    uniqueMap.forEach((itemList, original) => {
      const translated = translationMap[original] || original;
      itemList.forEach(item => {
        applyTranslation(item, translated);
      });
    });

    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    updateSelectorValue(lang);
    isTranslating = false;
  }

  /** Apply translation to a single item */
  function applyTranslation(item, translatedText) {
    const el = item.element;
    switch (item.type) {
      case 'text':
        if (el.textContent.trim()) {
          el.textContent = translatedText;
        }
        break;
      case 'placeholder':
        el.placeholder = translatedText;
        break;
      case 'value':
        if (el.value) el.value = translatedText;
        break;
      case 'alt':
        el.alt = translatedText;
        break;
      case 'title':
        el.title = translatedText;
        break;
      case 'aria-label':
        el.setAttribute('aria-label', translatedText);
        break;
    }
  }

  /** Restore original text (for English) – we store originals in a data attribute */
  function restoreOriginalText() {
    // We need to store original text on first load
    // Since we didn't store, we can just reload the page.
    // Better: on first load, store original in data-original.
    // For simplicity, we will reload the page if switching to English from a translated state.
    // But we want to avoid page reload. So we store original text in a data attribute.
    // First pass: ensure all elements have data-original-text.
    if (!document.querySelector('[data-original-text]')) {
      // First time, store all text
      document.querySelectorAll('body *:not(script):not(style):not(noscript):not(meta):not(link):not(head)').forEach(el => {
        if (el.children.length === 0 && el.textContent.trim()) {
          el.setAttribute('data-original-text', el.textContent);
        }
      });
    }
    // Restore
    document.querySelectorAll('[data-original-text]').forEach(el => {
      el.textContent = el.getAttribute('data-original-text');
    });
    // Also restore placeholders, values, etc. (we stored them in data attributes)
    document.querySelectorAll('[data-original-placeholder]').forEach(el => {
      el.placeholder = el.getAttribute('data-original-placeholder');
    });
    document.querySelectorAll('[data-original-value]').forEach(el => {
      if (el.type !== 'submit' && el.type !== 'button') {
        el.value = el.getAttribute('data-original-value');
      }
    });
    document.querySelectorAll('[data-original-alt]').forEach(el => {
      el.alt = el.getAttribute('data-original-alt');
    });
    document.querySelectorAll('[data-original-title]').forEach(el => {
      el.title = el.getAttribute('data-original-title');
    });
    document.querySelectorAll('[data-original-aria-label]').forEach(el => {
      el.setAttribute('aria-label', el.getAttribute('data-original-aria-label'));
    });

    // Clear cache? No, keep for other languages.
  }

  /** Store original text on first load */
  function storeOriginals() {
    document.querySelectorAll('body *:not(script):not(style):not(noscript):not(meta):not(link):not(head)').forEach(el => {
      if (el.children.length === 0 && el.textContent.trim() && !el.hasAttribute('data-original-text')) {
        el.setAttribute('data-original-text', el.textContent);
      }
      if (el.tagName === 'INPUT' && el.placeholder && !el.hasAttribute('data-original-placeholder')) {
        el.setAttribute('data-original-placeholder', el.placeholder);
      }
      if (el.tagName === 'INPUT' && el.value && !el.hasAttribute('data-original-value') && el.type !== 'submit' && el.type !== 'button') {
        el.setAttribute('data-original-value', el.value);
      }
      if (el.tagName === 'IMG' && el.alt && !el.hasAttribute('data-original-alt') && !el.alt.startsWith('data:image')) {
        el.setAttribute('data-original-alt', el.alt);
      }
      if (el.title && !el.hasAttribute('data-original-title')) {
        el.setAttribute('data-original-title', el.title);
      }
      if (el.hasAttribute('aria-label') && el.getAttribute('aria-label') && !el.hasAttribute('data-original-aria-label')) {
        el.setAttribute('data-original-aria-label', el.getAttribute('aria-label'));
      }
    });
  }

  // ─── LANGUAGE SELECTOR UI ──────────────────────────────────

  /** Inject language selector into header */
  function injectSelector() {
    const headerInner = document.querySelector('.header-inner');
    if (!headerInner) return;

    // Check if already injected
    if (document.querySelector('.lang-selector-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'lang-selector-wrapper';

    const select = document.createElement('select');
    select.className = 'lang-selector';
    select.setAttribute('aria-label', 'Select language');

    Object.keys(SUPPORTED_LANGUAGES).forEach(code => {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = SUPPORTED_LANGUAGES[code];
      if (code === currentLanguage) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    select.addEventListener('change', function(e) {
      const lang = this.value;
      if (lang === currentLanguage) return;
      translatePage(lang);
    });

    wrapper.appendChild(select);
    // Insert after site-brand (or before nav-toggle)
    const brand = headerInner.querySelector('.site-brand');
    if (brand) {
      brand.after(wrapper);
    } else {
      headerInner.prepend(wrapper);
    }
  }

  function updateSelectorValue(lang) {
    const select = document.querySelector('.lang-selector');
    if (select) {
      select.value = lang;
    }
  }

  // ─── INIT ───────────────────────────────────────────────────

  /** Initialize the system */
  function init() {
    storeOriginals();
    injectSelector();

    // If saved language is not English, translate after page load
    if (currentLanguage !== 'en') {
      // Wait for everything to render
      if (document.readyState === 'complete') {
        setTimeout(() => translatePage(currentLanguage), 300);
      } else {
        window.addEventListener('load', function() {
          setTimeout(() => translatePage(currentLanguage), 300);
        });
      }
    } else {
      // Ensure English is set
      localStorage.setItem(STORAGE_KEY, 'en');
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
