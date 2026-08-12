// ============================================================
// FIREBASE AUTHENTICATION WRAPPER
// ============================================================
// Provides login, logout, session management, and role verification.
// ============================================================

(function() {
    'use strict';

    // ---- Role definitions ----
    const ROLES = {
        DA: 'da',
        PRESIDENT: 'president',
        APPROVING: 'approving'
    };

    // ---- UID to role mapping (from the approved plan) ----
    // These UIDs correspond to the existing Firebase Authentication users.
    const UID_ROLE_MAP = {
        'ubCraWH2LiScAlCs14SvWd3piGV2': ROLES.DA,
        'DmBj882BV1cjdVv4g6yt7POAUrK2': ROLES.PRESIDENT,
        'IRfvKbCresb6lzj7uTpUGxbDCc12': ROLES.APPROVING
    };

    // ---- Current user state ----
    let currentUser = null;
    let currentUserRole = null;
    let authInitialized = false;
    let authListeners = [];

    // ---- DOM helpers ----
    function getElement(id) {
        return document.getElementById(id);
    }

    function showElement(el) {
        if (el) el.style.display = 'block';
    }

    function hideElement(el) {
        if (el) el.style.display = 'none';
    }

    // ---- Notify listeners of auth state changes ----
    function notifyAuthListeners(user, role) {
        authListeners.forEach(function(listener) {
            try {
                listener(user, role);
            } catch (e) {
                console.warn('Auth listener error:', e);
            }
        });
    }

    // ---- Load user role from database or use UID mapping ----
    function getUserRole(uid) {
        // First check the hardcoded UID mapping
        if (UID_ROLE_MAP[uid]) {
            return Promise.resolve(UID_ROLE_MAP[uid]);
        }

        // Fallback: try to fetch from the database /users node
        return db.ref('users/' + uid + '/role').once('value')
            .then(function(snapshot) {
                const role = snapshot.val();
                if (role) {
                    return role;
                }
                // If not in database, check the mapping again
                return UID_ROLE_MAP[uid] || null;
            })
            .catch(function() {
                return UID_ROLE_MAP[uid] || null;
            });
    }

    // ---- Save user role to database (for new admin users) ----
    function saveUserRole(uid, role) {
        return db.ref('users/' + uid).set({
            role: role,
            updatedAt: Date.now()
        });
    }

    // ---- Public: Login ----
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
            .then(function(userCredential) {
                const user = userCredential.user;
                // Role will be determined by the onAuthStateChanged listener
                return user;
            });
    }

    // ---- Public: Logout ----
    function logout() {
        return auth.signOut()
            .then(function() {
                // Clear local state
                currentUser = null;
                currentUserRole = null;
                notifyAuthListeners(null, null);
                // Redirect to login page if on an admin page
                if (window.location.pathname.includes('/admin/')) {
                    window.location.href = '/admin/login.html';
                }
            });
    }

    // ---- Public: Get current user ----
    function getCurrentUser() {
        return currentUser;
    }

    // ---- Public: Get current user role ----
    function getCurrentUserRole() {
        return currentUserRole;
    }

    // ---- Public: Check if user is authenticated ----
    function isAuthenticated() {
        return currentUser !== null;
    }

    // ---- Public: Check if user has a specific role ----
    function hasRole(role) {
        return currentUserRole === role;
    }

    // ---- Public: Check if user has any of the given roles ----
    function hasAnyRole(roles) {
        if (!Array.isArray(roles)) {
            roles = [roles];
        }
        return roles.indexOf(currentUserRole) !== -1;
    }

    // ---- Public: Redirect if not authenticated ----
    function requireAuth(redirectUrl) {
        redirectUrl = redirectUrl || '/admin/login.html';
        if (!isAuthenticated()) {
            window.location.href = redirectUrl;
            return false;
        }
        return true;
    }

    // ---- Public: Redirect if user doesn't have required role ----
    function requireRole(requiredRole, redirectUrl) {
        redirectUrl = redirectUrl || '/admin/login.html';
        if (!isAuthenticated() || !hasRole(requiredRole)) {
            window.location.href = redirectUrl;
            return false;
        }
        return true;
    }

    // ---- Public: Add auth state listener ----
    function onAuthStateChanged(listener) {
        if (typeof listener === 'function') {
            authListeners.push(listener);
            // If already initialized, call immediately with current state
            if (authInitialized) {
                listener(currentUser, currentUserRole);
            }
        }
    }

    // ---- Public: Get role display name ----
    function getRoleDisplayName(role) {
        const map = {
            'da': 'District Admin',
            'president': 'President',
            'approving': 'Approving Authority'
        };
        return map[role] || role || 'Unknown';
    }

    // ---- Public: Get status badge class for a status ----
    function getStatusBadgeClass(status) {
        const map = {
            'submitted': 'submitted',
            'da_review': 'da_review',
            'president_review': 'president_review',
            'approving_review': 'approving_review',
            'approved': 'approved',
            'rejected': 'rejected'
        };
        return map[status] || 'submitted';
    }

    // ---- Public: Get status display name ----
    function getStatusDisplayName(status) {
        const map = {
            'submitted': 'Submitted',
            'da_review': 'Under DA Review',
            'president_review': 'Under President Review',
            'approving_review': 'Under Final Review',
            'approved': 'Approved',
            'rejected': 'Rejected'
        };
        return map[status] || status || 'Unknown';
    }

    // ---- Initialize auth listener ----
    function initAuth() {
        auth.onAuthStateChanged(function(user) {
            if (user) {
                currentUser = user;
                getUserRole(user.uid)
                    .then(function(role) {
                        currentUserRole = role;
                        authInitialized = true;
                        notifyAuthListeners(user, role);
                    })
                    .catch(function(err) {
                        console.warn('Error fetching user role:', err);
                        currentUserRole = null;
                        authInitialized = true;
                        notifyAuthListeners(user, null);
                    });
            } else {
                currentUser = null;
                currentUserRole = null;
                authInitialized = true;
                notifyAuthListeners(null, null);
            }
        });
    }

    // ---- Auto-redirect for admin pages ----
    function setupAdminRedirect() {
        // Only run on admin pages
        if (!window.location.pathname.includes('/admin/')) {
            return;
        }

        // Don't redirect on login page
        if (window.location.pathname.includes('/admin/login.html')) {
            return;
        }

        onAuthStateChanged(function(user, role) {
            if (!user) {
                // Not logged in — redirect to login
                window.location.href = '/admin/login.html';
                return;
            }

            // Check if the current page matches the user's role
            const currentPage = window.location.pathname.split('/').pop();
            const rolePages = {
                'da': 'da.html',
                'president': 'president.html',
                'approving': 'approving.html'
            };

            // If on a role-specific page that doesn't match the user's role
            if (currentPage === 'da.html' && role !== 'da') {
                window.location.href = '/admin/dashboard.html';
            } else if (currentPage === 'president.html' && role !== 'president') {
                window.location.href = '/admin/dashboard.html';
            } else if (currentPage === 'approving.html' && role !== 'approving') {
                window.location.href = '/admin/dashboard.html';
            }
        });
    }

    // ---- Public: Login with redirect ----
    function loginAndRedirect(email, password, redirectUrl) {
        redirectUrl = redirectUrl || '/admin/dashboard.html';
        return login(email, password)
            .then(function() {
                window.location.href = redirectUrl;
            })
            .catch(function(err) {
                console.error('Login failed:', err);
                throw err;
            });
    }

    // ---- Expose public API ----
    window.Auth = {
        login: login,
        loginAndRedirect: loginAndRedirect,
        logout: logout,
        getCurrentUser: getCurrentUser,
        getCurrentUserRole: getCurrentUserRole,
        isAuthenticated: isAuthenticated,
        hasRole: hasRole,
        hasAnyRole: hasAnyRole,
        requireAuth: requireAuth,
        requireRole: requireRole,
        onAuthStateChanged: onAuthStateChanged,
        getRoleDisplayName: getRoleDisplayName,
        getStatusBadgeClass: getStatusBadgeClass,
        getStatusDisplayName: getStatusDisplayName,
        ROLES: ROLES,
        UID_ROLE_MAP: UID_ROLE_MAP,
        saveUserRole: saveUserRole
    };

    // ---- Initialize ----
    if (typeof firebase !== 'undefined' && firebase.auth) {
        initAuth();
        setupAdminRedirect();
        console.log('Firebase Auth initialized.');
    } else {
        console.warn('Firebase not loaded. Auth initialization delayed.');
        // Wait for firebase to load
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof firebase !== 'undefined' && firebase.auth) {
                initAuth();
                setupAdminRedirect();
                console.log('Firebase Auth initialized (delayed).');
            } else {
                console.error('Firebase still not available. Auth will not work.');
            }
        });
    }

})();
