import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4VukcsQwD4kuzBg5CCp4ALiYsBNo0ao0",
    authDomain: "media-player-f6efa.firebaseapp.com",
    databaseURL: "https://media-player-f6efa-default-rtdb.firebaseio.com",
    projectId: "media-player-f6efa",
    storageBucket: "media-player-f6efa.appspot.com",
    messagingSenderId: "604798781391",
    appId: "1:604798781391:web:ff82194de85199ecab34ba"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);