import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
const config = {
  apiKey: "AIzaSyBE5RaTAeWO8Pg7nB0yD7PeH0OtEucdqd0",
  authDomain: "chatty-dcf64.firebaseapp.com",
  databaseURL: "https://chatty-dcf64-default-rtdb.firebaseio.com/",
  projectId: "chatty-dcf64",
  storageBucket: "chatty-dcf64.appspot.com",
  messagingSenderId: "829492814987",
  appId: "1:829492814987:web:0fdc45b98084ff3e0b208e"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();