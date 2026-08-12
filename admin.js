<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dashboard — ALM Admin</title>
    <link rel="stylesheet" href="admin.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet" />
</head>
<body>

    <div class="admin-wrapper">

        <div class="admin-container">

            <div class="loading-spinner" id="loadingSpinner">
                <div class="spinner"></div>
                <div class="text">Loading dashboard...</div>
            </div>

            <div id="dashboardContent" style="display: none;">

                <div class="admin-header">
                    <div class="title">
                        <h1>Dashboard</h1>
                        <p id="welcomeMsg">Welcome back</p>
                    </div>
                    <div class="user-info">
                        <span class="role-badge" id="roleBadge">Admin</span>
                        <button class="logout-btn" id="logoutBtn">Logout</button>
                    </div>
                </div>

                <div class="stats-row" id="statsRow">
                    <div class="stat-box"><span class="number" id="totalApps">0</span><span class="label">Total Applications</span></div>
                    <div class="stat-box"><span class="number" id="pendingApps">0</span><span class="label">Pending Review</span></div>
                    <div class="stat-box"><span class="number" id="approvedApps">0</span><span class="label">Approved</span></div>
                    <div class="stat-box"><span class="number" id="rejectedApps">0</span><span class="label">Rejected</span></div>
                </div>

                <div class="dashboard-grid" id="dashboardGrid"></div>

            </div>

        </div>

    </div>

    <!-- Firebase SDK (compat) -->
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js"></script>

    <script src="../firebase-config.js"></script>
    <script src="../firebase-auth.js"></script>
    <script src="admin.js"></script>

    <script>
        (function() {
            var loadingSpinner = document.getElementById('loadingSpinner');
            var dashboardContent = document.getElementById('dashboardContent');

            var roleConfigs = {
                'da': {
                    title: 'DA Dashboard',
                    welcome: 'District Admin',
                    badge: 'DA',
                    cards: [
                        { icon: '&#9670;', title: 'Review Applications', description: 'Review new applications and forward to President.', link: 'da.html' },
                        { icon: '&#9670;', title: 'View All Applications', description: 'Browse all applications.', link: 'da.html?view=all' }
                    ]
                },
                'president': {
                    title: 'President Dashboard',
                    welcome: 'President / Assistant President',
                    badge: 'President',
                    cards: [
                        { icon: '&#9670;', title: 'Review Applications', description: 'Review DA-forwarded applications and forward to Approving Authority.', link: 'president.html' },
                        { icon: '&#9670;', title: 'View All Applications', description: 'Browse all applications.', link: 'president.html?view=all' }
                    ]
                },
                'approving': {
                    title: 'Approving Authority Dashboard',
                    welcome: 'Approving Authority',
                    badge: 'Approving',
                    cards: [
                        { icon: '&#9670;', title: 'Final Review', description: 'Review and approve or reject applications.', link: 'approving.html' },
                        { icon: '&#9670;', title: 'View All Applications', description: 'Browse all applications.', link: 'approving.html?view=all' }
                    ]
                }
            };

            var commonCards = [
                { icon: '&#9670;', title: 'Check Application Status', description: 'Look up any application by reference number.', link: '../membership-check.html' }
            ];

            function renderDashboard(role) {
                var config = roleConfigs[role];
                if (!config) {
                    document.getElementById('welcomeMsg').textContent = 'Welcome, Admin';
                    document.getElementById('roleBadge').textContent = 'Admin';
                    return;
                }

                document.querySelector('.admin-header .title h1').textContent = config.title;
                document.getElementById('welcomeMsg').textContent = 'Welcome, ' + config.welcome;
                document.getElementById('roleBadge').textContent = config.badge;

                var grid = document.getElementById('dashboardGrid');
                var html = '';
                config.cards.forEach(function(card) {
                    html += '<a href="' + card.link + '" class="dashboard-card"><span class="card-icon">' + card.icon + '</span><h3>' + card.title + '</h3><p>' + card.description + '</p></a>';
                });
                commonCards.forEach(function(card) {
                    html += '<a href="' + card.link + '" class="dashboard-card"><span class="card-icon">' + card.icon + '</span><h3>' + card.title + '</h3><p>' + card.description + '</p></a>';
                });
                grid.innerHTML = html;
            }

            function fetchStats() {
                var db = window.db;
                db.ref('applications').once('value')
                    .then(function(snapshot) {
                        var data = snapshot.val();
                        if (!data) {
                            document.getElementById('totalApps').textContent = '0';
                            document.getElementById('pendingApps').textContent = '0';
                            document.getElementById('approvedApps').textContent = '0';
                            document.getElementById('rejectedApps').textContent = '0';
                            return;
                        }
                        var total = 0, pending = 0, approved = 0, rejected = 0;
                        Object.keys(data).forEach(function(key) {
                            var app = data[key];
                            total++;
                            if (app.status === 'approved') approved++;
                            else if (app.status === 'rejected') rejected++;
                            else pending++;
                        });
                        document.getElementById('totalApps').textContent = total;
                        document.getElementById('pendingApps').textContent = pending;
                        document.getElementById('approvedApps').textContent = approved;
                        document.getElementById('rejectedApps').textContent = rejected;
                    })
                    .catch(function(err) { console.warn('Stats fetch error:', err); });
            }

            function loadDashboard() {
                var user = window.Auth ? window.Auth.getCurrentUser() : null;
                var role = window.Auth ? window.Auth.getCurrentUserRole() : null;
                if (!user || !role) {
                    window.location.href = 'login.html';
                    return;
                }
                renderDashboard(role);
                fetchStats();
                loadingSpinner.style.display = 'none';
                dashboardContent.style.display = 'block';
            }

            if (window.Auth) {
                if (window.Auth.isAuthenticated()) {
                    loadDashboard();
                } else {
                    window.Auth.onAuthStateChanged(function(user, role) {
                        if (user && role) loadDashboard();
                        else window.location.href = 'login.html';
                    });
                }
            } else {
                window.location.href = 'login.html';
            }
        })();
    </script>

</body>
</html>
