// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnRMtNKxlk-jAzVb2lV549581rH720_TQ",
  authDomain: "pantry-tracker-6c960.firebaseapp.com",
  projectId: "pantry-tracker-6c960",
  storageBucket: "pantry-tracker-6c960.appspot.com",
  messagingSenderId: "67723230619",
  appId: "1:67723230619:web:5b9d6ae2fdf2cb5c7eb53e",
  measurementId: "G-LW2MWNK18Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { firestore };

