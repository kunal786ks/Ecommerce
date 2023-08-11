// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2H79w6fb5VB8Is0MXVLIBUtnf0tidB2w",
  authDomain: "ecommerce-eea57.firebaseapp.com",
  projectId: "ecommerce-eea57",
  storageBucket: "ecommerce-eea57.appspot.com",
  messagingSenderId: "707989263713",
  appId: "1:707989263713:web:f401c55e5470b2a2ce2120",
  measurementId: "G-8LSD6W6L8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);