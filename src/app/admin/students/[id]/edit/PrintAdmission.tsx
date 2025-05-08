'use client';
import { ActionIcon } from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';
import React, { useState } from 'react';
import { getStudent } from '@/server/students/actions';
import { getCurrentProperties } from '@/server/properties/actions';
import { Text } from '@mantine/core';
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text as PDFText,
  View,
  Image,
  pdf,
} from '@react-pdf/renderer';
import { format } from 'date-fns';

// Register fonts for PDF
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
  ],
});

// Styles for PDF document
const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 50,
    fontFamily: 'Roboto',
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
    marginLeft: 20,
  },
  noteListItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  noteListNumber: {
    width: 20,
  },
  noteListText: {
    flex: 1,
  },
  signatureSection: {
    marginTop: 40,
  },
  signatureName: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 11,
  },
  registrarTitle: {
    fontSize: 11,
  },
});

type Props = {
  student: NonNullable<Awaited<ReturnType<typeof getStudent>>>;
  properties: Awaited<ReturnType<typeof getCurrentProperties>>;
};

function AdmissionLetterPDF({ student, properties }: Props) {
  const letterDate = '30/01/2025';
  const referenceNumber = 'LUCT/FICT/BSCBIT/P/P1';
  const programName =
    student.program?.name || 'BSC IN BUSINESS INFORMATION TECHNOLOGY';
  const commencementDate = '01st AUGUST 2025';
  const studyDuration = '4 YEARS';
  const tuitionFeeText = 'M42,300.00 per annum';
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
          As an upgrading student, you are required to observe and avail
          yourself of the following:
        </PDFText>

        <View style={styles.indentSection}>
          <PDFText style={styles.boldText}>Tuition Fee</PDFText>
          <PDFText>{tuitionFeeText}</PDFText>
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
          <PDFText>Yours sincerely,</PDFText>
          <PDFText style={styles.signatureName}>{registrarNameText}</PDFText>
          <PDFText style={styles.registrarTitle}>{registrarTitleText}</PDFText>
        </View>
      </Page>
    </Document>
  );
}

export default function PrintAdmission({ student, properties }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!properties) {
    return (
      <Text c='red' size='xs'>
        Cannot print, properties not found
      </Text>
    );
  }

  const handlePrint = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(
        <AdmissionLetterPDF student={student} properties={properties} />,
      ).toBlob();
      const url = URL.createObjectURL(blob);

      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;
      document.body.appendChild(iframe);

      iframe.onload = () => {
        if (iframe.contentWindow) {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();

          const handleAfterPrint = () => {
            URL.revokeObjectURL(url);
            if (iframe.parentNode) {
              iframe.parentNode.removeChild(iframe);
            }
            setIsGenerating(false);
            if (iframe.contentWindow) {
              iframe.contentWindow.removeEventListener(
                'afterprint',
                handleAfterPrint,
              );
            }
          };

          iframe.contentWindow.addEventListener('afterprint', handleAfterPrint);
        } else {
          console.error('Failed to access iframe content window.');
          URL.revokeObjectURL(url);
          if (iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
          }
          setIsGenerating(false);
        }
      };

      iframe.onerror = () => {
        console.error('Failed to load PDF in iframe.');
        URL.revokeObjectURL(url);
        if (iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
        setIsGenerating(false);
      };
    } catch (error) {
      console.error('Error generating PDF for printing:', error);
      setIsGenerating(false);
    }
  };

  return (
    <ActionIcon
      variant='outline'
      color='gray'
      disabled={isGenerating}
      title='Print Admission Letter'
      onClick={handlePrint}
    >
      <IconPrinter size={'1rem'} />
    </ActionIcon>
  );
}
