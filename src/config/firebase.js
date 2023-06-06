import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  "apiKey": "AIzaSyAf4QDi4abOvdpu99GfZyersYMqynTpDFs",
  "authDomain": "vqe-user.firebaseapp.com",
  "projectId": "vqe-user",
  "storageBucket": "vqe-user.appspot.com",
  "messagingSenderId": "952924951218",
  "appId": "1:952924951218:web:2fb0f5267db8165be3afab",
  "measurementId": "G-3C5R9N863B"
};
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth(app);

// messaging
export const messaging = getMessaging(app);