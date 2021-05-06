import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-auth");


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

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
