/* ============================================================
   temp-notice.js — Temporary Conditionals Overlay Notice
   Displays a smooth fade-in overlay when visitors enter the site.
   Can be easily enabled/disabled via a single flag.
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
        DELAY: 800,

        // How long the notice stays visible before auto-dismiss (ms)
        // Set to 0 to disable auto-dismiss (user must click close)
        AUTO_DISMISS: 10000,

        // Fade animation duration (ms)
        FADE_DURATION: 600,

        // Dismissible by clicking the overlay background?
        CLOSE_ON_BACKGROUND_CLICK: true,

        // Show a "close" button?
        SHOW_CLOSE_BUTTON: true,

        // Optional: only show once per session (uses sessionStorage)
        SHOW_ONCE_PER_SESSION: true,

        // Session storage key
        STORAGE_KEY: 'alm_temp_notice_dismissed'
    };

    // ============================================================
    // NOTICE CONTENT — Edit this to change the message
    // ============================================================
    const NOTICE_CONTENT = {
        title: 'Notice',
        message: 'This website is currently under maintenance. Some features may be temporarily unavailable. We apologize for any inconvenience.',
        buttonText: 'Dismiss'
    };

    // ============================================================
    // MAIN LOGIC — Do not edit below unless you know what you're doing
    // ============================================================

    // Check if notice should be shown
    function shouldShowNotice() {
        // If globally disabled
        if (!NOTICE_CONFIG.ENABLED) return false;

        // Check session storage
        if (NOTICE_CONFIG.SHOW_ONCE_PER_SESSION) {
            try {
                const dismissed = sessionStorage.getItem(NOTICE_CONFIG.STORAGE_KEY);
                if (dismissed === 'true') return false;
            } catch (e) {
                // sessionStorage not available, continue
            }
        }

        return true;
    }

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
            background: rgba(0, 0, 0, 0.55);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            opacity: 0;
            transition: opacity ${NOTICE_CONFIG.FADE_DURATION}ms ease;
            pointer-events: none;
            font-family: 'Segoe UI', Roboto, system-ui, -apple-system, sans-serif;
        `;

        // Create the modal card
        const modal = document.createElement('div');
        modal.id = 'temp-notice-modal';
        modal.style.cssText = `
            max-width: 560px;
            width: 90%;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.30);
            padding: 40px 36px 32px;
            position: relative;
            transform: translateY(20px);
            transition: transform ${NOTICE_CONFIG.FADE_DURATION}ms ease;
            border: 1px solid rgba(255, 255, 255, 0.15);
            text-align: center;
        `;

        // Header / Icon (SVG)
        const headerIcon = document.createElement('div');
        headerIcon.style.cssText = `
            margin-bottom: 16px;
            display: flex;
            justify-content: center;
        `;
        headerIcon.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
                <circle cx="24" cy="24" r="22" stroke="#c9a84c" stroke-width="2" />
                <path d="M24 14V26" stroke="#c9a84c" stroke-width="2" stroke-linecap="round" />
                <circle cx="24" cy="32" r="2" fill="#c9a84c" />
                <circle cx="24" cy="24" r="20" stroke="#c9a84c" stroke-width="1.5" stroke-dasharray="4 4" />
            </svg>
        `;
        modal.appendChild(headerIcon);

        // Title
        const title = document.createElement('h2');
        title.textContent = NOTICE_CONTENT.title;
        title.style.cssText = `
            font-size: 24px;
            font-weight: 700;
            color: #1a3a5c;
            margin: 0 0 12px 0;
            line-height: 1.2;
        `;
        modal.appendChild(title);

        // Message
        const message = document.createElement('p');
        message.textContent = NOTICE_CONTENT.message;
        message.style.cssText = `
            font-size: 16px;
            line-height: 1.7;
            color: #5a6a7a;
            margin: 0 0 28px 0;
            text-align: justify;
        `;
        modal.appendChild(message);

        // Buttons container
        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: center;
        `;

        // Close button
        if (NOTICE_CONFIG.SHOW_CLOSE_BUTTON) {
            const closeBtn = document.createElement('button');
            closeBtn.textContent = NOTICE_CONTENT.buttonText;
            closeBtn.style.cssText = `
                background: #1a3a5c;
                color: #ffffff;
                border: none;
                padding: 12px 36px;
                border-radius: 5px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                font-family: inherit;
                min-width: 120px;
            `;
            closeBtn.addEventListener('mouseenter', function() {
                this.style.background = '#2a5a7c';
                this.style.transform = 'scale(1.02)';
            });
            closeBtn.addEventListener('mouseleave', function() {
                this.style.background = '#1a3a5c';
                this.style.transform = 'scale(1)';
            });
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                dismissNotice();
            });
            btnContainer.appendChild(closeBtn);
        }

        // Optional secondary button (always show "Continue" if auto-dismiss is on)
        if (NOTICE_CONFIG.AUTO_DISMISS > 0) {
            const continueBtn = document.createElement('button');
            continueBtn.textContent = 'Continue to Site';
            continueBtn.style.cssText = `
                background: transparent;
                color: #1a3a5c;
                border: 1px solid #dce3ec;
                padding: 12px 36px;
                border-radius: 5px;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                font-family: inherit;
                min-width: 120px;
            `;
            continueBtn.addEventListener('mouseenter', function() {
                this.style.borderColor = '#1a3a5c';
                this.style.background = 'rgba(26, 58, 92, 0.05)';
            });
            continueBtn.addEventListener('mouseleave', function() {
                this.style.borderColor = '#dce3ec';
                this.style.background = 'transparent';
            });
            continueBtn.addEventListener('click', function(e) {
                e.preventDefault();
                dismissNotice();
            });
            btnContainer.appendChild(continueBtn);
        }

        modal.appendChild(btnContainer);

        // Add modal to overlay
        overlay.appendChild(modal);

        return overlay;
    }

    // Dismiss the notice
    function dismissNotice() {
        const overlay = document.getElementById('temp-notice-overlay');
        if (!overlay) return;

        // Store in session storage if configured
        if (NOTICE_CONFIG.SHOW_ONCE_PER_SESSION) {
            try {
                sessionStorage.setItem(NOTICE_CONFIG.STORAGE_KEY, 'true');
            } catch (e) {
                // sessionStorage not available, ignore
            }
        }

        // Fade out
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';

        // Remove from DOM after fade
        setTimeout(function() {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, NOTICE_CONFIG.FADE_DURATION + 100);

        // Resume body scroll
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    // Show the notice
    function showNotice() {
        // Check if we should show it
        if (!shouldShowNotice()) return;

        // Prevent body scroll
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        if (scrollBarWidth > 0) {
            document.body.style.paddingRight = scrollBarWidth + 'px';
        }

        // Build and append overlay
        const overlay = buildOverlay();
        document.body.appendChild(overlay);

        // Trigger fade-in after a small delay
        setTimeout(function() {
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
            const modal = document.getElementById('temp-notice-modal');
            if (modal) {
                modal.style.transform = 'translateY(0)';
            }
        }, NOTICE_CONFIG.DELAY);

        // Auto-dismiss if configured
        if (NOTICE_CONFIG.AUTO_DISMISS > 0) {
            setTimeout(function() {
                // Only auto-dismiss if still visible
                const overlayCheck = document.getElementById('temp-notice-overlay');
                if (overlayCheck && overlayCheck.style.opacity === '1') {
                    dismissNotice();
                }
            }, NOTICE_CONFIG.AUTO_DISMISS + NOTICE_CONFIG.DELAY);
        }

        // Close on background click
        if (NOTICE_CONFIG.CLOSE_ON_BACKGROUND_CLICK) {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    dismissNotice();
                }
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', function onEsc(e) {
            if (e.key === 'Escape') {
                const overlayCheck = document.getElementById('temp-notice-overlay');
                if (overlayCheck) {
                    dismissNotice();
                    document.removeEventListener('keydown', onEsc);
                }
            }
        });
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

    console.log('Temporary notice system initialized.');

})();
