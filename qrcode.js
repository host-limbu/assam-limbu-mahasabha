/**
 * qrcode.js – Generates QR code data URLs using the QRCode.js library.
 * Exposes a global function `generateQRCodeDataURL`.
 */

// Uses the global `QRCode` object from the library loaded via CDN.

/**
 * Generate a QR code data URL (PNG) from a text string.
 * @param {string} text - The data to encode.
 * @param {number} size - The size (width and height) in pixels.
 * @returns {string} Data URL of the QR code image.
 */
function generateQRCodeDataURL(text, size = 150) {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    // QRCode.js expects a container element; we'll use a temporary div.
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    document.body.appendChild(tempDiv);

    // Generate QR code using QRCode.js
    const qr = new QRCode(tempDiv, {
        text: text,
        width: size,
        height: size,
        colorDark: '#1a3a5c',   // match deep blue
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    // Get the canvas from the QR code (QRCode.js creates a canvas inside the div)
    const qrCanvas = tempDiv.querySelector('canvas');
    if (!qrCanvas) {
        document.body.removeChild(tempDiv);
        throw new Error('QRCode.js failed to generate canvas.');
    }

    // Convert canvas to data URL
    const dataURL = qrCanvas.toDataURL('image/png');

    // Clean up
    document.body.removeChild(tempDiv);

    return dataURL;
}

// Expose to global scope
window.generateQRCodeDataURL = generateQRCodeDataURL;
