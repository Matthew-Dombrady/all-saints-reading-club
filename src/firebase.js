import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-auth");

const firebaseConfig = {
    apiKey: "AIzaSyABuidFCT6nkICvY0U2nFGwW8luecnGw2I",
    authDomain: "all-saints-reading-club.firebaseapp.com",
    projectId: "all-saints-reading-club",
    storageBucket: "all-saints-reading-club.appspot.com",
    messagingSenderId: "711334760229",
    appId: "1:711334760229:web:696ab780f07900a36b14cc",
    measurementId: "G-WJBZ0MRPXC"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
