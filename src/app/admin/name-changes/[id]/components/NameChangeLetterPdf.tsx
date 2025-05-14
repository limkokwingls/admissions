'use client';

import { format } from 'date-fns';
import {
  Document,
  Page,
  View,
  Text as PDFText,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { getNameChange } from '@/server/name-changes/actions';
import { getCurrentProperties } from '@/server/properties/actions';

type Props = {
  nameChange: NonNullable<Awaited<ReturnType<typeof getNameChange>>>;
  properties?: Awaited<ReturnType<typeof getCurrentProperties>>;
};

const styles = StyleSheet.create({
  page: {
    marginTop: 90,
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  topRow: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginBottom: 30,
  },
  letterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    marginBottom: 15,
    textAlign: 'justify',
  },
  boldText: {
    fontWeight: 'bold',
  },
  indentSection: {
    marginLeft: 20,
    marginBottom: 15,
  },
  noteList: {
    marginTop: 5,
  },
  noteListItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  noteListNumber: {
    width: 20,
  },
  noteListText: {
    flex: 1,
  },
  signatureSection: {
    marginTop: 40,
    position: 'relative',
  },
  signatureImage: {
    width: 150,
    height: 60,
    marginTop: 10,
    marginBottom: 5,
    position: 'absolute',
    top: 20,
    left: 0,
  },
  signatureName: {
    marginTop: 60,
  },
  registrarTitle: {
    fontWeight: 'bold',
  },
});

export default function NameChangeLetterPDF({ nameChange, properties }: Props) {
  const letterDate = format(new Date(), 'dd MMMM yyyy');
  const registrarNameText = 'Mateboho Moorosi (Mrs.)';
  const registrarTitleText = 'Registrar';

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.topRow}>
          <PDFText>{letterDate}</PDFText>
        </View>

        <PDFText>National Manpower Secretariat</PDFText>
        <PDFText>PO Box 517</PDFText>
        <PDFText style={{ marginBottom: 20 }}>Maseru 100</PDFText>

        <PDFText style={{ marginBottom: 20 }}>
          Subject: Change of Name for{' '}
          <PDFText style={{ fontWeight: 'bold' }}>{nameChange.newName}</PDFText>
        </PDFText>

        <PDFText style={styles.paragraph}>
          We are writing to inform you of a name change for the following
          student:
        </PDFText>

        <View style={styles.indentSection}>
          <PDFText>
            Previous Name:{' '}
            <PDFText style={styles.boldText}>{nameChange.oldName}</PDFText>
          </PDFText>
          <PDFText>
            New Name:{' '}
            <PDFText style={styles.boldText}>{nameChange.newName}</PDFText>
          </PDFText>
        </View>

        <PDFText style={styles.paragraph}>
          We have verified the identity of the student and confirmed the
          requested name change.
        </PDFText>

        <PDFText style={styles.paragraph}>
          We apologize for any confusion or inconvenience this change may cause.
          We kindly request that you update your records accordingly and provide
          the necessary assistance to facilitate this name change.
        </PDFText>

        <View style={styles.signatureSection}>
          <PDFText style={{ zIndex: 100 }}>Yours Sincerely,</PDFText>
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
