// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7WctC7kzUs5r1aNVc_ygCKi25ZxO7mtg",
    authDomain: "expense-tracker-as-af08e.firebaseapp.com",
    projectId: "expense-tracker-as-af08e",
    storageBucket: "expense-tracker-as-af08e.appspot.com",
    messagingSenderId: "1075924133348",
    appId: "1:1075924133348:web:79063c267ab3023716d3f1",
    measurementId: "G-P84D6BWX08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app);
// firebase login
// firebase init
// firebase deploy