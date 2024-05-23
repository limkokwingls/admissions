import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { NextResponse } from 'next/server';

type Props = {
  params: {
    level: string;
  };
};

async function getPrograms(level: string) {
  const q = query(
    collection(db, 'programs'),
    where('level', '==', level.toUpperCase())
  );
  return (await getDocs(q)).docs.map((doc) =>
    doc.data()
  ) as unknown as Program[];
}

export async function GET(request: Request, { params }: Props) {
  const programs = await getPrograms(params.level);
  return NextResponse.json(programs);
}
