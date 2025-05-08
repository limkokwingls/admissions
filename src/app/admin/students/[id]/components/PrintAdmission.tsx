'use client';
import { getCurrentProperties } from '@/server/properties/actions';
import { getStudent } from '@/server/students/actions';
import { ActionIcon, Text } from '@mantine/core';
import { pdf } from '@react-pdf/renderer';
import { IconPrinter } from '@tabler/icons-react';
import { useState } from 'react';
import AdmissionLetterPDF from './AdmissionLatterPdf';
import { trackAdmissionPrinted } from '@/server/history/actions';

type Props = {
  student: NonNullable<Awaited<ReturnType<typeof getStudent>>>;
  properties: Awaited<ReturnType<typeof getCurrentProperties>>;
};

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
      // Track the admission letter printing in history
      await trackAdmissionPrinted(student.id);
      
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
      // variant='outline'
      color='gray'
      disabled={isGenerating}
      title='Print Admission Letter'
      onClick={handlePrint}
    >
      <IconPrinter size={'1rem'} />
    </ActionIcon>
  );
}
