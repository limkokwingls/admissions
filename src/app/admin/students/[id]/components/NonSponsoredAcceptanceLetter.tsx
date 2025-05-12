'use client';
import { getCurrentProperties } from '@/server/properties/actions';
import { getStudent } from '@/server/students/actions';
import { extractReference } from '@/lib/utils';
import { PROGRAM_DATA } from '@/lib/constants';
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
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 'normal',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 'bold',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Roboto',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderBottom: '1pt solid black',
    paddingBottom: 10,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  addressText: {
    fontSize: 10,
    marginBottom: 0,
  },
  logo: {
    width: 150,
    height: 100,
    objectFit: 'contain',
  },
  header: {
    marginBottom: 15,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    marginBottom: 15,
    textAlign: 'left',
  },
  reference: {
    fontSize: 12,
    marginBottom: 15,
    textAlign: 'right',
  },
  greeting: {
    fontSize: 12,
    marginBottom: 8,
  },
  content: {
    fontSize: 12,
    marginBottom: 15,
    lineHeight: 1.3,
  },
  paragraph: {
    marginBottom: 12,
    textAlign: 'justify',
    fontSize: 12,
  },
  boldText: {
    fontWeight: 'bold',
  },
  indentSection: {
    marginLeft: 20,
    marginBottom: 12,
  },
  noteList: {
    marginLeft: 20,
  },
  noteListItem: {
    flexDirection: 'row',
    fontSize: 9,
  },
  noteListNumber: {
    width: 20,
  },
  noteListText: {
    flex: 1,
  },
  paymentOptions: {
    marginTop: 15,
    marginBottom: 15,
  },
  paymentOptionTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  paymentOptionItem: {
    marginLeft: 20,
    marginBottom: 5,
  },
  bankDetails: {
    marginTop: 15,
    marginBottom: 15,
  },
  bankDetailsTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bankRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bankLabel: {
    width: 100,
    fontWeight: 'bold',
  },
  bankValue: {
    flex: 1,
  },
  signatureSection: {
    marginTop: 30,
  },
  signatureName: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  registrarTitle: {
    fontSize: 10,
  },
  signatureImage: {
    zIndex: 1,
    marginTop: -5,
    width: 150,
  },
});

type Props = {
  student: NonNullable<Awaited<ReturnType<typeof getStudent>>>;  
  properties: Awaited<ReturnType<typeof getCurrentProperties>>;
};

