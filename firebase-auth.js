// ============================================================
// FIREBASE AUTHENTICATION WRAPPER
// ============================================================

(function() {
    'use strict';

    // ---- Role definitions ----
    var ROLES = {
        DA: 'da',
        PRESIDENT: 'president',
        APPROVING: 'approving'
    };

    // ---- UID to role mapping (from the approved plan) ----
    var UID_ROLE_MAP = {
        'ubCraWH2LiScAlCs14SvWd3piGV2': ROLES.DA,
        'DmBj882BV1cjdVv4g6yt7POAUrK2': ROLES.PRESIDENT,
        'IRfvKbCresb6lzj7uTpUGxbDCc12': ROLES.APPROVING
    };

    // ---- Current user state ----
    var currentUser = null;
    var currentUserRole = null;
    var authInitialized = false;
    var authListeners = [];

    // ---- Notify listeners ----
    function notifyAuthListeners(user, role) {
        authListeners.forEach(function(listener) {
            try {
                listener(user, role);
            } catch (e) {
                console.warn('Auth listener error:', e);
            }
        });
    }

    // ---- Get user role ----
    function getUserRole(uid) {
        if (UID_ROLE_MAP[uid]) {
            return Promise.resolve(UID_ROLE_MAP[uid]);
        }
        return window.db.ref('users/' + uid + '/role').once('value')
            .then(function(snapshot) {
                var role = snapshot.val();
                if (role) {
                    return role;
                }
                return UID_ROLE_MAP[uid] || null;
            })
            .catch(function() {
                return UID_ROLE_MAP[uid] || null;
            });
    }

    // ---- Save user role ----
    function saveUserRole(uid, role) {
        return window.db.ref('users/' + uid).set({
            role: role,
            updatedAt: Date.now()
        });
    }

    // ---- Login ----
    function login(email, password) {
        return window.auth.signInWithEmailAndPassword(email, password)
            .then(function(userCredential) {
                return userCredential.user;
            });
    }

    // ---- Logout ----
    function logout() {
        return window.auth.signOut()
            .then(function() {
                currentUser = null;
                currentUserRole = null;
                notifyAuthListeners(null, null);
                if (window.location.pathname.includes('/admin/')) {
                    window.location.href = '/admin/login.html';
                }
            });
    }

    // ---- Public API ----
    function getCurrentUser() {
        return currentUser;
    }

    function getCurrentUserRole() {
        return currentUserRole;
    }

    function isAuthenticated() {
        return currentUser !== null;
    }

    function hasRole(role) {
        return currentUserRole === role;
    }

    function hasAnyRole(roles) {
        if (!Array.isArray(roles)) {
            roles = [roles];
        }
        return roles.indexOf(currentUserRole) !== -1;
    }

    function requireAuth(redirectUrl) {
        redirectUrl = redirectUrl || '/admin/login.html';
        if (!isAuthenticated()) {
            window.location.href = redirectUrl;
            return false;
        }
        return true;
    }

    function requireRole(requiredRole, redirectUrl) {
        redirectUrl = redirectUrl || '/admin/login.html';
        if (!isAuthenticated() || !hasRole(requiredRole)) {
            window.location.href = redirectUrl;
            return false;
        }
        return true;
    }

    function onAuthStateChanged(listener) {
        if (typeof listener === 'function') {
            authListeners.push(listener);
            if (authInitialized) {
                listener(currentUser, currentUserRole);
            }
        }
    }

    function getRoleDisplayName(role) {
        var map = {
            'da': 'District Admin',
            'president': 'President',
            'approving': 'Approving Authority'
        };
        return map[role] || role || 'Unknown';
    }

    function getStatusBadgeClass(status) {
        var map = {
            'submitted': 'submitted',
            'da_review': 'da_review',
            'president_review': 'president_review',
            'approving_review': 'approving_review',
            'approved': 'approved',
            'rejected': 'rejected'
        };
        return map[status] || 'submitted';
    }

    function getStatusDisplayName(status) {
        var map = {
            'submitted': 'Submitted',
            'da_review': 'Under DA Review',
            'president_review': 'Under President Review',
            'approving_review': 'Under Final Review',
            'approved': 'Approved',
            'rejected': 'Rejected'
        };
        return map[status] || status || 'Unknown';
    }

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

    // ---- Initialize auth listener ----
    function initAuth() {
        window.auth.onAuthStateChanged(function(user) {
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
        if (!window.location.pathname.includes('/admin/')) {
            return;
        }
        if (window.location.pathname.includes('/admin/login.html')) {
            return;
        }

        onAuthStateChanged(function(user, role) {
            if (!user) {
                window.location.href = '/admin/login.html';
                return;
            }

            var currentPage = window.location.pathname.split('/').pop();
            if (currentPage === 'da.html' && role !== 'da') {
                window.location.href = '/admin/dashboard.html';
            } else if (currentPage === 'president.html' && role !== 'president') {
                window.location.href = '/admin/dashboard.html';
            } else if (currentPage === 'approving.html' && role !== 'approving') {
                window.location.href = '/admin/dashboard.html';
            }
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
