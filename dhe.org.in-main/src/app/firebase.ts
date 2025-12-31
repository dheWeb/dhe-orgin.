// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjxu8tbP-YIF6AuDBZfptry9e-ZUQkDVw",
  authDomain: "dhe-org-in.firebaseapp.com",
  projectId: "dhe-org-in",
  storageBucket: "dhe-org-in.appspot.com",
  messagingSenderId: "705897582693",
  appId: "1:705897582693:web:8f4e5f81e73d8818cbb68c",
  measurementId: "G-VZ55ESSK6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage();

export {app, db , storage};
export const auth = getAuth(app);
