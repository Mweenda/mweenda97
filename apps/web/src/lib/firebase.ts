import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

/**
 * Firebase Configuration
 * mweenda97 project credentials
 */
const firebaseConfig = {
  apiKey: 'AIzaSyDQYRQPCIpAyuSArXvLK6jsVu7LQ_NmG_M',
  authDomain: 'mweenda97-985e9.firebaseapp.com',
  projectId: 'mweenda97-985e9',
  storageBucket: 'mweenda97-985e9.firebasestorage.app',
  messagingSenderId: '766219270706',
  appId: '1:766219270706:web:a0717db79427aef8b61a2b',
  measurementId: 'G-8J076336FT',
};

/**
 * Initialize Firebase
 * Sets up app, Firestore, and Analytics
 */
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
