// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRqFxjCzCZzuRp6jCo18Jpz7_s6wtvrfI",
  authDomain: "gestor-de-filas-3d073.firebaseapp.com",
  projectId: "gestor-de-filas-3d073",
  storageBucket: "gestor-de-filas-3d073.firebasestorage.app",
  messagingSenderId: "703685234934",
  appId: "1:703685234934:web:90aa02f2f750beaea31cd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
export const auth = getAuth(app);

export {database}