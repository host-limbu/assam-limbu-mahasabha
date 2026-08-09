/* ============================================================
   temp-notice.js — Temporary Conditionals Overlay Notice
   FULL SITE BLOCK — No button, no entry
   Users CANNOT enter the site until the notice is removed.
   ============================================================ */

(function() {
    'use strict';

    // ============================================================
    // CONFIGURATION — Toggle this to enable/disable the notice
    // ============================================================
    const NOTICE_CONFIG = {
        // Set to false to completely disable the notice
        ENABLED: true,

        // How long to wait before showing the notice (ms)
        DELAY: 300,

        // Fade duration (ms)
        FADE_DURATION: 600,

        // Show a close button? — FALSE = NO BUTTON, NO ENTRY
        SHOW_CLOSE_BUTTON: false,

        // Dismissible by clicking the overlay? — FALSE = NO BYPASS
        CLOSE_ON_BACKGROUND_CLICK: false,

        // ESC key to dismiss? — FALSE = NO BYPASS
        ALLOW_ESC_TO_DISMISS: false
    };

    // ============================================================
    // NOTICE CONTENT — Edit this to change the message
    // ============================================================
    const NOTICE_CONTENT = {
        title: 'Website Under Maintenance',
        message: 'The Assam Limbu Mahasabha website is currently undergoing scheduled maintenance. We apologize for the inconvenience and appreciate your patience. Please check back later.',
        subMessage: '— District Committee'
    };

    // ============================================================
    // MAIN LOGIC — Do not edit below
    // ============================================================

    // Build the overlay HTML
    function buildOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'temp-notice-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.70);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            opacity: 0;
            transition: opacity ${NOTICE_CONFIG.FADE_DURATION}ms ease;
            pointer-events: none;
            font-family: 'Segoe UI', Roboto, system-ui, -apple-system, sans-serif;
            user-select: none;
        `;

        // Create the modal card
        const modal = document.createElement('div');
        modal.id = 'temp-notice-modal';
        modal.style.cssText = `
            max-width: 560px;
            width: 90%;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
            padding: 48px 40px 40px;
            position: relative;
            transform: translateY(30px) scale(0.96);
            transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            border: 1px solid rgba(255, 255, 255, 0.10);
            text-align: center;
        `;

        // Logo / Icon (SVG)
        const headerIcon = document.createElement('div');
        headerIcon.style.cssText = `
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
        `;
        headerIcon.innerHTML = `
            <svg width="72" height="72" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
                <circle cx="40" cy="40" r="38" fill="#1a3a5c" stroke="#c9a84c" stroke-width="2.5" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="#c9a84c" stroke-width="1.5" stroke-dasharray="4 4" />
                <path d="M40 14 L44 28 L58 28 L48 36 L52 50 L40 42 L28 50 L32 36 L22 28 L36 28 L40 14Z" fill="#c9a84c" opacity="0.9" />
                <text x="40" y="70" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="#c9a84c" text-anchor="middle" letter-spacing="1">ALM</text>
            </svg>
        `;
        modal.appendChild(headerIcon);

        // Title
        const title = document.createElement('h1');
        title.textContent = NOTICE_CONTENT.title;
        title.style.cssText = `
            font-size: 28px;
            font-weight: 700;
            color: #1a3a5c;
            margin: 0 0 12px 0;
            line-height: 1.2;
            letter-spacing: -0.5px;
        `;
        modal.appendChild(title);

        // Divider
        const divider = document.createElement('div');
        divider.style.cssText = `
            width: 60px;
            height: 3px;
            background: #c9a84c;
            margin: 0 auto 18px;
            border-radius: 2px;
        `;
        modal.appendChild(divider);

        // Main Message
        const message = document.createElement('p');
        message.textContent = NOTICE_CONTENT.message;
        message.style.cssText = `
            font-size: 17px;
            line-height: 1.8;
            color: #5a6a7a;
            margin: 0 0 12px 0;
            text-align: justify;
        `;
        modal.appendChild(message);

        // Sub Message (footer text)
        const subMsg = document.createElement('p');
        subMsg.textContent = NOTICE_CONTENT.subMessage;
        subMsg.style.cssText = `
            font-size: 14px;
            color: #8a9aa8;
            margin: 8px 0 0 0;
            font-style: italic;
            letter-spacing: 0.5px;
        `;
        modal.appendChild(subMsg);

        // Small notice that site is blocked
        const blockNotice = document.createElement('p');
        blockNotice.textContent = '🚧 Site access is temporarily restricted';
        blockNotice.style.cssText = `
            font-size: 12px;
            color: #b0bcc8;
            margin: 24px 0 0 0;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            border-top: 1px solid #eaeef4;
            padding-top: 16px;
        `;
        modal.appendChild(blockNotice);

        // Add modal to overlay
        overlay.appendChild(modal);

        return overlay;
    }

    // Block the site entirely — NO WAY OUT
    function blockSite() {
        // Prevent any interaction with the page
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100%';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        document.body.style.top = '0';
        document.body.style.left = '0';

        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollBarWidth > 0) {
            document.body.style.paddingRight = scrollBarWidth + 'px';
        }

        // Prevent any click interaction
        document.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);

        // Prevent keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Block all keys except maybe basic ones
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);

        // Prevent context menu
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
    }

    // Show the notice
    function showNotice() {
        // If disabled, do nothing
        if (!NOTICE_CONFIG.ENABLED) return;

        // Block the site immediately
        blockSite();

        // Build and append overlay
        const overlay = buildOverlay();
        document.body.appendChild(overlay);

        // Trigger fade-in after a small delay
        setTimeout(function() {
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
            const modal = document.getElementById('temp-notice-modal');
            if (modal) {
                modal.style.transform = 'translateY(0) scale(1)';
            }
        }, NOTICE_CONFIG.DELAY);

        // Disable ESC key
        if (!NOTICE_CONFIG.ALLOW_ESC_TO_DISMISS) {
            document.addEventListener('keydown', function blockEsc(e) {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }, true);
        }

        console.log('🔒 Site is fully blocked — maintenance mode active.');
        console.log('ℹ️ To remove the block, set ENABLED: false in temp-notice.js');
    }

    // ============================================================
    // INITIALIZE
    // ============================================================

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showNotice);
    } else {
        showNotice();
    }

})();
