import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCh1vH_HstXQKyuaQpQDrfZEf85yQeyAMY",
  authDomain: "journal-92fb6.firebaseapp.com",
  projectId: "journal-92fb6",
  storageBucket: "journal-92fb6.firebasestorage.app",
  messagingSenderId: "990526121955",
  appId: "1:990526121955:web:785facc3151d31d797a2d6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };
