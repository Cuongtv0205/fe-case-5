import {initializeApp} from "firebase/app";
import {getStorage} from 'firebase/storage'

export const firebaseConfig = {
    apiKey: "AIzaSyCn8pVFRjmpfI3KI4Mt0dRoOC520s2qvX4",
    authDomain: "jobcv-2017e.firebaseapp.com",
    projectId: "jobcv-2017e",
    storageBucket: "jobcv-2017e.appspot.com",
    messagingSenderId: "831050143310",
    appId: "1:831050143310:web:57be6d3e60645f7294d51f",
    measurementId: "G-JR1MCTQ3KK"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

