
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
   apiKey: "AIzaSyDiHhU4dDKn8uMz0aknzIvLUkBGiPxrMls",
    authDomain: "lost-found-39ad3.firebaseapp.com",
    projectId: "lost-found-39ad3",
    storageBucket: "lost-found-39ad3.appspot.com",
    messagingSenderId: "652572235618",
    appId: "1:652572235618:web:61ae14ceb9a9c26330be3b",
    measurementId: "G-ZFET4JLTNC"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

