import { getStudent } from '@/server/students/actions';
import { notFound } from 'next/navigation';
import {
  Box,
  Card,
  Grid,
  Group,
  Text,
  Title,
  Badge,
  Divider,
  Stack,
  Paper,
  ThemeIcon,
  GridCol,
} from '@mantine/core';
import {
  IconUser,
  IconPhone,
  IconMail,
  IconCalendar,
  IconMapPin,
  IconSchool,
  IconHeart,
  IconUsers,
  IconCreditCard,
  IconCheck,
  IconX,
} from '@tabler/icons-react';

type Props = {
  student: NonNullable<Awaited<ReturnType<typeof getStudent>>>;
};

export default async function StudentInfo({ student }: Props) {
  const info = student.studentInfo;

  if (!info) {
    return (
      <Paper mt='lg' p='lg' withBorder>
        <Text c='dimmed' ta='center'>
          No personal information available for this student
        </Text>
      </Paper>
    );
  }

  return (
    <Box mt='lg' p='lg'>
      <Grid gutter='md'>
        <GridCol span={{ base: 12, md: 6 }}>
          <Card withBorder p='lg' h='100%'>
            <Group mb='md'>
              <ThemeIcon size='lg' radius='md' variant='light'>
                <IconUser size={20} />
              </ThemeIcon>
              <Title order={3}>Personal Information</Title>
            </Group>
            <Divider mb='md' />
            <Stack gap='sm'>
              <Group justify='space-between'>
                <Text fw={500}>Full Name:</Text>
                <Text>{info.name}</Text>
              </Group>
              <Group justify='space-between'>
                <Text fw={500}>National ID:</Text>
                <Text>{info.nationalId}</Text>
              </Group>
              <Group justify='space-between'>
                <Text fw={500}>Reference:</Text>
                <Text>{info.reference || 'N/A'}</Text>
              </Group>
              <Group justify='space-between'>
                <Text fw={500}>Gender:</Text>
                <Badge
                  variant='light'
                  color={info.gender === 'Male' ? 'blue' : 'pink'}
                >
                  {info.gender}
                </Badge>
              </Group>
              <Group justify='space-between'>
                <Text fw={500}>Date of Birth:</Text>
                <Text>{new Date(info.dateOfBirth).toLocaleDateString()}</Text>
              </Group>
              <Group justify='space-between'>
                <Text fw={500}>Marital Status:</Text>
                <Badge variant='light'>{info.maritalStatus}</Badge>
              </Group>
              <Group justify='space-between'>
                <Text fw={500}>Religion:</Text>
                <Text>{info.religion}</Text>
              </Group>
            </Stack>
          </Card>
        </GridCol>

        <GridCol span={{ base: 12, md: 6 }}>
          <Card withBorder p='lg' h='100%'>
            <Group mb='md'>
              <ThemeIcon size='lg' radius='md' variant='light' color='teal'>
                <IconPhone size={20} />
              </ThemeIcon>
              <Title order={3}>Contact Information</Title>
            </Group>
            <Divider mb='md' />
            <Stack gap='sm'>
              <Group justify='space-between'>
                <Text fw={500}>Email:</Text>
                <Text>{info.email}</Text>
              </Group>
              <Group justify='space-between'>
                <Text fw={500}>Primary Phone:</Text>
                <Text>{info.phone1}</Text>
              </Group>
              <Group justify='space-between'>
                <Text fw={500}>Secondary Phone:</Text>
                <Text>{info.phone2 || 'N/A'}</Text>
              </Group>
            </Stack>
          </Card>
        </GridCol>

        <GridCol span={{ base: 12, md: 6 }}>
          <Card withBorder p='lg' h='100%'>
            <Group mb='md'>
              <ThemeIcon size='lg' radius='md' variant='light' color='green'>
                <IconMapPin size={20} />
              </ThemeIcon>
              <Title order={3}>Location Information</Title>
            </Group>
            <Divider mb='md' />
            <Stack gap='sm'>
              <Group justify='space-between'>
                <Text fw={500}>Birth Place:</Text>
                <Text>{info.birthPlace}</Text>
              </Group>
              <Group justify='space-between'>
                <Text fw={500}>Home Town:</Text>
                <Text>{info.homeTown}</Text>
              </Group>
            </Stack>
          </Card>
        </GridCol>

        <GridCol span={{ base: 12, md: 6 }}>
          <Card withBorder p='lg' h='100%'>
            <Group mb='md'>
              <ThemeIcon size='lg' radius='md' variant='light' color='violet'>
                <IconSchool size={20} />
              </ThemeIcon>
              <Title order={3}>Education</Title>
            </Group>
            <Divider mb='md' />
            <Stack gap='sm'>
              <Group justify='space-between'>
                <Text fw={500}>High School:</Text>
                <Text>{info.highSchool}</Text>
              </Group>
            </Stack>
          </Card>
        </GridCol>

        <GridCol span={{ base: 12, md: 6 }}>
          <Card withBorder p='lg' h='100%'>
            <Group mb='md'>
              <ThemeIcon size='lg' radius='md' variant='light' color='orange'>
                <IconUsers size={20} />
              </ThemeIcon>
              <Title order={3}>Next of Kin</Title>
            </Group>
            <Divider mb='md' />
            <Stack gap='sm'>
              <Group justify='space-between'>
                <Text fw={500}>Name:</Text>
                <Text>{info.nextOfKinName}</Text>
              </Group>
              <Group justify='space-between'>
                <Text fw={500}>Phone:</Text>
                <Text>{info.nextOfKinPhone}</Text>
              </Group>
              <Group justify='space-between'>
                <Text fw={500}>Relationship:</Text>
                <Badge variant='light' color='orange'>
                  {info.nextOfKinRelationship}
                </Badge>
              </Group>
            </Stack>
          </Card>
        </GridCol>

        <GridCol span={{ base: 12, md: 6 }}>
          <Card withBorder p='lg' h='100%'>
            <Group mb='md'>
              <ThemeIcon size='lg' radius='md' variant='light' color='red'>
                <IconCreditCard size={20} />
              </ThemeIcon>
              <Title order={3}>Payment Status</Title>
            </Group>
            <Divider mb='md' />
            <Stack gap='sm'>
              <Group justify='space-between'>
                <Text fw={500}>Payment Status:</Text>
                <Badge
                  variant='light'
                  color={info.paid ? 'green' : 'red'}
                  leftSection={
                    info.paid ? <IconCheck size={12} /> : <IconX size={12} />
                  }
                >
                  {info.paid ? 'Paid' : 'Unpaid'}
                </Badge>
              </Group>
              <Group justify='space-between'>
                <Text fw={500}>Created:</Text>
                <Text>
                  {info.createdAt
                    ? new Date(info.createdAt).toLocaleDateString()
                    : 'N/A'}
                </Text>
              </Group>
              <Group justify='space-between'>
                <Text fw={500}>Last Updated:</Text>
                <Text>
                  {info.updatedAt
                    ? new Date(info.updatedAt).toLocaleDateString()
                    : 'N/A'}
                </Text>
              </Group>
            </Stack>
          </Card>
        </GridCol>
      </Grid>
    </Box>
  );
}
