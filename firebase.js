// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqT9M3yFddNtVe2i7vsiQCiqXjMn3a-sA",
  authDomain: "cmpt415-59e14.firebaseapp.com",
  projectId: "cmpt415-59e14",
  storageBucket: "cmpt415-59e14.appspot.com",
  messagingSenderId: "217450358131",
  appId: "1:217450358131:web:d11779aac8d8cc3dc85106",
  measurementId: "G-LT3MBTXZDZ",
  databaseURL:"https://cmpt415-59e14-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
let analytics;

// Initialize databases
const db = getFirestore(app)
console.log(db)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

if (app.name && typeof window !== 'undefined') {
  analytics = getAnalytics(app)
}

module.exports.auth = auth
module.exports.db = db