import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT6XFYNk3c9F4R5QzNnpm78AJQAn87eTg",
  authDomain: "wildlife-website-be931.firebaseapp.com",
  projectId: "wildlife-website-be931",
  storageBucket: "wildlife-website-be931.firebasestorage.app",
  messagingSenderId: "289354760670",
  appId: "1:289354760670:web:82d78280bb4bcc48db1d4f"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

export default app;
