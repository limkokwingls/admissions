// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD6iW7A4rD8rHLPhD5dmwu6_F0yKfBu2tg',
  authDomain: 'limkokwingadmissions.firebaseapp.com',
  projectId: 'limkokwingadmissions',
  storageBucket: 'limkokwingadmissions.appspot.com',
  messagingSenderId: '213639361196',
  appId: '1:213639361196:web:d0a28a85ae32ee74822509',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
