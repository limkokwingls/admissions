'use client';

import { Shell } from '@/components/adease';
import { UserRole } from '@/db/schema';
import {
  ActionIcon,
  Avatar,
  Flex,
  Group,
  Image,
  Indicator,
  LoadingOverlay,
  MantineColor,
  NavLink,
  Stack,
  Text,
  useComputedColorScheme,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  Icon,
  IconChevronRight,
  IconCircleCheck,
  IconForbid,
  IconHourglass,
  IconLogout2,
  IconPhone,
  IconSchool,
  IconSettings,
  IconUsers,
  IconUsersGroup,
  IconChartLine,
  IconFileInvoice,
  IconWritingSign,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { getCallsCountByStatus } from '@/server/calls/actions';
import { getStudentsWithInfoCount } from '@/server/students/actions';

type NotificationConfig = {
  queryKey: string[];
  color?: MantineColor;
  queryFn: () => Promise<number>;
};

export type NavItem = {
  label: string;
  href?: string;
  icon: Icon;
  children?: NavItem[];
  notificationCount?: NotificationConfig;
  roles?: UserRole[];
};

const navigation: NavItem[] = [
  {
    label: 'Users',
    href: '/admin/users',
    icon: IconUsers,
    roles: ['admin'],
  },
  {
    label: 'Students',
    href: '/admin/students',
    icon: IconUsersGroup,
    roles: ['registry', 'admin'],
  },
  {
    label: 'Name Changes',
    href: '/admin/name-changes',
    icon: IconUsersGroup,
    roles: ['registry', 'admin'],
  },
  {
    label: 'Registrations',
    href: '/admin/registrations',
    icon: IconWritingSign,
    roles: ['registry', 'admin'],
    notificationCount: {
      queryKey: ['registrations'],
      queryFn: () => getStudentsWithInfoCount(),
    },
  },
  {
    label: 'Faculties',
    href: '/admin/faculties',
    icon: IconSchool,
    roles: ['admin'],
  },
  {
    label: 'Properties',
    href: '/admin/properties',
    icon: IconSettings,
    roles: ['admin'],
  },
  {
    label: 'Calls',
    icon: IconPhone,
    children: [
      {
        label: 'Pending',
        href: '/admin/calls/pending',
        icon: IconHourglass,
      },
      {
        label: 'Accepted',
        href: '/admin/calls/accepted',
        icon: IconCircleCheck,
        notificationCount: {
          queryKey: ['calls', 'accepted'],
          queryFn: () => getCallsCountByStatus('accepted'),
          color: 'gray',
        },
      },
      {
        label: 'Rejected',
        href: '/admin/calls/rejected',
        icon: IconForbid,
      },
    ],
  },
  {
    label: 'Reports',
    href: '/admin/reports/collections',
    icon: IconFileInvoice,
    roles: ['admin', 'registry'],
  },
  {
    label: 'Analytics',
    href: '/admin/analytics',
    icon: IconChartLine,
    roles: ['registry'],
  },
];

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  if (status === 'loading') {
    return (
      <Flex h='100vh' w='100vw' justify='center' align='center'>
        <LoadingOverlay visible />
      </Flex>
    );
  }

  return (
    <Shell>
      <Shell.Header>
        <Group>
          <Logo />
        </Group>
      </Shell.Header>
      <Shell.Navigation>
        <Navigation navigation={navigation} />
      </Shell.Navigation>
      <Shell.Body>{children}</Shell.Body>
      <Shell.User>
        <UserButton />
      </Shell.User>
    </Shell>
  );
}

function UserButton() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.user) {
    router.push('/api/auth/signin');
  }

  const openModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: 'Confirm logout',
      children: 'Are you sure you want to logout?',
      confirmProps: { color: 'dark' },
      labels: { confirm: 'Logout', cancel: 'Cancel' },
      onConfirm: async () => await signOut(),
    });

  return (
    <Flex mt={'md'} mb={'sm'} justify='space-between' align={'center'}>
      <Group>
        <Avatar src={session?.user?.image} />
        <Stack gap={5}>
          <Text size='0.9rem'>{session?.user?.name}</Text>
          <Text size='0.7rem' c={'dimmed'}>
            {session?.user?.email}
          </Text>
        </Stack>
      </Group>
      <ActionIcon variant='default' size={'lg'}>
        <IconLogout2 size='1rem' onClick={openModal} />
      </ActionIcon>
    </Flex>
  );
}

export function Navigation({ navigation }: { navigation: NavItem[] }) {
  return (
    <>
      {navigation.map((item, index) => (
        <DisplayWithNotification key={index} item={item} />
      ))}
    </>
  );
}

function DisplayWithNotification({ item }: { item: NavItem }) {
  const { data: notificationCount = 0 } = useQuery({
    queryKey: item.notificationCount?.queryKey ?? [],
    queryFn: () => item.notificationCount?.queryFn() ?? Promise.resolve(0),
    enabled: !!item.notificationCount,
  });

  return (
    <Indicator
      position='middle-end'
      color={item.notificationCount?.color ?? 'red'}
      offset={20}
      size={23}
      label={notificationCount}
      disabled={!notificationCount}
    >
      <ItemDisplay item={item} />
    </Indicator>
  );
}

function ItemDisplay({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const Icon = item.icon;
  const { data: session } = useSession();

  if (
    item.roles &&
    (!session?.user?.role ||
      !item.roles.includes(session.user.role as UserRole))
  ) {
    if (session?.user?.role !== 'admin') {
      return null;
    }
  }

  const navLink = (
    <NavLink
      label={item.label}
      component={item.href ? Link : undefined}
      href={item.href || ''}
      active={item.href ? pathname.startsWith(item.href) : false}
      leftSection={<Icon size='1.1rem' />}
      rightSection={
        item.href ? <IconChevronRight size='0.8rem' stroke={1.5} /> : undefined
      }
      opened={!!item.children}
    >
      {item.children?.map((child, index) => (
        <DisplayWithNotification key={index} item={child} />
      ))}
    </NavLink>
  );
  return navLink;
}

function Logo() {
  const colorScheme = useComputedColorScheme('dark');
  return (
    <Link href='/admin'>
      <Image
        src={`/images/logo-${colorScheme}.png`}
        w={'auto'}
        h={50}
        alt='logo'
      />
    </Link>
  );
}
