
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYh1PK80pT6xmIebJUNszmO9dg35pOy04",
  authDomain: "monkey-blogging-e181f.firebaseapp.com",
  projectId: "monkey-blogging-e181f",
  storageBucket: "monkey-blogging-e181f.appspot.com",
  messagingSenderId: "889636355191",
  appId: "1:889636355191:web:7253398450d8078efd1a72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const auth = getAuth(app)