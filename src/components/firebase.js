// filepath: c:\Users\hp\OneDrive\Desktop\Afshaan\Rubix 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Add this import

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARiWX1KVcYry1WuWtKeOn9yZWYmxSvcg4",
  authDomain: "almora-1926a.firebaseapp.com",
  projectId: "almora-1926a",
  storageBucket: "almora-1926a.firebasestorage.app",
  messagingSenderId: "273988033089",
  appId: "1:273988033089:web:30652b45ae49e24b0704c0",
  measurementId: "G-7WS2S1SHWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Auth, Firestore, and Storage
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Add this export