// ============================================================
// FIREBASE CONFIGURATION
// ============================================================

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

// Make auth, database, and storage globally available
window.auth = firebase.auth();
window.db = firebase.database();
window.storage = firebase.storage();

// Also expose the config object
window.firebaseConfig = firebaseConfig;

console.log('Firebase initialized successfully.');
