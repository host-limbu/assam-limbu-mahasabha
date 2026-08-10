/* ============================================================
   LANGUAGE SWITCHER — Real translation system
   ============================================================ */

(function() {
    'use strict';

    // ------------------------------------------------------------------
    // 1. TRANSLATION DICTIONARY
    //    Each language has a key-value map for all translatable text.
    //    Keys must match the data-i18n attributes on elements.
    // ------------------------------------------------------------------
    const translations = {
        en: {
            // Header
            'logo-sub': 'Karbi Anglong & Dima Hasao District Committee',
            'nav-home': 'Home',
            'nav-about': 'About',
            'nav-about-us': 'About Us',
            'nav-history': 'History',
            'nav-vision': 'Vision & Mission',
            'nav-committee': 'Committee',
            'nav-updates': 'Updates',
            'nav-latest': 'Latest Updates',
            'nav-archive': 'Archive',
            'nav-events': 'Events',
            'nav-gallery': 'Gallery',
            'nav-membership': 'Membership',
            'nav-documents': 'Documents',
            'nav-contact': 'Contact',
            'search-placeholder': 'Search the site…',
            'search-button': 'Search',

            // Hero
            'hero-tag': 'Assam Limbu Mahasabha',
            'hero-title': 'Karbi Anglong & Dima Hasao<br />District Committee',
            'hero-description': 'Preserving Limbu culture, heritage and community values across the hills of Assam since 1972.',
            'hero-btn-learn': 'Learn More',
            'hero-btn-join': 'Join Us',

            // About Preview
            'about-label': 'About Us',
            'about-title': 'Strengthening the Limbu Community',
            'about-text-1': 'The Assam Limbu Mahasabha, Karbi Anglong & Dima Hasao District Committee, is dedicated to the social, cultural and educational upliftment of the Limbu community in the hill districts of Assam.',
            'about-text-2': 'We work to preserve our rich heritage, promote our language and script, and foster unity among Limbu families across the region.',
            'about-btn': 'Read More',

            // Stats
            'stat-years': 'Years of Service',
            'stat-villages': 'Villages Connected',
            'stat-members': 'Community Members',

            // Events Section
            'events-label': 'Events',
            'events-title': 'Upcoming & Recent Events',
            'events-view-all': 'View All Events',
            'event-badge-upcoming': 'Upcoming',
            'event-badge-past': 'Past',
            'event-learn-more': 'Learn More',

            // Updates Section
            'updates-label': 'Updates',
            'updates-title': 'Latest News & Announcements',
            'updates-view-all': 'View All Updates',
            'update-read-more': 'Read More',

            // Gallery Section
            'gallery-label': 'Gallery',
            'gallery-title': 'Moments from Our Community',
            'gallery-view-all': 'View Full Gallery',

            // Membership CTA
            'membership-cta-title': 'Become a Member',
            'membership-cta-text': 'Join the Assam Limbu Mahasabha and contribute to the growth and welfare of the Limbu community in Karbi Anglong and Dima Hasao districts.',
            'membership-cta-btn': 'Apply Now',

            // Footer
            'footer-brand': 'Assam Limbu Mahasabha',
            'footer-sub': 'Karbi Anglong & Dima Hasao District Committee',
            'footer-address': 'Diphu, Karbi Anglong, Assam — 782460',
            'footer-quick-links': 'Quick Links',
            'footer-resources': 'Resources',
            'footer-connect': 'Connect',
            'footer-copyright': '© 2026 Assam Limbu Mahasabha — Karbi Anglong & Dima Hasao District Committee. All rights reserved.',
            'footer-credit': 'Designed with care for the Limbu community.',
            'footer-social-facebook': 'Facebook',
            'footer-social-youtube': 'YouTube',
            'footer-social-instagram': 'Instagram',
            'footer-social-email': 'Email',

            // Pagination
            'page-prev': 'Previous',
            'page-next': 'Next',

            // 404 page
            'error-title': 'Page Not Found',
            'error-description': 'The page you are looking for may have been moved, deleted, or never existed. Please check the URL or navigate back to the homepage.',
            'error-home': 'Go to Homepage',
            'error-contact': 'Contact Us',
            'popular-pages': 'Popular Pages',

            // Committee page
            'committee-hero-title': 'Our Leadership Team',
            'committee-hero-desc': 'Dedicated community leaders working for the welfare of the Limbu community in Karbi Anglong and Dima Hasao.',
            'committee-term': '2026–2028 Term',
            'committee-title': 'Elected Committee Members',
            'committee-advisory': 'Eminent Advisors',
            'committee-structure': 'Committee Structure',
            'committee-cta-title': 'Want to Contribute?',
            'committee-cta-text': 'The committee is always looking for dedicated individuals to serve the community. Whether you have expertise in culture, education, or social work, we welcome you.',
            'committee-cta-btn': 'Join the Committee',

            // About page
            'about-hero-title': 'Preserving Limbu Heritage<br />Since 1972',
            'about-hero-desc': 'The Assam Limbu Mahasabha, Karbi Anglong & Dima Hasao District Committee, has been serving the Limbu community for over five decades.',
            'about-story-label': 'Our Story',
            'about-story-title': 'A Legacy of Community Service',
            'about-vision-label': 'Our Guiding Principles',
            'about-vision-title': 'Vision & Mission',
            'about-values-label': 'What We Stand For',
            'about-values-title': 'Our Core Values',
            'about-district-label': 'Our District',
            'about-district-title': 'Karbi Anglong & Dima Hasao',
            'about-committee-cta': 'Meet Our Committee',

            // Event pages (common)
            'event-back': 'Back to Events',
            'event-location': 'Location',
            'event-schedule': 'Program Schedule',

            // Update pages
            'update-back': 'Back to Updates',
            'update-category': 'Category',

            // Membership
            'membership-hero-title': 'Become a Member',
            'membership-hero-desc': 'Support the Limbu community, preserve our culture, and contribute to the welfare of our people. Membership is open to all community members.',
            'membership-benefits-title': 'Membership Benefits',
            'membership-types-title': 'Choose Your Membership',
            'membership-apply-title': 'Membership Application',
            'membership-apply-desc': 'Fill in the details below to apply for membership. We will contact you within 3–5 working days.',
            'membership-form-name': 'Full Name',
            'membership-form-email': 'Email Address',
            'membership-form-phone': 'Phone Number',
            'membership-form-address': 'Address',
            'membership-form-type': 'Membership Type',
            'membership-form-message': 'Additional Information (optional)',
            'membership-form-submit': 'Submit Application',
            'membership-form-note': 'We will contact you within 3–5 working days.',
            'membership-type-regular': 'Regular Member (Free)',
            'membership-type-life': 'Life Member (₹1,000)',
            'membership-type-patron': 'Patron Member (₹5,000+)',

            // Documents
            'documents-hero-title': 'Official Documents',
            'documents-hero-desc': 'Access important documents, reports, and resources from the district committee.',
            'documents-title': 'Available Documents',
            'documents-cat-constitution': 'Constitution & Bylaws',
            'documents-cat-reports': 'Annual Reports',
            'documents-cat-minutes': 'Minutes of Meetings',
            'documents-cat-policies': 'Policies & Guidelines',
            'documents-cat-forms': 'Forms',
            'documents-cat-publications': 'Reports & Publications',

            // Contact
            'contact-hero-title': 'Contact Us',
            'contact-hero-desc': 'Have questions, suggestions, or want to get involved? Reach out to the district committee. We\'d love to hear from you.',
            'contact-info-title': 'Contact Information',
            'contact-form-title': 'Send a Message',
            'contact-form-name': 'Your Name',
            'contact-form-email': 'Email Address',
            'contact-form-subject': 'Subject',
            'contact-form-message': 'Message',
            'contact-form-submit': 'Send Message',
            'contact-office-hours': 'Office Hours',
            'contact-follow': 'Follow Us',
            'contact-location': 'Location',
            'contact-map-link': 'View on Google Maps',

            // History
            'history-hero-title': 'A Journey of Service<br />Since 1972',
            'history-hero-desc': 'Tracing the history of the Assam Limbu Mahasabha and its commitment to the Limbu community in Karbi Anglong and Dima Hasao.',
            'history-timeline-title': 'Key Milestones',
            'history-founding-title': 'How It All Began',
            'history-legacy-title': 'Carrying the Torch Forward',

            // Vision
            'vision-hero-title': 'Vision & Mission',
            'vision-hero-desc': 'Guiding principles that shape our work and define our commitment to the Limbu community in Karbi Anglong and Dima Hasao.',
            'vision-title': 'Looking Ahead',
            'vision-mission-title': 'What We Do',
            'vision-values-title': 'What We Believe In',
            'vision-goals-title': 'Our Roadmap for 2026–2028',

            // Archive
            'archive-hero-title': 'Past Updates',
            'archive-hero-desc': 'Browse through our archive of past news, announcements, and community updates.',
            'archive-title': 'All Archived Updates',
            'archive-view-latest': 'View Latest Updates',

            // Gallery
            'gallery-hero-title': 'Moments from Our Community',
            'gallery-hero-desc': 'A visual journey through the cultural events, gatherings, and activities of the Limbu community in Karbi Anglong and Dima Hasao.',
            'gallery-title': 'Community Memories',
            'gallery-cta-title': 'Share Your Photos',
            'gallery-cta-desc': 'Have photos from community events? Share them with us and help preserve our memories.',
            'gallery-cta-btn': 'Contact Us',
        },

        hi: {
            // Header
            'logo-sub': 'कार्बी आंगलोंग और डिमा हसाओ जिला समिति',
            'nav-home': 'होम',
            'nav-about': 'हमारे बारे में',
            'nav-about-us': 'हमारे बारे में',
            'nav-history': 'इतिहास',
            'nav-vision': 'दृष्टि और मिशन',
            'nav-committee': 'समिति',
            'nav-updates': 'अपडेट',
            'nav-latest': 'ताज़ा अपडेट',
            'nav-archive': 'पुरालेख',
            'nav-events': 'कार्यक्रम',
            'nav-gallery': 'गैलरी',
            'nav-membership': 'सदस्यता',
            'nav-documents': 'दस्तावेज़',
            'nav-contact': 'संपर्क',
            'search-placeholder': 'साइट खोजें…',
            'search-button': 'खोज',

            // Hero
            'hero-tag': 'असम लिम्बू महासभा',
            'hero-title': 'कार्बी आंगलोंग और डिमा हसाओ<br />जिला समिति',
            'hero-description': '1972 से असम की पहाड़ियों में लिम्बू संस्कृति, विरासत और सामुदायिक मूल्यों का संरक्षण।',
            'hero-btn-learn': 'अधिक जानें',
            'hero-btn-join': 'हमसे जुड़ें',

            // About Preview
            'about-label': 'हमारे बारे में',
            'about-title': 'लिम्बू समुदाय को मजबूत करना',
            'about-text-1': 'असम लिम्बू महासभा, कार्बी आंगलोंग और डिमा हसाओ जिला समिति, असम के पहाड़ी जिलों में लिम्बू समुदाय के सामाजिक, सांस्कृतिक और शैक्षिक उत्थान के लिए समर्पित है।',
            'about-text-2': 'हम अपनी समृद्ध विरासत को संरक्षित करने, अपनी भाषा और लिपि को बढ़ावा देने और पूरे क्षेत्र में लिम्बू परिवारों के बीच एकता को बढ़ावा देने के लिए काम करते हैं।',
            'about-btn': 'और पढ़ें',

            // Stats
            'stat-years': 'सेवा के वर्ष',
            'stat-villages': 'जुड़े गाँव',
            'stat-members': 'समुदाय के सदस्य',

            // Events Section
            'events-label': 'कार्यक्रम',
            'events-title': 'आगामी और हाल के कार्यक्रम',
            'events-view-all': 'सभी कार्यक्रम देखें',
            'event-badge-upcoming': 'आगामी',
            'event-badge-past': 'पिछला',
            'event-learn-more': 'और जानें',

            // Updates Section
            'updates-label': 'अपडेट',
            'updates-title': 'ताज़ा समाचार और घोषणाएँ',
            'updates-view-all': 'सभी अपडेट देखें',
            'update-read-more': 'और पढ़ें',

            // Gallery Section
            'gallery-label': 'गैलरी',
            'gallery-title': 'हमारे समुदाय के पल',
            'gallery-view-all': 'पूरी गैलरी देखें',

            // Membership CTA
            'membership-cta-title': 'सदस्य बनें',
            'membership-cta-text': 'असम लिम्बू महासभा में शामिल हों और कार्बी आंगलोंग और डिमा हसाओ जिलों में लिम्बू समुदाय के विकास और कल्याण में योगदान दें।',
            'membership-cta-btn': 'अभी आवेदन करें',

            // Footer
            'footer-brand': 'असम लिम्बू महासभा',
            'footer-sub': 'कार्बी आंगलोंग और डिमा हसाओ जिला समिति',
            'footer-address': 'दीफू, कार्बी आंगलोंग, असम — ७८२४६०',
            'footer-quick-links': 'त्वरित लिंक',
            'footer-resources': 'संसाधन',
            'footer-connect': 'संपर्क करें',
            'footer-copyright': '© २०२६ असम लिम्बू महासभा — कार्बी आंगलोंग और डिमा हसाओ जिला समिति। सभी अधिकार सुरक्षित।',
            'footer-credit': 'लिम्बू समुदाय के लिए स्नेह के साथ डिज़ाइन किया गया।',
            'footer-social-facebook': 'फेसबुक',
            'footer-social-youtube': 'यूट्यूब',
            'footer-social-instagram': 'इंस्टाग्राम',
            'footer-social-email': 'ईमेल',

            // Pagination
            'page-prev': 'पिछला',
            'page-next': 'अगला',

            // 404 page
            'error-title': 'पृष्ठ नहीं मिला',
            'error-description': 'आप जिस पृष्ठ को खोज रहे हैं वह स्थानांतरित, हटाया गया या कभी अस्तित्व में नहीं हो सकता है। कृपया यूआरएल जांचें या होमपेज पर वापस जाएं।',
            'error-home': 'होमपेज पर जाएं',
            'error-contact': 'संपर्क करें',
            'popular-pages': 'लोकप्रिय पृष्ठ',

            // Committee page
            'committee-hero-title': 'हमारी नेतृत्व टीम',
            'committee-hero-desc': 'कार्बी आंगलोंग और डिमा हसाओ में लिम्बू समुदाय के कल्याण के लिए समर्पित समुदायिक नेता।',
            'committee-term': '२०२६–२०२८ कार्यकाल',
            'committee-title': 'निर्वाचित समिति सदस्य',
            'committee-advisory': 'सलाहकार बोर्ड',
            'committee-structure': 'समिति संरचना',
            'committee-cta-title': 'योगदान देना चाहते हैं?',
            'committee-cta-text': 'समिति हमेशा समुदाय की सेवा के लिए समर्पित व्यक्तियों की तलाश में रहती है। चाहे आपको संस्कृति, शिक्षा या सामाजिक कार्यों में विशेषज्ञता हो, हम आपका स्वागत करते हैं।',
            'committee-cta-btn': 'समिति में शामिल हों',

            // About page
            'about-hero-title': 'लिम्बू विरासत का संरक्षण<br />१९७२ से',
            'about-hero-desc': 'असम लिम्बू महासभा, कार्बी आंगलोंग और डिमा हसाओ जिला समिति, पाँच दशकों से लिम्बू समुदाय की सेवा कर रही है।',
            'about-story-label': 'हमारी कहानी',
            'about-story-title': 'सामुदायिक सेवा की विरासत',
            'about-vision-label': 'हमारे मार्गदर्शक सिद्धांत',
            'about-vision-title': 'दृष्टि और मिशन',
            'about-values-label': 'हम किसके लिए खड़े हैं',
            'about-values-title': 'हमारे मूल मूल्य',
            'about-district-label': 'हमारा जिला',
            'about-district-title': 'कार्बी आंगलोंग और डिमा हसाओ',
            'about-committee-cta': 'हमारी समिति से मिलें',

            // Event pages (common)
            'event-back': 'कार्यक्रमों पर वापस जाएं',
            'event-location': 'स्थान',
            'event-schedule': 'कार्यक्रम अनुसूची',

            // Update pages
            'update-back': 'अपडेट पर वापस जाएं',
            'update-category': 'श्रेणी',

            // Membership
            'membership-hero-title': 'सदस्य बनें',
            'membership-hero-desc': 'लिम्बू समुदाय का समर्थन करें, हमारी संस्कृति को संरक्षित करें, और अपने लोगों के कल्याण में योगदान दें। सदस्यता सभी समुदाय के सदस्यों के लिए खुली है।',
            'membership-benefits-title': 'सदस्यता लाभ',
            'membership-types-title': 'अपनी सदस्यता चुनें',
            'membership-apply-title': 'सदस्यता आवेदन',
            'membership-apply-desc': 'सदस्यता के लिए आवेदन करने के लिए नीचे दिए गए विवरण भरें। हम ३–५ कार्य दिवसों के भीतर आपसे संपर्क करेंगे।',
            'membership-form-name': 'पूरा नाम',
            'membership-form-email': 'ईमेल पता',
            'membership-form-phone': 'फोन नंबर',
            'membership-form-address': 'पता',
            'membership-form-type': 'सदस्यता प्रकार',
            'membership-form-message': 'अतिरिक्त जानकारी (वैकल्पिक)',
            'membership-form-submit': 'आवेदन जमा करें',
            'membership-form-note': 'हम ३–५ कार्य दिवसों के भीतर आपसे संपर्क करेंगे।',
            'membership-type-regular': 'नियमित सदस्य (मुफ्त)',
            'membership-type-life': 'आजीवन सदस्य (₹१,०००)',
            'membership-type-patron': 'संरक्षक सदस्य (₹५,०००+)',

            // Documents
            'documents-hero-title': 'आधिकारिक दस्तावेज़',
            'documents-hero-desc': 'जिला समिति से महत्वपूर्ण दस्तावेज़, रिपोर्ट और संसाधनों तक पहुँचें।',
            'documents-title': 'उपलब्ध दस्तावेज़',
            'documents-cat-constitution': 'संविधान और उपनियम',
            'documents-cat-reports': 'वार्षिक रिपोर्ट',
            'documents-cat-minutes': 'बैठक के कार्यवृत्त',
            'documents-cat-policies': 'नीतियाँ और दिशानिर्देश',
            'documents-cat-forms': 'फॉर्म',
            'documents-cat-publications': 'रिपोर्ट और प्रकाशन',

            // Contact
            'contact-hero-title': 'संपर्क करें',
            'contact-hero-desc': 'कोई प्रश्न, सुझाव या शामिल होना चाहते हैं? जिला समिति से संपर्क करें। हम आपसे सुनना पसंद करेंगे।',
            'contact-info-title': 'संपर्क जानकारी',
            'contact-form-title': 'संदेश भेजें',
            'contact-form-name': 'आपका नाम',
            'contact-form-email': 'ईमेल पता',
            'contact-form-subject': 'विषय',
            'contact-form-message': 'संदेश',
            'contact-form-submit': 'संदेश भेजें',
            'contact-office-hours': 'कार्यालय समय',
            'contact-follow': 'हमें फॉलो करें',
            'contact-location': 'स्थान',
            'contact-map-link': 'गूगल मैप्स पर देखें',

            // History
            'history-hero-title': 'सेवा की यात्रा<br />१९७२ से',
            'history-hero-desc': 'असम लिम्बू महासभा के इतिहास और कार्बी आंगलोंग और डिमा हसाओ में लिम्बू समुदाय के प्रति इसकी प्रतिबद्धता का पता लगाना।',
            'history-timeline-title': 'प्रमुख मील के पत्थर',
            'history-founding-title': 'यह सब कैसे शुरू हुआ',
            'history-legacy-title': 'आगे विरासत को आगे बढ़ाना',

            // Vision
            'vision-hero-title': 'दृष्टि और मिशन',
            'vision-hero-desc': 'हमारे काम को आकार देने वाले और कार्बी आंगलोंग और डिमा हसाओ में लिम्बू समुदाय के प्रति हमारी प्रतिबद्धता को परिभाषित करने वाले मार्गदर्शक सिद्धांत।',
            'vision-title': 'आगे देखना',
            'vision-mission-title': 'हम क्या करते हैं',
            'vision-values-title': 'हम किस पर विश्वास करते हैं',
            'vision-goals-title': '२०२६–२०२८ के लिए हमारा रोडमैप',

            // Archive
            'archive-hero-title': 'पुराने अपडेट',
            'archive-hero-desc': 'पिछली समाचार, घोषणाओं और सामुदायिक अपडेट के हमारे पुरालेख को ब्राउज़ करें।',
            'archive-title': 'सभी संग्रहीत अपडेट',
            'archive-view-latest': 'नवीनतम अपडेट देखें',

            // Gallery
            'gallery-hero-title': 'हमारे समुदाय के पल',
            'gallery-hero-desc': 'कार्बी आंगलोंग और डिमा हसाओ में लिम्बू समुदाय के सांस्कृतिक कार्यक्रमों, समारोहों और गतिविधियों के माध्यम से एक दृश्य यात्रा।',
            'gallery-title': 'सामुदायिक यादें',
            'gallery-cta-title': 'अपनी तस्वीरें साझा करें',
            'gallery-cta-desc': 'सामुदायिक कार्यक्रमों से तस्वीरें हैं? उन्हें हमारे साथ साझा करें और हमारी यादों को संरक्षित करने में मदद करें।',
            'gallery-cta-btn': 'संपर्क करें',
        },

        as: {
            // Header
            'logo-sub': 'কাৰ্বি আংলং আৰু ডিমা হাছাও জিলা সমিতি',
            'nav-home': 'মুখ্য পৃষ্ঠা',
            'nav-about': 'আমাৰ বিষয়ে',
            'nav-about-us': 'আমাৰ বিষয়ে',
            'nav-history': 'ইতিহাস',
            'nav-vision': 'দৃষ্টি আৰু মিছন',
            'nav-committee': 'সমিতি',
            'nav-updates': 'আপডেট',
            'nav-latest': 'শেহতীয়া আপডেট',
            'nav-archive': 'অভিলেখ',
            'nav-events': 'কাৰ্যসূচী',
            'nav-gallery': 'গেলেৰী',
            'nav-membership': 'সদস্যপদ',
            'nav-documents': 'দস্তাবেজ',
            'nav-contact': 'যোগাযোগ',
            'search-placeholder': 'ছাইটত বিচাৰক…',
            'search-button': 'সন্ধান কৰক',

            // Hero
            'hero-tag': 'অসম লিম্বু মহাসভা',
            'hero-title': 'কাৰ্বি আংলং আৰু ডিমা হাছাও<br />জিলা সমিতি',
            'hero-description': '১৯৭২ চনৰ পৰা অসমৰ পাহাৰীয়া অঞ্চলত লিম্বু সংস্কৃতি, ঐতিহ্য আৰু সম্প্ৰদায়িক মূল্যবোধ সংৰক্ষণ।',
            'hero-btn-learn': 'অধিক জানক',
            'hero-btn-join': 'আমাৰ সৈতে যোগদান কৰক',

            // About Preview
            'about-label': 'আমাৰ বিষয়ে',
            'about-title': 'লিম্বু সম্প্ৰদায়ক সবলীকৰণ',
            'about-text-1': 'অসম লিম্বু মহাসভা, কাৰ্বি আংলং আৰু ডিমা হাছাও জিলা সমিতি, অসমৰ পাহাৰীয়া জিলাসমূহত লিম্বু সম্প্ৰদায়ৰ সামাজিক, সাংস্কৃতিক আৰু শিক্ষাগত উন্নয়নৰ বাবে নিবেদিত।',
            'about-text-2': 'আমি আমাৰ সমৃদ্ধ ঐতিহ্য সংৰক্ষণ, আমাৰ ভাষা আৰু লিপি প্ৰচাৰ, আৰু সমগ্ৰ অঞ্চলত লিম্বু পৰিয়ালৰ মাজত একতা বৃদ্ধি কৰাৰ বাবে কাম কৰো।',
            'about-btn': 'অধিক পঢ়ক',

            // Stats
            'stat-years': 'সেৱাৰ বছৰ',
            'stat-villages': 'সংযুক্ত গাওঁ',
            'stat-members': 'সম্প্ৰদায়ৰ সদস্য',

            // Events Section
            'events-label': 'কাৰ্যসূচী',
            'events-title': 'আগামী আৰু সাম্প্ৰতিক কাৰ্যসূচী',
            'events-view-all': 'সকলো কাৰ্যসূচী চাওক',
            'event-badge-upcoming': 'আগামী',
            'event-badge-past': 'অতীত',
            'event-learn-more': 'অধিক জানক',

            // Updates Section
            'updates-label': 'আপডেট',
            'updates-title': 'শেহতীয়া বাতৰি আৰু ঘোষণা',
            'updates-view-all': 'সকলো আপডেট চাওক',
            'update-read-more': 'অধিক পঢ়ক',

            // Gallery Section
            'gallery-label': 'গেলেৰী',
            'gallery-title': 'আমাৰ সম্প্ৰদায়ৰ মুহূৰ্তসমূহ',
            'gallery-view-all': 'সম্পূৰ্ণ গেলেৰী চাওক',

            // Membership CTA
            'membership-cta-title': 'সদস্য হওক',
            'membership-cta-text': 'অসম লিম্বু মহাসভাত যোগদান কৰক আৰু কাৰ্বি আংলং আৰু ডিমা হাছাও জিলাসমূহত লিম্বু সম্প্ৰদায়ৰ বিকাশ আৰু কল্যাণত অৰিহণা যোগাওক।',
            'membership-cta-btn': 'এতিয়াই আবেদন কৰক',

            // Footer
            'footer-brand': 'অসম লিম্বু মহাসভা',
            'footer-sub': 'কাৰ্বি আংলং আৰু ডিমা হাছাও জিলা সমিতি',
            'footer-address': 'দীফু, কাৰ্বি আংলং, অসম — ৭৮২৪৬০',
            'footer-quick-links': 'দ্ৰুত লিংক',
            'footer-resources': 'সম্পদ',
            'footer-connect': 'যোগাযোগ',
            'footer-copyright': '© ২০২৬ অসম লিম্বু মহাসভা — কাৰ্বি আংলং আৰু ডিমা হাছাও জিলা সমিতি। সকলো অধিকাৰ সংৰক্ষিত।',
            'footer-credit': 'লিম্বু সম্প্ৰদায়ৰ বাবে স্নেহেৰে ডিজাইন কৰা।',
            'footer-social-facebook': 'ফেচবুক',
            'footer-social-youtube': 'ইউটিউব',
            'footer-social-instagram': 'ইন্সটাগ্ৰাম',
            'footer-social-email': 'ইমেইল',

            // Pagination
            'page-prev': 'পূৰ্বৱৰ্তী',
            'page-next': 'পৰৱৰ্তী',

            // 404 page
            'error-title': 'পৃষ্ঠা পোৱা নাযায়',
            'error-description': 'আপুনি বিচৰা পৃষ্ঠাটো স্থানান্তৰিত, মচি পেলোৱা বা কেতিয়াও অস্তিত্ব নথকা হ'ব পাৰে। অনুগ্ৰহ কৰি ইউআৰএল পৰীক্ষা কৰক বা মুখ্য পৃষ্ঠালৈ উভতি যাওক।',
            'error-home': 'মুখ্য পৃষ্ঠালৈ যাওক',
            'error-contact': 'যোগাযোগ কৰক',
            'popular-pages': 'জনপ্ৰিয় পৃষ্ঠাসমূহ',

            // Committee page
            'committee-hero-title': 'আমাৰ নেতৃত্ব দল',
            'committee-hero-desc': 'কাৰ্বি আংলং আৰু ডিমা হাছাওত লিম্বু সম্প্ৰদায়ৰ কল্যাণৰ বাবে সমৰ্পিত সম্প্ৰদায়িক নেতা।',
            'committee-term': '২০২৬–২০২৮ কাৰ্যকাল',
            'committee-title': 'নিৰ্বাচিত সমিতি সদস্য',
            'committee-advisory': 'পৰামৰ্শদাতা বৰ্ড',
            'committee-structure': 'সমিতি গঠন',
            'committee-cta-title': 'অৰিহণা যোগাব বিচাৰে?',
            'committee-cta-text': 'সমিতিয়ে সদায় সম্প্ৰদায়ৰ সেৱাৰ বাবে সমৰ্পিত ব্যক্তিৰ সন্ধান কৰে। আপোনাৰ সংস্কৃতি, শিক্ষা বা সামাজিক কাৰ্যত দক্ষতা থাকক, আমি আপোনাক স্বাগতম জনাও।',
            'committee-cta-btn': 'সমিতিত যোগদান কৰক',

            // About page
            'about-hero-title': 'লিম্বু ঐতিহ্য সংৰক্ষণ<br />১৯৭২ চনৰ পৰা',
            'about-hero-desc': 'অসম লিম্বু মহাসভা, কাৰ্বি আংলং আৰু ডিমা হাছাও জিলা সমিতি, পাঁচ দশক ধৰি লিম্বু সম্প্ৰদায়ৰ সেৱা কৰি আহিছে।',
            'about-story-label': 'আমাৰ কাহিনী',
            'about-story-title': 'সাম্প্ৰদায়িক সেৱাৰ ঐতিহ্য',
            'about-vision-label': 'আমাৰ পথনিৰ্দেশক নীতি',
            'about-vision-title': 'দৃষ্টি আৰু মিছন',
            'about-values-label': 'আমি কিয় বাবে থিয় দিও',
            'about-values-title': 'আমাৰ মূল্যবোধ',
            'about-district-label': 'আমাৰ জিলা',
            'about-district-title': 'কাৰ্বি আংলং আৰু ডিমা হাছাও',
            'about-committee-cta': 'আমাৰ সমিতিৰ সৈতে লগ পাওক',

            // Event pages (common)
            'event-back': 'কাৰ্যসূচীলৈ উভতি যাওক',
            'event-location': 'অৱস্থান',
            'event-schedule': 'কাৰ্যসূচী',

            // Update pages
            'update-back': 'আপডেটলৈ উভতি যাওক',
            'update-category': 'শ্ৰেণী',

            // Membership
            'membership-hero-title': 'সদস্য হওক',
            'membership-hero-desc': 'লিম্বু সম্প্ৰদায়ক সমৰ্থন কৰক, আমাৰ সংস্কৃতি সংৰক্ষণ কৰক, আৰু আমাৰ লোকসকলৰ কল্যাণত অৰিহণা যোগাওক। সদস্যপদ সকলো সম্প্ৰদায়ৰ সদস্যৰ বাবে মুকলি।',
            'membership-benefits-title': 'সদস্যতা সুবিধাসমূহ',
            'membership-types-title': 'আপোনাৰ সদস্যপদ বাছনি কৰক',
            'membership-apply-title': 'সদস্যপদ আবেদন',
            'membership-apply-desc': 'সদস্যপদৰ বাবে আবেদন কৰিবলৈ তলৰ বিবৰণসমূহ পূৰণ কৰক। আমি ৩–৫ কাৰ্য দিনৰ ভিতৰত আপোনাৰ লগত যোগাযোগ কৰিম।',
            'membership-form-name': 'সম্পূৰ্ণ নাম',
            'membership-form-email': 'ইমেইল ঠিকনা',
            'membership-form-phone': 'ফোন নম্বৰ',
            'membership-form-address': 'ঠিকনা',
            'membership-form-type': 'সদস্যপদ প্ৰকাৰ',
            'membership-form-message': 'অতিৰিক্ত তথ্য (ঐচ্ছিক)',
            'membership-form-submit': 'আবেদন জমা দিয়ক',
            'membership-form-note': 'আমি ৩–৫ কাৰ্য দিনৰ ভিতৰত আপোনাৰ লগত যোগাযোগ কৰিম।',
            'membership-type-regular': 'নিয়মীয়া সদস্য (মুক্ত)',
            'membership-type-life': 'আজীৱন সদস্য (₹১,০০০)',
            'membership-type-patron': 'সংৰক্ষক সদস্য (₹৫,০০০+)',

            // Documents
            'documents-hero-title': 'আধিকাৰিক দস্তাবেজ',
            'documents-hero-desc': 'জিলা সমিতিৰ পৰা গুৰুত্বপূৰ্ণ দস্তাবেজ, প্ৰতিবেদন আৰু সম্পদসমূহলৈ প্ৰৱেশ কৰক।',
            'documents-title': 'উপলব্ধ দস্তাবেজ',
            'documents-cat-constitution': 'সংবিধান আৰু উপনিয়ম',
            'documents-cat-reports': 'বাৰ্ষিক প্ৰতিবেদন',
            'documents-cat-minutes': 'বৈঠকৰ কাৰ্যবিবৰণী',
            'documents-cat-policies': 'নীতি আৰু নিৰ্দেশনা',
            'documents-cat-forms': 'ফৰ্ম',
            'documents-cat-publications': 'প্ৰতিবেদন আৰু প্ৰকাশন',

            // Contact
            'contact-hero-title': 'যোগাযোগ কৰক',
            'contact-hero-desc': 'প্ৰশ্ন, পৰামৰ্শ বা জড়িত হ'ব বিচাৰে? জিলা সমিতিলৈ যোগাযোগ কৰক। আমি আপোনাৰ পৰা শুনিবলৈ ভাল পাম।',
            'contact-info-title': 'যোগাযোগৰ তথ্য',
            'contact-form-title': 'বাৰ্তা পঠিয়াওক',
            'contact-form-name': 'আপোনাৰ নাম',
            'contact-form-email': 'ইমেইল ঠিকনা',
            'contact-form-subject': 'বিষয়',
            'contact-form-message': 'বাৰ্তা',
            'contact-form-submit': 'বাৰ্তা পঠিয়াওক',
            'contact-office-hours': 'কাৰ্যালয়ৰ সময়',
            'contact-follow': 'আমাক অনুসৰণ কৰক',
            'contact-location': 'অৱস্থান',
            'contact-map-link': 'গুগল মেপত চাওক',

            // History
            'history-hero-title': 'সেৱাৰ যাত্ৰা<br />১৯৭২ চনৰ পৰা',
            'history-hero-desc': 'অসম লিম্বু মহাসভাৰ ইতিহাস আৰু কাৰ্বি আংলং আৰু ডিমা হাছাওত লিম্বু সম্প্ৰদায়ৰ প্ৰতি ইয়াৰ প্ৰতিশ্ৰুতিৰ সন্ধান।',
            'history-timeline-title': 'প্ৰধান মাইলৰ খুঁটি',
            'history-founding-title': 'কেনেকৈ আৰম্ভ হ'ল',
            'history-legacy-title': 'ঐতিহ্য আগুৱাই নিয়া',

            // Vision
            'vision-hero-title': 'দৃষ্টি আৰু মিছন',
            'vision-hero-desc': 'আমাৰ কামক আকৃতি দিয়া আৰু কাৰ্বি আংলং আৰু ডিমা হাছাওত লিম্বু সম্প্ৰদায়ৰ প্ৰতি আমাৰ প্ৰতিশ্ৰুতি সংজ্ঞায়িত কৰা পথনিৰ্দেশক নীতি।',
            'vision-title': 'আগলৈ চোৱা',
            'vision-mission-title': 'আমি কি কৰো',
            'vision-values-title': 'আমি কিসত বিশ্বাস কৰো',
            'vision-goals-title': '২০২৬–২০২৮ বাবে আমাৰ ৰোডমেপ',

            // Archive
            'archive-hero-title': 'পুৰণা আপডেট',
            'archive-hero-desc': 'পুৰণি বাতৰি, ঘোষণা আৰু সম্প্ৰদায়িক আপডেটৰ আমাৰ অভিলেখ ব্ৰাউজ কৰক।',
            'archive-title': 'সকলো সংগ্ৰহীভূত আপডেট',
            'archive-view-latest': 'শেহতীয়া আপডেট চাওক',

            // Gallery
            'gallery-hero-title': 'আমাৰ সম্প্ৰদায়ৰ মুহূৰ্তসমূহ',
            'gallery-hero-desc': 'কাৰ্বি আংলং আৰু ডিমা হাছাওত লিম্বু সম্প্ৰদায়ৰ সাংস্কৃতিক কাৰ্যসূচী, সমাৰোহ আৰু কাৰ্যকলাপৰ মাজেৰে এক দৃশ্য যাত্ৰা।',
            'gallery-title': 'সাম্প্ৰদায়িক স্মৃতিসমূহ',
            'gallery-cta-title': 'আপোনাৰ ফটো শ্বেয়াৰ কৰক',
            'gallery-cta-desc': 'সাম্প্ৰদায়িক কাৰ্যসূচীৰ পৰা ফটো আছে? আমাৰ সৈতে শ্বেয়াৰ কৰক আৰু আমাৰ স্মৃতিসমূহ সংৰক্ষণ কৰাত সহায় কৰক।',
            'gallery-cta-btn': 'যোগাযোগ কৰক',
        },

        ne: {
            // Header
            'logo-sub': 'कार्बी आंगलोंग र दिमा हसाओ जिल्ला समिति',
            'nav-home': 'गृहपृष्ठ',
            'nav-about': 'हाम्रो बारेमा',
            'nav-about-us': 'हाम्रो बारेमा',
            'nav-history': 'इतिहास',
            'nav-vision': 'दृष्टि र मिसन',
            'nav-committee': 'समिति',
            'nav-updates': 'अपडेट',
            'nav-latest': 'पछिल्ला अपडेट',
            'nav-archive': 'अभिलेख',
            'nav-events': 'कार्यक्रम',
            'nav-gallery': 'ग्यालरी',
            'nav-membership': 'सदस्यता',
            'nav-documents': 'कागजात',
            'nav-contact': 'सम्पर्क',
            'search-placeholder': 'साइट खोज्नुहोस्…',
            'search-button': 'खोजी',

            // Hero
            'hero-tag': 'असम लिम्बू महासभा',
            'hero-title': 'कार्बी आंगलोंग र दिमा हसाओ<br />जिल्ला समिति',
            'hero-description': 'सन् १९७२ देखि असमका पहाडीहरूमा लिम्बू संस्कृति, सम्पदा र सामुदायिक मूल्यहरूको संरक्षण।',
            'hero-btn-learn': 'थप जान्नुहोस्',
            'hero-btn-join': 'हामीसँग जोडिनुहोस्',

            // About Preview
            'about-label': 'हाम्रो बारेमा',
            'about-title': 'लिम्बू समुदायलाई सबलीकरण',
            'about-text-1': 'असम लिम्बू महासभा, कार्बी आंगलोंग र दिमा हसाओ जिल्ला समिति, असमका पहाडी जिल्लाहरूमा लिम्बू समुदायको सामाजिक, सांस्कृतिक र शैक्षिक उत्थानका लागि समर्पित छ।',
            'about-text-2': 'हामी हाम्रो समृद्ध सम्पदाको संरक्षण, हाम्रो भाषा र लिपिको प्रवर्द्धन, र सम्पूर्ण क्षेत्रमा लिम्बू परिवारहरूबीच एकता बढाउन काम गर्छौं।',
            'about-btn': 'थप पढ्नुहोस्',

            // Stats
            'stat-years': 'सेवाका वर्ष',
            'stat-villages': 'जोडिएका गाउँ',
            'stat-members': 'समुदायका सदस्य',

            // Events Section
            'events-label': 'कार्यक्रम',
            'events-title': 'आगामी र हालैका कार्यक्रम',
            'events-view-all': 'सबै कार्यक्रम हेर्नुहोस्',
            'event-badge-upcoming': 'आगामी',
            'event-badge-past': 'विगत',
            'event-learn-more': 'थप जान्नुहोस्',

            // Updates Section
            'updates-label': 'अपडेट',
            'updates-title': 'पछिल्ला समाचार र घोषणाहरू',
            'updates-view-all': 'सबै अपडेट हेर्नुहोस्',
            'update-read-more': 'थप पढ्नुहोस्',

            // Gallery Section
            'gallery-label': 'ग्यालरी',
            'gallery-title': 'हाम्रो समुदायका क्षणहरू',
            'gallery-view-all': 'पूरै ग्यालरी हेर्नुहोस्',

            // Membership CTA
            'membership-cta-title': 'सदस्य बन्नुहोस्',
            'membership-cta-text': 'असम लिम्बू महासभामा सामेल हुनुहोस् र कार्बी आंगलोंग र दिमा हसाओ जिल्लाहरूमा लिम्बू समुदायको विकास र कल्याणमा योगदान गर्नुहोस्।',
            'membership-cta-btn': 'अहिले आवेदन गर्नुहोस्',

            // Footer
            'footer-brand': 'असम लिम्बू महासभा',
            'footer-sub': 'कार्बी आंगलोंग र दिमा हसाओ जिल्ला समिति',
            'footer-address': 'दिफु, कार्बी आंगलोंग, असम — ७८२४६०',
            'footer-quick-links': 'द्रुत लिङ्क',
            'footer-resources': 'स्रोतहरू',
            'footer-connect': 'सम्पर्क',
            'footer-copyright': '© २०२६ असम लिम्बू महासभा — कार्बी आंगलोंग र दिमा हसाओ जिल्ला समिति। सबै अधिकार सुरक्षित।',
            'footer-credit': 'लिम्बू समुदायको लागि मायाका साथ डिजाइन गरिएको।',
            'footer-social-facebook': 'फेसबुक',
            'footer-social-youtube': 'युट्युब',
            'footer-social-instagram': 'इन्स्टाग्राम',
            'footer-social-email': 'इमेल',

            // Pagination
            'page-prev': 'अघिल्लो',
            'page-next': 'पछिल्लो',

            // 404 page
            'error-title': 'पृष्ठ फेला परेन',
            'error-description': 'तपाईंले खोजिरहनुभएको पृष्ठ सारिएको, मेटिएको वा कहिल्यै अस्तित्वमा नभएको हुन सक्छ। कृपया यूआरएल जाँच गर्नुहोस् वा गृहपृष्ठमा फर्कनुहोस्।',
            'error-home': 'गृहपृष्ठमा जानुहोस्',
            'error-contact': 'सम्पर्क गर्नुहोस्',
            'popular-pages': 'लोकप्रिय पृष्ठहरू',

            // Committee page
            'committee-hero-title': 'हाम्रो नेतृत्व टोली',
            'committee-hero-desc': 'कार्बी आंगलोंग र दिमा हसाओमा लिम्बू समुदायको कल्याणका लागि समर्पित समुदायिक नेताहरू।',
            'committee-term': '२०२६–२०२८ कार्यकाल',
            'committee-title': 'निर्वाचित समिति सदस्यहरू',
            'committee-advisory': 'सल्लाहकार बोर्ड',
            'committee-structure': 'समिति संरचना',
            'committee-cta-title': 'योगदान गर्न चाहनुहुन्छ?',
            'committee-cta-text': 'समिति सधैं समुदायको सेवा गर्न समर्पित व्यक्तिहरूको खोजीमा छ। तपाईंलाई संस्कृति, शिक्षा वा सामाजिक कार्यमा विशेषज्ञता भए पनि, हामी तपाईंलाई स्वागत गर्छौं।',
            'committee-cta-btn': 'समितिमा सामेल हुनुहोस्',

            // About page
            'about-hero-title': 'लिम्बू सम्पदाको संरक्षण<br />सन् १९७२ देखि',
            'about-hero-desc': 'असम लिम्बू महासभा, कार्बी आंगलोंग र दिमा हसाओ जिल्ला समिति, पाँच दशकदेखि लिम्बू समुदायको सेवा गर्दै आएको छ।',
            'about-story-label': 'हाम्रो कथा',
            'about-story-title': 'सामुदायिक सेवाको विरासत',
            'about-vision-label': 'हाम्रो मार्गदर्शक सिद्धान्तहरू',
            'about-vision-title': 'दृष्टि र मिसन',
            'about-values-label': 'हामी केको लागि उभिन्छौं',
            'about-values-title': 'हाम्रा मूल मान्यताहरू',
            'about-district-label': 'हाम्रो जिल्ला',
            'about-district-title': 'कार्बी आंगलोंग र दिमा हसाओ',
            'about-committee-cta': 'हाम्रो समिति भेट्नुहोस्',

            // Event pages (common)
            'event-back': 'कार्यक्रममा फर्कनुहोस्',
            'event-location': 'स्थान',
            'event-schedule': 'कार्यक्रम तालिका',

            // Update pages
            'update-back': 'अपडेटमा फर्कनुहोस्',
            'update-category': 'श्रेणी',

            // Membership
            'membership-hero-title': 'सदस्य बन्नुहोस्',
            'membership-hero-desc': 'लिम्बू समुदायलाई समर्थन गर्नुहोस्, हाम्रो संस्कृतिको संरक्षण गर्नुहोस्, र हाम्रा मानिसहरूको कल्याणमा योगदान गर्नुहोस्। सदस्यता सबै समुदायका सदस्यहरूका लागि खुला छ।',
            'membership-benefits-title': 'सदस्यता लाभहरू',
            'membership-types-title': 'आफ्नो सदस्यता छान्नुहोस्',
            'membership-apply-title': 'सदस्यता आवेदन',
            'membership-apply-desc': 'सदस्यताका लागि आवेदन दिन तलको विवरण भर्नुहोस्। हामी ३–५ कार्य दिनभित्र तपाईंलाई सम्पर्क गर्नेछौं।',
            'membership-form-name': 'पूरा नाम',
            'membership-form-email': 'इमेल ठेगाना',
            'membership-form-phone': 'फोन नम्बर',
            'membership-form-address': 'ठेगाना',
            'membership-form-type': 'सदस्यता प्रकार',
            'membership-form-message': 'अतिरिक्त जानकारी (वैकल्पिक)',
            'membership-form-submit': 'आवेदन पेश गर्नुहोस्',
            'membership-form-note': 'हामी ३–५ कार्य दिनभित्र तपाईंलाई सम्पर्क गर्नेछौं।',
            'membership-type-regular': 'नियमित सदस्य (नि:शुल्क)',
            'membership-type-life': 'आजीवन सदस्य (₹१,०००)',
            'membership-type-patron': 'संरक्षक सदस्य (₹५,०००+)',

            // Documents
            'documents-hero-title': 'आधिकारिक कागजात',
            'documents-hero-desc': 'जिल्ला समितिबाट महत्वपूर्ण कागजात, प्रतिवेदन र स्रोतहरूमा पहुँच गर्नुहोस्।',
            'documents-title': 'उपलब्ध कागजातहरू',
            'documents-cat-constitution': 'संविधान र उपनियम',
            'documents-cat-reports': 'वार्षिक प्रतिवेदन',
            'documents-cat-minutes': 'बैठकको कार्यवृत्त',
            'documents-cat-policies': 'नीति र दिशानिर्देश',
            'documents-cat-forms': 'फारम',
            'documents-cat-publications': 'प्रतिवेदन र प्रकाशन',

            // Contact
            'contact-hero-title': 'सम्पर्क गर्नुहोस्',
            'contact-hero-desc': 'प्रश्न, सुझाव वा संलग्न हुन चाहनुहुन्छ? जिल्ला समितिलाई सम्पर्क गर्नुहोस्। हामी तपाईंबाट सुन्न पाउँदा खुसी हुनेछौं।',
            'contact-info-title': 'सम्पर्क जानकारी',
            'contact-form-title': 'सन्देश पठाउनुहोस्',
            'contact-form-name': 'तपाईंको नाम',
            'contact-form-email': 'इमेल ठेगाना',
            'contact-form-subject': 'विषय',
            'contact-form-message': 'सन्देश',
            'contact-form-submit': 'सन्देश पठाउनुहोस्',
            'contact-office-hours': 'कार्यालय समय',
            'contact-follow': 'हामीलाई पछ्याउनुहोस्',
            'contact-location': 'स्थान',
            'contact-map-link': 'गुगल नक्सामा हेर्नुहोस्',

            // History
            'history-hero-title': 'सेवाको यात्रा<br />सन् १९७२ देखि',
            'history-hero-desc': 'असम लिम्बू महासभाको इतिहास र कार्बी आंगलोंग र दिमा हसाओमा लिम्बू समुदायप्रति यसको प्रतिबद्धताको पत्ता लगाउने।',
            'history-timeline-title': 'प्रमुख माइलस्टोनहरू',
            'history-founding-title': 'यो सबै कसरी सुरु भयो',
            'history-legacy-title': 'विरासतलाई अगाडि बढाउने',

            // Vision
            'vision-hero-title': 'दृष्टि र मिसन',
            'vision-hero-desc': 'हाम्रो कामलाई आकार दिने र कार्बी आंगलोंग र दिमा हसाओमा लिम्बू समुदायप्रति हाम्रो प्रतिबद्धता परिभाषित गर्ने मार्गदर्शक सिद्धान्तहरू।',
            'vision-title': 'अगाडि हेर्दै',
            'vision-mission-title': 'हामी के गर्छौं',
            'vision-values-title': 'हामी केमा विश्वास गर्छौं',
            'vision-goals-title': '२०२६–२०२८ को लागि हाम्रो रोडम्याप',

            // Archive
            'archive-hero-title': 'पुराना अपडेटहरू',
            'archive-hero-desc': 'विगतका समाचार, घोषणा र सामुदायिक अपडेटहरूको हाम्रो अभिलेख ब्राउज गर्नुहोस्।',
            'archive-title': 'सबै अभिलेखीकृत अपडेटहरू',
            'archive-view-latest': 'पछिल्ला अपडेटहरू हेर्नुहोस्',

            // Gallery
            'gallery-hero-title': 'हाम्रो समुदायका क्षणहरू',
            'gallery-hero-desc': 'कार्बी आंगलोंग र दिमा हसाओमा लिम्बू समुदायका सांस्कृतिक कार्यक्रम, समारोह र गतिविधिहरू मार्फत एक दृश्य यात्रा।',
            'gallery-title': 'सामुदायिक सम्झनाहरू',
            'gallery-cta-title': 'आफ्ना तस्बिरहरू साझा गर्नुहोस्',
            'gallery-cta-desc': 'सामुदायिक कार्यक्रमबाट तस्बिरहरू छन्? हामीसँग साझा गर्नुहोस् र हाम्रा सम्झनाहरू संरक्षण गर्न मद्दत गर्नुहोस्।',
            'gallery-cta-btn': 'सम्पर्क गर्नुहोस्',
        }
    };

    // ------------------------------------------------------------------
    // 2. LANGUAGE DETECTION & STATE
    // ------------------------------------------------------------------
    const DEFAULT_LANG = 'en';
    let currentLang = localStorage.getItem('almlang') || DEFAULT_LANG;

    // ------------------------------------------------------------------
    // 3. TRANSLATION FUNCTION
    // ------------------------------------------------------------------
    function applyTranslations(lang) {
        // Get the dictionary for the chosen language, fallback to English
        const dict = translations[lang] || translations[DEFAULT_LANG];

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) {
                // For elements with HTML content (like headings), set innerHTML
                // For plain text, use textContent (safer)
                // We'll use innerHTML to allow <br> and other inline tags
                el.innerHTML = dict[key];
            } else if (translations[DEFAULT_LANG][key] !== undefined) {
                // Fallback to English if missing in target language
                el.innerHTML = translations[DEFAULT_LANG][key];
            } else {
                // If key not found, leave as is (or log warning)
                console.warn('Missing translation key:', key);
            }
        });

        // Also update any placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key] !== undefined) {
                el.placeholder = dict[key];
            }
        });

        // Update the language button text (if needed)
        const langCurrent = document.querySelector('.lang-current');
        if (langCurrent) {
            const langNames = { en: 'EN', hi: 'HI', as: 'AS', ne: 'NE' };
            // Keep the text node content
            const textNode = langCurrent.childNodes[0];
            if (textNode) {
                textNode.textContent = langNames[lang] || lang.toUpperCase();
            }
        }

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Save preference
        localStorage.setItem('almlang', lang);
        currentLang = lang;
    }

    // ------------------------------------------------------------------
    // 4. LANGUAGE SELECTOR EVENT BINDING
    // ------------------------------------------------------------------
    function initLanguageSelector() {
        const langDropdown = document.querySelector('.lang-dropdown');
        if (!langDropdown) return;

        const options = langDropdown.querySelectorAll('li[role="option"]');
        options.forEach(function(option) {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                if (lang && translations[lang]) {
                    // Update aria-selected
                    options.forEach(function(opt) {
                        opt.removeAttribute('aria-selected');
                    });
                    this.setAttribute('aria-selected', 'true');

                    // Apply translations
                    applyTranslations(lang);

                    // Close dropdown
                    const selector = this.closest('.language-selector');
                    if (selector) {
                        selector.classList.remove('open');
                        const btn = selector.querySelector('.lang-current');
                        if (btn) btn.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
    }

    // ------------------------------------------------------------------
    // 5. INIT ON PAGE LOAD
    // ------------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', function() {
        // Apply saved language
        applyTranslations(currentLang);

        // Initialize selector events
        initLanguageSelector();

        // Also handle dropdown toggle from existing script? We keep it separate.
        // The existing script already handles toggle, we just handle the selection.
        // But to avoid conflict, we ensure our click handler on options works.
        // The existing script in script.js already sets up language selector toggle,
        // but it also has a click handler on options. We'll override or complement?
        // Since we want to keep script.js untouched, we'll just add our own handler.
        // The existing script's handler logs language and updates button text,
        // but doesn't actually translate. We'll let ours do the heavy lifting.
        // We'll also ensure our handler doesn't interfere.
        // To avoid double execution, we can remove the old handler? No, we'll keep it.
        // Our handler will be added in initLanguageSelector, which is called after DOM ready.
        // The existing handler is also added on DOMContentLoaded. Both will run.
        // Our handler will override the translation, and the existing one will update the button text,
        // which is fine.
    });

})();
