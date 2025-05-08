'use client';

import { Button } from '@/components/ui/button';
import { incrementLetterDownload } from '@/server/analytics/actions';
import { getCurrentProperties } from '@/server/properties/actions';
import { getStudent } from '@/server/students/actions';
import {
  Document,
  Font,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { Download } from 'lucide-react';

// Using Open Sans from Google Fonts as a replacement for Tahoma (similar sans-serif font)
Font.register({
  family: 'Tahoma',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/opensans/v35/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf',
      fontWeight: 'normal',
    },
    {
      src: 'https://fonts.gstatic.com/s/opensans/v35/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.ttf',
      fontWeight: 'bold',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 50,
    fontFamily: 'Tahoma',
    fontSize: 11,
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
    marginLeft: 20, // Further indent for note items if needed
  },
  noteListItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  noteListNumber: {
    width: 20, // Space for "i) ", "ii) "
  },
  noteListText: {
    flex: 1,
  },
  signatureSection: {
    marginTop: 40,
  },
  signatureName: {
    marginTop: 10, // Space for actual signature
  },
  // Remove unused styles from the old version
  // headerContainer, headerLeft, headerRight, universityName, addressText, logo,
  // header, headerText, date, reference, greeting, content, bankDetails,
  // bankTable, bankRow, bankLabel, bankValue, note, contact (if it was specific to old style)
});

type Props = {
  student: NonNullable<Awaited<ReturnType<typeof getStudent>>>;
  properties: NonNullable<Awaited<ReturnType<typeof getCurrentProperties>>>;
};

export default function AcceptanceLetterButton({ student, properties }: Props) {
  if (!student || student.status !== 'Admitted') {
    return null;
  }

  // Function to track letter download
  const handleDownload = async () => {
    try {
      await incrementLetterDownload(student.id);
    } catch (error) {
      console.error('Failed to track letter download:', error);
    }
  };

  return (
    <PDFDownloadLink
      document={
        <AcceptanceLetterPDF student={student} properties={properties} />
      }
      fileName={`acceptance-letter-${student.surname}-${student.names}.pdf`}
      style={{ textDecoration: 'none' }}
      onClick={handleDownload}
    >
      {({ loading }) => (
        <Button className='w-full py-6' disabled={loading}>
          <Download className='h-4 w-4' />
          {loading ? 'Generating PDF...' : 'Download Acceptance Letter'}
        </Button>
      )}
    </PDFDownloadLink>
  );
}

function AcceptanceLetterPDF({ student, properties }: Props) {
  // Data from the image, to be replaced with dynamic props if available
  const letterDate = '30/01/2025';
  const referenceNumber = 'LUCT/FICT/BSCBIT/P/P1';
  // Assuming program name comes from student.program.name
  // Assuming student names come from student.names and student.surname

  // Values from the image template
  const programName =
    student.program?.name || 'BSC IN BUSINESS INFORMATION TECHNOLOGY';
  const commencementDate = '01st AUGUST 2025'; // This might need formatting logic for "st"
  const studyDuration = '4 YEARS';
  const tuitionFee = 'M42,300.00 per annum';
  const contactPhoneNumber = '22315767';
  const contactEmail = 'registry@limkokwing.ac.ls';
  const registrarName = 'Mateboho Moorosi (Mrs.)';
  const registrarTitle = 'Registrar';

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.topRow}>
          <Text>Date: {letterDate}</Text>
          <Text>Ref: {referenceNumber}</Text>
        </View>

        <Text style={styles.letterTitle}>
          LETTER OF ADMISSION FOR {String(student.names).toUpperCase()}{' '}
          {String(student.surname).toUpperCase()}
        </Text>

        <Text style={styles.paragraph}>
          Dear {student.names} {student.surname},
        </Text>

        <Text style={styles.paragraph}>
          Congratulations! We are pleased to inform you that you have been
          accepted for enrolment in{' '}
          <Text style={styles.boldText}>{programName}</Text> at Limkokwing
          University of Creative Technology, Lesotho, commencing{' '}
          <Text style={styles.boldText}>{commencementDate}</Text>. The duration
          of the study is <Text style={styles.boldText}>{studyDuration}</Text>.
        </Text>

        <Text style={styles.paragraph}>
          As an upgrading student, you are required to observe and avail
          yourself of the following:
        </Text>

        <View style={styles.indentSection}>
          <Text style={styles.boldText}>Tuition Fee</Text>
          <Text>{tuitionFee}</Text>
        </View>

        <View style={styles.indentSection}>
          <Text style={styles.boldText}>*NOTE:</Text>
          <View style={styles.noteList}>
            <View style={styles.noteListItem}>
              <Text style={styles.noteListNumber}>i)</Text>
              <Text style={styles.noteListText}>
                Those under National Manpower Development Secretariat
                Sponsorship, tuition will be paid by the sponsor.
              </Text>
            </View>
            <View style={styles.noteListItem}>
              <Text style={styles.noteListNumber}>ii)</Text>
              <Text style={styles.noteListText}>
                The above fees are subject to change without prior notice.
              </Text>
            </View>
            <View style={styles.noteListItem}>
              <Text style={styles.noteListNumber}>iii)</Text>
              <Text style={styles.noteListText}>
                All first-year students{' '}
                <Text style={styles.boldText}>must</Text> attend orientation.
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.paragraph}>
          You will be eligible for registration upon submission of proof of
          sponsorship and payment of item 1 mentioned above. All tuition fees
          must be paid in full within four weeks from the enrolment date of the
          respective semester.
        </Text>

        <Text style={styles.paragraph}>
          Should you need any further clarification, please do not hesitate to
          contact us at {contactPhoneNumber} or forward your inquiries to{' '}
          {contactEmail}
        </Text>

        <Text style={styles.paragraph}>
          Thank you in advance, and we warmly welcome you to Limkokwing
          University-Lesotho.
        </Text>

        <View style={styles.signatureSection}>
          <Text>Yours sincerely,</Text>
          {/* Placeholder for signature image if you have one */}
          {/* <Image src="/path/to/signature.png" style={styles.signatureImage} /> */}
          <Text style={styles.signatureName}>{registrarName}</Text>
          <Text>{registrarTitle}</Text>
        </View>
      </Page>
    </Document>
  );
}
