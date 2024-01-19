// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCxIfGJLeZBT301iNLOW2oMwMqdOJY3O_4",
    authDomain: "jobportal-e9a9e.firebaseapp.com",
    projectId: "jobportal-e9a9e",
    storageBucket: "jobportal-e9a9e.appspot.com",
    messagingSenderId: "146380408517",
    appId: "1:146380408517:web:eb9d58fc59b6da834fd2ac",
    measurementId: "G-34V83M1PQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
