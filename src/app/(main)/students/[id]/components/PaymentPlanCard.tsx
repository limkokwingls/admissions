import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Clock, Info, Receipt, Wallet } from 'lucide-react';
import { ReactNode } from 'react';

type Installment = {
  month: string;
  amount: string;
};

type Program = 'diploma' | 'degree';

type ProgramInfo = {
  years: number;
  semesterFee: string;
  installments: {
    semester1: Installment[];
    semester2: Installment[];
  };
};

const PROGRAM_DATA: Record<Program, ProgramInfo> = {
  diploma: {
    years: 3,
    semesterFee: 'M14,125.00',
    installments: {
      semester1: [
        { month: 'August (Upfront)', amount: 'M8,500.00' },
        { month: 'September-October', amount: 'M2,812.50' },
        { month: 'November-December', amount: 'M2,812.50' },
      ],
      semester2: [
        { month: 'February (Upfront)', amount: 'M8,500.00' },
        { month: 'March-April', amount: 'M2,812.50' },
        { month: 'May-June', amount: 'M2,812.50' },
      ],
    },
  },
  degree: {
    years: 4,
    semesterFee: 'M21,150.00',
    installments: {
      semester1: [
        { month: 'August (Upfront)', amount: 'M12,000.00' },
        { month: 'September-October', amount: 'M4,575.00' },
        { month: 'November-December', amount: 'M4,575.00' },
      ],
      semester2: [
        { month: 'February (Upfront)', amount: 'M12,000.00' },
        { month: 'March-April', amount: 'M4,575.00' },
        { month: 'May-June', amount: 'M4,575.00' },
      ],
    },
  },
};

const BANK_DETAILS = [
  { label: 'Bank', value: 'Standard Lesotho Bank' },
  { label: 'Account No', value: '9080019987451' },
  { label: 'Branch', value: 'City Branch (051)' },
  { label: 'Account Type', value: 'Current Account' },
  { label: 'Swift Code', value: 'SBICLSMX' },
];

export default function PaymentPlanCard() {
  return (
    <Card className='mt-6 overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
      <CardHeader className='border-b border-neutral-200 pb-3 dark:border-neutral-800'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <CardTitle className='text-lg font-bold text-neutral-900 dark:text-white'>
            Payment Plan 2025/2026
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className='p-4 md:p-6'>
        <Tabs defaultValue='diploma' className='w-full'>
          <TabsList className='mb-6 grid w-full grid-cols-2'>
            <TabsTrigger value='diploma'>Diploma</TabsTrigger>
            <TabsTrigger value='degree'>Degree</TabsTrigger>
          </TabsList>

          {(Object.keys(PROGRAM_DATA) as Program[]).map((program) => {
            const info = PROGRAM_DATA[program];

            return (
              <TabsContent key={program} value={program} className='space-y-6'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div className='space-y-4'>
                    <PaymentCard
                      title='Semester 1'
                      amount={info.semesterFee}
                      installments={info.installments.semester1}
                    />
                  </div>

                  <div className='space-y-4'>
                    <PaymentCard
                      title='Semester 2'
                      amount={info.semesterFee}
                      installments={info.installments.semester2}
                    />
                  </div>
                </div>

                <InfoBox
                  icon={<Info className='h-4 w-4' />}
                  title='Important Payment Information'
                >
                  <p className='mt-2 text-sm text-neutral-600 dark:text-neutral-400'>
                    Your {program} program takes {info.years} years to complete,
                    with 2 semesters per year. Each semester costs{' '}
                    {info.semesterFee}
                  </p>
                </InfoBox>
              </TabsContent>
            );
          })}
        </Tabs>

        <div className='mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-700'>
          <h3 className='mb-4 text-base font-semibold text-neutral-900 dark:text-white'>
            Payment Options
          </h3>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <PaymentInfoCard
              icon={<Wallet className='h-5 w-5' />}
              title='Flexible Payments'
              description='Choose between full payment or convenient installment plans to fit your budget'
            />

            <PaymentInfoCard
              icon={<Clock className='h-5 w-5' />}
              title='Payment Schedule'
              description='Initial payment at registration with remaining installments spread throughout the semester'
            />

            <PaymentInfoCard
              icon={<CheckCircle2 className='h-5 w-5' />}
              title='Easy Process'
              description='Simple payment process through bank transfer or direct payment at the finance office'
            />
          </div>

          <InfoBox
            icon={<Receipt className='h-4 w-4' />}
            title='Bank Account Details'
          >
            <div className='mt-2 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2 md:grid-cols-3'>
              {BANK_DETAILS.map((detail, index) => (
                <div key={index}>
                  <span className='font-medium text-neutral-700 dark:text-neutral-400'>
                    {detail.label}:
                  </span>
                  <span className='ml-2 text-neutral-900 dark:text-neutral-200'>
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </InfoBox>
        </div>
      </CardContent>
    </Card>
  );
}

type PaymentCardProps = {
  title: string;
  amount: string;
  installments: Installment[];
};

function PaymentCard(props: PaymentCardProps) {
  const { title, amount, installments } = props;

  return (
    <div className='overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800'>
      <div className='border-b border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900'>
        <div className='flex items-center justify-between'>
          <h4 className='font-medium text-neutral-900 dark:text-white'>
            {title}
          </h4>
          <span className='text-sm text-neutral-500 dark:text-neutral-400'>
            Semester Fee
          </span>
        </div>
        <p className='mt-1 text-lg font-semibold text-neutral-900 dark:text-white'>
          {amount}
        </p>
      </div>

      <div className='p-4'>
        <h5 className='mb-3 text-sm font-medium text-neutral-700 dark:text-neutral-300'>
          Payment Schedule
        </h5>
        <div className='space-y-3'>
          {installments.map((item, index) => (
            <div
              key={index}
              className='flex items-center justify-between text-sm'
            >
              <span className='text-neutral-600 dark:text-neutral-400'>
                {item.month}
              </span>
              <span className='font-medium text-neutral-900 dark:text-white'>
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type PaymentInfoCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

function PaymentInfoCard(props: PaymentInfoCardProps) {
  const { icon, title, description } = props;

  return (
    <div className='flex items-start gap-3'>
      <div className='mt-0.5 rounded-full bg-neutral-100 p-2 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'>
        {icon}
      </div>
      <div>
        <h4 className='text-sm font-medium text-neutral-900 dark:text-white'>
          {title}
        </h4>
        <p className='mt-1 text-xs text-neutral-600 dark:text-neutral-400'>
          {description}
        </p>
      </div>
    </div>
  );
}

type InfoBoxProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

function InfoBox(props: InfoBoxProps) {
  const { icon, title, children } = props;

  return (
    <div className='mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50'>
      <div className='flex items-start gap-3'>
        <div className='mt-0.5 rounded-full bg-neutral-200 p-1.5 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300'>
          {icon}
        </div>
        <div>
          <h4 className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
            {title}
          </h4>
          {children}
        </div>
      </div>
    </div>
  );
}
