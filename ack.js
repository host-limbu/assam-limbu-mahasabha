/**
 * ack.js – Fetches application data from Firebase and populates the receipt.
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

// DOM Elements
const loadingContainer = document.getElementById('loadingContainer');
const receiptPage = document.getElementById('receiptPage');
const actionButtons = document.getElementById('actionButtons');

const refNumberDisplay = document.getElementById('refNumberDisplay');
const dateDisplay = document.getElementById('dateDisplay');
const applicantName = document.getElementById('applicantName');
const messageParagraph = document.getElementById('messageParagraph');
const convenienceFee = document.getElementById('convenienceFee');
const totalFee = document.getElementById('totalFee');
const mobileNumber = document.getElementById('mobileNumber');
const qrImage = document.getElementById('qrImage');

const urlParams = new URLSearchParams(window.location.search);
const refNumber = urlParams.get('ref');

if (!refNumber) {
    loadingContainer.innerHTML = '<p style="color:red;">No reference number provided.</p>';
    throw new Error('Missing ref parameter');
}

// Helper: format date
function formatDateTime(dateStr) {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return d.toLocaleString('en-IN', options);
}

// Helper: format date only
function formatDateOnly(dateStr) {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Helper: format time only
function formatTimeOnly(dateStr) {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

async function loadReceipt() {
    try {
        const snapshot = await get(ref(db, 'applications'));
        if (!snapshot.exists()) {
            loadingContainer.innerHTML = '<p style="color:red;">No applications found.</p>';
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
            loadingContainer.innerHTML = `<p style="color:red;">Application with reference ${refNumber} not found.</p>`;
            return;
        }

        // Extract data
        const fullName = `${app.firstName || ''} ${app.secondName || ''}`.trim() || 'Applicant';
        const membershipType = app.membershipType || 'General';
        const phone = app.phone || 'N/A';
        const submittedDate = app.timestamp || new Date().toISOString();

        // Fee (hardcoded to 0 as requested)
        const fee = 0;

        // Build message
        const message = `
            Your application for <span class="highlight">${membershipType}</span> membership
            has been submitted successfully on <strong>${formatDateTime(submittedDate)}</strong> and your
            Acknowledgement No. is <strong>${app.refNumber}</strong>.
            <br /><br />
            Please use this Acknowledgement number for tracking the application and for any future communication
            related to this application. If the application is accepted, the service shall be provided within
            <strong>[Processing Timeframe]</strong>.
        `;

        // Populate fields
        refNumberDisplay.textContent = app.refNumber;
        dateDisplay.textContent = formatDateTime(submittedDate);
        applicantName.textContent = fullName;
        messageParagraph.innerHTML = message;
        convenienceFee.textContent = fee.toFixed(2);
        totalFee.textContent = fee.toFixed(2);
        mobileNumber.textContent = phone;

        // Generate QR code (encode ref number and applicant name)
        const qrData = JSON.stringify({
            ref: app.refNumber,
            name: fullName,
            type: 'acknowledgement'
        });

        try {
            if (typeof window.generateAckQR === 'function') {
                const qrDataURL = window.generateAckQR(qrData, 150);
                qrImage.src = qrDataURL;
                qrImage.alt = 'QR Code for Acknowledgement';
            } else {
                console.warn('QR generator not available.');
                qrImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
                qrImage.alt = 'QR Code placeholder';
            }
        } catch (err) {
            console.warn('QR generation failed:', err);
            qrImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
            qrImage.alt = 'QR Code placeholder';
        }

        // Show receipt
        loadingContainer.style.display = 'none';
        receiptPage.style.display = 'block';
        actionButtons.style.display = 'flex';

    } catch (error) {
        console.error('Error loading receipt:', error);
        loadingContainer.innerHTML = `<p style="color:red;">Error loading receipt: ${error.message}</p>`;
    }
}

loadReceipt();
