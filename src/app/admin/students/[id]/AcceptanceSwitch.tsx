'use client';
import { formatNames } from '@/lib/utils';
import { trackAcceptanceChange } from '@/server/history/actions';
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
  NumberInput,
  Paper,
  Switch,
  Text,
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
} from '@tabler/icons-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useTransition } from 'react';
import PrintNameChange from '../../name-changes/[id]/components/PrintNameChange';
import PrintAdmission from './components/PrintAdmission';
import PrintNonSponsoredAcceptance from './components/PrintNonSponsoredAcceptance';

type Props = {
  student: NonNullable<Awaited<ReturnType<typeof getStudent>>>;
  properties: Awaited<ReturnType<typeof getCurrentProperties>>;
};

export default function AcceptanceSwitch({ student, properties }: Props) {
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
  const queryClient = useQueryClient();

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

            {(student.status == 'Admitted' || student.status === 'Private') && (
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
                <ActionIcon
                  variant='light'
                  color={isAccepted ? 'green' : 'gray'}
                  onClick={open}
                  disabled={isPending}
                  loading={isPending}
                >
                  <IconEdit size={'1rem'} />
                </ActionIcon>
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
              <NumberInput
                required
                label='Receipt Number'
                placeholder='Receipt Number'
                value={receiptNo}
                prefix='SR-'
                onChange={(value) => {
                  if (value) {
                    setReceiptNo(`SR-${value}`);
                  } else {
                    setReceiptNo(value?.toString().replace('SR-', ''));
                  }
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
    </>
  );
}
