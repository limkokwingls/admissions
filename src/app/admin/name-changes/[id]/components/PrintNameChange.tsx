'use client';

import { useState } from 'react';
import { ActionIcon, Text } from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';
import { pdf } from '@react-pdf/renderer';
import { getNameChange } from '@/server/name-changes/actions';
import { getCurrentProperties } from '@/server/properties/actions';
import NameChangeLetterPDF from './NameChangeLetterPdf';
import { trackNameChangePrinted } from '@/server/name-changes/actions';

type Props = {
  nameChange: NonNullable<Awaited<ReturnType<typeof getNameChange>>>;
  properties?: Awaited<ReturnType<typeof getCurrentProperties>>;
};

export default function PrintNameChange({ nameChange, properties }: Props) {
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
      await trackNameChangePrinted(nameChange.id);

      const blob = await pdf(
        <NameChangeLetterPDF nameChange={nameChange} />,
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
      variant='default'
      disabled={isGenerating}
      title='Print Name Change Letter'
      onClick={handlePrint}
    >
      <IconPrinter size={'1rem'} />
    </ActionIcon>
  );
}
