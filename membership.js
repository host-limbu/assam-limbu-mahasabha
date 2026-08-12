/* ============================================================
   MEMBERSHIP APPLICATION — Assam Limbu Mahasabha
   Form logic, validation, Cloudinary upload, Firebase submission
   ============================================================ */

(function() {
    'use strict';

    // Wait for Firebase to load
    if (typeof firebase === 'undefined') {
        console.error('Firebase not loaded. Check firebase-config.js');
        return;
    }

    // DOM references
    const form = document.getElementById('membership-form');
    const photoInput = document.getElementById('photo');
    const photoPreview = document.getElementById('photo-preview');
    const photoUploadStatus = document.getElementById('photo-upload-status');
    const submitBtn = document.getElementById('submit-btn');
    const educationOtherGroup = document.getElementById('education-other-group');

    // Cloudinary config
    const CLOUDINARY_CLOUD_NAME = 'nhxuht4e';
    const CLOUDINARY_UPLOAD_PRESET = 'membership_upload';
    const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

    // State
    let uploadedPhotoURL = '';
    let isSubmitting = false;
    let currentUser = null;

    // ============================================================
    // 1. EDUCATION — Show/Hide "Other" field
    // ============================================================
    const educationSelect = document.getElementById('education');
    if (educationSelect && educationOtherGroup) {
        educationSelect.addEventListener('change', function() {
            if (this.value === 'Other') {
                educationOtherGroup.style.display = 'block';
            } else {
                educationOtherGroup.style.display = 'none';
                document.getElementById('education-other').value = '';
            }
        });
        // Initial state
        if (educationSelect.value === 'Other') {
            educationOtherGroup.style.display = 'block';
        }
    }

    // ============================================================
    // 2. PHOTO — Preview & Upload to Cloudinary
    // ============================================================
    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;

            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload a JPEG or PNG image.');
                photoInput.value = '';
                return;
            }

            // Validate file size (max 5 MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size exceeds 5 MB. Please compress or choose a smaller image.');
                photoInput.value = '';
                return;
            }

            // Preview
            const reader = new FileReader();
            reader.onload = function(e) {
                photoPreview.src = e.target.result;
                photoPreview.style.display = 'block';
                photoUploadStatus.textContent = 'Uploading...';
                photoUploadStatus.style.color = '#475569';

                // Upload to Cloudinary
                uploadToCloudinary(file);
            };
            reader.readAsDataURL(file);
        });
    }

    function uploadToCloudinary(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', 'membership');

        fetch(CLOUDINARY_UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Upload failed: ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            uploadedPhotoURL = data.secure_url;
            photoUploadStatus.textContent = 'Upload successful';
            photoUploadStatus.style.color = '#22c55e';
            console.log('Photo uploaded:', uploadedPhotoURL);
        })
        .catch(function(error) {
            console.error('Cloudinary upload error:', error);
            photoUploadStatus.textContent = 'Upload failed. Please try again.';
            photoUploadStatus.style.color = '#ef4444';
            photoInput.value = '';
            photoPreview.style.display = 'none';
            uploadedPhotoURL = '';
        });
    }

    // ============================================================
    // 3. FORM SUBMISSION
    // ============================================================
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Prevent double submission
            if (isSubmitting) return;
            isSubmitting = true;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            // Validate photo uploaded
            if (!uploadedPhotoURL) {
                alert('Please upload a passport photo.');
                isSubmitting = false;
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Application';
                return;
            }

            // Collect form data
            const formData = collectFormData();

            // Validate required fields
            if (!validateForm(formData)) {
                isSubmitting = false;
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Application';
                return;
            }

            // Generate reference number
            generateReferenceNumber(function(refNumber) {
                if (!refNumber) {
                    alert('Error generating reference number. Please try again.');
                    isSubmitting = false;
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit Application';
                    return;
                }

                // Build application object
                const application = {
                    applicant: formData,
                    status: 'DA',
                    referenceNumber: refNumber,
                    submittedAt: firebase.database.ServerValue.TIMESTAMP,
                    updatedAt: firebase.database.ServerValue.TIMESTAMP,
                    daRemarks: '',
                    presidentRemarks: '',
                    aaRemarks: '',
                    history: {
                        submitted: {
                            action: 'submitted',
                            actorUID: 'public',
                            actorRole: 'applicant',
                            remark: 'Application submitted successfully.',
                            timestamp: firebase.database.ServerValue.TIMESTAMP,
                            fromStatus: 'Pending',
                            toStatus: 'DA'
                        }
                    }
                };

                // Save to Firebase
                const dbRef = firebase.database().ref('assam-limbu-mahasabha/applications/' + refNumber);
                dbRef.set(application)
                    .then(function() {
                        // Show success
                        showAcknowledgement(refNumber);
                        form.reset();
                        photoPreview.style.display = 'none';
                        uploadedPhotoURL = '';
                        photoUploadStatus.textContent = '';
                        isSubmitting = false;
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Submit Application';
                    })
                    .catch(function(error) {
                        console.error('Save error:', error);
                        alert('Error saving application. Please try again.');
                        isSubmitting = false;
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Submit Application';
                    });
            });
        });
    }

    // ============================================================
    // 4. COLLECT FORM DATA
    // ============================================================
    function collectFormData() {
        return {
            // Membership Type
            membershipType: getValue('membership-type'),

            // Name
            firstName: getValue('first-name'),
            secondName: getValue('second-name'),

            // Personal
            dob: getValue('dob'),
            email: getValue('email'),
            phone: getValue('phone'),
            altPhone: getValue('alt-phone'),

            // Education
            education: getValue('education'),
            educationOther: getValue('education-other'),

            // Blood Group
            bloodGroup: getValue('blood-group'),

            // Address
            district: getValue('district'),
            lac: getValue('lac'),
            village: getValue('village'),
            postOffice: getValue('post-office'),
            policeStation: getValue('police-station'),
            pin: getValue('pin'),

            // Family Status
            familyMale: parseInt(getValue('family-male')) || 0,
            familyFemale: parseInt(getValue('family-female')) || 0,
            familyTotal: parseInt(getValue('family-total')) || 0,

            // Other Information
            houseType: getValue('house-type'),
            landStatus: getValue('land-status'),
            vehicleOwned: getValue('vehicle-owned'),
            beltBlock: getValue('belt-block'),
            autonomousCouncil: getValue('autonomous-council'),
            govScheme: getValue('gov-scheme'),
            govEmployees: parseInt(getValue('gov-employees')) || 0,

            // Photo
            photoURL: uploadedPhotoURL,

            // Declaration
            termsAccepted: document.getElementById('terms') ? document.getElementById('terms').checked : false,
            selfDeclaration: document.getElementById('self-declaration') ? document.getElementById('self-declaration').checked : false
        };
    }

    // ============================================================
    // 5. VALIDATION
    // ============================================================
    function validateForm(data) {
        // Required fields
        const required = [
            'firstName', 'secondName', 'dob', 'email', 'phone',
            'membershipType', 'education', 'bloodGroup',
            'district', 'lac', 'village', 'postOffice', 'policeStation', 'pin',
            'familyMale', 'familyFemale', 'familyTotal',
            'houseType', 'landStatus', 'vehicleOwned', 'beltBlock',
            'autonomousCouncil', 'govScheme'
        ];

        for (var i = 0; i < required.length; i++) {
            var key = required[i];
            var val = data[key];
            if (val === undefined || val === null || val === '' || val === 'Please Select') {
                alert('Please fill in all required fields.');
                return false;
            }
        }

        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        // Phone validation
        var phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(data.phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return false;
        }

        // PIN validation
        var pinRegex = /^[0-9]{6}$/;
        if (!pinRegex.test(data.pin)) {
            alert('Please enter a valid 6-digit PIN code.');
            return false;
        }

        // Family total validation
        if (data.familyTotal !== (data.familyMale + data.familyFemale)) {
            alert('Total family members should equal the sum of Male and Female members.');
            return false;
        }

        // Terms & Declaration
        if (!data.termsAccepted) {
            alert('Please accept the Terms and Conditions.');
            return false;
        }
        if (!data.selfDeclaration) {
            alert('Please accept the Self-Declaration.');
            return false;
        }

        return true;
    }

    // ============================================================
    // 6. GENERATE REFERENCE NUMBER
    // ============================================================
    function generateReferenceNumber(callback) {
        var counterRef = firebase.database().ref('assam-limbu-mahasabha/config/counters/application');

        counterRef.transaction(function(current) {
            return (current || 0) + 1;
        }, function(error, committed, snapshot) {
            if (error) {
                console.error('Counter error:', error);
                callback(null);
                return;
            }
            if (committed) {
                var year = new Date().getFullYear();
                var num = snapshot.val();
                var refNumber = 'ALM-' + year + '-' + String(num).padStart(4, '0');
                callback(refNumber);
            } else {
                callback(null);
            }
        }, false);
    }

    // ============================================================
    // 7. SHOW ACKNOWLEDGEMENT
    // ============================================================
    function showAcknowledgement(refNumber) {
        // Hide form, show receipt
        var formContainer = document.getElementById('form-container');
        var receiptContainer = document.getElementById('receipt-container');

        if (formContainer) formContainer.style.display = 'none';
        if (receiptContainer) {
            receiptContainer.style.display = 'block';
            var refDisplay = receiptContainer.querySelector('.reference-number');
            if (refDisplay) refDisplay.textContent = refNumber;

            // Set current date
            var dateDisplay = receiptContainer.querySelector('.submission-date');
            if (dateDisplay) {
                var now = new Date();
                dateDisplay.textContent = now.toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                });
            }
        }

        // Scroll to top to show receipt
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ============================================================
    // 8. HELPER: Get value by ID
    // ============================================================
    function getValue(id) {
        var el = document.getElementById(id);
        return el ? el.value : '';
    }

    // ============================================================
    // 9. AUTO-CALCULATE FAMILY TOTAL
    // ============================================================
    var familyMale = document.getElementById('family-male');
    var familyFemale = document.getElementById('family-female');
    var familyTotal = document.getElementById('family-total');

    if (familyMale && familyFemale && familyTotal) {
        function updateTotal() {
            var male = parseInt(familyMale.value) || 0;
            var female = parseInt(familyFemale.value) || 0;
            familyTotal.value = male + female;
        }
        familyMale.addEventListener('input', updateTotal);
        familyFemale.addEventListener('input', updateTotal);
    }

    // ============================================================
    // 10. CHECK STATUS — Public function for check-status.html
    // ============================================================
    window.checkApplicationStatus = function(refNumber) {
        return new Promise(function(resolve, reject) {
            var appRef = firebase.database().ref('assam-limbu-mahasabha/applications/' + refNumber);
            appRef.once('value').then(function(snapshot) {
                var data = snapshot.val();
                if (data) {
                    resolve(data);
                } else {
                    reject(new Error('Application not found.'));
                }
            }).catch(function(error) {
                reject(error);
            });
        });
    };

    console.log('membership.js loaded successfully.');
})();
