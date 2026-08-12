// firebase-config.js
// Firebase SDK V9 Modular

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  serverTimestamp, 
  arrayUnion,
  increment,
  limit,
  startAfter,
  onSnapshot
} from "firebase/firestore";
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
const db = getFirestore(app);
const auth = getAuth(app);

// Export everything
export { 
  app, 
  analytics, 
  db, 
  auth,
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  serverTimestamp, 
  arrayUnion,
  increment,
  limit,
  startAfter,
  onSnapshot,
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
};
