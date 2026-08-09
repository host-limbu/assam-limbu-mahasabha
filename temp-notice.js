/* ============================================================
   maintenance.js — Temporary Maintenance Overlay
   Prevents access to the website during maintenance.
   No bypass via refresh, back button, or any other method.
   ============================================================ */

(function() {
    'use strict';

    // ---------- CONFIGURATION ----------
    // Set this to false when maintenance is over
    const MAINTENANCE_MODE = true; // <-- CHANGE TO false TO REMOVE OVERLAY

    // Expected maintenance end time (for display)
    const MAINTENANCE_END_TIME = '15 August 2026 18:00:00 GMT+0530';

    // ---------- MAINTENANCE OVERLAY HTML ----------
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'maintenance-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-labelledby', 'maintenance-title');

        overlay.innerHTML = `
            <div class="maintenance-container">
                <div class="maintenance-content">
                    <div class="maintenance-icon">
                        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="40" cy="40" r="38" fill="#1a3a5c" stroke="#c9a84c" stroke-width="2.5" />
                            <path d="M40 14 L44 28 L58 28 L48 36 L52 50 L40 42 L28 50 L32 36 L22 28 L36 28 L40 14Z" fill="#c9a84c" opacity="0.9" />
                            <text x="40" y="70" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="#c9a84c" text-anchor="middle" letter-spacing="1">ALM</text>
                            <circle cx="40" cy="40" r="32" fill="none" stroke="#c9a84c" stroke-width="1.5" stroke-dasharray="3 3" />
                        </svg>
                    </div>
                    <h1 id="maintenance-title" class="maintenance-title">Website Under Maintenance</h1>
                    <div class="maintenance-divider"></div>
                    <p class="maintenance-description">
                        The Assam Limbu Mahasabha website is currently undergoing scheduled maintenance to improve your experience.
                    </p>
                    <p class="maintenance-description">
                        We apologize for the inconvenience and appreciate your patience. Please check back later.
                    </p>
                    <div class="maintenance-status">
                        <div class="maintenance-status-item">
                            <span class="status-label">Status:</span>
                            <span class="status-value">In Progress</span>
                        </div>
                        <div class="maintenance-status-item">
                            <span class="status-label">Expected Completion:</span>
                            <span class="status-value" id="maintenance-end-time">${MAINTENANCE_END_TIME}</span>
                        </div>
                    </div>
                    <div class="maintenance-progress">
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                        <span class="progress-text">Maintenance in progress...</span>
                    </div>
                    <div class="maintenance-contact">
                        <p>For urgent inquiries, please contact us at:</p>
                        <a href="mailto:info@assamlimbumahasabha.org" class="maintenance-email">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            info@assamlimbumahasabha.org
                        </a>
                    </div>
                    <div class="maintenance-refresh-note">
                        <span>This page will automatically refresh when maintenance is complete.</span>
                    </div>
                </div>
            </div>
        `;

        // Prevent any interaction with the page behind
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99999;
            background: rgba(26, 58, 92, 0.92);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.8s ease;
            padding: 20px;
            box-sizing: border-box;
        `;

        document.body.appendChild(overlay);

        // Trigger fade-in after a small delay
        requestAnimationFrame(function() {
            overlay.style.opacity = '1';
        });

        // Add styles for the overlay content
        const style = document.createElement('style');
        style.textContent = `
            #maintenance-overlay * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            .maintenance-container {
                max-width: 560px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                padding: 10px;
            }

            .maintenance-content {
                background: #ffffff;
                border-radius: 8px;
                padding: 48px 40px 40px;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.30);
                border: 1px solid rgba(201, 168, 76, 0.20);
            }

            .maintenance-icon {
                width: 80px;
                height: 80px;
                margin: 0 auto 20px;
            }

            .maintenance-icon svg {
                width: 100%;
                height: 100%;
                display: block;
            }

            .maintenance-title {
                font-family: 'Segoe UI', Roboto, system-ui, -apple-system, sans-serif;
                font-size: 28px;
                font-weight: 700;
                color: #1a3a5c;
                margin-bottom: 12px;
                line-height: 1.2;
            }

            .maintenance-divider {
                width: 60px;
                height: 3px;
                background: #c9a84c;
                margin: 0 auto 20px;
                border-radius: 2px;
            }

            .maintenance-description {
                font-family: 'Segoe UI', Roboto, system-ui, -apple-system, sans-serif;
                font-size: 16px;
                line-height: 1.7;
                color: #5a6a7a;
                text-align: justify;
                margin-bottom: 12px;
            }

            .maintenance-description:last-of-type {
                margin-bottom: 24px;
            }

            .maintenance-status {
                background: #f5f8fa;
                border-radius: 6px;
                padding: 16px 20px;
                margin-bottom: 24px;
                text-align: left;
                border: 1px solid #dce3ec;
            }

            .maintenance-status-item {
                display: flex;
                justify-content: space-between;
                padding: 4px 0;
                font-family: 'Segoe UI', Roboto, system-ui, -apple-system, sans-serif;
                font-size: 14px;
            }

            .status-label {
                color: #8a9aa8;
                font-weight: 500;
            }

            .status-value {
                color: #1a3a5c;
                font-weight: 600;
            }

            .maintenance-progress {
                margin-bottom: 24px;
            }

            .progress-bar {
                width: 100%;
                height: 6px;
                background: #dce3ec;
                border-radius: 3px;
                overflow: hidden;
                margin-bottom: 8px;
            }

            .progress-fill {
                height: 100%;
                width: 0%;
                background: linear-gradient(90deg, #c9a84c, #1a3a5c);
                border-radius: 3px;
                animation: progressPulse 2s ease-in-out infinite;
            }

            @keyframes progressPulse {
                0% { width: 10%; }
                50% { width: 70%; }
                100% { width: 10%; }
            }

            .progress-text {
                font-family: 'Segoe UI', Roboto, system-ui, -apple-system, sans-serif;
                font-size: 13px;
                color: #8a9aa8;
                letter-spacing: 0.5px;
            }

            .maintenance-contact {
                border-top: 1px solid #dce3ec;
                padding-top: 20px;
                margin-top: 4px;
            }

            .maintenance-contact p {
                font-family: 'Segoe UI', Roboto, system-ui, -apple-system, sans-serif;
                font-size: 14px;
                color: #5a6a7a;
                margin-bottom: 8px;
            }

            .maintenance-email {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                font-family: 'Segoe UI', Roboto, system-ui, -apple-system, sans-serif;
                font-size: 15px;
                font-weight: 600;
                color: #1a3a5c;
                text-decoration: none;
                padding: 8px 16px;
                border: 1px solid #c9a84c;
                border-radius: 5px;
                transition: all 0.2s ease;
            }

            .maintenance-email:hover {
                background: #c9a84c;
                color: #ffffff;
            }

            .maintenance-email svg {
                width: 18px;
                height: 18px;
                flex-shrink: 0;
            }

            .maintenance-refresh-note {
                margin-top: 16px;
                font-family: 'Segoe UI', Roboto, system-ui, -apple-system, sans-serif;
                font-size: 12px;
                color: #8a9aa8;
                opacity: 0.7;
            }

            /* Responsive */
            @media (max-width: 480px) {
                .maintenance-content {
                    padding: 32px 20px 28px;
                }

                .maintenance-title {
                    font-size: 22px;
                }

                .maintenance-description {
                    font-size: 14px;
                }

                .maintenance-status-item {
                    font-size: 13px;
                    flex-direction: column;
                    gap: 2px;
                }

                .maintenance-email {
                    font-size: 13px;
                    padding: 6px 12px;
                }
            }

            @media (max-width: 360px) {
                .maintenance-content {
                    padding: 24px 16px 20px;
                }

                .maintenance-title {
                    font-size: 19px;
                }

                .maintenance-icon {
                    width: 60px;
                    height: 60px;
                }
            }
        `;

        document.head.appendChild(style);

        return overlay;
    }

    // ---------- PREVENT ALL ACCESS ----------
    function blockAllAccess() {
        // Block back button
        history.pushState(null, null, location.href);
        window.addEventListener('popstate', function() {
            history.pushState(null, null, location.href);
        });

        // Block keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Block F5, Ctrl+R, Ctrl+Shift+R, Cmd+R, Alt+Left, Alt+Right, etc.
            const isRefresh = e.key === 'F5' ||
                (e.ctrlKey && e.key === 'r') ||
                (e.ctrlKey && e.shiftKey && e.key === 'r') ||
                (e.metaKey && e.key === 'r');
            const isBack = e.altKey && e.key === 'ArrowLeft';
            const isForward = e.altKey && e.key === 'ArrowRight';
            const isEscape = e.key === 'Escape';

            if (isRefresh || isBack || isForward) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            // Allow accessibility shortcuts (like Tab) but block others
            if (isEscape) {
                e.preventDefault();
                return false;
            }
        }, true);

        // Block context menu (right-click)
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });

        // Block drag-drop
        document.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });

        // Block select/copy
        document.addEventListener('selectstart', function(e) {
            e.preventDefault();
            return false;
        });

        // Block DevTools shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Cmd+Option+I, Cmd+Option+J)
        document.addEventListener('keydown', function(e) {
            const isDevTools = e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I' || e.key === 'j' || e.key === 'J')) ||
                (e.metaKey && e.altKey && (e.key === 'i' || e.key === 'I' || e.key === 'j' || e.key === 'J'));
            if (isDevTools) {
                e.preventDefault();
                return false;
            }
        }, true);

        // Block touch gestures that might navigate back
        let touchStartX = 0;
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        document.addEventListener('touchmove', function(e) {
            const touchEndX = e.touches[0].clientX;
            const diff = touchStartX - touchEndX;
            // If swipe is more than 100px, it might be a back/forward gesture
            if (Math.abs(diff) > 100) {
                e.preventDefault();
                return false;
            }
        }, { passive: false });

        // Block link clicks on the overlay itself (prevent any navigation)
        document.addEventListener('click', function(e) {
            const overlay = document.getElementById('maintenance-overlay');
            if (overlay && overlay.contains(e.target)) {
                const target = e.target.closest('a');
                if (target) {
                    // Allow only the email link
                    if (target.classList.contains('maintenance-email')) {
                        return true;
                    }
                    e.preventDefault();
                    return false;
                }
            }
        }, true);

        // Block any navigation via window.location
        const originalLocation = window.location;
        Object.defineProperty(window, 'location', {
            get: function() {
                return originalLocation;
            },
            set: function(value) {
                // Block location changes
                console.warn('Location change blocked during maintenance.');
                return originalLocation;
            }
        });

        // Override history methods to block navigation
        const originalPushState = history.pushState;
        history.pushState = function() {
            // Allow only if it's to maintain the current state
            if (arguments[2] === window.location.href || !arguments[2]) {
                return originalPushState.apply(history, arguments);
            }
            console.warn('PushState blocked during maintenance.');
            return;
        };

        const originalReplaceState = history.replaceState;
        history.replaceState = function() {
            if (arguments[2] === window.location.href || !arguments[2]) {
                return originalReplaceState.apply(history, arguments);
            }
            console.warn('ReplaceState blocked during maintenance.');
            return;
        };
    }

    // ---------- INITIALIZE ----------
    if (MAINTENANCE_MODE) {
        // Create the overlay
        const overlay = createOverlay();

        // Block all access
        blockAllAccess();

        // Prevent scrolling
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // Periodically check if the overlay is still there (prevent removal)
        setInterval(function() {
            const overlayExists = document.getElementById('maintenance-overlay');
            if (!overlayExists) {
                // Recreate the overlay if it was removed
                createOverlay();
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            }
        }, 500);

        console.log('Maintenance mode active. Website is temporarily unavailable.');
    } else {
        console.log('Maintenance mode is disabled. Website is accessible.');
    }

})();
