import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
let app: FirebaseApp | undefined;
let db: Database | undefined;

try {
    if (!getApps().length) {
        if (firebaseConfig.apiKey) {
            app = initializeApp(firebaseConfig);
        } else {
            console.warn("Firebase config missing. Using mock/null app.");
        }
    } else {
        app = getApp();
    }

    if (app) {
        db = getDatabase(app);
    }
} catch (e) {
    console.warn("Firebase initialization failed:", e);
}

export { app, db };
