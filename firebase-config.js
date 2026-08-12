/* ============================================================
   FIREBASE CONFIGURATION — Assam Limbu Mahasabha
   Membership System — Public Config
   ============================================================ */

const firebaseConfig = {
    apiKey: "AIzaSyCCdHDWh-CJkJqBSNxKAd7dWwX8agBYuuc",
    authDomain: "prompt-ai-a0c21.firebaseapp.com",
    databaseURL: "https://prompt-ai-a0c21-default-rtdb.firebaseio.com",
    projectId: "prompt-ai-a0c21",
    storageBucket: "prompt-ai-a0c21.firebasestorage.app",
    messagingSenderId: "322416217341",
    appId: "1:322416217341:web:c43dcc16ac86bbba24c294",
    measurementId: "G-B98ZKD5KP9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const database = firebase.database();

// Role UIDs (for reference)
const ADMIN_UIDS = {
    DA: 'ubCraWH2LiScAlCs14SvWd3piGV2',
    PRESIDENT: 'DmBj882BV1cjdVv4g6yt7POAUrK2',
    APPROVING_AUTHORITY: 'IRfvKbCresb6lzj7uTpUGxbDCc12'
};
