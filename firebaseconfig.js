// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export { useAnalytics };
