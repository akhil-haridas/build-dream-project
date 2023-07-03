import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2uSTcDOgN4C8Y66Nz-MFG-o73Is1QIXE",
  authDomain: "buildreamotp.firebaseapp.com",
  projectId: "buildreamotp",
  storageBucket: "buildreamotp.appspot.com",
  messagingSenderId: "144731535871",
  appId: "1:144731535871:web:80ce16843fd52913000fca",
  measurementId: "G-90YBBEVWXE"
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export { auth, firebase };
