// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzRKbpaT1IlJW2QgoOMvVWVldgjovIt00",
  authDomain: "wardrobe-organizer-58e51.firebaseapp.com",
  projectId: "wardrobe-organizer-58e51",
  storageBucket: "wardrobe-organizer-58e51.firebasestorage.app",
  messagingSenderId: "206741799482",
  appId: "1:206741799482:web:0f38bb2150596d58c3eb03",
  measurementId: "G-Q04S0X181S"
};

console.log("Firebase API Key:", firebaseConfig.apiKey);
console.log("Auth Domain:", firebaseConfig.authDomain);
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialized firestore
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };