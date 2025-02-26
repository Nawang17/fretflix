import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtOKI15w3TzPKidaIHOFgCNUKyFU2UJ_c",
  authDomain: "fretflix-2b27b.firebaseapp.com",
  projectId: "fretflix-2b27b",
  storageBucket: "fretflix-2b27b.firebasestorage.app",
  messagingSenderId: "1000227772855",
  appId: "1:1000227772855:web:16370b83d2a1d5dca5f032",
  measurementId: "G-GDJEG2VJ9Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const useAnalytics = getAnalytics(app);
const db = getFirestore(app);
export { useAnalytics, db };
