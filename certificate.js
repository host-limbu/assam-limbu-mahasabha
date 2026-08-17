/**
 * certificate.js – Fetches data, populates certificate, generates QR,
 * then automatically generates PDF with correct styling.
 * Includes fallback manual download button if auto fails.
 */

import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

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

const loadingText = document.getElementById('loadingText');
const statusMessage = document.getElementById('statusMessage');
const manualBtn = document.getElementById('manualDownloadBtn');

const urlParams = new URLSearchParams(window.location.search);
const refNumber = urlParams.get('ref');

// Redirect target (where to go after PDF generation)
const redirectUrl = urlParams.get('redirect') || document.referrer || 'certificate-records.html';

let isDownloading = false;

// Manual download function (exposed globally)
window.manualDownload = function() {
    if (isDownloading) return;
    isDownloading = true;
    manualBtn.classList.add('hidden');
    statusMessage.textContent = 'Generating PDF manually...';
    generatePDF();
};

async function generatePDF() {
    const element = document.getElementById('certificatePage');
    const refNum = refNumber || 'unknown';

    // Ensure element is visible for capture
    // It's already visible with opacity 0.01 and z-index -1, but we need to ensure it's rendered.
    // Temporarily make it fully opaque for capture (but still behind everything)
    element.style.opacity = '1';
    element.style.zIndex = '-1';

    // Wait for images to load
    const images = element.querySelectorAll('img');
    await Promise.all([...images].map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve; // continue even if image fails
        });
    }));

    // Wait a bit for layout
    await new Promise(r => setTimeout(r, 300));

    const opt = {
        margin: [15, 12, 15, 12],
        filename: `Membership_Certificate_${refNum}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            letterRendering: true,
            backgroundColor: '#ffffff',
            width: 210 * 2.83465, // Convert mm to px (approx 595px)
            height: 297 * 2.83465,
            windowWidth: 210 * 2.83465,
            windowHeight: 297 * 2.83465,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(element).save();
        statusMessage.textContent = 'PDF downloaded successfully! Redirecting...';
        statusMessage.style.color = 'green';
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 1500);
    } catch (err) {
        console.error('PDF generation error:', err);
        statusMessage.textContent = 'PDF generation failed. Please try the manual button below.';
        statusMessage.style.color = 'red';
        manualBtn.classList.remove('hidden');
    } finally {
        // Reset opacity to keep it hidden
        element.style.opacity = '0.01';
        isDownloading = false;
    }
}

function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    if (dateStr.includes('-') || dateStr.includes('/')) return dateStr;
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

async function loadCertificate() {
    try {
        statusMessage.textContent = 'Fetching application data...';

        if (!refNumber) {
            statusMessage.textContent = 'No reference number provided.';
            statusMessage.style.color = 'red';
            setTimeout(() => { window.location.href = redirectUrl; }, 3000);
            return;
        }

        const snapshot = await get(ref(db, 'applications'));
        if (!snapshot.exists()) {
            statusMessage.textContent = 'No applications found.';
            statusMessage.style.color = 'red';
            setTimeout(() => { window.location.href = redirectUrl; }, 3000);
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
            statusMessage.textContent = `Application ${refNumber} not found.`;
            statusMessage.style.color = 'red';
            setTimeout(() => { window.location.href = redirectUrl; }, 3000);
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

        const membershipNumber = refNum.split('-')[1] && refNum.split('-')[2]
            ? `[Org]-${refNum.split('-')[1]}-${refNum.split('-')[2]}`
            : refNum;
        const certificateId = `CERT-${refNum}`;
        const verificationId = app.verificationId || `VER-${refNum}-${Date.now().toString().slice(-6)}`;

        // --- Generate QR code ---
        statusMessage.textContent = 'Generating QR code...';
        const verificationUrl = `${window.location.origin}/verify.html?id=${encodeURIComponent(verificationId)}`;
        let qrDataUrl = '';
        try {
            if (typeof window.generateQRCodeDataURL === 'function') {
                qrDataUrl = window.generateQRCodeDataURL(verificationUrl, 150);
            } else {
                console.warn('QRCode generator not available');
            }
        } catch (err) {
            console.warn('QR generation failed:', err);
        }
        if (!qrDataUrl) {
            qrDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
        }

        // --- Populate DOM placeholders ---
        document.getElementById('membershipNumber').textContent = membershipNumber;
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

        // --- Generate PDF ---
        statusMessage.textContent = 'Generating PDF...';
        loadingText.textContent = 'Generating PDF...';

        // Start PDF generation
        await generatePDF();

    } catch (error) {
        console.error('Error loading certificate:', error);
        statusMessage.textContent = `Error: ${error.message}. Please try the manual button.`;
        statusMessage.style.color = 'red';
        manualBtn.classList.remove('hidden');
    }
}

// Start the process
loadCertificate();
