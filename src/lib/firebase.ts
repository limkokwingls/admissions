// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCV7QCcGYn6rE_RZY302tT4StdhlyqMvJE',
  authDomain: 'limkokwing-admissions.firebaseapp.com',
  projectId: 'limkokwing-admissions',
  storageBucket: 'limkokwing-admissions.appspot.com',
  messagingSenderId: '334208919178',
  appId: '1:334208919178:web:64fb0049a512cb10072f73',
  measurementId: 'G-6T6CVXZ9C0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
