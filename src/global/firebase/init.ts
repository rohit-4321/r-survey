import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: 'AIzaSyCJGtNNAazTVYC4HmBEOjgFEKrYeTFEF20',
  authDomain: 'r-survey-63033.firebaseapp.com',
  projectId: 'r-survey-63033',
  storageBucket: 'r-survey-63033.appspot.com',
  messagingSenderId: '330758885765',
  appId: '1:330758885765:web:9fe3d074812a17cc0af4ec',
  measurementId: 'G-D0XM69CKN3'
};
  
  
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);