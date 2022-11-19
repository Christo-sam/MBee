import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBgCPgOfFiisjPd2Xi_sEUnifVIMYhCJEQ",
    authDomain: "mbee-549fb.firebaseapp.com",
    projectId: "mbee-549fb",
    storageBucket: "mbee-549fb.appspot.com",
    messagingSenderId: "792268512137",
    appId: "1:792268512137:web:a489b0d92e88b0832e9f58",
    measurementId: "G-NPHNMN3X1Y"
  };
  
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider(); 
  const storage = firebase.storage();

  export { auth, provider, storage };
  export default db; 