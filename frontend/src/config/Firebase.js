import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB_g0Jq4jJnpsHlXasiYqLKmx10dOLkUM4",
//   authDomain: "petme-f769a.firebaseapp.com",
//   projectId: "petme-f769a",
//   storageBucket: "petme-f769a.appspot.com",
//   messagingSenderId: "666775739567",
//   appId: "1:666775739567:web:df027d8ff62af01ea1485a",
//   measurementId: "G-96WQ1WTFR8"
// };
