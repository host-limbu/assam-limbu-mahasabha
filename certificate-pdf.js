/**
 * certificate-pdf.js
 * Dedicated PDF generator for the membership certificate.
 * Uses html2pdf library (loaded via CDN in admin.html).
 */

/**
 * Generate a PDF from the certificate element.
 * @param {string} elementId - The ID of the certificate container element.
 */
function generateCertificatePDF(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        alert('Certificate element not found.');
        return;
    }

    // Show loading state (optional)
    const btn = document.getElementById('downloadPdfBtn');
    const originalText = btn.textContent;
    btn.textContent = 'Generating PDF...';
    btn.disabled = true;

    // Ensure the element is fully rendered
    // Use html2pdf with A4 settings
    const opt = {
        margin:        [15, 12, 15, 12], // top, right, bottom, left (in mm)
        filename:     'Membership_Certificate.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false, letterRendering: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Wait for any images to load (especially the Cloudinary photo)
    const images = element.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
        generate();
        return;
    }

    images.forEach(img => {
        if (img.complete) {
            loadedCount++;
            if (loadedCount === totalImages) generate();
        } else {
            img.addEventListener('load', () => {
                loadedCount++;
                if (loadedCount === totalImages) generate();
            });
            img.addEventListener('error', () => {
                loadedCount++;
                if (loadedCount === totalImages) generate();
            });
        }
    });

    function generate() {
        html2pdf()
            .set(opt)
            .from(element)
            .save()
            .then(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            })
            .catch((err) => {
                console.error('PDF generation error:', err);
                alert('Failed to generate PDF. Please try again.');
                btn.textContent = originalText;
                btn.disabled = false;
            });
    }
}

// Expose function globally (already global)
console.log('Certificate PDF generator loaded.');
