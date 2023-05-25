import {
  addDoc,
  collection,
  doc,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';

export async function saveStudentList(studentList: any[]) {
  for (let i = 0; i < studentList.length; i++) {
    const std = studentList[i];
    console.log(`${i + 1}/${studentList.length}) ${std.names}...`);
    await addDoc(collection(db, 'students'), std);
  }
}

export async function savePrograms(programs: any[]) {
  for (let i = 0; i < programs.length; i++) {
    const item = programs[i];
    console.log(`${i + 1}/${programs.length}) ${item.name}...`);
    await addDoc(collection(db, 'students'), item);
  }
}
