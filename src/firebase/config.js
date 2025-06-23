// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCfAGr8RxEzWMpfRo4cy8vccw_xmOLyi5U",
  authDomain: "ghardaia-booking.firebaseapp.com",
  projectId: "ghardaia-booking",
  storageBucket: "ghardaia-booking.appspot.com", 
  messagingSenderId: "49239347932",
  appId: "1:49239347932:web:68e7c8ed6292f0f7e31a19"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
