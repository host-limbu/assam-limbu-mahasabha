/**
 * qrcode.js – Generates QR code data URLs using the QRCode.js library.
 * Exposes a global function `generateQRCodeDataURL`.
 */

// Uses the global `QRCode` object from the library loaded via CDN.

function generateQRCodeDataURL(text, size = 150) {
    const canvas = document.createElement('canvas');
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    document.body.appendChild(tempDiv);

    const qr = new QRCode(tempDiv, {
        text: text,
        width: size,
        height: size,
        colorDark: '#1a3a5c',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    const qrCanvas = tempDiv.querySelector('canvas');
    if (!qrCanvas) {
        document.body.removeChild(tempDiv);
        throw new Error('QRCode.js failed to generate canvas.');
    }

    const dataURL = qrCanvas.toDataURL('image/png');
    document.body.removeChild(tempDiv);
    return dataURL;
}

window.generateQRCodeDataURL = generateQRCodeDataURL;
