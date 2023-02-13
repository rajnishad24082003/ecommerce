import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAksVOU7f3K4_fZrCrM_giF6TUuKIf9ZO4",
  authDomain: "ecommerce-5b70c.firebaseapp.com",
  projectId: "ecommerce-5b70c",
  storageBucket: "ecommerce-5b70c.appspot.com",
  messagingSenderId: "415129279883",
  appId: "1:415129279883:web:0a6f82387ffca3fd76238e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
