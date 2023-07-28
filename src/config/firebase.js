import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBp3rgUeLOmHCVovrWhJQ4ZRHUhHkZGNlk",
  authDomain: "whispr-58308.firebaseapp.com",
  projectId: "whispr-58308",
  storageBucket: "whispr-58308.appspot.com",
  messagingSenderId: "191408035958",
  appId: "1:191408035958:web:0a3f6e49d843e82f912757",
  measurementId: "G-C110N8BCZ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
