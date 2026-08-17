/**
 * certificate.js – Fetches application by reference number,
 * populates all certificate placeholders with real data,
 * generates QR code dynamically, and reveals certificate.
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
        const memberName = `${app.firstName || ''} ${app.secondName || ''}`.trim() || '[Name]';
        const fatherName = app.fatherGuardianName || '[Father / Guardian]';
        const membershipType = app.membershipType || '[Membership Type]';
        const dob = app.dob || '[Date of Birth]';
        const district = app.district || '[District]';
        const village = app.village || '[Village]';
        const postOffice = app.postOffice || '[Post Office]';
        const policeStation = app.ps || '[Police Station]';
        
        const refNum = app.refNumber || refNumber;
        const issueDate = app.timestamp ? app.timestamp.split(' ')[0] : new Date().toISOString().split('T')[0];
        const photoURL = app.photoURL || '';

        // Generate derived IDs
        const membershipNumber = `ALM-${refNum.split('-')[1] || '2026'}-${refNum.split('-')[2] || '00000'}`;
        const certificateId = `CERT-${refNum}`;
        const verificationId = app.verificationId || `VER-${refNum}-${Date.now().toString().slice(-6)}`;

        // Build full address for formal text
        const addressParts = [village, postOffice, policeStation, district].filter(Boolean);
        const fullAddress = addressParts.join(', ') || '[Address]';

        // --- Generate QR code ---
        const verificationUrl = getVerificationUrl(verificationId);
        let qrDataUrl = '';
        try {
            if (typeof window.generateQRCodeDataURL === 'function') {
                qrDataUrl = window.generateQRCodeDataURL(verificationUrl, 150);
            } else {
                qrDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
            }
        } catch (err) {
            console.warn('QR generation failed:', err);
            qrDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
        }

        // --- Populate DOM placeholders ---
        document.getElementById('membershipNumber').textContent = `Membership ID : ${membershipNumber}`;
        document.getElementById('issueDate').textContent = `Date : ${formatDate(issueDate)}`;
        document.getElementById('memberName').textContent = memberName;
        document.getElementById('fatherName').textContent = fatherName;
        document.getElementById('membershipType').textContent = membershipType;
        document.getElementById('dateOfBirth').textContent = formatDate(dob);
        document.getElementById('district').textContent = district;
        document.getElementById('village').textContent = village;
        document.getElementById('postOffice').textContent = postOffice;
        document.getElementById('policeStation').textContent = policeStation;

        // Member photo
        const photoImg = document.getElementById('memberPhoto');
        if (photoURL) {
            photoImg.src = photoURL;
            photoImg.alt = `${memberName} photograph`;
        } else {
            photoImg.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23eee"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" font-size="12" fill="%23999" font-family="sans-serif"%3ENo Photo%3C/text%3E%3C/svg%3E';
        }

        // Formal text with dynamic data
        document.getElementById('formalText').textContent =
            `This certificate is issued to 𝐒𝐫𝐢/𝐒𝐦𝐭/𝐌𝐢𝐬𝐬/𝐌𝐫 ${memberName}  𝐒𝐨𝐧/𝐃𝐚𝐮𝐠𝐡𝐫𝐭𝐞𝐫 of ${fatherName} confirming 𝐇𝐢𝐬/𝐇𝐞𝐫 membership in the ` +
            `[𝐘𝐨𝐮𝐫 𝐎𝐫𝐠𝐚𝐧𝐢𝐳𝐚𝐭𝐢𝐨𝐧], [𝐘𝐨𝐮𝐫 𝐃𝐢𝐬𝐭𝐫𝐢𝐜𝐭 𝐂𝐨𝐦𝐦𝐢𝐭𝐭𝐞𝐞]. The member is entitled to participate in ` +
            `the activities, programmes and community initiatives of the organization, subject to its ` +
            `rules and regulations.`;

        // Verification section
        document.getElementById('certStatus').textContent = app.status || 'APPROVED';
        document.getElementById('verificationId').textContent = verificationId;

        // QR code
        const qrImg = document.getElementById('qrCode');
        if (qrImg) {
            qrImg.src = qrDataUrl;
            qrImg.alt = 'Verification QR Code';
        }

        // Signatures (placeholder names)
        document.getElementById('daName').textContent = app.dealingAssistantName || '[Verifying Officer]';
        document.getElementById('presidentName').textContent = app.presidentName || '[Reviewing Officer]';
        document.getElementById('aaName').textContent = app.approvingAuthorityName || '[Approving Officer]';

        // Certificate ID
        document.getElementById('certificateId').textContent = certificateId;

        // Local heading (can be customized per organization)
        document.getElementById('localHeading').textContent = '[𝐘𝐨𝐮𝐫 𝐎𝐫𝐠𝐚𝐧𝐢𝐳𝐚𝐭𝐢𝐨𝐧] প্রমাণ পত্ৰ';

        // --- All data injected. Show certificate ---
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
