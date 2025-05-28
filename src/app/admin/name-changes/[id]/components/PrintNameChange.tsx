'use client';

import {
  getNameChange,
  trackNameChangePrinted,
} from '@/server/name-changes/actions';
import { getCurrentProperties } from '@/server/properties/actions';
import { ActionIcon, Text } from '@mantine/core';
import { pdf } from '@react-pdf/renderer';
import { IconIdBadge2 } from '@tabler/icons-react';
import { useState } from 'react';
import NameChangeLetterPDF from './NameChangeLetterPdf';

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
      variant='light'
      color='cyan'
      disabled={isGenerating}
      title='Print Name Change Letter'
      onClick={handlePrint}
    >
      <IconIdBadge2 size={'1rem'} />
    </ActionIcon>
  );
}
