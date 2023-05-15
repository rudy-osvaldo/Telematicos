// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxtfpz9FXHmlGdaH81_JOQwoZMQpaHRNo",
  authDomain: "chat-app-e9fd5.firebaseapp.com",
  projectId: "chat-app-e9fd5",
  storageBucket: "chat-app-e9fd5.appspot.com",
  messagingSenderId: "493207767053",
  appId: "1:493207767053:web:f7ddd4af6e5d3f9b1a6d44",
  measurementId: "G-GYZ0XC31FG"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage(app);
