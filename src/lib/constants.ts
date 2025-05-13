type Program = 'diploma' | 'degree';

type Installment = {
  month: string;
  amount: string;
};

type ProgramInfo = {
  years: number;
  yearFee: string;
  semesterFee: string;
  installments: {
    semester1: Installment[];
    semester2: Installment[];
  };
};

export const PROGRAM_DATA: Record<Program, ProgramInfo> = {
  diploma: {
    years: 3,
    yearFee: 'M28,250.00',
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
    yearFee: 'M42,300.00',
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

export const BANK_DETAILS = [
  { label: 'Bank', value: 'Standard Lesotho Bank' },
  { label: 'Account No', value: '9080003987813' },
  { label: 'Branch', value: 'City Branch (060667)' },
  { label: 'Account Type', value: 'Current Account' },
  { label: 'Swift Code', value: 'SBICLSMX' },
];
