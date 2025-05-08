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
    padding: 50,
    fontFamily: 'Roboto',
    fontSize: 12,
  },
  date: {
    marginBottom: 15,
    fontSize: 11,
  },
  reference: {
    marginBottom: 15,
    fontSize: 11,
    textAlign: 'right',
  },
  letterTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  greeting: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  content: {
    lineHeight: 1.5,
    marginBottom: 15,
    textAlign: 'justify',
  },
  tuitionSection: {
    marginBottom: 10,
  },
  tuitionAmount: {
    fontWeight: 'bold',
  },
  note: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 11,
  },
  noteItem: {
    marginBottom: 5,
  },
  signature: {
    marginTop: 40,
    alignItems: 'flex-start',
  },
  signatureImage: {
    width: 150,
    height: 50,
    marginBottom: 5,
  },
  signatureName: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  registrarTitle: {
    fontSize: 11,
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    textAlign: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

type Props = {
  student: NonNullable<Awaited<ReturnType<typeof getStudent>>>;
  properties: Awaited<ReturnType<typeof getCurrentProperties>>;
};

function AdmissionLetterPDF({ student, properties }: Props) {
  const currentDate = format(new Date(), 'dd/MM/yyyy');
  const programDuration = '4 YEARS';
  const programName =
    student.program?.name || 'BSC IN BUSINESS INFORMATION TECHNOLOGY';
  const facultyCode = student.program?.faculty?.code || 'FICT';
  const programCode = student.program?.code || 'BSCBIT';
  const statusCode =
    student.status === 'Admitted'
      ? 'A'
      : student.status === 'Wait Listed'
        ? 'W'
        : student.status === 'DQ'
          ? 'DQ'
          : 'P';

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.flexRow}>
          <PDFText style={styles.date}>Date: {currentDate}</PDFText>
          <PDFText style={styles.reference}>
            Ref: LUCT/{facultyCode}/{programCode}/{statusCode}/
            {student.no || 'P1'}
          </PDFText>
        </View>

        <PDFText style={styles.letterTitle}>
          Letter of Admission for {student.names} {student.surname}
        </PDFText>

        <PDFText style={styles.greeting}>
          Dear {student.names} {student.surname},
        </PDFText>

        <PDFText style={styles.content}>
          Congratulations! We are pleased to inform you that you have been
          accepted for enrollment in
          {programName} at Limkokwing University of Creative Technology,
          Lesotho, commencing 01st AUGUST 2025. The duration of the study is{' '}
          {programDuration}.
        </PDFText>

        <PDFText style={styles.content}>
          As an upgrading student, you are required to observe and avail
          yourself of the following:
        </PDFText>

        <View style={styles.tuitionSection}>
          <PDFText style={styles.tuitionAmount}>Tuition Fee</PDFText>
          <PDFText>M42,300.00 per annum</PDFText>
        </View>

        <View style={styles.note}>
          <PDFText style={{ fontWeight: 'bold' }}>
            *NOTE: i) Those under National Manpower Development Secretariat
            Sponsorship, tuition will be paid by the sponsor.
          </PDFText>
          <PDFText style={styles.noteItem}>
            {' '}
            ii) The above fees are subject to change without prior notice.
          </PDFText>
          <PDFText style={styles.noteItem}>
            {' '}
            iii) All first-year students must attend orientation.
          </PDFText>
        </View>

        <PDFText style={styles.content}>
          You will be eligible for registration upon submission of proof of
          sponsorship and payment of item 1 mentioned above. All tuition fees
          must be paid in full within four weeks from the enrollment date of the
          respective semester.
        </PDFText>

        <PDFText style={styles.content}>
          Should you need any further clarification, please do not hesitate to
          contact us at 22315767 or forward your inquiries to
          registry@limkokwing.ac.ls
        </PDFText>

        <PDFText style={styles.content}>
          Thank you in advance, and we warmly welcome you to Limkokwing
          University-Lesotho.
        </PDFText>

        <View style={styles.signature}>
          <Image
            src='/images/signature_small.jpg'
            style={styles.signatureImage}
          />
          <PDFText style={styles.signatureName}>Rebaone Moroosi (Mrs.)</PDFText>
          <PDFText style={styles.registrarTitle}>Registrar</PDFText>
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
