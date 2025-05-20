type Program = 'diploma' | 'degree';

type Installment = {
  month: string;
  amount: string;
};

type ProgramInfo = {
  years: number;
  firstYearFee: string;
  otherYearsFee: string;
  semesterFee: string;
  installments: {
    semester1: Installment[];
    semester2: Installment[];
  };
};

export const PROGRAM_DATA: Record<Program, ProgramInfo> = {
  diploma: {
    years: 3,
    firstYearFee: 'M21,520.00',
    otherYearsFee: 'M22,088.00',
    semesterFee: 'M10,760.00',
    installments: {
      semester1: [
        { month: 'August (Upfront)', amount: 'M8,500.00' },
        { month: 'September-October', amount: 'M1,130.00' },
        { month: 'November-December', amount: 'M1,130.00' },
      ],
      semester2: [
        { month: 'February (Upfront)', amount: 'M8,500.00' },
        { month: 'March-April', amount: 'M1,130.00' },
        { month: 'May-June', amount: 'M1,130.00' },
      ],
    },
  },
  degree: {
    years: 4,
    firstYearFee: 'M22,088.00',
    otherYearsFee: 'M28,316.00',
    semesterFee: 'M11,044.00',
    installments: {
      semester1: [
        { month: 'August (Upfront)', amount: 'M8,500.00' },
        { month: 'September-October', amount: 'M1,272.00' },
        { month: 'November-December', amount: 'M1,272.00' },
      ],
      semester2: [
        { month: 'February (Upfront)', amount: 'M8,500.00' },
        { month: 'March-April', amount: 'M1,272.00' },
        { month: 'May-June', amount: 'M1,272.00' },
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
