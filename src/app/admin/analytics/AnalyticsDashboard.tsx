'use client';
import {
  getDailyDownloads,
  getDailyVisits,
  getTopDownloaders,
  getTopVisitors,
  getTotalDownloads,
  getTotalVisits,
} from '@/server/analytics/actions';
import {
  Badge,
  Box,
  Card,
  Group,
  Tooltip as MantineTooltip,
  Paper,
  Progress,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconDownload,
  IconEye,
  IconUser,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function StatCard({
  title,
  value,
  loading,
  icon,
  color = 'blue',
  trend,
  trendValue,
}: {
  title: string;
  value: number | string;
  loading: boolean;
  icon: React.ReactNode;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}) {
  const getTrendIcon = () => {
    if (!trend || !trendValue) return null;

    return (
      <Group gap={4} align='center'>
        {trend === 'up' ? (
          <IconArrowUpRight
            size={16}
            color='var(--mantine-color-green-6)'
            stroke={2.5}
          />
        ) : trend === 'down' ? (
          <IconArrowDownRight
            size={16}
            color='var(--mantine-color-red-6)'
            stroke={2.5}
          />
        ) : null}
        <Text
          size='sm'
          c={trend === 'up' ? 'green.6' : trend === 'down' ? 'red.6' : 'dimmed'}
        >
          {trendValue}
        </Text>
      </Group>
    );
  };

  return (
    <Card withBorder p='lg' radius='md' style={{ flex: 1 }} shadow='sm'>
      <Group justify='space-between' align='flex-start'>
        <Stack gap='xs'>
          <Text
            size='sm'
            c='dimmed'
            fw={600}
            tt='uppercase'
            styles={{ root: { letterSpacing: 1 } }}
          >
            {title}
          </Text>
          {loading ? (
            <Skeleton height={36} width={100} mt={4} radius='sm' />
          ) : (
            <Box>
              <Title order={3} fw={700}>
                {value}
              </Title>
              {getTrendIcon()}
            </Box>
          )}
        </Stack>
        <ThemeIcon size={42} radius='xl' color={color} variant='light'>
          {icon}
        </ThemeIcon>
      </Group>
    </Card>
  );
}

function LineChartCard({
  title,
  data,
  series,
  loading,
  description,
}: {
  title: string;
  data: any[];
  series: Array<{
    dataKey: string;
    color: string;
    name: string;
  }>;
  loading: boolean;
  description?: string;
}) {
  return (
    <Card withBorder p='lg' radius='md' style={{ height: '100%' }} shadow='sm'>
      <Box mb='lg'>
        <Title order={3} fw={600} mb='xs'>
          {title}
        </Title>
        {description && (
          <Text size='sm' c='dimmed' mb='md'>
            {description}
          </Text>
        )}
      </Box>
      {loading ? (
        <Stack gap='sm'>
          <Skeleton height={20} width='50%' radius='sm' />
          <Skeleton height={260} radius='sm' />
        </Stack>
      ) : (
        <ResponsiveContainer width='100%' height={280}>
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 10,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
            <XAxis
              dataKey='date'
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#e0e0e0' }}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#e0e0e0' }}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: 'none',
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '16px',
                fontSize: '14px',
              }}
            />
            {series.map((item, index) => (
              <Line
                key={index}
                type='monotone'
                dataKey={item.dataKey}
                name={item.name}
                stroke={item.color}
                strokeWidth={2.5}
                dot={{ r: 3, strokeWidth: 1.5 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1500}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

function TopUsersCard({
  title,
  data,
  loading,
  valueKey,
  description,
}: {
  title: string;
  data: any[];
  loading: boolean;
  valueKey: string;
  description?: string;
}) {
  const getPositionColor = (index: number) => {
    switch (index) {
      case 0:
        return 'yellow.6';
      case 1:
        return 'gray.6';
      case 2:
        return 'orange.6';
      default:
        return 'gray.5';
    }
  };

  return (
    <Card withBorder p='lg' radius='md' style={{ height: '100%' }} shadow='sm'>
      <Box mb='lg'>
        <Title order={3} fw={600} mb='xs'>
          {title}
        </Title>
        {description && (
          <Text size='sm' c='dimmed' mb='md'>
            {description}
          </Text>
        )}
      </Box>
      {loading ? (
        <Stack gap='md'>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Stack key={i} gap='xs'>
                <Group justify='space-between'>
                  <Skeleton height={20} width={120} radius='sm' />
                  <Skeleton height={20} width={35} radius='sm' />
                </Group>
                <Skeleton height={4} width='100%' radius='xl' />
              </Stack>
            ))}
        </Stack>
      ) : (
        <Stack gap='md'>
          {data.map((item, index) => (
            <Paper
              key={index}
              p='md'
              radius='md'
              styles={{
                root: {
                  transition: 'background-color 200ms',
                  '&:hover': { backgroundColor: 'var(--mantine-color-gray-0)' },
                },
              }}
            >
              <Group justify='space-between' mb='xs'>
                <Group gap='md'>
                  <ThemeIcon
                    size={28}
                    radius='xl'
                    color={index < 3 ? getPositionColor(index) : 'gray'}
                    variant={index < 3 ? 'filled' : 'light'}
                  >
                    {index < 3 ? (
                      <Text fw={700} size='sm'>
                        {index + 1}
                      </Text>
                    ) : (
                      <IconUser size={16} stroke={1.5} />
                    )}
                  </ThemeIcon>
                  <div>
                    <Text fw={600} size='sm'>
                      {item.studentName}
                    </Text>
                    <Text size='xs' c='dimmed'>
                      ID: {item.studentId || '---'}
                    </Text>
                  </div>
                </Group>
                <MantineTooltip
                  label={`${valueKey === 'visits' ? 'Page Visits' : 'Downloads'}`}
                >
                  <Badge
                    size='md'
                    variant='light'
                    radius='sm'
                    color={valueKey === 'visits' ? 'blue' : 'green'}
                  >
                    {item[valueKey]}
                  </Badge>
                </MantineTooltip>
              </Group>
              <Box pl={40}>
                <Progress
                  value={Math.min(
                    100,
                    (item[valueKey] / (data[0]?.[valueKey] || 1)) * 100,
                  )}
                  color={valueKey === 'visits' ? 'blue' : 'green'}
                  size='xs'
                  radius='xl'
                />
              </Box>
            </Paper>
          ))}
        </Stack>
      )}
    </Card>
  );
}

// Helper function to combine chart data
function combineChartData(visitsData: any[], downloadsData: any[]) {
  const combinedData: any[] = [];

  // Create a map of dates for quick lookup
  const dateMap = new Map();

  // Process visits data
  visitsData.forEach((visit) => {
    dateMap.set(visit.date, {
      date: visit.date,
      visits: visit.count,
      downloads: 0,
    });
  });

  // Process downloads data
  downloadsData.forEach((download) => {
    if (dateMap.has(download.date)) {
      const entry = dateMap.get(download.date);
      entry.downloads = download.count;
    } else {
      dateMap.set(download.date, {
        date: download.date,
        visits: 0,
        downloads: download.count,
      });
    }
  });

  // Convert map to array and sort by date
  dateMap.forEach((value) => combinedData.push(value));
  combinedData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return combinedData;
}

export default function AnalyticsDashboard() {
  // Fetch analytics data
  const { data: dailyVisits, isLoading: loadingVisits } = useQuery({
    queryKey: ['analytics', 'daily-visits'],
    queryFn: () => getDailyVisits(30),
  });

  const { data: dailyDownloads, isLoading: loadingDownloads } = useQuery({
    queryKey: ['analytics', 'daily-downloads'],
    queryFn: () => getDailyDownloads(30),
  });

  const { data: totalVisits, isLoading: loadingTotalVisits } = useQuery({
    queryKey: ['analytics', 'total-visits'],
    queryFn: () => getTotalVisits(),
  });

  const { data: totalDownloads, isLoading: loadingTotalDownloads } = useQuery({
    queryKey: ['analytics', 'total-downloads'],
    queryFn: () => getTotalDownloads(),
  });

  const { data: topVisitors, isLoading: loadingTopVisitors } = useQuery({
    queryKey: ['analytics', 'top-visitors'],
    queryFn: () => getTopVisitors(5),
  });

  const { data: topDownloaders, isLoading: loadingTopDownloaders } = useQuery({
    queryKey: ['analytics', 'top-downloaders'],
    queryFn: () => getTopDownloaders(5),
  });

  // Calculate trends (mock data - in a real implementation, you'd compare with previous period)
  const visitsTrend = totalVisits && totalVisits > 100 ? 'up' : 'neutral';
  const downloadsTrend =
    totalDownloads && totalDownloads > 50 ? 'up' : 'neutral';

  return (
    <Stack gap='xl'>
      <Paper
        p='xl'
        radius='md'
        withBorder
        styles={{
          root: {
            borderColor: 'var(--mantine-color-blue-1)',
            background:
              'linear-gradient(to right, var(--mantine-color-blue-0), var(--mantine-color-indigo-0))',
          },
        }}
      >
        <Title order={1} mb='xs' c='blue.9'>
          Analytics Dashboard
        </Title>
        <Text size='lg' c='dimmed' mb='md' style={{ maxWidth: '42rem' }}>
          Track student engagement and application metrics to optimize the
          admissions process
        </Text>
      </Paper>

      {/* Stats Overview */}
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
        <StatCard
          title='Total Page Visits'
          value={totalVisits?.toLocaleString() || '0'}
          loading={loadingTotalVisits}
          icon={<IconEye size={22} stroke={1.5} />}
          color='blue'
          trend={visitsTrend}
          trendValue='+12.3% from last month'
        />
        <StatCard
          title='Total Downloads'
          value={totalDownloads?.toLocaleString() || '0'}
          loading={loadingTotalDownloads}
          icon={<IconDownload size={22} stroke={1.5} />}
          color='green'
          trend={downloadsTrend}
          trendValue='+5.7% from last month'
        />
      </SimpleGrid>

      {/* Combined Chart */}
      <Card withBorder p='lg' radius='md' shadow='sm'>
        <LineChartCard
          title='Page Visits & Download Activity'
          description='Daily metrics over the last 30 days'
          data={combineChartData(dailyVisits || [], dailyDownloads || [])}
          series={[
            { dataKey: 'visits', color: '#3b82f6', name: 'Page Visits' },
            { dataKey: 'downloads', color: '#10b981', name: 'Downloads' },
          ]}
          loading={loadingVisits || loadingDownloads}
        />
      </Card>

      {/* Top Users */}
      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing='md'>
        <TopUsersCard
          title='Top Visitors'
          description='Students with the most page visits'
          data={topVisitors || []}
          loading={loadingTopVisitors}
          valueKey='visits'
        />
        <TopUsersCard
          title='Top Downloaders'
          description='Students with the most letter downloads'
          data={topDownloaders || []}
          loading={loadingTopDownloaders}
          valueKey='downloads'
        />
      </SimpleGrid>
    </Stack>
  );
}
