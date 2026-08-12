/* ============================================================
   ADMIN DASHBOARD — Assam Limbu Mahasabha
   Role-based application management, workflow actions
   ============================================================ */

(function() {
    'use strict';

    // ============================================================
    // DOM REFERENCES
    // ============================================================
    const tableBody = document.getElementById('app-table-body');
    const emptyState = document.getElementById('empty-state');
    const filterStatus = document.getElementById('filter-status');
    const filterSearch = document.getElementById('filter-search');
    const statTotal = document.getElementById('stat-total');
    const statPending = document.getElementById('stat-pending');
    const statApproved = document.getElementById('stat-approved');
    const statRejected = document.getElementById('stat-rejected');
    const userName = document.getElementById('user-name');
    const userRoleBadge = document.getElementById('user-role-badge');
    const listTitle = document.getElementById('list-title');

    // Modal
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    // ============================================================
    // STATE
    // ============================================================
    let allApplications = [];
    let currentUser = null;
    let currentRole = null;
    let currentUID = null;
    let filteredApplications = [];
    let currentModalApp = null;

    // Role display names
    const roleDisplayMap = {
        'DA': 'District Administrator',
        'President': 'President / Assistant President',
        'AA': 'Approving Authority'
    };

    // ============================================================
    // INIT
    // ============================================================
    AdminCommon.initAuth(function(user, role) {
        if (user && role) {
            currentUser = user;
            currentRole = role;
            currentUID = user.uid;
            userName.textContent = user.displayName || 'Admin User';
            userRoleBadge.textContent = role;
            userRoleBadge.className = 'role-badge ' + role.toLowerCase();
            listTitle.textContent = roleDisplayMap[role] + ' — Applications';

            // Load applications
            loadApplications();
        } else {
            // Not authenticated or no role
            window.location.href = 'login.html';
        }
    });

    // ============================================================
    // LOAD APPLICATIONS
    // ============================================================
    function loadApplications() {
        var appsRef = firebase.database().ref('assam-limbu-mahasabha/applications');

        appsRef.once('value').then(function(snapshot) {
            var data = snapshot.val();
            if (data) {
                var apps = [];
                Object.keys(data).forEach(function(key) {
                    var app = data[key];
                    app._refKey = key;
                    apps.push(app);
                });

                // Sort by submittedAt descending (newest first)
                apps.sort(function(a, b) {
                    return (b.submittedAt || 0) - (a.submittedAt || 0);
                });

                allApplications = apps;
                applyFilters();
            } else {
                allApplications = [];
                applyFilters();
            }
        }).catch(function(error) {
            console.error('Error loading applications:', error);
        });
    }

    // ============================================================
    // FILTER & RENDER
    // ============================================================
    function applyFilters() {
        var status = filterStatus.value;
        var search = filterSearch.value.toLowerCase().trim();

        filteredApplications = allApplications.filter(function(app) {
            // Status filter
            if (status !== 'all' && app.status !== status) {
                return false;
            }

            // Search filter (reference or name)
            if (search) {
                var refMatch = app.referenceNumber && app.referenceNumber.toLowerCase().includes(search);
                var nameMatch = app.applicant &&
                    (app.applicant.firstName + ' ' + app.applicant.secondName).toLowerCase().includes(search);
                if (!refMatch && !nameMatch) {
                    return false;
                }
            }

            return true;
        });

        renderStats();
        renderTable();
    }

    // ============================================================
    // RENDER STATS
    // ============================================================
    function renderStats() {
        var total = allApplications.length;
        var pending = allApplications.filter(function(a) {
            return a.status !== 'Approved' && a.status !== 'Rejected';
        }).length;
        var approved = allApplications.filter(function(a) {
            return a.status === 'Approved';
        }).length;
        var rejected = allApplications.filter(function(a) {
            return a.status === 'Rejected';
        }).length;

        statTotal.textContent = total;
        statPending.textContent = pending;
        statApproved.textContent = approved;
        statRejected.textContent = rejected;
    }

    // ============================================================
    // RENDER TABLE
    // ============================================================
    function renderTable() {
        if (filteredApplications.length === 0) {
            tableBody.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        var html = '';

        filteredApplications.forEach(function(app) {
            var name = app.applicant ? app.applicant.firstName + ' ' + app.applicant.secondName : 'N/A';
            var type = app.applicant ? app.applicant.membershipType || 'N/A' : 'N/A';
            var submitted = app.submittedAt ? AdminCommon.formatDate(app.submittedAt) : 'N/A';

            html += '<tr>';
            html += '<td><strong>' + (app.referenceNumber || 'N/A') + '</strong></td>';
            html += '<td>' + name + '</td>';
            html += '<td>' + type + '</td>';
            html += '<td>' + submitted + '</td>';
            html += '<td><span class="status-badge ' + AdminCommon.getStatusBadgeClass(app.status) + '">' + AdminCommon.getStatusDisplayName(app.status) + '</span></td>';
            html += '<td><button class="btn-sm" onclick="openApplication(\'' + app._refKey + '\')">View</button></td>';
            html += '</tr>';
        });

        tableBody.innerHTML = html;
    }

    // ============================================================
    // FILTER EVENT LISTENERS
    // ============================================================
    filterStatus.addEventListener('change', applyFilters);
    filterSearch.addEventListener('input', applyFilters);

    // ============================================================
    // OPEN APPLICATION MODAL
    // ============================================================
    window.openApplication = function(refKey) {
        var app = allApplications.find(function(a) {
            return a._refKey === refKey;
        });

        if (!app) {
            console.error('Application not found:', refKey);
            return;
        }

        currentModalApp = app;
        renderModal(app);
        modalOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    };

    // ============================================================
    // RENDER MODAL
    // ============================================================
    function renderModal(app) {
        var applicant = app.applicant || {};
        var name = applicant.firstName + ' ' + applicant.secondName;
        modalTitle.textContent = 'Application: ' + (app.referenceNumber || 'N/A');

        var statusBadge = AdminCommon.getStatusBadgeClass(app.status);

        var html = '';

        // Photo
        if (applicant.photoURL) {
            html += '<div class="photo-container">';
            html += '<img src="' + applicant.photoURL + '" alt="Passport photo" />';
            html += '</div>';
        }

        // Applicant Details
        html += '<div style="margin-bottom: var(--spacing-md);">';
        html += '<h3 style="font-size: 1rem; color: var(--color-primary); margin-bottom: var(--spacing-sm);">Applicant Information</h3>';
        html += '<div class="detail-grid">';
        html += '<span class="label">Name</span><span class="value">' + name + '</span>';
        html += '<span class="label">Membership Type</span><span class="value">' + (applicant.membershipType || 'N/A') + '</span>';
        html += '<span class="label">Date of Birth</span><span class="value">' + (applicant.dob || 'N/A') + '</span>';
        html += '<span class="label">Email</span><span class="value">' + (applicant.email || 'N/A') + '</span>';
        html += '<span class="label">Phone</span><span class="value">' + (applicant.phone || 'N/A') + '</span>';
        html += '<span class="label">Education</span><span class="value">' + (applicant.education || 'N/A') + (applicant.educationOther ? ' (' + applicant.educationOther + ')' : '') + '</span>';
        html += '<span class="label">Blood Group</span><span class="value">' + (applicant.bloodGroup || 'N/A') + '</span>';
        html += '<span class="label">District</span><span class="value">' + (applicant.district || 'N/A') + '</span>';
        html += '<span class="label">Village</span><span class="value">' + (applicant.village || 'N/A') + '</span>';
        html += '<span class="label">PIN</span><span class="value">' + (applicant.pin || 'N/A') + '</span>';
        html += '<span class="label">Family Members</span><span class="value">Male: ' + (applicant.familyMale || 0) + ', Female: ' + (applicant.familyFemale || 0) + ', Total: ' + (applicant.familyTotal || 0) + '</span>';
        html += '<span class="label">Status</span><span class="value"><span class="status-badge ' + statusBadge + '">' + AdminCommon.getStatusDisplayName(app.status) + '</span></span>';
        html += '</div>';
        html += '</div>';

        // Remarks / History
        html += '<div style="margin-bottom: var(--spacing-md);">';
        html += '<h3 style="font-size: 1rem; color: var(--color-primary); margin-bottom: var(--spacing-sm);">Workflow History</h3>';
        html += '<div class="remarks-section">';

        if (app.history) {
            var historyKeys = Object.keys(app.history).sort();
            if (historyKeys.length > 0) {
                historyKeys.forEach(function(key) {
                    var entry = app.history[key];
                    var actor = entry.actorRole === 'applicant' ? 'Applicant' : entry.actorRole || 'System';
                    html += '<div class="remark-item">';
                    html += '<span class="remark-actor">' + actor + '</span>';
                    html += '<span class="remark-text">' + (entry.remark || '') + '</span>';
                    html += '<span class="remark-time">' + AdminCommon.formatTimestamp(entry.timestamp) + '</span>';
                    html += '</div>';
                });
            } else {
                html += '<p style="color: var(--color-text-muted); font-style: italic;">No history available.</p>';
            }
        } else {
            html += '<p style="color: var(--color-text-muted); font-style: italic;">No history available.</p>';
        }

        html += '</div>';
        html += '</div>';

        // Action Group (role-specific)
        html += renderActions(app);

        modalContent.innerHTML = html;
    }

    // ============================================================
    // RENDER ACTIONS (role-based)
    // ============================================================
    function renderActions(app) {
        var status = app.status;
        var role = currentRole;
        var html = '';

        html += '<div class="action-group">';

        // DA: Forward to President
        if (role === 'DA' && status === 'DA') {
            html += '<textarea id="remark-input" placeholder="Add remarks (optional)…"></textarea>';
            html += '<div class="btn-row">';
            html += '<button class="btn btn-primary" onclick="forwardApplication(\'President\')">Forward to President</button>';
            html += '</div>';
        }

        // President: Forward to AA
        else if (role === 'President' && status === 'President') {
            html += '<textarea id="remark-input" placeholder="Add remarks (optional)…"></textarea>';
            html += '<div class="btn-row">';
            html += '<button class="btn btn-primary" onclick="forwardApplication(\'AA\')">Forward to Approving Authority</button>';
            html += '</div>';
        }

        // AA: Approve or Reject
        else if (role === 'AA' && status === 'AA') {
            html += '<textarea id="remark-input" placeholder="Add final remarks…"></textarea>';
            html += '<div class="btn-row">';
            html += '<button class="btn btn-success-sm" onclick="finalDecision(\'Approved\')">Approve</button>';
            html += '<button class="btn btn-danger-sm" onclick="finalDecision(\'Rejected\')">Reject</button>';
            html += '</div>';
        }

        // If already final (approved/rejected) or not in correct workflow stage
        else if (status === 'Approved' || status === 'Rejected') {
            html += '<p style="color: var(--color-text-muted); font-style: italic;">This application has been ' + status.toLowerCase() + '.</p>';
        } else {
            html += '<p style="color: var(--color-text-muted); font-style: italic;">This application is currently with ' + AdminCommon.getStatusDisplayName(status) + ' and cannot be actioned by you.</p>';
        }

        html += '</div>';

        return html;
    }

    // ============================================================
    // FORWARD APPLICATION
    // ============================================================
    window.forwardApplication = function(targetStatus) {
        if (!currentModalApp) return;

        var remarkInput = document.getElementById('remark-input');
        var remark = remarkInput ? remarkInput.value.trim() : '';

        // Build status mapping
        var statusMap = {
            'President': {
                from: 'DA',
                to: 'President',
                role: 'DA',
                action: 'forwarded to President'
            },
            'AA': {
                from: 'President',
                to: 'AA',
                role: 'President',
                action: 'forwarded to Approving Authority'
            }
        };

        var mapping = statusMap[targetStatus];
        if (!mapping) return;

        if (!confirm('Are you sure you want to forward this application to ' + targetStatus + '?')) {
            return;
        }

        var appRef = firebase.database().ref('assam-limbu-mahasabha/applications/' + currentModalApp._refKey);

        // Build history entry
        var historyKey = 'h' + Date.now();
        var historyEntry = {};
        historyEntry[historyKey] = {
            action: mapping.action,
            actorUID: currentUID,
            actorRole: mapping.role,
            remark: remark || 'No remarks provided.',
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            fromStatus: mapping.from,
            toStatus: mapping.to
        };

        var updates = {};
        updates['status'] = mapping.to;
        updates['updatedAt'] = firebase.database.ServerValue.TIMESTAMP;
        updates['history/' + historyKey] = historyEntry[historyKey];

        // Add role-specific remarks field
        if (mapping.role === 'DA') {
            updates['daRemarks'] = remark || 'Forwarded to President.';
        } else if (mapping.role === 'President') {
            updates['presidentRemarks'] = remark || 'Forwarded to Approving Authority.';
        }

        appRef.update(updates).then(function() {
            closeModal();
            loadApplications();
        }).catch(function(error) {
            console.error('Forward error:', error);
            alert('Error forwarding application. Please try again.');
        });
    };

    // ============================================================
    // FINAL DECISION (Approve/Reject)
    // ============================================================
    window.finalDecision = function(decision) {
        if (!currentModalApp) return;

        var remarkInput = document.getElementById('remark-input');
        var remark = remarkInput ? remarkInput.value.trim() : '';

        if (!remark) {
            alert('Please add a final remark before ' + decision.toLowerCase() + 'ing.');
            return;
        }

        if (!confirm('Are you sure you want to ' + decision.toLowerCase() + ' this application?')) {
            return;
        }

        var appRef = firebase.database().ref('assam-limbu-mahasabha/applications/' + currentModalApp._refKey);

        var historyKey = 'h' + Date.now();
        var historyEntry = {};
        historyEntry[historyKey] = {
            action: decision.toLowerCase() + 'd',
            actorUID: currentUID,
            actorRole: 'AA',
            remark: remark,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            fromStatus: 'AA',
            toStatus: decision
        };

        var updates = {};
        updates['status'] = decision;
        updates['updatedAt'] = firebase.database.ServerValue.TIMESTAMP;
        updates['aaRemarks'] = remark;
        updates['history/' + historyKey] = historyEntry[historyKey];

        appRef.update(updates).then(function() {
            closeModal();
            loadApplications();
        }).catch(function(error) {
            console.error('Decision error:', error);
            alert('Error processing decision. Please try again.');
        });
    };

    // ============================================================
    // CLOSE MODAL
    // ============================================================
    window.closeModal = function() {
        modalOverlay.classList.remove('visible');
        document.body.style.overflow = '';
        currentModalApp = null;
    };

    // Close modal on backdrop click
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // ============================================================
    // EXPOSE FUNCTIONS TO GLOBAL SCOPE
    // ============================================================
    window.loadApplications = loadApplications;

    console.log('dashboard.js loaded successfully.');
})();
