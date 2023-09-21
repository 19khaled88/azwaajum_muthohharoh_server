// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJji7q2SHnxb9Q6HlDu4S9j-Kn9R8ChuA",
  authDomain: "azwajum-mutaharowa.firebaseapp.com",
  projectId: "azwajum-mutaharowa",
  storageBucket: "azwajum-mutaharowa.appspot.com",
  messagingSenderId: "478040404253",
  appId: "1:478040404253:web:d1790e74372c73482af1f4",
  measurementId: "G-FW0GZB6D4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);