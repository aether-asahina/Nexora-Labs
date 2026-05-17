/* ── firebase.js ─ Nexora Labs ────────────────────────────── */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey:            "AIzaSyA-sqr8i3bV5lFtHz3iSpAv_0b_XkI5MuE",
  authDomain:        "nexora-f8a28.firebaseapp.com",
  projectId:         "nexora-f8a28",
  storageBucket:     "nexora-f8a28.firebasestorage.app",
  messagingSenderId: "190240060905",
  appId:             "1:190240060905:web:cc444584fe8cfbc7f44778",
  measurementId:     "G-HRF4KYM43Y"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

/* Expose ke global agar script.js (non-module) bisa pakai */
window.db         = db;
window.collection = collection;
window.addDoc     = addDoc;

