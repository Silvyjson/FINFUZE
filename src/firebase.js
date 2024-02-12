// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // Import Firestore functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUU6q-BiRWj_cH0GZNxeZJSYi9MuhplQc",
  authDomain: "finfuze-app.firebaseapp.com",
  projectId: "finfuze-app",
  storageBucket: "finfuze-app.appspot.com",
  messagingSenderId: "409612996535",
  appId: "1:409612996535:web:460220688b1c72ef822232"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app); // Initialize Firestore

export { auth, storage, firestore };
