// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Auth as AuthADT } from "firebase/auth";
import { removeAuth } from "./browserCookieRead";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBW9QXsNfx4YYSRRqGbZaRuFnXhMlRCDmI",
    authDomain: "gaas-ce278.firebaseapp.com",
    projectId: "gaas-ce278",
    storageBucket: "gaas-ce278.appspot.com",
    messagingSenderId: "978709901383",
    appId: "1:978709901383:web:8df27a035c8265531c0162",
    measurementId: "G-E09XQRDWZC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const firebaseSignup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

const firebaseLogin = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const firebaseSignout = () => {
    signOut(auth);
};

const getToken = () => {
    return auth.currentUser?.getIdToken(true);
};

const authorize = async (firebaseAuth: Promise<any>) => {
    await firebaseAuth;
    
    let token = await getToken();

    return fetch(`/api/auth`, {
        method: "post",
        body: JSON.stringify({ token }),
    });
};

///----------------------------------------------------------- used functions

export const login = (email: string, password: string) => {
    return authorize(firebaseLogin(email, password));
};

export const signup = (email: string, password: string) => {
    return authorize(firebaseSignup(email, password));
};

export const signout = () => {
    removeAuth();
    firebaseSignout();
};
