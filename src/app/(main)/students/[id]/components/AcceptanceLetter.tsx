'use client';

import { Button } from '@/components/ui/button';
import { getStudent } from '@/server/students/actions';
import { getCurrentProperties } from '@/server/properties/actions';
import { getCallsByStudentId } from '@/server/calls/actions';
import { incrementLetterDownload } from '@/server/analytics/actions';
import {
  Document,
  Font,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
  Image,
} from '@react-pdf/renderer';
import { Download } from 'lucide-react';

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
  bankDetails: {
    fontSize: 12,
    marginBottom: 15,
  },
  bankTable: {
    marginBottom: 15,
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
  note: {
    fontSize: 12,
    marginBottom: 15,
  },
  noteItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bullet: {
    width: 10,
  },
  noteText: {
    flex: 1,
  },
  contact: {
    fontSize: 12,
    border: '1pt solid black',
    padding: 10,
    marginBottom: 15,
  },
  signature: {
    fontSize: 12,
    marginTop: 30,
  },
});

type Props = {
  student: NonNullable<Awaited<ReturnType<typeof getStudent>>>;
  properties: NonNullable<Awaited<ReturnType<typeof getCurrentProperties>>>;
  calls: Awaited<ReturnType<typeof getCallsByStudentId>>;
};