export default function NonSponsoredAcceptanceLetter({ student, properties }: Props) {
  const letterDate = format(new Date(), 'dd/MM/yyyy');
  const referenceNumber = extractReference(student);
  const programName = student.program?.name;
  const registrationDateFrom = properties?.registrationDateFrom 
    ? format(new Date(properties.registrationDateFrom), 'dd MMM yyyy')
    : 'the scheduled registration date';
  const registrationDateTo = properties?.registrationDateTo
    ? format(new Date(properties.registrationDateTo), 'dd MMM yyyy')
    : '';
  const registrationPeriod = registrationDateTo 
    ? `${registrationDateFrom} to ${registrationDateTo}`
    : registrationDateFrom;
  const programType = student.program?.level as keyof typeof PROGRAM_DATA;

  const studyDuration = `${PROGRAM_DATA[programType]?.years || '4'} YEARS`;
  const tuitionFeePerYear = PROGRAM_DATA[programType]?.yearFee || 'M25,000';
  const tuitionFeeText = `${tuitionFeePerYear} per annum`;
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
            <PDFText style={styles.addressText}>+(266) 22315767 | Ext. 116</PDFText>
            <PDFText style={styles.addressText}>registry@limkokwing.ac.ls</PDFText>
          </View>
          <View style={styles.headerRight}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer Image does not support alt */}
            <Image src='/images/logo.png' style={styles.logo} />
          </View>
        </View>

        <View style={styles.header}>
          <PDFText style={styles.headerText}>NON-SPONSORED ACCEPTANCE LETTER</PDFText>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <PDFText style={styles.date}>Date: {letterDate}</PDFText>
          <PDFText style={styles.reference}>Ref: {referenceNumber}</PDFText>
        </View>

        <View style={styles.greeting}>
          <PDFText>
            Dear{' '}
            <PDFText style={{ fontWeight: 'bold' }}>
              {student.names} {student.surname}
            </PDFText>
          </PDFText>
        </View>

        <PDFText style={styles.paragraph}>
          Congratulations! We are pleased to inform you that you have been
          accepted for enrolment in{' '}
          <PDFText style={styles.boldText}>{programName}</PDFText> at Limkokwing
          University of Creative Technology, Lesotho. The
          duration of the study is{' '}
          <PDFText style={styles.boldText}>{studyDuration}</PDFText>.
        </PDFText>

        <PDFText style={styles.paragraph}>
          As a self-sponsored student, you are required to observe and avail
          yourself of the following:
        </PDFText>

        <View style={styles.indentSection}>
          <PDFText style={styles.boldText}>Tuition Fee</PDFText>
          <PDFText>{tuitionFeeText}</PDFText>
        </View>

        <View style={styles.paymentOptions}>
          <PDFText style={styles.paymentOptionTitle}>Payment Options:</PDFText>
          <PDFText style={styles.paymentOptionItem}>
            1. Full Payment: Pay the entire annual tuition fee before registration to receive a 5% discount.
          </PDFText>
          <PDFText style={styles.paymentOptionItem}>
            2. Semester Payment: Pay 50% of the annual tuition fee at the beginning of each semester.
          </PDFText>
          <PDFText style={styles.paymentOptionItem}>
            3. Installment Plan: Pay 40% of the semester fee during registration and the remaining 60% in two equal monthly installments.
          </PDFText>
        </View>

        <PDFText style={styles.paragraph}>
          <PDFText style={styles.boldText}>Important:</PDFText> All payments must be made during the registration period ({registrationPeriod}). Late registration will incur additional fees.
        </PDFText>

        <View style={styles.bankDetails}>
          <PDFText style={styles.bankDetailsTitle}>Bank Details:</PDFText>
          <View style={styles.bankRow}>
            <PDFText style={styles.bankLabel}>Bank Name:</PDFText>
            <PDFText style={styles.bankValue}>Standard Lesotho Bank</PDFText>
          </View>
          <View style={styles.bankRow}>
            <PDFText style={styles.bankLabel}>Account Name:</PDFText>
            <PDFText style={styles.bankValue}>Limkokwing University of Creative Technology</PDFText>
          </View>
          <View style={styles.bankRow}>
            <PDFText style={styles.bankLabel}>Account Number:</PDFText>
            <PDFText style={styles.bankValue}>0140053555401</PDFText>
          </View>
          <View style={styles.bankRow}>
            <PDFText style={styles.bankLabel}>Branch Code:</PDFText>
            <PDFText style={styles.bankValue}>060367</PDFText>
          </View>
          <View style={styles.bankRow}>
            <PDFText style={styles.bankLabel}>Reference:</PDFText>
            <PDFText style={styles.bankValue}>{student.id || referenceNumber} - {student.surname}</PDFText>
          </View>
        </View>

        <View style={styles.indentSection}>
          <PDFText style={styles.boldText}>*NOTE:</PDFText>
          <View style={styles.noteList}>
            <View style={styles.noteListItem}>
              <PDFText style={styles.noteListNumber}>i)</PDFText>
              <PDFText style={styles.noteListText}>
                The above fees are subject to change without prior notice.
              </PDFText>
            </View>
            <View style={styles.noteListItem}>
              <PDFText style={styles.noteListNumber}>ii)</PDFText>
              <PDFText style={styles.noteListText}>
                All first-year students{' '}
                <PDFText style={styles.boldText}>must</PDFText> attend
                orientation.
              </PDFText>
            </View>
            <View style={styles.noteListItem}>
              <PDFText style={styles.noteListNumber}>iii)</PDFText>
              <PDFText style={styles.noteListText}>
                You will be eligible for registration upon proof of payment of the required fees.
              </PDFText>
            </View>
            <View style={styles.noteListItem}>
              <PDFText style={styles.noteListNumber}>iv)</PDFText>
              <PDFText style={styles.noteListText}>
                Please bring the original payment receipt during registration.
              </PDFText>
            </View>
          </View>
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
          <PDFText style={{ zIndex: 100 }}>Yours sincerely,</PDFText>
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