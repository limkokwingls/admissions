import {
  addDoc,
  collection,
  doc,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';

export async function saveStudentList(studentList: any[]) {
  const batch = writeBatch(db);
  const collectionRef = collection(db, 'students');
  for (const std of studentList) {
    const docRef = doc(collectionRef);
    batch.set(docRef, std);
  }
  console.log(`Saving ${studentList.length} student records...`);
  await batch.commit();
}

export async function savePrograms(programs: any[]) {
  const batch = writeBatch(db);
  const collectionRef = collection(db, 'programs');
  for (const std of programs) {
    const docRef = doc(collectionRef);
    batch.set(docRef, std);
  }
  console.log(`Saving ${programs.length} program records...`);
  await batch.commit();
}
