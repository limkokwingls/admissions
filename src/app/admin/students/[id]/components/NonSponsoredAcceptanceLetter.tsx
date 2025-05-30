'use client';
import { getCurrentProperties } from '@/server/properties/actions';
import { getStudent } from '@/server/students/actions';
import { extractReference } from '@/lib/utils';
import { PROGRAM_DATA, BANK_DETAILS } from '@/lib/constants';
import {
  Document,
  Font,
  Page,
  Text as PDFText,
  StyleSheet,
  View,
  Image,
} from '@react-pdf/renderer';
import { format } from 'date-fns';

Font.register({
  family: 'Tahoma',
  fonts: [
    {
      src: 'https://db.onlinewebfonts.com/t/5a7f3b16ff01a4d704613209efd93595.ttf',
      fontWeight: 'normal',
    },
    {
      src: 'https://db.onlinewebfonts.com/t/b1d9d2bcdc4fef95e95f67fe228a11da.ttf',
      fontWeight: 'bold',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Tahoma',
    lineHeight: 1.4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottom: '1pt solid #333',
    paddingBottom: 8,
  },
  headerLeft: {
    width: '60%',
  },
  headerRight: {
    width: '40%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  universityName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000000',
  },
  addressText: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.2,
    marginBottom: 0,
  },
  logo: {
    width: 150,
    height: 100,
    objectFit: 'contain',
  },
  header: {
    marginBottom: 25,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textTransform: 'uppercase',
    color: '#000000',
    letterSpacing: 1,
  },
  date: {
    fontSize: 11,
    marginBottom: 12,
    textAlign: 'left',
    color: '#333333',
  },
  reference: {
    fontSize: 11,
    marginBottom: 12,
    textAlign: 'right',
    color: '#333333',
  },
  greeting: {
    fontSize: 12,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 12,
    marginBottom: 15,
    lineHeight: 1.3,
  },
  paragraph: {
    marginBottom: 14,
    textAlign: 'justify',
    fontSize: 11.5,
    lineHeight: 1.5,
  },

  boldText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  indentSection: {
    marginLeft: 20,
    marginBottom: 14,
    padding: 4,
    paddingLeft: 15,
    borderLeft: '1pt solid #555555',
    fontSize: 12,
  },
  noteList: {
    marginLeft: 20,
    marginTop: 5,
  },
  noteListItem: {
    flexDirection: 'row',
    fontSize: 10,
    marginBottom: 4,
  },
  noteListNumber: {
    width: 20,
  },
  noteListText: {
    flex: 1,
  },
  paymentOptions: {
    marginTop: 12,
    marginBottom: 14,
    padding: 4,
  },
  paymentOptionTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000000',
    fontSize: 12,
  },
  paymentOptionItem: {
    marginLeft: 20,
    marginBottom: 2,
    fontSize: 11,
  },
  bankDetails: {
    marginTop: 14,
    marginBottom: 14,
    padding: 4,
    borderTop: '0.5pt solid #aaaaaa',
    borderBottom: '0.5pt solid #aaaaaa',
  },
  bankDetailsTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000000',
    fontSize: 12,
    paddingTop: 6,
  },
  bankRow: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  bankLabel: {
    width: 120,
    fontWeight: 'bold',
    fontSize: 10,
  },
  bankValue: {
    flex: 1,
    fontSize: 10,
  },
  signatureSection: {
    marginTop: 150,
    paddingTop: 10,
  },
  signatureName: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#000000',
  },
  registrarTitle: {
    fontSize: 10,
    color: '#333333',
  },
  signatureImage: {
    zIndex: 1,
    marginTop: -5,
    marginBottom: 5,
    width: 150,
  },
  paymentPlanTable: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 10,
  },
  paymentPlanHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 2,
    borderBottom: '1pt solid #ddd',
  },
  paymentPlanRow: {
    flexDirection: 'row',
    padding: 2,
    borderBottom: '0.5pt solid #eee',
    marginBottom: 0,
  },
  paymentPlanCell: {
    flex: 1,
  },
  paymentPlanTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000000',
  },
});

type Props = {
  student: NonNullable<Awaited<ReturnType<typeof getStudent>>>;
  properties: Awaited<ReturnType<typeof getCurrentProperties>>;
};

