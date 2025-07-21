import { getStudent } from '@/server/students/actions';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type Student = Awaited<ReturnType<typeof getStudent>>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractReference(student: Student) {
  // Use the reference column if it exists, otherwise calculate it
  if (student?.reference) {
    return student.reference;
  }

  // Fallback to calculation if reference column is not populated
  const status = student?.status == 'DQ' ? 'DQ' : student?.status[0];
  return `${student?.program.faculty.code}/${student?.program.code}/${status}/${student?.no}`;
}

export function parseReference(reference: string) {
  const parts = reference.split('/');
  if (parts.length !== 4) {
    throw new Error(
      'Invalid reference format. Expected format: FACULTY/PROGRAM/STATUS/NUMBER',
    );
  }

  const [facultyCode, programCode, statusCode, studentNo] = parts;

  let status: string;
  switch (statusCode) {
    case 'A':
      status = 'Admitted';
      break;
    case 'W':
      status = 'Wait Listed';
      break;
    case 'P':
      status = 'Private';
      break;
    case 'DQ':
      status = 'DQ';
      break;
    default:
      throw new Error('Invalid status code. Expected A, W, P, or DQ');
  }

  return {
    facultyCode,
    programCode,
    status,
    studentNo: parseInt(studentNo, 10),
  };
}

export function generateReference(student: NonNullable<Student>) {
  if (
    !student?.program?.faculty?.code ||
    !student?.program?.code ||
    !student?.status ||
    student.no === undefined
  ) {
    throw new Error(
      'Student must have program, faculty, status, and number to generate reference',
    );
  }

  const statusCode = student.status === 'DQ' ? 'DQ' : student.status[0];
  return `${student.program.faculty.code}/${student.program.code}/${statusCode}/${student.no}`;
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
