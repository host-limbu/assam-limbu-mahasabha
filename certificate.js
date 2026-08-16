/**
 * certificate.js – Central data-fetching and placeholder population.
 * Reads reference number from URL, fetches data, populates placeholders,
 * generates QR code using stored verificationId, then reveals certificate.
 */

import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDp0cacuoIiLmdSjC96KSHnZkhk27S7bXI",
    authDomain: "assam-limbu-mahasabha-257ee.firebaseapp.com",
    projectId: "assam-limbu-mahasabha-257ee",
    storageBucket: "assam-limbu-mahasabha-257ee.firebasestorage.app",
    messagingSenderId: "684300836537",
    appId: "1:684300836537:web:f1080b30569f9b79634568"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM elements
const loadingContainer = document.getElementById('loadingContainer');
const certificatePage = document.getElementById('certificatePage');
const actionButtons = document.getElementById('actionButtons');

// Get reference number from URL
const urlParams = new URLSearchParams(window.location.search);
const refNumber = urlParams.get('ref');

if (!refNumber) {
    loadingContainer.innerHTML = '<p style="color:red; text-align:center;">No reference number provided.</p>';
    throw new Error('Missing ref parameter');
}

// Helper: format date
function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    if (dateStr.includes('-') || dateStr.includes('/')) return dateStr;
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Helper: build verification URL for QR code
function getVerificationUrl(verificationId) {
    const baseUrl = window.location.origin + window.location.pathname.replace(/certificate\.html$/, '');
    return `${baseUrl}verify.html?id=${encodeURIComponent(verificationId)}`;
}

// Main function
async function loadCertificate() {
    try {
        const snapshot = await get(ref(db, 'applications'));
        if (!snapshot.exists()) {
            loadingContainer.innerHTML = '<p style="color:red; text-align:center;">No applications found.</p>';
            return;
        }
        const allApps = snapshot.val();
        let app = null;
        for (const key in allApps) {
            if (allApps[key].refNumber === refNumber) {
                app = allApps[key];
                break;
            }
        }
        if (!app) {
            loadingContainer.innerHTML = `<p style="color:red; text-align:center;">Application with reference ${refNumber} not found.</p>`;
            return;
        }

        // --- Extract data ---
        const memberName = `${app.firstName || ''} ${app.secondName || ''}`.trim() || 'N/A';
        const fatherName = app.fatherGuardianName || 'N/A';
        const membershipType = app.membershipType || 'General';
        const dob = app.dob || 'N/A';
        const district = app.district || 'N/A';
        const village = app.village || 'N/A';
        const postOffice = app.postOffice || 'N/A';
        const policeStation = app.ps || 'N/A';
        const pin = app.pin || 'N/A';
        const refNum = app.refNumber || 'N/A';
        const issueDate = app.timestamp ? app.timestamp.split(' ')[0] : new Date().toISOString().split('T')[0];
        const photoURL = app.photoURL || '';

        const membershipNumber = refNum.split('-')[1] && refNum.split('-')[2] ? `[Org]-${refNum.split('-')[1]}-${refNum.split('-')[2]}` : refNum;
        const certificateId = `CERT-${refNum}`;
        // Use stored verificationId from database, or generate a fallback
        const verificationId = app.verificationId || `VER-${refNum}-${Date.now().toString().slice(-6)}`;

        const addressParts = [village, postOffice, policeStation, district, `PIN: ${pin}`].filter(Boolean);
        const fullAddress = addressParts.join(', ') || 'N/A';

        // --- Generate QR code using the verificationId ---
        const verificationUrl = getVerificationUrl(verificationId);
        let qrDataUrl = '';
        try {
            if (typeof window.generateQRCodeDataURL === 'function') {
                qrDataUrl = window.generateQRCodeDataURL(verificationUrl, 150);
            } else {
                console.warn('QRCode generator not available. Using fallback placeholder.');
                qrDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
            }
        } catch (err) {
            console.warn('QR generation failed:', err);
            qrDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
        }

        // --- Populate DOM placeholders ---
        document.getElementById('membershipNumber').textContent = membershipNumber;
        document.getElementById('applicationNumber').textContent = refNum;
        document.getElementById('issueDate').textContent = formatDate(issueDate);

        document.getElementById('memberName').textContent = memberName;
        document.getElementById('fatherName').textContent = fatherName;
        document.getElementById('membershipType').textContent = membershipType;
        document.getElementById('dateOfBirth').textContent = formatDate(dob);
        document.getElementById('district').textContent = district;
        document.getElementById('village').textContent = village;
        document.getElementById('postOffice').textContent = postOffice;
        document.getElementById('policeStation').textContent = policeStation;
        document.getElementById('pin').textContent = pin;

        const photoImg = document.getElementById('memberPhoto');
        if (photoURL) {
            photoImg.src = photoURL;
            photoImg.alt = `${memberName} photograph`;
        } else {
            photoImg.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23eee"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" font-size="12" fill="%23999" font-family="sans-serif"%3ENo Photo%3C/text%3E%3C/svg%3E';
        }

        document.getElementById('formalName').textContent = memberName;
        document.getElementById('formalFather').textContent = fatherName;
        document.getElementById('formalAddress').textContent = fullAddress;
        document.getElementById('formalType').textContent = membershipType;

        document.getElementById('certStatus').textContent = app.status || 'APPROVED';
        document.getElementById('verificationId').textContent = verificationId;

        const qrImg = document.getElementById('qrCode');
        if (qrImg) {
            qrImg.src = qrDataUrl;
            qrImg.alt = 'Verification QR Code';
        }

        document.getElementById('daName').textContent = '[Verifying Officer]';
        document.getElementById('presidentName').textContent = '[Reviewing Officer]';
        document.getElementById('aaName').textContent = '[Approving Officer]';

        document.getElementById('certificateId').textContent = certificateId;

        // --- All data injected. Show certificate and hide spinner ---
        loadingContainer.style.display = 'none';
        certificatePage.style.display = 'block';
        actionButtons.style.display = 'flex';

    } catch (error) {
        console.error('Error loading certificate:', error);
        loadingContainer.innerHTML = `<p style="color:red; text-align:center;">Error loading certificate: ${error.message}</p>`;
    }
}

// Execute
loadCertificate();
