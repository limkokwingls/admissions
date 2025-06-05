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
  family: 'Tahoma',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/opensans/v35/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf',
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      src: 'https://fonts.gstatic.com/s/opensans/v35/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.ttf',
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      src: 'https://fonts.gstatic.com/s/opensans/v35/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 130,
    paddingBottom: 60,
    paddingHorizontal: 80,
    fontFamily: 'Tahoma',
    fontSize: 10,
    lineHeight: 1.5,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    fontSize: 10,
  },
  letterTitle: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginBottom: 30,
  },
  paragraph: {
    marginBottom: 12,
    textAlign: 'justify',
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
  signatureSection: {
    marginTop: 15,
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

export default function AdmissionLetterPDF({ student, properties }: Props) {
  const letterDate = format(new Date(), 'dd/MM/yyyy');
  const referenceNumber = extractReference(student);
  const programName = student.program?.name;
  const commencementDate = format(
    new Date(properties?.registrationDateFrom || ''),
    'dd MMM yyyy',
  );
  const programType = student.program?.level as keyof typeof PROGRAM_DATA;
  // Special case for BHRA program which takes 3 years and doesn't have a first year
  const isBHRA = student.program?.code === 'BHRA';
  const programYears = isBHRA ? 3 : PROGRAM_DATA[programType]?.years || 4;
  const studyDuration = `${programYears} YEARS`;
  const firstYearFee = PROGRAM_DATA[programType]?.firstYearFee || 'M##,###';
  const otherYearsFee = PROGRAM_DATA[programType]?.otherYearsFee || 'M##,###';
  const lastYearText = isBHRA ? '4th' : programYears === 3 ? '3rd' : '4th';
  const contactPhoneNumber = '22315767';
  const contactEmail = 'registry@limkokwing.ac.ls';
  const registrarNameText = 'Mateboho Moorosi (Mrs.)';
  const registrarTitleText = 'Registrar';

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.topRow}>
          <PDFText>Date: {letterDate}</PDFText>
          <PDFText>Ref: {referenceNumber}</PDFText>
        </View>

        <PDFText style={styles.letterTitle}>
          LETTER OF ADMISSION FOR {String(student.names).toUpperCase()}{' '}
          {String(student.surname).toUpperCase()}
        </PDFText>

        <PDFText style={styles.paragraph}>
          Dear {student.names} {student.surname},
        </PDFText>

        <PDFText style={styles.paragraph}>
          Congratulations! We are pleased to inform you that you have been
          accepted for enrolment in{' '}
          <PDFText style={styles.boldText}>{programName}</PDFText> at Limkokwing
          University of Creative Technology, Lesotho, commencing{' '}
          <PDFText style={styles.boldText}>{commencementDate}</PDFText>. The
          duration of the study is{' '}
          <PDFText style={styles.boldText}>{studyDuration}</PDFText>.
        </PDFText>

        <PDFText style={styles.paragraph}>
          As a first-year student, you are required to observe and avail
          yourself of the following:
        </PDFText>

        <View style={styles.indentSection}>
          <PDFText style={styles.boldText}>Tuition Fee</PDFText>
          {!isBHRA && <PDFText>{firstYearFee} 1st year</PDFText>}
          <PDFText>
            {otherYearsFee} 2nd to {lastYearText} year
          </PDFText>
        </View>

        <View style={styles.indentSection}>
          <PDFText style={styles.boldText}>*NOTE:</PDFText>
          <View style={styles.noteList}>
            <View style={styles.noteListItem}>
              <PDFText style={styles.noteListNumber}>i)</PDFText>
              <PDFText style={styles.noteListText}>
                Those under National Manpower Development Secretariat
                Sponsorship, tuition will be paid by the sponsor.
              </PDFText>
            </View>
            <View style={styles.noteListItem}>
              <PDFText style={styles.noteListNumber}>ii)</PDFText>
              <PDFText style={styles.noteListText}>
                The above fees are subject to change without prior notice.
              </PDFText>
            </View>
            <View style={styles.noteListItem}>
              <PDFText style={styles.noteListNumber}>iii)</PDFText>
              <PDFText style={styles.noteListText}>
                All first-year students{' '}
                <PDFText style={styles.boldText}>must</PDFText> attend
                orientation.
              </PDFText>
            </View>
          </View>
        </View>

        <PDFText style={styles.paragraph}>
          You will be eligible for registration upon submission of proof of
          sponsorship and payment of item 1 mentioned above. All tuition fees
          must be paid in full within four weeks from the enrolment date of the
          respective semester.
        </PDFText>

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
