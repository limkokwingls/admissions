import { db } from '@/lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

async function getPrograms() {
  const q = query(collection(db, 'programs'));
  return (await getDocs(q)).docs.map((doc) =>
    doc.data()
  ) as unknown as Program[];
}

export async function GET(_: Request) {
  const programs = await getPrograms();
  return NextResponse.json(programs);
}
