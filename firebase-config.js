// firebase-config.js
// Firebase V9 Modular SDK with Realtime Database

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getDatabase, 
  ref, 
  set, 
  get, 
  update, 
  push, 
  onValue, 
  serverTimestamp, 
  query, 
  orderByChild, 
  equalTo,
  remove,
  child
} from "firebase/database";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCdHDWh-CJkJqBSNxKAd7dWwX8agBYuuc",
  authDomain: "prompt-ai-a0c21.firebaseapp.com",
  projectId: "prompt-ai-a0c21",
  storageBucket: "prompt-ai-a0c21.firebasestorage.app",
  messagingSenderId: "322416217341",
  appId: "1:322416217341:web:c43dcc16ac86bbba24c294",
  measurementId: "G-B98ZKD5KP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);

export { 
  app, 
  analytics, 
  db, 
  auth,
  ref, 
  set, 
  get, 
  update, 
  push, 
  onValue, 
  serverTimestamp, 
  query, 
  orderByChild, 
  equalTo,
  remove,
  child,
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
};
