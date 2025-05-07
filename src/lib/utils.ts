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
    .map((part) =>
      part
        .split(/('|-)/g)
        .map((segment, index) =>
          index % 2 === 0
            ? segment.charAt(0).toUpperCase() + segment.slice(1)
            : segment,
        )
        .join(''),
    )
    .join(' ');
}
