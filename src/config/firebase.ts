import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBdpdkkOdvRDvIaPZ7pyl3Rvj8s7mDTckI',
  authDomain: 'app-03-library.firebaseapp.com',
  databaseURL: 'https://app-03-library-default-rtdb.firebaseio.com',
  projectId: 'app-03-library',
  storageBucket: 'app-03-library.appspot.com',
  messagingSenderId: '665566344654',
  appId: '1:665566344654:web:b7ba1a6becddfc9cd9279f',
};

const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app);
