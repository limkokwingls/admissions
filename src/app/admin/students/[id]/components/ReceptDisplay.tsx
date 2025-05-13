'use client';

import { getStudent } from '@/server/students/actions';
import { Box, Group, Text } from '@mantine/core';
import { IconReceipt } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

type Props = {
  studentId: string;
};
export default function ReceptDisplay({ studentId }: Props) {
  const { data: student } = useQuery({
    queryKey: ['student'],
    queryFn: async () => {
      return getStudent(studentId);
    },
    enabled: typeof window !== 'undefined',
  });

  return (
    <Box>
      <Group gap='xs'>
        <Text size='sm' fw={500}>
          Receipt Number
        </Text>
      </Group>
      <Group mt={4} align='center'>
        {student?.receiptNo ? (
          <>
            <IconReceipt size={16} />
            <Text size='sm' fw={700}>
              {student.receiptNo}
            </Text>
          </>
        ) : (
          <Text size='sm' c='dimmed'>
            No receipt number
          </Text>
        )}
      </Group>
    </Box>
  );
}
