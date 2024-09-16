// firebase.ts

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAanarmvqNn1c-Z5c25Tu3rR6csbwKdqrg",
    authDomain: "prictask28.firebaseapp.com",
    projectId: "prictask28",
    storageBucket: "prictask28.appspot.com",
    messagingSenderId: "270279842031",
    appId: "1:270279842031:web:b47a78246458d16382e31a"
  };
  

// Initialize Firebase only if no apps have been initialized
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Initialize Firestore
const firestore = getFirestore();

export { firestore };