export default function NonSponsoredAcceptanceLetter({
  student,
  properties,
}: Props) {
  const letterDate = format(new Date(), 'dd/MM/yyyy');
  const referenceNumber = extractReference(student);
  const programName = student.program?.name;
  const registrationDateTo = properties?.registrationDateTo
    ? format(new Date(properties.registrationDateTo), 'dd MMM yyyy')
    : '';
  const programType = student.program?.level as keyof typeof PROGRAM_DATA;
  const acceptanceLetterDate = format(
    properties?.privatePaymentDate || new Date(),
    'dd MMM yyyy',
  );

  const studyDuration = `${PROGRAM_DATA[programType]?.years || '4'} YEARS`;
  const firstYearFee = PROGRAM_DATA[programType]?.firstYearFee || 'M##,###';
  const otherYearsFee = PROGRAM_DATA[programType]?.otherYearsFee || 'M##,###';
  const programYears = PROGRAM_DATA[programType]?.years || 4;
  const lastYearText = programYears === 3 ? '3rd' : '4th';
  const contactPhoneNumber = '22315767';
  const contactEmail = 'registry@limkokwing.ac.ls';
  const registrarNameText = 'Mateboho Moorosi (Mrs.)';
  const registrarTitleText = 'Registrar';

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <PDFText style={styles.universityName}>
          Limkokwing University of Creative Technology
        </PDFText>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <PDFText style={styles.addressText}>
              Moshoeshoe Road Maseru Central
            </PDFText>
            <PDFText style={styles.addressText}>P.O. Box 8971</PDFText>
            <PDFText style={styles.addressText}>Maseru Maseru 0101</PDFText>
            <PDFText style={styles.addressText}>Lesotho</PDFText>
            <PDFText style={styles.addressText}>
              +(266) 22315767 | Ext. 116
            </PDFText>
            <PDFText style={styles.addressText}>
              registry@limkokwing.ac.ls
            </PDFText>
          </View>
          <View style={styles.headerRight}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer Image does not support alt */}
            <Image src='/images/logo.png' style={styles.logo} />
          </View>
        </View>
        <View style={styles.header}>
          <PDFText style={styles.headerText}>
            ACCEPTANCE LETTER (SELF-SPONSORED)
          </PDFText>
          <View
            style={{
              borderBottom: '1pt solid #555555',
              width: 120,
              marginHorizontal: 'auto',
              marginTop: 2,
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <PDFText style={styles.date}>Date: {letterDate}</PDFText>
          <PDFText style={styles.reference}>Ref: {referenceNumber}</PDFText>
        </View>
        <View style={styles.greeting}>
          <PDFText>
            Dear{' '}
            <PDFText style={{ fontWeight: 'bold', color: '#000000' }}>
              {student.names} {student.surname}
            </PDFText>
          </PDFText>
        </View>
        <PDFText style={styles.paragraph}>
          Congratulations! We are pleased to inform you that you have been
          accepted for enrolment in{' '}
          <PDFText style={styles.boldText}>{programName}</PDFText> at Limkokwing
          University of Creative Technology, Lesotho. The duration of the study
          is <PDFText style={styles.boldText}>{studyDuration}</PDFText>.
        </PDFText>
        <PDFText style={styles.paragraph}>
          As a self-sponsored student, you are required to observe and avail
          yourself of the following:
        </PDFText>
        <View style={styles.indentSection}>
          <PDFText style={styles.boldText}>Tuition Fee</PDFText>
          <PDFText>{firstYearFee} 1st year</PDFText>
          <PDFText>
            {otherYearsFee} 2nd to {lastYearText} year
          </PDFText>
        </View>
        <PDFText style={styles.paragraph}>
          <PDFText style={styles.boldText}>
            Important: All payments must strictly be made between the following
            dates: {acceptanceLetterDate} and {registrationDateTo}.
          </PDFText>
        </PDFText>
        <View style={styles.paymentPlanTable}>
          <PDFText style={styles.paymentPlanTitle}>
            First Semester Payment Schedule:
          </PDFText>
          <View
            style={[styles.paymentPlanHeader, { borderTop: '1pt solid #ddd' }]}
          >
            <PDFText style={[styles.paymentPlanCell, styles.boldText]}>
              Month
            </PDFText>
            <PDFText style={[styles.paymentPlanCell, styles.boldText]}>
              Amount
            </PDFText>
          </View>
          {PROGRAM_DATA[
            student.program.level === 'certificate'
              ? 'diploma'
              : (student.program.level as 'diploma' | 'degree')
          ].installments.semester1.map(
            (item: { month: string; amount: string }, index: number) => (
              <View key={index} style={styles.paymentPlanRow}>
                <PDFText style={styles.paymentPlanCell}>{item.month}</PDFText>
                <PDFText style={styles.paymentPlanCell}>{item.amount}</PDFText>
              </View>
            ),
          )}
        </View>
        <View style={styles.paymentPlanTable}>
          <PDFText style={styles.paymentPlanTitle}>
            Second Semester Payment Schedule:
          </PDFText>
          <View
            style={[styles.paymentPlanHeader, { borderTop: '1pt solid #ddd' }]}
          >
            <PDFText style={[styles.paymentPlanCell, styles.boldText]}>
              Month
            </PDFText>
            <PDFText style={[styles.paymentPlanCell, styles.boldText]}>
              Amount
            </PDFText>
          </View>
          {PROGRAM_DATA[
            student.program.level === 'certificate'
              ? 'diploma'
              : (student.program.level as 'diploma' | 'degree')
          ].installments.semester2.map(
            (item: { month: string; amount: string }, index: number) => (
              <View key={index} style={styles.paymentPlanRow}>
                <PDFText style={styles.paymentPlanCell}>{item.month}</PDFText>
                <PDFText style={styles.paymentPlanCell}>{item.amount}</PDFText>
              </View>
            ),
          )}
        </View>{' '}
        <View style={styles.bankDetails}>
          <PDFText style={styles.bankDetailsTitle}>Bank Details:</PDFText>
          {BANK_DETAILS.map((detail, index) => (
            <View key={index} style={styles.bankRow}>
              <PDFText style={styles.bankLabel}>{detail.label}:</PDFText>
              <PDFText style={styles.bankValue}>{detail.value}</PDFText>
            </View>
          ))}
        </View>
        <PDFText style={styles.paragraph}>
          Should you need any further clarification, please do not hesitate to
          contact us at {contactPhoneNumber} or forward your inquiries to{' '}
          {contactEmail}
        </PDFText>
        <PDFText style={styles.paragraph}>
          Thank you in advance, and we warmly welcome you to Limkokwing
          University-Lesotho.
        </PDFText>
        <View style={styles.signatureSection}>
          <PDFText style={{ zIndex: 100, marginBottom: 10, fontSize: 11 }}>
            Yours sincerely,
          </PDFText>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer Image does not support alt */}
          <Image
            style={styles.signatureImage}
            src={'/images/signature_small.png'}
          />
          <PDFText style={styles.signatureName}>{registrarNameText}</PDFText>
          <PDFText style={styles.registrarTitle}>{registrarTitleText}</PDFText>
        </View>
      </Page>
    </Document>
  );
}