export default function AcceptanceLetterButton({
  student,
  properties,
  calls,
}: Props) {
  const hasAcceptedCall = calls.some((call) => call.status === 'accepted');
  const isAdmitted = student.status === 'Admitted' || hasAcceptedCall;

  if (!student || !isAdmitted) {
    return null;
  }

  const handleDownload = async () => {
    if (student.id) {
      try {
        await incrementLetterDownload(student.id);
      } catch (error) {
        console.error('Failed to track letter download:', error);
      }
    }
  };

  return (
    <PDFDownloadLink
      document={
        <AcceptanceLetterPDF
          student={student}
          properties={properties}
          calls={calls}
        />
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
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <Text style={styles.universityName}>
          Limkokwing University of Creative Technology
        </Text>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.addressText}>
              Moshoeshoe Road Maseru Central
            </Text>
            <Text style={styles.addressText}>P.O. Box 8971</Text>
            <Text style={styles.addressText}>Maseru Maseru 0101</Text>
            <Text style={styles.addressText}>Lesotho</Text>
            <Text style={styles.addressText}>+(266) 22315767 | Ext. 116</Text>
            <Text style={styles.addressText}>registry@limkokwing.ac.ls</Text>
          </View>
          <View style={styles.headerRight}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer Image does not support alt */}
            <Image src='/images/logo.png' style={styles.logo} />
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.headerText}>ACCEPTANCE LETTER</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.date}>Date: {currentDate}</Text>
          <Text style={styles.reference}>
            Ref: {student.program?.faculty?.code}/{student.program?.code}/
            {student.status === 'DQ'
              ? 'DQ'
              : student.status === 'Wait Listed'
                ? 'W'
                : 'A'}
            /{student.no}
          </Text>
        </View>

        <View style={styles.greeting}>
          <Text>
            Dear{' '}
            <Text style={{ fontWeight: 'bold' }}>
              {student.names} {student.surname}
            </Text>
          </Text>
        </View>

        <View style={styles.content}>
          <Text>
            Congratulations! We are pleased to inform you that you have been
            accepted to study{' '}
            <Text style={{ fontWeight: 'bold' }}>{student.program?.name}</Text>{' '}
            at Limkokwing University. Please complete the attached form and
            submit it to the Registry Department together with the confirmation
            receipt of the acceptance fee of
            <Text style={{ fontWeight: 'bold' }}>
              M{properties.acceptanceFee.toFixed(2)}
            </Text>{' '}
            on or before{' '}
            <Text style={{ fontWeight: 'bold' }}>
              {new Date(properties.acceptanceDeadline).toLocaleDateString(
                'en-GB',
                {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                },
              )}
            </Text>
            . Kindly note that failure to return the completed form and
            confirmation receipt by the stipulated deadline will result in your
            slot being allocated to another candidate.
          </Text>
        </View>

        <View style={styles.bankDetails}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
            Banking details are as follows:
          </Text>

          <View style={styles.bankTable}>
            <View style={styles.bankRow}>
              <Text style={styles.bankLabel}>Bank Name:</Text>
              <Text style={styles.bankValue}>Standard Lesotho Bank</Text>
            </View>
            <View style={styles.bankRow}>
              <Text style={styles.bankLabel}>Account No:</Text>
              <Text style={styles.bankValue}>9080003987813</Text>
            </View>
            <View style={styles.bankRow}>
              <Text style={styles.bankLabel}>Branch No:</Text>
              <Text style={styles.bankValue}>060667</Text>
            </View>
            <View style={styles.bankRow}>
              <Text style={styles.bankLabel}>Swift Code:</Text>
              <Text style={styles.bankValue}>SBICLSMX</Text>
            </View>
          </View>
        </View>

        <View style={styles.note}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>NB:</Text>

          <View style={styles.noteItem}>
            <Text style={styles.bullet}>-</Text>
            <Text style={styles.noteText}>No Cash Payment will be allowed</Text>
          </View>
          <View style={styles.noteItem}>
            <Text style={styles.bullet}>-</Text>
            <Text style={styles.noteText}>
              Acceptance Fee is NON-REFUNDABLE
            </Text>
          </View>
        </View>

        <View style={styles.contact}>
          <Text>
            Should you need any further clarifications, please do not hesitate
            to contact us at +26622315767 or forward your inquiries to
            registry@limkokwing.ac.ls
          </Text>
        </View>

        <View style={styles.signature}>
          <Text>Registry Department</Text>
          <Text>Limkokwing University of Creative Technology</Text>
        </View>
      </Page>

      <Page size='A4' style={styles.page}>
        <View style={styles.content}>
          <Text style={{ marginBottom: 20 }}>
            I, {student.names} {student.surname}, accept the offer of admission
            to study {student.program?.name} Limkokwing University of Creative
            Technology, I undertake to comply with the procedures and
            regulations spelled out in the Student&apos;s Handbook and all rules
            and regulations in particular, I agree as per the LUCT admission
            Letter
            dated:.........................................................
          </Text>

          <View style={{ marginBottom: 20 }}>
            <View style={styles.noteItem}>
              <Text style={{ width: 20 }}>1.</Text>
              <Text>
                I Enclose a bank receipt of the acceptance Fee of M
                {properties.acceptanceFee.toFixed(2)} (
                <Text style={{ fontWeight: 'bold' }}>NON-REFUNDABLE</Text>)
              </Text>
            </View>

            <View style={styles.noteItem}>
              <Text style={{ width: 20 }}>2.</Text>
              <Text>
                I understand that upon registration, the responsibility for my
                Tuition fees for the academic year rests upon me or my
                parent/guardian/sponsor. Should I withdraw from the University
                for whatever reason any refund will be done in line with the
                University policies on such issues as relates to withdrawals or
                deferments.
              </Text>
            </View>

            <View style={{ marginBottom: 10 }}>
              <View style={styles.noteItem}>
                <Text style={{ width: 20 }}>3.</Text>
                <Text>
                  I commit to comply with the procedures and regulations as
                  spelled out in the Student&apos;s Handbook:
                </Text>
              </View>

              <View style={{ marginLeft: 30 }}>
                <View style={styles.noteItem}>
                  <Text style={{ width: 20 }}>a.</Text>
                  <Text>
                    Actions which are of violent, unlawful, and disruptive
                    nature are dismissible offenses which the University will
                    take action against me in line with the student handbook
                    should I engage in them.
                  </Text>
                </View>

                <View style={styles.noteItem}>
                  <Text style={{ width: 20 }}>c.</Text>
                  <Text>
                    Any damage to University property that I may cause as a
                    result of any demonstration will be charged to my account as
                    an individual regardless of whether the demonstration was
                    sanctioned.
                  </Text>
                </View>

                <View style={styles.noteItem}>
                  <Text style={{ width: 20 }}>d.</Text>
                  <Text>
                    I understand that; in accepting this offer of admission, I
                    shall be under the disciplinary authority of the University,
                    and will therefore abide by the Arrangements and Regulations
                    for Student Academic Affairs as made from time to time by
                    the University Council.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.noteItem}>
              <Text style={{ width: 20 }}>4.</Text>
              <Text>
                I understand that it is not the responsibility of the University
                if any promised scholarship is not forthcoming or, for any
                reason ceases.
              </Text>
            </View>

            <View style={styles.noteItem}>
              <Text style={{ width: 20 }}>5.</Text>
              <Text>
                It is my duty to register and ensure that I have the University
                Student Identification card and proof of Registration.
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <View style={{ marginBottom: 30 }}>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}
              >
                Student
              </Text>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ width: 150 }}>Name:</Text>
                <Text
                  style={{ flex: 1, borderBottom: '1px solid black' }}
                ></Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ width: 150 }}>Signature:</Text>
                <Text
                  style={{ flex: 1, borderBottom: '1px solid black' }}
                ></Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: 150 }}>Date:</Text>
                <Text
                  style={{ flex: 1, borderBottom: '1px solid black' }}
                ></Text>
              </View>
            </View>

            {/* Parent/Guardian section */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}
              >
                Parent/Guardian
              </Text>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ width: 150 }}>Name:</Text>
                <Text
                  style={{ flex: 1, borderBottom: '1px solid black' }}
                ></Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ width: 150 }}>Signature:</Text>
                <Text
                  style={{ flex: 1, borderBottom: '1px solid black' }}
                ></Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: 150 }}>Date:</Text>
                <Text
                  style={{ flex: 1, borderBottom: '1px solid black' }}
                ></Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
