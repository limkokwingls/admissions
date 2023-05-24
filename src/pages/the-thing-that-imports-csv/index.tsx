import { useState } from 'react';
import { FileInput } from '@mantine/core';
import { parse } from 'papaparse';

interface Admission {
  program: string;
  level?: string;
  status?: 'admitted' | 'waiting';
  total?: number;
}

interface Student {
  surname: string;
  names: string;
  candidateNum: string;
}

export default function ImporterPage() {
  const handleFileSelect = async (files: File[]) => {
    const text = await readFileContent(files[0]);
    const results = parse(text);
    const data: any = results.data;

    let currentProg = '';

    const map = new Map<string, Admission>();

    let admission: Admission | undefined = { program: '' };

    for (const row of data) {
      const col1 = row[0] as string;
      const surname = row[1] as string;
      const names = row[2] as string;
      const candidateNum = row[3] as string;

      if (col1 && !/^\d+$/.test(col1)) {
        if (col1.toLocaleUpperCase().includes('COURSE')) {
          currentProg = col1.split(':').at(-1) as string;
          admission = map.get(currentProg);
          if (!admission) {
            admission = {
              program: currentProg,
              level: currentProg
                .split(' ')
                .filter((it) => it)
                .at(0),
            };
          }
        }
        if (col1.toLocaleUpperCase().includes('TOTAL')) {
          admission.total = Number(col1.split(' ').at(-1));
        } else if (col1.toLocaleUpperCase().includes('STATUS')) {
          admission.status = col1.split(' ').at(-1) as 'admitted' | 'waiting';
        }
        console.log(admission);
      }
    }
  };
  return (
    <>
      <FileInput multiple onChange={handleFileSelect} />
    </>
  );
}

function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event: any) {
      const fileContent = event.target.result;
      resolve(fileContent);
    };

    reader.onerror = function (event: any) {
      reject(new Error('Error reading file: ' + event.target.error));
    };

    reader.readAsText(file);
  });
}
