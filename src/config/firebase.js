import firebase from 'firebase/app';
import "firebase/firestore";
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAluoXPbUZYUZuvOgKVMZnApgEyneHkkaw",
    authDomain: "mathquiz-82e1d.firebaseapp.com",
    databaseURL: "https://mathquiz-82e1d.firebaseio.com",
    projectId: "mathquiz-82e1d",
    storageBucket: "mathquiz-82e1d.appspot.com",
    messagingSenderId: "36775963640",
    appId: "1:36775963640:web:1d2b09ce3831683e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  export default db;