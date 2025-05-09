import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Info,
  Receipt,
} from 'lucide-react';
import { ReactNode } from 'react';
import { getCurrentProperties } from '@/server/properties/actions';
import { formatDate } from 'date-fns';
import { PROGRAM_DATA } from '@/lib/constants';
import { BANK_DETAILS } from '@/lib/constants';

type Program = 'diploma' | 'degree';

type Installment = {
  month: string;
  amount: string;
};

type Props = {
  level: 'diploma' | 'degree' | 'certificate';
  properties: NonNullable<Awaited<ReturnType<typeof getCurrentProperties>>>;
};

type PaymentDates = {
  privatePaymentDateFrom: string | null;
  privatePaymentDateTo: string | null;
};

export default async function PaymentPlanCard({ level, properties }: Props) {
  const paymentDates: PaymentDates = {
    privatePaymentDateFrom: properties?.privatePaymentDate || null,
    privatePaymentDateTo: properties?.registrationDateTo || null,
  };
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
        <Tabs defaultValue={level} className='w-full'>
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
                    A {program} program takes {info.years} years to complete,
                    with 2 semesters per year. Each semester costs{' '}
                    {info.semesterFee}.
                    {paymentDates.privatePaymentDateFrom &&
                    paymentDates.privatePaymentDateTo ? (
                      <>
                        {' '}
                        Proof of payment must be submitted between{' '}
                        {formatDate(
                          paymentDates.privatePaymentDateFrom,
                          'dd MMM yyyy',
                        )}
                        {' and '}
                        {formatDate(
                          paymentDates.privatePaymentDateTo,
                          'dd MMM yyyy',
                        )}{' '}
                        before registration.
                      </>
                    ) : (
                      'Payment must be made before registration.'
                    )}
                  </p>
                </InfoBox>
              </TabsContent>
            );
          })}
        </Tabs>

        <div className='mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-700'>
          <h3 className='mb-4 text-base font-semibold text-neutral-900 dark:text-white'>
            Payment Schedule Information
          </h3>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <PaymentInfoCard
              icon={<Calendar className='h-5 w-5' />}
              title='Payment Window'
              description={
                paymentDates.privatePaymentDateFrom &&
                paymentDates.privatePaymentDateTo
                  ? `Payments are only accepted between ${formatDate(
                      paymentDates.privatePaymentDateFrom,
                      'dd MMM yyyy',
                    )} and ${formatDate(
                      paymentDates.privatePaymentDateTo,
                      'dd MMM yyyy',
                    )}`
                  : 'Payments are only accepted during the designated payment period'
              }
            />

            <PaymentInfoCard
              icon={<AlertCircle className='h-5 w-5' />}
              title='Required Before Registration'
              description='All required payments must be completed before you can register for classes'
            />

            <PaymentInfoCard
              icon={<CheckCircle2 className='h-5 w-5' />}
              title='Payment Verification'
              description='Keep your payment receipts as proof of payment for registration verification'
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
