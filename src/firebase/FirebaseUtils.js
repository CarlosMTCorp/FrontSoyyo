import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbkLm-AW1Ai6Qd8IoCG59_BtMPoO3NxfE",
  authDomain: "soyyo-auth.firebaseapp.com",
  projectId: "soyyo-auth",
  storageBucket: "__BUCKET__",
  messagingSenderId: "___sender_id__",
  appId: "__appid__",
  measurementId: "optional",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
