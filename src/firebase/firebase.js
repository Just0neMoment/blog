import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_API_KEY,
  // authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_APP_ID,
  // measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  apiKey: "AIzaSyAuRtMhQ0iN9B5ecT2HNUFxJ5gwfKi9vDg",
  authDomain: "blog-46200.firebaseapp.com",
  projectId: "blog-46200",
  storageBucket: "blog-46200.appspot.com",
  messagingSenderId: "621733215369",
  appId: "1:621733215369:web:d9719b37381636d8ac5a58",
  measurementId: "G-R30L4CLEEX",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);