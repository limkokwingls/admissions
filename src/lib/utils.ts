import { getStudent } from '@/server/students/actions';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type Student = Awaited<ReturnType<typeof getStudent>>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractReference(student: Student) {
  const status = student?.status == 'DQ' ? 'DQ' : student?.status[0];
  return `${student?.program.faculty.code}/${student?.program.code}/${status}/${student?.no}`;
}

export function formatNames(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .map((part) => {
      if (!part) return part;

      const firstChar = part.charAt(0).toUpperCase();
      const restOfString = part.slice(1);

      return firstChar + restOfString;
    })
    .join(' ');
}
