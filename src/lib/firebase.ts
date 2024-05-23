// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA2jZ9etqZFllEHX2My2aElfn6telQGJSs',
  authDomain: 'luctadmissions.firebaseapp.com',
  projectId: 'luctadmissions',
  storageBucket: 'luctadmissions.appspot.com',
  messagingSenderId: '825598988364',
  appId: '1:825598988364:web:735359f67288a09fc2e4e9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
