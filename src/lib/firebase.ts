import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if all essential keys are provided
const isFirebaseConfigured = 
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "YOUR_FIREBASE_API_KEY_HERE";

let app;
let auth: any = null;
let db: any = null;
let googleProvider: any = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.warn("Firebase initialization failed. Falling back to local mock mode.", error);
  }
} else {
  console.log("Firebase credentials not configured. Running in Local Mock Database mode.");
}

// ----------------------------------------------------
// HIGH FIDELITY MOCK AUTH LAYER FOR LOCAL REVIEW
// ----------------------------------------------------
export interface MockUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  isMock: boolean;
}

export const mockSignInWithGoogle = async (): Promise<MockUser> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUser = {
        uid: 'eco-twin-user-id',
        email: 'climate.twin@ecoverse.ai',
        displayName: 'Eco Pioneer',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        isMock: true
      };
      localStorage.setItem('ecoverse_logged_in_user', JSON.stringify(mockUser));
      resolve(mockUser);
    }, 1000); // Simulate network latency
  });
};

export const mockSignOut = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('ecoverse_logged_in_user');
      resolve();
    }, 500);
  });
};

export { auth, db, googleProvider, isFirebaseConfigured };
