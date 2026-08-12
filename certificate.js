/* ============================================================
   CERTIFICATE — Assam Limbu Mahasabha
   Load and display membership certificate
   ============================================================ */

(function() {
    'use strict';

    // ============================================================
    // DOM REFERENCES
    // ============================================================
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const certContainer = document.getElementById('certificate-container');

    const certMemberName = document.getElementById('cert-member-name');
    const certMembershipType = document.getElementById('cert-membership-type');
    const certRefNumber = document.getElementById('cert-ref-number');
    const certIssueDate = document.getElementById('cert-issue-date');
    const certFooterDate = document.getElementById('cert-footer-date');
    const certPhoto = document.getElementById('cert-photo');

    // ============================================================
    // GET REFERENCE NUMBER FROM URL
    // ============================================================
    function getReferenceFromUrl() {
        var params = new URLSearchParams(window.location.search);
        return params.get('ref');
    }

    // ============================================================
    // LOAD CERTIFICATE DATA
    // ============================================================
    function loadCertificate(refNumber) {
        if (!refNumber) {
            showError('No reference number provided.');
            return;
        }

        loadingState.style.display = 'block';
        errorState.style.display = 'none';
        certContainer.style.display = 'none';

        var appRef = firebase.database().ref('assam-limbu-mahasabha/applications/' + refNumber);

        appRef.once('value').then(function(snapshot) {
            var data = snapshot.val();
            if (!data) {
                showError('Certificate not found for reference: ' + refNumber);
                return;
            }

            // Check if application is approved
            if (data.status !== 'Approved') {
                showError('This application has not been approved yet. Certificate is not available.');
                return;
            }

            // Render certificate
            renderCertificate(data, refNumber);
            loadingState.style.display = 'none';
            certContainer.style.display = 'block';

        }).catch(function(error) {
            console.error('Error loading certificate:', error);
            showError('Error loading certificate. Please try again later.');
        });
    }

    // ============================================================
    // RENDER CERTIFICATE
    // ============================================================
    function renderCertificate(data, refNumber) {
        var applicant = data.applicant || {};

        // Name
        var fullName = (applicant.firstName || '') + ' ' + (applicant.secondName || '');
        certMemberName.textContent = fullName.trim() || 'Member Name';

        // Membership Type
        certMembershipType.textContent = applicant.membershipType || 'General Member';

        // Reference Number
        certRefNumber.textContent = refNumber;

        // Issue Date (use approval timestamp or current date)
        var issueDate = data.updatedAt || data.submittedAt || Date.now();
        var formattedDate = AdminCommon.formatDate(issueDate);
        certIssueDate.textContent = formattedDate;
        certFooterDate.textContent = formattedDate;

        // Photo
        if (applicant.photoURL) {
            certPhoto.src = applicant.photoURL;
            certPhoto.alt = 'Passport photo of ' + fullName;
            certPhoto.style.display = 'block';
        } else {
            certPhoto.style.display = 'none';
        }
    }

    // ============================================================
    // SHOW ERROR
    // ============================================================
    function showError(message) {
        loadingState.style.display = 'none';
        errorState.style.display = 'block';
        certContainer.style.display = 'none';
        // Optionally set error message
        var errorMsg = errorState.querySelector('p');
        if (errorMsg) {
            errorMsg.textContent = message || 'Certificate not found. Please check the reference number.';
        }
        // Show back link
        var backLink = errorState.querySelector('a');
        if (backLink) {
            backLink.href = 'check-status.html';
        }
    }

    // ============================================================
    // INIT
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
        var ref = getReferenceFromUrl();
        if (ref) {
            loadCertificate(ref);
        } else {
            showError('No reference number provided. Please use the link from your application status page.');
        }
    });

    console.log('certificate.js loaded successfully.');
})();
