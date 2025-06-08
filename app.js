import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import {
  getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import {
  getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

import * as jspdf from 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js';
import * as docx from 'https://cdn.jsdelivr.net/npm/docx@7.7.0/build/index.min.js';

// ... الكود الكامل الذي تم إرساله سابقًا
// تم حذفه هنا لتقصير الرسالة. يتم إدراج نفس محتوى app.js المرسل كاملاً سابقًا.

window.exportToWord = async function () {
  const snapshot = await getDocs(collection(db, "flights"));
  const { Document, Packer, Paragraph, TextRun } = docx;
  const doc = new Document();
  const children = [];
  snapshot.forEach((docSnap, index) => {
    const d = docSnap.data();
    children.push(new Paragraph({ children: [new TextRun(`رحلة ${index + 1}: ${d.name || ""} - ${d.fltno || ""} - ${d.date || ""}`)] }));
  });
  doc.addSection({ children });
  const blob = await Packer.toBlob(doc);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "flights.docx";
  link.click();
};
