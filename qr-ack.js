
function generateAckQR(text, size = 150) {
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

    const canvas = tempDiv.querySelector('canvas');
    if (!canvas) {
        document.body.removeChild(tempDiv);
        throw new Error('QRCode generation failed.');
    }
    const dataURL = canvas.toDataURL('image/png');
    document.body.removeChild(tempDiv);
    return dataURL;
}

// Expose globally
window.generateAckQR = generateAckQR;
