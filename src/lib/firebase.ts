import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDSbGYn-GHa8Q_FQ8TnuHwySJA3rGEiQtQ",
  authDomain: "junaikey-genesis.firebaseapp.com",
  projectId: "junaikey-genesis",
  storageBucket: "junaikey-genesis.firebasestorage.app",
  messagingSenderId: "1080502198465",
  appId: "1:1080502198465:web:b60d4fb5ec1dd76181b440"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { app, auth, db, functions };
