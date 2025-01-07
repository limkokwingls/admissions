import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    program: string;
  };
};

async function getStudents(program: string) {
  const q = query(
    collection(db, 'students'),
    where('program', '==', program.toUpperCase())
  );
  let data = (await getDocs(q)).docs.map((doc) =>
    doc.data()
  ) as unknown as Student[];

  const admitted = data
    .filter((student) => student.status.toLocaleLowerCase() === 'admitted')
    .sort((a, b) => Number(a.position) - Number(b.position));
  const notAdmitted = data
    .filter((student) => student.status.toLocaleLowerCase() !== 'admitted')
    .sort((a, b) => Number(a.position) - Number(b.position));

  return [...admitted, ...notAdmitted];
}

export async function GET(request: Request, { params }: Props) {
  const students = await getStudents(params.program);
  return NextResponse.json(students);
}
