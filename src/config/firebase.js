import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}}`,
  authDomain: "whispr-58308.firebaseapp.com",
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: "whispr-58308.appspot.com",
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
