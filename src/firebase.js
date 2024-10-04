// src/firebase.js
import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCXpsf4QJxUfESHB-T2GgXQpRIR7eI9emM",
    authDomain: "qrcode-5fb73.firebaseapp.com",
    projectId: "qrcode-5fb73",
    storageBucket: "qrcode-5fb73.appspot.com",
    messagingSenderId: "724158905292",
    appId: "1:724158905292:web:52a1d77bfd70596688fb69"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db }; // Ensure Firestore is exported
