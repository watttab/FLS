import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAxKFUdk5jKrZB4OQb2ALo5cea7q0Tvxu0",
    authDomain: "kosumponngam2.firebaseapp.com",
    databaseURL: "https://kosumponngam2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kosumponngam2",
    storageBucket: "kosumponngam2.appspot.com",
    messagingSenderId: "528441609923",
    appId: "1:528441609923:web:b81bf5870618c0885b1c76",
    measurementId: "G-T840L9322B"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
