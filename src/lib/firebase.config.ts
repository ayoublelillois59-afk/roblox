import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';

// Configuration Firebase - À remplacer avec vos propres credentials
const firebaseConfig = {
  apiKey: "AIzaSyDemoKey123456789",
  authDomain: "nour-al-islam.firebaseapp.com",
  projectId: "nour-al-islam",
  storageBucket: "nour-al-islam.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');
