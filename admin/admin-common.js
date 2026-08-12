/* ============================================================
   ADMIN COMMON — Assam Limbu Mahasabha
   Shared functions for all admin dashboards
   ============================================================ */

(function() {
    'use strict';

    // ============================================================
    // ROLE UIDS (locked)
    // ============================================================
    const ROLE_UIDS = {
        DA: 'ubCraWH2LiScAlCs14SvWd3piGV2',
        PRESIDENT: 'DmBj882BV1cjdVv4g6yt7POAUrK2',
        APPROVING_AUTHORITY: 'IRfvKbCresb6lzj7uTpUGxbDCc12'
    };

    // ============================================================
    // AUTH STATE MANAGEMENT
    // ============================================================
    let currentUser = null;
    let currentRole = null;

    /**
     * Get user role based on UID
     */
    function getUserRole(uid) {
        if (uid === ROLE_UIDS.DA) return 'DA';
        if (uid === ROLE_UIDS.PRESIDENT) return 'President';
        if (uid === ROLE_UIDS.APPROVING_AUTHORITY) return 'AA';
        return null;
    }

    /**
     * Check if user is authenticated and authorized
     */
    function isAuthenticated() {
        return !!currentUser;
    }

    /**
     * Check if user has a valid role
     */
    function isAuthorized() {
        return !!currentRole;
    }

    /**
     * Redirect to login if not authenticated
     */
    function requireAuth() {
        if (!isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    /**
     * Redirect to login if not authorized (no valid role)
     */
    function requireRole() {
        if (!isAuthorized()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    /**
     * Get the current user's role
     */
    function getCurrentRole() {
        return currentRole;
    }

    /**
     * Get the current user's UID
     */
    function getCurrentUID() {
        return currentUser ? currentUser.uid : null;
    }

    /**
     * Get the current user's display name
     */
    function getCurrentDisplayName() {
        return currentUser ? currentUser.displayName || 'Admin User' : null;
    }

    /**
     * Get role display name
     */
    function getRoleDisplayName(role) {
        var map = {
            'DA': 'District Administrator',
            'President': 'President / Assistant President',
            'AA': 'Approving Authority'
        };
        return map[role] || role;
    }

    /**
     * Get role color
     */
    function getRoleColor(role) {
        var map = {
            'DA': '#f59e0b',
            'President': '#3b82f6',
            'AA': '#8b5cf6'
        };
        return map[role] || '#64748b';
    }

    /**
     * Format timestamp to readable date
     */
    function formatTimestamp(timestamp) {
        if (!timestamp) return 'N/A';
        var date = new Date(timestamp);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    /**
     * Format date only
     */
    function formatDate(timestamp) {
        if (!timestamp) return 'N/A';
        var date = new Date(timestamp);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

    /**
     * Get status badge class
     */
    function getStatusBadgeClass(status) {
        var map = {
            'DA': 'da',
            'President': 'president',
            'AA': 'aa',
            'Approved': 'approved',
            'Rejected': 'rejected'
        };
        return map[status] || '';
    }

    /**
     * Get status display name
     */
    function getStatusDisplayName(status) {
        var map = {
            'DA': 'With DA',
            'President': 'With President',
            'AA': 'With Approving Authority',
            'Approved': 'Approved',
            'Rejected': 'Rejected'
        };
        return map[status] || status;
    }

    /**
     * Logout function
     */
    function logout() {
        firebase.auth().signOut().then(function() {
            window.location.href = 'login.html';
        }).catch(function(error) {
            console.error('Logout error:', error);
        });
    }

    // ============================================================
    // INIT AUTH LISTENER
    // ============================================================
    function initAuth(callback) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                currentUser = user;
                currentRole = getUserRole(user.uid);

                // Check if user has a valid role
                if (!currentRole) {
                    // User is authenticated but not authorized
                    console.warn('User has no valid role:', user.uid);
                }

                if (callback) callback(user, currentRole);
            } else {
                currentUser = null;
                currentRole = null;
                if (callback) callback(null, null);
            }
        });
    }

    // ============================================================
    // EXPOSE PUBLIC FUNCTIONS
    // ============================================================
    window.AdminCommon = {
        ROLE_UIDS: ROLE_UIDS,
        getUserRole: getUserRole,
        isAuthenticated: isAuthenticated,
        isAuthorized: isAuthorized,
        requireAuth: requireAuth,
        requireRole: requireRole,
        getCurrentRole: getCurrentRole,
        getCurrentUID: getCurrentUID,
        getCurrentDisplayName: getCurrentDisplayName,
        getRoleDisplayName: getRoleDisplayName,
        getRoleColor: getRoleColor,
        formatTimestamp: formatTimestamp,
        formatDate: formatDate,
        getStatusBadgeClass: getStatusBadgeClass,
        getStatusDisplayName: getStatusDisplayName,
        logout: logout,
        initAuth: initAuth
    };

    console.log('admin-common.js loaded successfully.');
})();
