import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAgCfDxoGGwwms8FQ-qOdF0BUcBQkevK6w",
    authDomain: "login-c7923.firebaseapp.com",
    projectId: "login-c7923",
    storageBucket: "login-c7923.firebasestorage.app",
    messagingSenderId: "423447261233",
    appId: "1:423447261233:web:724fbcbbb5d59743df2510",
    measurementId: "G-V1G3PB4BXQ",
    databaseURL: "https://login-c7923-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
