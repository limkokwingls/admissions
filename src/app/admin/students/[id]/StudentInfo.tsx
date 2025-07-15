import { getStudent } from '@/server/students/actions';
import { notFound } from 'next/navigation';

type Props = {
  student: NonNullable<Awaited<ReturnType<typeof getStudent>>>;
};

export default async function StudentInfo({ student }: Props) {
  return <div>StudentInfo</div>;
}
