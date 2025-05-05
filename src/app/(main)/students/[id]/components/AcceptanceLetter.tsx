'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image, Font } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

// Register fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
  ],
});

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  date: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'left',
  },
  reference: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'right',
  },
  greeting: {
    fontSize: 12,
    marginBottom: 10,
  },
  content: {
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 1.5,
  },
  bankDetails: {
    fontSize: 12,
    marginBottom: 20,
  },
  bankTable: {
    marginBottom: 20,
  },
  bankRow: {
    flexDirection: 'row',
    marginBottom: 5,
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
    marginBottom: 20,
  },
  noteItem: {
    flexDirection: 'row',
    marginBottom: 5,
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
    marginBottom: 20,
  },
  signature: {
    fontSize: 12,
    marginTop: 40,
  },
});

type AcceptanceLetterProps = {
  student: any; // Replace with proper student type
};

// PDF Document Component
function AcceptanceLetterPDF({ student }: AcceptanceLetterProps) {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  return (
    <Document>
      {/* First Page - Acceptance Letter */}
      <Page size="A4" style={styles.page}>
        {/* Header with Logo */}
        <View style={styles.header}>
          <Text style={styles.headerText}>ACCEPTANCE LETTER</Text>
        </View>
        
        {/* Date and Reference */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.date}>Date: {currentDate}</Text>
          <Text style={styles.reference}>Ref: {student.program?.faculty?.code}/{student.program?.code}/{student.no}</Text>
        </View>
        
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text>Dear {student.names} {student.surname}</Text>
        </View>
        
        {/* Main Content */}
        <View style={styles.content}>
          <Text>
            Congratulations! We are pleased to inform you that you have been accepted to study {student.program?.name} at Limkokwing University. Please complete the attached form and submit it to the Registry Department together with the confirmation receipt of the acceptance fee of M500.00 on or before 7th June 2024. Kindly note that failure to return the completed form and confirmation receipt by the stipulated deadline will result in your slot being allocated to another candidate.
          </Text>
        </View>
        
        {/* Bank Details */}
        <View style={styles.bankDetails}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Banking details are as follows:</Text>
          
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
        
        {/* Notes */}
        <View style={styles.note}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>NB:</Text>
          
          <View style={styles.noteItem}>
            <Text style={styles.bullet}>-</Text>
            <Text style={styles.noteText}>No Cash Payment will be allowed</Text>
          </View>
          <View style={styles.noteItem}>
            <Text style={styles.bullet}>-</Text>
            <Text style={styles.noteText}>Acceptance Fee is NON-REFUNDABLE</Text>
          </View>
        </View>
        
        {/* Contact Information */}
        <View style={styles.contact}>
          <Text>
            Should you need any further clarifications, please do not hesitate to contact us at +26622315767 or forward your inquiries to registry@limkokwing.ac.ls
          </Text>
        </View>
        
        {/* Signature */}
        <View style={styles.signature}>
          <Text>Registry Department</Text>
          <Text>Limkokwing University of Creative Technology</Text>
        </View>
      </Page>
      
      {/* Second Page - Declaration Form */}
      <Page size="A4" style={styles.page}>
        <View style={styles.content}>
          <Text style={{ marginBottom: 20 }}>
            I, {student.names} {student.surname}, accept the offer of admission to study {student.program?.name} Limkokwing University of Creative Technology, I undertake to comply with the procedures and regulations spelled out in the Student's Handbook and all rules and regulations in particular, I agree as per the LUCT admission Letter dated:.........................................................
          </Text>
          
          <View style={{ marginBottom: 20 }}>
            <View style={styles.noteItem}>
              <Text style={{ width: 20 }}>1.</Text>
              <Text>I Enclose a bank receipt of the acceptance Fee of M500.00 (<Text style={{ fontWeight: 'bold' }}>NON-REFUNDABLE</Text>)</Text>
            </View>
            
            <View style={styles.noteItem}>
              <Text style={{ width: 20 }}>2.</Text>
              <Text>I understand that upon registration, the responsibility for my Tuition fees for the academic year rests upon me or my parent/guardian/sponsor. Should I withdraw from the University for whatever reason any refund will be done in line with the University policies on such issues as relates to withdrawals or deferments.</Text>
            </View>
            
            <View style={{ marginBottom: 10 }}>
              <View style={styles.noteItem}>
                <Text style={{ width: 20 }}>3.</Text>
                <Text>I commit to comply with the procedures and regulations as spelled out in the Student's Handbook:</Text>
              </View>
              
              <View style={{ marginLeft: 30 }}>
                <View style={styles.noteItem}>
                  <Text style={{ width: 20 }}>a.</Text>
                  <Text>Actions which are of violent, unlawful, and disruptive nature are dismissible offenses which the University will take action against me in line with the student handbook should I engage in them.</Text>
                </View>
                
                <View style={styles.noteItem}>
                  <Text style={{ width: 20 }}>b.</Text>
                  <Text>Disputes of any nature with my sponsors are not the responsibility of the University and should not be a reason for any demonstrations or strikes on any of the University's campuses. Should I engage in any disruptive behavior on the above, the University should have the right to exclude me from campus and/or expel me.</Text>
                </View>
                
                <View style={styles.noteItem}>
                  <Text style={{ width: 20 }}>c.</Text>
                  <Text>Any damage to University property that I may cause as a result of any demonstration will be charged to my account as an individual regardless of whether the demonstration was sanctioned.</Text>
                </View>
                
                <View style={styles.noteItem}>
                  <Text style={{ width: 20 }}>d.</Text>
                  <Text>I understand that; in accepting this offer of admission, I shall be under the disciplinary authority of the University, and will therefore abide by the Arrangements and Regulations for Student Academic Affairs as made from time to time by the University Council.</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.noteItem}>
              <Text style={{ width: 20 }}>4.</Text>
              <Text>I understand that it is not the responsibility of the University if any promised scholarship is not forthcoming or, for any reason ceases.</Text>
            </View>
            
            <View style={styles.noteItem}>
              <Text style={{ width: 20 }}>5.</Text>
              <Text>It is my duty to register and ensure that I have the University Student Identification card and proof of Registration.</Text>
            </View>
          </View>
          
          {/* Signature Fields */}
          <View style={{ marginTop: 30 }}>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <Text style={{ width: 150 }}>Student Signature:</Text>
              <Text style={{ flex: 1, borderBottom: '1px solid black' }}></Text>
            </View>
            
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <Text style={{ width: 150 }}>Date:</Text>
              <Text style={{ flex: 1, borderBottom: '1px solid black' }}></Text>
            </View>
            
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <Text style={{ width: 150 }}>Contacts:</Text>
              <Text style={{ flex: 1, borderBottom: '1px solid black' }}></Text>
            </View>
            
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: 150 }}>Parent/Guardian Name:</Text>
              <Text style={{ flex: 1, borderBottom: '1px solid black' }}></Text>
              <Text style={{ width: 80 }}>Contacts:</Text>
              <Text style={{ flex: 1, borderBottom: '1px solid black' }}></Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// Download Button Component
export default function AcceptanceLetterButton({ student }: AcceptanceLetterProps) {
  if (!student || student.status !== 'Admitted') {
    return null;
  }

  return (
    <PDFDownloadLink 
      document={<AcceptanceLetterPDF student={student} />} 
      fileName={`acceptance-letter-${student.surname}-${student.names}.pdf`}
      style={{ textDecoration: 'none' }}
    >
      {({ blob, url, loading, error }) => (
        <Button className="w-full" disabled={loading}>
          <Download className="mr-2 h-4 w-4" />
          {loading ? 'Generating PDF...' : 'Download Acceptance Letter'}
        </Button>
      )}
    </PDFDownloadLink>
  );
}