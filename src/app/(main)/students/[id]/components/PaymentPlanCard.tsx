import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Receipt,
  CreditCard,
  Calendar,
  Clock,
  CheckCircle2,
  Wallet,
  Info,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReactNode } from 'react';

type InstallmentType = {
  month: string;
  amount: string;
};

type SemesterType = {
  title: string;
  amount: string;
  installments: InstallmentType[];
};

type ProgramPatternType = {
  odd: SemesterType;
  even: SemesterType;
};

type SemesterPatternsType = {
  diploma: ProgramPatternType;
  degree: ProgramPatternType;
};

type ProgramStructureType = {
  years: number;
  semestersPerYear: number;
};

type ProgramStructuresType = {
  diploma: ProgramStructureType;
  degree: ProgramStructureType;
};

type ProgramType = keyof SemesterPatternsType;

export default function PaymentPlanCard() {
  const semesterPatterns: SemesterPatternsType = {
    diploma: {
      odd: {
        title: 'Semester 1',
        amount: 'M14,125.00',
        installments: [
          { month: 'August (Upfront)', amount: 'M8,500.00' },
          { month: 'September-October', amount: 'M2,812.50' },
          { month: 'November-December', amount: 'M2,812.50' },
        ],
      },
      even: {
        title: 'Semester 2',
        amount: 'M14,125.00',
        installments: [
          { month: 'February (Upfront)', amount: 'M8,500.00' },
          { month: 'March-April', amount: 'M2,812.50' },
          { month: 'May-June', amount: 'M2,812.50' },
        ],
      },
    },
    degree: {
      odd: {
        title: 'Semester 1',
        amount: 'M21,150.00',
        installments: [
          { month: 'August (Upfront)', amount: 'M12,000.00' },
          { month: 'September-October', amount: 'M4,575.00' },
          { month: 'November-December', amount: 'M4,575.00' },
        ],
      },
      even: {
        title: 'Semester 2',
        amount: 'M21,150.00',
        installments: [
          { month: 'February (Upfront)', amount: 'M12,000.00' },
          { month: 'March-April', amount: 'M4,575.00' },
          { month: 'May-June', amount: 'M4,575.00' },
        ],
      },
    },
  };

  const programStructure: ProgramStructuresType = {
    diploma: {
      years: 3,
      semestersPerYear: 2,
    },
    degree: {
      years: 4,
      semestersPerYear: 2,
    },
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
        <Tabs defaultValue='diploma' className='w-full'>
          <TabsList className='mb-6 grid w-full grid-cols-2'>
            <TabsTrigger value='diploma'>Diploma</TabsTrigger>
            <TabsTrigger value='degree'>Degree</TabsTrigger>
          </TabsList>

          {Object.entries(programStructure).map(([program, structure]) => {
            const typedProgram = program as ProgramType;
            return (
              <TabsContent key={program} value={program} className='space-y-6'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div className='space-y-4'>
                    <PaymentCard
                      title='Semester 1'
                      amount={semesterPatterns[typedProgram].odd.amount}
                      installments={
                        semesterPatterns[typedProgram].odd.installments
                      }
                    />
                  </div>

                  <div className='space-y-4'>
                    <PaymentCard
                      title='Semester 2'
                      amount={semesterPatterns[typedProgram].even.amount}
                      installments={
                        semesterPatterns[typedProgram].even.installments
                      }
                    />
                  </div>
                </div>

                <div className='mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50'>
                  <div className='flex items-start gap-3'>
                    <div className='mt-0.5 rounded-full bg-neutral-200 p-1.5 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300'>
                      <Info className='h-4 w-4' />
                    </div>
                    <div>
                      <h4 className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                        Important Payment Information
                      </h4>
                      <p className='mt-2 text-sm text-neutral-600 dark:text-neutral-400'>
                        Your {program} program takes {structure.years} years to
                        complete, with 2 semesters per year. Each semester costs{' '}
                        {semesterPatterns[typedProgram].odd.amount}
                      </p>
                    </div>
                  </div>
                </div>
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

          <div className='mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50'>
            <div className='flex items-start gap-3'>
              <div className='mt-0.5 rounded-full bg-neutral-200 p-1.5 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300'>
                <Receipt className='h-4 w-4' />
              </div>
              <div>
                <h4 className='text-sm font-medium text-neutral-900 dark:text-neutral-300'>
                  Bank Account Details
                </h4>
                <div className='mt-2 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2 md:grid-cols-3'>
                  <div>
                    <span className='font-medium text-neutral-700 dark:text-neutral-400'>
                      Bank:
                    </span>
                    <span className='ml-2 text-neutral-900 dark:text-neutral-200'>
                      Standard Lesotho Bank
                    </span>
                  </div>
                  <div>
                    <span className='font-medium text-neutral-700 dark:text-neutral-400'>
                      Account No:
                    </span>
                    <span className='ml-2 text-neutral-900 dark:text-neutral-200'>
                      9080019987451
                    </span>
                  </div>
                  <div>
                    <span className='font-medium text-neutral-700 dark:text-neutral-400'>
                      Branch:
                    </span>
                    <span className='ml-2 text-neutral-900 dark:text-neutral-200'>
                      City Branch (051)
                    </span>
                  </div>
                  <div>
                    <span className='font-medium text-neutral-700 dark:text-neutral-400'>
                      Account Type:
                    </span>
                    <span className='ml-2 text-neutral-900 dark:text-neutral-200'>
                      Current Account
                    </span>
                  </div>
                  <div>
                    <span className='font-medium text-neutral-700 dark:text-neutral-400'>
                      Swift Code:
                    </span>
                    <span className='ml-2 text-neutral-900 dark:text-neutral-200'>
                      SBICLSMX
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type PaymentCardProps = {
  title: string;
  amount: string;
  installments: { month: string; amount: string }[];
};

function PaymentCard({ title, amount, installments }: PaymentCardProps) {
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

function PaymentInfoCard({ icon, title, description }: PaymentInfoCardProps) {
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
