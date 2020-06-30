import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-database';
import 'firebase/firebase-storage';
import firestore from 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyBE47DRfnLW2gZQFUxSEuBrJ74RM3D3_Zw",
    authDomain: "marmitruc.firebaseapp.com",
    databaseURL: "https://marmitruc.firebaseio.com",
    projectId: "marmitruc",
    storageBucket: "marmitruc.appspot.com",
    messagingSenderId: "521268131446",
    appId: "1:521268131446:web:f7402e6b02a49dbe5ed157"
};/*
firebase.initializeApp(firebaseConfig).*/

//export const firebaseDb =firebase.initializeApp(firebaseConfig);

  // Your web app's Firebase configuration
  /*var firebaseConfig = {
    apiKey: "AIzaSyAgixdQohal6yVuwAuS0Eo1yjA24-qY--g",
    authDomain: "marmit-8a5bf.firebaseapp.com",
    databaseURL: "https://marmit-8a5bf.firebaseio.com",
    projectId: "marmit-8a5bf",
    storageBucket: "marmit-8a5bf.appspot.com",
    messagingSenderId: "404263225860",
    appId: "1:404263225860:web:aac2779b24ac2020f0c351"
  };*/
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


export const db = firebase.firestore();
