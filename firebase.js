import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAc8vMB5wJOPGaPnYIOmkXeGCA6NzCb-ss",
  authDomain: "manasa-birthday-surprise.firebaseapp.com",
  projectId: "manasa-birthday-surprise",
  storageBucket: "manasa-birthday-surprise.firebasestorage.app",
  messagingSenderId: "1024827385736",
  appId: "1:1024827385736:web:4a1fdba086a983d74d7c3d"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
