import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-database';
import 'firebase/firebase-storage';

  const firebaseConfig = {
    apiKey: "AIzaSyDpDaiS7m4zk0wXBxFHRBhdj-PLHnrYHwE",
    authDomain: "womparis-2c517.firebaseapp.com",
    databaseURL: "https://womparis-2c517.firebaseio.com",
    projectId: "womparis-2c517",
    storageBucket: "womparis-2c517.appspot.com",
    messagingSenderId: "3449833384",
    appId: "1:3449833384:web:40878760ec8eddc5297f9d",
    measurementId: "G-25243E4MT4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
