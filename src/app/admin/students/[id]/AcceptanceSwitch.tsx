'use client';
import { formatNames } from '@/lib/utils';
import { getCallsByStudentId } from '@/server/calls/actions';
import {
  trackAcceptanceChange,
  trackStatusChange,
} from '@/server/history/actions';
import { getNameChangeByStudent } from '@/server/name-changes/actions';
import { getCurrentProperties } from '@/server/properties/actions';
import { getStudent, updateStudent } from '@/server/students/actions';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Group,
  Modal,
  Paper,
  Switch,
  Text,
  TextInput,
  Tooltip,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconCircleCheck,
  IconEdit,
  IconExclamationCircle,
  IconReceipt,
  IconUserCheck,
} from '@tabler/icons-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import PrintNameChange from '../../name-changes/[id]/components/PrintNameChange';
import PrintAdmission from './components/PrintAdmission';
import PrintNonSponsoredAcceptance from './components/PrintNonSponsoredAcceptance';

type Props = {
  student: NonNullable<Awaited<ReturnType<typeof getStudent>>>;
  properties: Awaited<ReturnType<typeof getCurrentProperties>>;
  calls: Awaited<ReturnType<typeof getCallsByStudentId>>;
};

export default function AcceptanceSwitch({
  student,
  properties,
  calls,
}: Props) {
  const { data: nameChange } = useQuery({
    queryKey: ['nameChange', student.id],
    queryFn: () => getNameChangeByStudent(student.id),
  });
  const theme = useMantineTheme();
  const [isAccepted, setIsAccepted] = useState<boolean>(student.accepted);
  const [tempIsAccepted, setTempIsAccepted] = useState<boolean>(
    student.accepted,
  );
  const [receiptNo, setReceiptNo] = useState<string>(student.receiptNo || '');
  const [receiptError, setReceiptError] = useState<string>('');
  const [isSponsored, setIsSponsored] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [opened, { open, close }] = useDisclosure(false);
  const [privateOpened, { open: openPrivate, close: closePrivate }] =
    useDisclosure(false);
  const [tempIsPrivate, setTempIsPrivate] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const hasAcceptedCall = calls.some((call) => call.status === 'accepted');
  const router = useRouter();

  const statusColor = isAccepted ? theme.colors.green[6] : theme.colors.gray[6];
  function update() {
    const status = tempIsAccepted;
    const previousStatus = isAccepted;

    if (status && !receiptNo.trim() && !isSponsored) {
      setReceiptError(
        'Receipt number is required when accepting a student (unless sponsored by Higher Life Foundation)',
      );
      return;
    }

    setReceiptError('');
    setIsAccepted(status);

    startTransition(async () => {
      try {
        await updateStudent(student.id, {
          ...student,
          accepted: status,
          sponsor: isSponsored ? 'Higher Life' : null,
          receiptNo: isSponsored ? null : receiptNo.trim(),
        });

        await trackAcceptanceChange(student.id, previousStatus, status);

        queryClient.invalidateQueries({
          queryKey: ['students'],
        });
        queryClient.invalidateQueries({
          queryKey: ['student'],
        });
        queryClient.invalidateQueries({
          queryKey: ['student', student.id],
        });
        notifications.show({
          title: status ? 'Accepted' : 'Not Accepted',
          message: `Acceptance status updated to ${status ? 'accepted' : 'not accepted'}`,
          color: status ? 'green' : 'gray',
          icon: status ? (
            <IconCircleCheck size={rem(20)} />
          ) : (
            <IconExclamationCircle size={rem(20)} />
          ),
        });
        close();
        router.refresh();
      } catch (error) {
        setIsAccepted(student.accepted);
        setTempIsAccepted(student.accepted);
        notifications.show({
          title: 'Error updating acceptance status',
          message: error instanceof Error ? error.message : 'An error occurred',
          color: 'red',
          icon: <IconExclamationCircle size={rem(20)} />,
        });
      }
    });
  }

  function updateStatus() {
    const newStatus = tempIsPrivate ? 'Private' : 'Wait Listed';
    const previousStatus = student.status;

    startTransition(async () => {
      try {
        // Calculate new reference with updated status
        const statusCode = newStatus[0]; // W for Wait Listed, P for Private
        const newReference = `${student.program.faculty.code}/${student.program.code}/${statusCode}/${student.no}`;

        await updateStudent(student.id, {
          ...student,
          status: newStatus,
          reference: newReference,
        });

        await trackStatusChange(student.id, previousStatus, newStatus);

        // Update local student object to reflect the change immediately
        Object.assign(student, { status: newStatus, reference: newReference });

        queryClient.invalidateQueries({
          queryKey: ['students'],
        });
        queryClient.invalidateQueries({
          queryKey: ['student'],
        });
        queryClient.invalidateQueries({
          queryKey: ['student', student.id],
        });
        notifications.show({
          title: 'Status Updated',
          message: `Student status updated to ${newStatus}`,
          color: newStatus === 'Private' ? 'lime' : 'yellow',
          icon: <IconCircleCheck size={rem(20)} />,
        });
        closePrivate();
        router.refresh();
      } catch (error) {
        notifications.show({
          title: 'Error updating status',
          message: error instanceof Error ? error.message : 'An error occurred',
          color: 'red',
          icon: <IconExclamationCircle size={rem(20)} />,
        });
      }
    });
  }

  return (
    <>
      <Card shadow='sm' padding='md' radius='md' withBorder>
        <Flex justify='space-between' wrap='nowrap'>
          <Group gap='xs'>
            {isAccepted ? (
              <IconCircleCheck color={theme.colors.green[6]} />
            ) : (
              <IconExclamationCircle color={theme.colors.gray[6]} />
            )}
            <Box>
              <Text fw={500} size='sm' c={statusColor}>
                {isAccepted ? 'Accepted' : 'Not Accepted'}
              </Text>
            </Box>
          </Group>
          <Group gap='xs'>
            {student.status === 'Wait Listed' && (
              <Tooltip label='Change to Private Status'>
                <ActionIcon
                  variant='light'
                  color='lime'
                  onClick={() => {
                    setTempIsPrivate(true);
                    openPrivate();
                  }}
                  disabled={isPending}
                  loading={isPending}
                >
                  <IconUserCheck size={'1rem'} />
                </ActionIcon>
              </Tooltip>
            )}

            {(student.status === 'Wait Listed' ||
              student.status === 'Private') && (
              <Tooltip label='Print Acceptance Letter (Non-Sponsored)'>
                <span>
                  <PrintNonSponsoredAcceptance
                    key='print-non-sponsored'
                    student={student}
                    properties={properties}
                  />
                </span>
              </Tooltip>
            )}

            {(student.status == 'Admitted' ||
              student.status === 'Private' ||
              hasAcceptedCall) && (
              <>
                {isAccepted ? (
                  <Tooltip label='Print Admission Letter'>
                    <span>
                      <PrintAdmission
                        key='print'
                        student={student}
                        properties={properties}
                      />
                    </span>
                  </Tooltip>
                ) : null}
                {nameChange && (
                  <Tooltip label='Print Name Change Letter'>
                    <span>
                      <PrintNameChange
                        nameChange={nameChange}
                        properties={properties}
                      />
                    </span>
                  </Tooltip>
                )}
                {student.programId !== 170 && (
                  <ActionIcon
                    variant='light'
                    color={isAccepted ? 'green' : 'gray'}
                    onClick={open}
                    disabled={isPending}
                    loading={isPending}
                  >
                    <IconEdit size={'1rem'} />
                  </ActionIcon>
                )}
              </>
            )}
          </Group>
        </Flex>
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        title='Update Status'
        centered
        radius='md'
        size='md'
      >
        <Box mb='md'>
          <Paper withBorder radius='sm' p='sm'>
            <Text>{formatNames(`${student.surname} ${student.names}`)}</Text>
          </Paper>
        </Box>
        <Switch
          checked={tempIsAccepted}
          onChange={(event) => setTempIsAccepted(event.currentTarget.checked)}
          color='green'
          size='md'
          label={tempIsAccepted ? 'Accepted' : 'Not Accepted'}
          description={`Toggle to mark as ${tempIsAccepted ? 'not accepted' : 'accepted'}`}
          disabled={isPending}
        />{' '}
        {tempIsAccepted && (
          <Box mt='md'>
            {student.status === 'Private' && (
              <Checkbox
                label='This student is sponsored by Higher Life Foundation'
                checked={isSponsored}
                onChange={(event) => {
                  setIsSponsored(event.currentTarget.checked);
                  if (event.currentTarget.checked) {
                    setReceiptNo('');
                    setReceiptError('');
                  }
                }}
                disabled={isPending}
                mb='md'
              />
            )}

            {!isSponsored && (
              <TextInput
                required
                label='Receipt Number'
                placeholder='Receipt Number'
                value={receiptNo}
                onChange={(event) => {
                  setReceiptNo(event.currentTarget.value);
                  setReceiptError('');
                }}
                error={receiptError}
                disabled={isPending}
                leftSection={<IconReceipt size={16} />}
                leftSectionPointerEvents='none'
                data-autofocus
              />
            )}
          </Box>
        )}
        <Group justify='flex-end' mt='lg'>
          {' '}
          <Button
            variant='default'
            onClick={() => {
              setTempIsAccepted(isAccepted);
              setReceiptNo(student.receiptNo || '');
              setReceiptError('');
              setIsSponsored(false);
              close();
            }}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={update}
            color={tempIsAccepted ? 'green' : 'red'}
            loading={isPending}
          >
            Update
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={privateOpened}
        onClose={closePrivate}
        title='Change Status to Private'
        centered
        radius='md'
        size='md'
      >
        <Box mb='md'>
          <Paper withBorder radius='sm' p='sm'>
            <Text>{formatNames(`${student.surname} ${student.names}`)}</Text>
          </Paper>
        </Box>
        <Text size='sm' mb='md' c='dimmed'>
          Are you sure you want to change this student&apos;s status from
          &quot;Wait Listed&quot; to &quot;Private&quot;?
        </Text>
        <Group justify='flex-end' mt='lg'>
          <Button variant='default' onClick={closePrivate} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={updateStatus} color='lime' loading={isPending}>
            Change to Private
          </Button>
        </Group>
      </Modal>
    </>
  );
}
