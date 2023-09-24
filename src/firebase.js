import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyAPFcqBAj4wAGtD1GOVHskWY4R-TMgNQ0c',
  authDomain: 'login-authentication-3bfea.firebaseapp.com',
  projectId: 'login-authentication-3bfea',
  storageBucket: 'login-authentication-3bfea.appspot.com',
  messagingSenderId: '347017212496',
  appId: '1:347017212496:web:4d5f281fc9103565139755',
  measurementId: 'G-MYZ4FQ55LW',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(app);
export { app, auth, firestore };
