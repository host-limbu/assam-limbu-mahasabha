/* ============================================================
   temp-notice.js — Website Under Maintenance Notice
   Simple, persistent, and cannot be bypassed
   ============================================================ */

(function() {
    'use strict';

    // Check if notice already exists to prevent duplicates
    if (document.getElementById('maintenance-notice')) return;

    // Create the notice container
    var notice = document.createElement('div');
    notice.id = 'maintenance-notice';
    notice.setAttribute('role', 'alert');
    notice.setAttribute('aria-live', 'polite');

    // Style the notice - fixed position, always on top
    notice.style.cssText = [
        'position: fixed',
        'top: 0',
        'left: 0',
        'right: 0',
        'z-index: 999999',
        'background: #c9a84c',
        'color: #1a3a5c',
        'padding: 12px 20px',
        'text-align: center',
        'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        'font-size: 15px',
        'font-weight: 600',
        'border-bottom: 3px solid #1a3a5c',
        'box-shadow: 0 2px 10px rgba(0,0,0,0.15)',
        'letter-spacing: 0.3px',
        'display: flex',
        'align-items: center',
        'justify-content: center',
        'gap: 12px',
        'flex-wrap: wrap'
    ].join(';');

    // Icon SVG (small warning/notice icon)
    var iconSVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3a5c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';

    // Notice message
    var message = document.createElement('span');
    message.innerHTML = iconSVG + ' <strong>Website Under Maintenance</strong> — We are currently updating the website. Some features may be temporarily unavailable. Thank you for your patience.';

    notice.appendChild(message);

    // Add close button (optional but user-friendly)
    var closeBtn = document.createElement('button');
    closeBtn.setAttribute('aria-label', 'Close maintenance notice');
    closeBtn.style.cssText = [
        'background: rgba(26,58,92,0.15)',
        'border: none',
        'border-radius: 50%',
        'width: 30px',
        'height: 30px',
        'cursor: pointer',
        'font-size: 18px',
        'font-weight: 700',
        'color: #1a3a5c',
        'display: inline-flex',
        'align-items: center',
        'justify-content: center',
        'transition: background 0.2s',
        'flex-shrink: 0'
    ].join(';');
    closeBtn.textContent = '×';
    closeBtn.onmouseover = function() {
        this.style.background = 'rgba(26,58,92,0.30)';
    };
    closeBtn.onmouseout = function() {
        this.style.background = 'rgba(26,58,92,0.15)';
    };
    closeBtn.onclick = function() {
        notice.style.display = 'none';
        // Push the body content back up
        document.body.style.marginTop = '0';
    };

    notice.appendChild(closeBtn);

    // Insert at the very beginning of body
    document.body.insertBefore(notice, document.body.firstChild);

    // Push the body content down to accommodate the notice
    document.body.style.marginTop = '60px';

    // Adjust on smaller screens
    function adjustNotice() {
        var height = notice.offsetHeight;
        document.body.style.marginTop = height + 'px';
    }

    // Adjust after fonts load or resize
    window.addEventListener('load', adjustNotice);
    window.addEventListener('resize', adjustNotice);

    // Also adjust if the notice height changes (e.g., on mobile)
    if (window.ResizeObserver) {
        var resizeObserver = new ResizeObserver(function() {
            adjustNotice();
        });
        resizeObserver.observe(notice);
    }

})();
