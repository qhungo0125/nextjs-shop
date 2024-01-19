// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAnxX2N4f4bCr5NcS7FT8NzO_3qJFY_vjA',
  authDomain: 'nextjs-shop-library.firebaseapp.com',
  projectId: 'nextjs-shop-library',
  storageBucket: 'nextjs-shop-library.appspot.com',
  messagingSenderId: '749329911880',
  appId: '1:749329911880:web:7a333f3dabe627504d087d',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
