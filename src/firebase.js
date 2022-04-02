import { initializeApp } from "@firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuudj6wvU4jhAfWryGhEEu65F-P-rsuHw",
  authDomain: "spottingdev.firebaseapp.com",
  projectId: "spottingdev",
  storageBucket: "spottingdev.appspot.com",
  messagingSenderId: "919077347834",
  appId: "1:919077347834:web:4a32da9c37243cdbecc443",
};

const app = initializeApp(firebaseConfig);
var auth = getAuth();
var provider = new GoogleAuthProvider();
export { auth, provider };
