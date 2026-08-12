/* ============================================================
   ADMIN SHARED JAVASCRIPT
   Private admin panel utilities, session management, logout
   ============================================================ */

(function() {
    'use strict';

    // ============================================================
    // 1. CONFIGURATION
    // ============================================================
    const INACTIVITY_TIMEOUT = 2 * 60 * 1000; // 2 minutes
    const CHECK_INTERVAL = 10 * 1000; // Check every 10 seconds

    // ============================================================
    // 2. STATE
    // ============================================================
    let lastActivity = Date.now();
    let inactivityTimer = null;
    let logoutConfirmCallback = null;
    let sessionExpiredCallback = null;

    // ============================================================
    // 3. INACTIVITY DETECTION
    // ============================================================
    function resetActivityTimer() {
        lastActivity = Date.now();
    }

    function checkInactivity() {
        if (!window.Auth || !window.Auth.isAuthenticated()) {
            return;
        }
        const now = Date.now();
        if (now - lastActivity > INACTIVITY_TIMEOUT) {
            // Session expired due to inactivity
            handleSessionExpired();
        }
    }

    function startInactivityMonitoring() {
        // Reset timer on user activity
        const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click', 'wheel', 'touchmove'];
        activityEvents.forEach(function(event) {
            document.addEventListener(event, resetActivityTimer, { passive: true });
        });

        // Periodic check
        inactivityTimer = setInterval(checkInactivity, CHECK_INTERVAL);

        // Initial reset
        resetActivityTimer();
    }

    function stopInactivityMonitoring() {
        if (inactivityTimer) {
            clearInterval(inactivityTimer);
            inactivityTimer = null;
        }
        const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click', 'wheel', 'touchmove'];
        activityEvents.forEach(function(event) {
            document.removeEventListener(event, resetActivityTimer);
        });
    }

    // ============================================================
    // 4. SESSION EXPIRY HANDLER
    // ============================================================
    function handleSessionExpired() {
        // Only handle if still authenticated
        if (!window.Auth || !window.Auth.isAuthenticated()) {
            return;
        }

        // Clear session
        if (window.Auth && typeof window.Auth.logout === 'function') {
            window.Auth.logout()
                .then(function() {
                    // Clear any sensitive state
                    sessionStorage.clear();
                    // Redirect to login with expired message
                    var currentPath = window.location.pathname;
                    if (!currentPath.includes('/admin/login.html')) {
                        window.location.href = 'login.html?expired=1';
                    }
                })
                .catch(function() {
                    // Force redirect anyway
                    sessionStorage.clear();
                    window.location.href = 'login.html?expired=1';
                });
        } else {
            sessionStorage.clear();
            window.location.href = 'login.html?expired=1';
        }
    }

    // ============================================================
    // 5. LOGOUT CONFIRMATION DIALOG
    // ============================================================
    function showLogoutConfirmation() {
        return new Promise(function(resolve, reject) {
            // Check if modal already exists
            let existingModal = document.getElementById('adminLogoutModal');
            if (existingModal) {
                existingModal.remove();
            }

            // Create modal overlay
            var overlay = document.createElement('div');
            overlay.id = 'adminLogoutModal';
            overlay.className = 'modal-overlay active';
            overlay.style.display = 'flex';

            // Modal content
            var content = document.createElement('div');
            content.className = 'modal-content confirm-dialog';
            content.style.maxWidth = '440px';

            content.innerHTML = `
                <div style="display:flex;align-items:center;gap:var(--admin-spacing-md);margin-bottom:var(--admin-spacing-md);">
                    <span style="font-size:2rem;color:var(--admin-warning);">&#9670;</span>
                    <div>
                        <h3 style="font-size:1.1rem;font-weight:600;color:var(--admin-text);margin:0;">Confirm Logout</h3>
                        <p style="color:var(--admin-text-muted);font-size:0.95rem;margin:0.2rem 0 0 0;">Are you sure you want to logout?</p>
                    </div>
                </div>
                <div class="dialog-actions">
                    <button class="btn btn-secondary" id="logoutCancelBtn">Cancel</button>
                    <button class="btn btn-danger" id="logoutConfirmBtn">Logout</button>
                </div>
            `;

            overlay.appendChild(content);
            document.body.appendChild(overlay);

            // Focus management
            var confirmBtn = content.querySelector('#logoutConfirmBtn');
            var cancelBtn = content.querySelector('#logoutCancelBtn');

            // Handle confirm
            confirmBtn.addEventListener('click', function() {
                overlay.remove();
                resolve(true);
            });

            // Handle cancel
            cancelBtn.addEventListener('click', function() {
                overlay.remove();
                resolve(false);
            });

            // Close on overlay click (click outside)
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    overlay.remove();
                    resolve(false);
                }
            });

            // Close on Escape key
            function handleEscape(e) {
                if (e.key === 'Escape') {
                    overlay.remove();
                    resolve(false);
                    document.removeEventListener('keydown', handleEscape);
                }
            }
            document.addEventListener('keydown', handleEscape);

            // Focus the cancel button by default
            cancelBtn.focus();
        });
    }

    // ============================================================
    // 6. EXECUTE LOGOUT
    // ============================================================
    function performLogout() {
        // Show loading state if needed
        if (window.Auth && typeof window.Auth.logout === 'function') {
            return window.Auth.logout()
                .then(function() {
                    sessionStorage.clear();
                    // Show success message on login page via URL param
                    window.location.href = 'login.html?logout=1';
                })
                .catch(function(err) {
                    console.warn('Logout error:', err);
                    sessionStorage.clear();
                    window.location.href = 'login.html?logout=1';
                });
        } else {
            sessionStorage.clear();
            window.location.href = 'login.html?logout=1';
            return Promise.resolve();
        }
    }

    // ============================================================
    // 7. HANDLE LOGOUT CLICK (to be used by admin pages)
    // ============================================================
    function handleLogoutClick(e) {
        e.preventDefault();
        showLogoutConfirmation()
            .then(function(confirmed) {
                if (confirmed) {
                    return performLogout();
                }
            })
            .catch(function(err) {
                console.warn('Logout dialog error:', err);
            });
    }

    // ============================================================
    // 8. ADMIN PAGE INITIALIZATION
    // ============================================================
    function initAdminPage() {
        // Only run on admin pages
        if (!window.location.pathname.includes('/admin/')) {
            return;
        }

        // Skip on login page
        if (window.location.pathname.includes('/admin/login.html')) {
            return;
        }

        // Check authentication
        if (window.Auth) {
            if (!window.Auth.isAuthenticated()) {
                // Redirect to login
                window.location.href = 'login.html';
                return;
            }

            // Start inactivity monitoring
            startInactivityMonitoring();

            // Setup logout button
            var logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                // Remove any existing listeners by cloning
                var newBtn = logoutBtn.cloneNode(true);
                logoutBtn.parentNode.replaceChild(newBtn, logoutBtn);
                newBtn.addEventListener('click', handleLogoutClick);
            }

            // Also handle logout buttons with class .logout-btn
            document.querySelectorAll('.logout-btn').forEach(function(btn) {
                if (btn.id === 'logoutBtn') return; // already handled
                btn.addEventListener('click', handleLogoutClick);
            });
        }

        // Handle session expired message from URL
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('expired') === '1') {
            // Show a subtle notification (not a full modal, just a toast-like message)
            showToast('Your session has expired due to inactivity.', 'warning');
            // Remove param from URL without reload
            if (window.history && window.history.replaceState) {
                var newUrl = window.location.pathname + window.location.search.replace(/[?&]expired=1/, '');
                window.history.replaceState({}, document.title, newUrl);
            }
        }
    }

    // ============================================================
    // 9. TOAST NOTIFICATION
    // ============================================================
    function showToast(message, type) {
        type = type || 'info';
        var existing = document.getElementById('adminToast');
        if (existing) {
            existing.remove();
        }

        var toast = document.createElement('div');
        toast.id = 'adminToast';
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'warning' ? '#f39c12' : '#1a3a5c'};
            color: #fff;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 0.95rem;
            font-family: 'Inter', sans-serif;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 99999;
            max-width: 90%;
            text-align: center;
            animation: slideUp 0.3s ease;
        `;
        toast.textContent = message;

        // Animation keyframes
        if (!document.getElementById('adminToastStyles')) {
            var style = document.createElement('style');
            style.id = 'adminToastStyles';
            style.textContent = `
                @keyframes slideUp {
                    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);

        // Auto dismiss after 4 seconds
        setTimeout(function() {
            if (toast.parentNode) {
                toast.style.opacity = '0';
                toast.style.transition = 'opacity 0.3s ease';
                setTimeout(function() {
                    if (toast.parentNode) {
                        toast.remove();
                    }
                }, 300);
            }
        }, 4000);
    }

    // ============================================================
    // 10. CLEANUP ON PAGE UNLOAD
    // ============================================================
    window.addEventListener('beforeunload', function() {
        stopInactivityMonitoring();
    });

    // ============================================================
    // 11. EXPOSE PUBLIC API
    // ============================================================
    window.Admin = {
        showLogoutConfirmation: showLogoutConfirmation,
        performLogout: performLogout,
        handleLogoutClick: handleLogoutClick,
        showToast: showToast,
        initAdminPage: initAdminPage,
        startInactivityMonitoring: startInactivityMonitoring,
        stopInactivityMonitoring: stopInactivityMonitoring
    };

    // ============================================================
    // 12. AUTO-INIT
    // ============================================================
    // Initialize after DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAdminPage);
    } else {
        initAdminPage();
    }

    // Also init when Auth is ready (in case Auth loads after DOM)
    if (window.Auth) {
        window.Auth.onAuthStateChanged(function(user, role) {
            // If user becomes authenticated, ensure monitoring is running
            if (user && window.location.pathname.includes('/admin/') && !window.location.pathname.includes('/admin/login.html')) {
                startInactivityMonitoring();
            }
        });
    }

    console.log('Admin JS initialized.');

})();
