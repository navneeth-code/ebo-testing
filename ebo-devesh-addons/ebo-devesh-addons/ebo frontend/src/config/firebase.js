// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzkzS95bSyzwBVGI4WoXr7DcirxW9DwP4",
  authDomain: "project-ebo.firebaseapp.com",
  projectId: "project-ebo",
  storageBucket: "project-ebo.appspot.com",
  messagingSenderId: "915933057172",
  appId: "1:915933057172:web:752ccfdea4f6cd2b3b6481",
  measurementId: "G-DMZR7ZH02L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
