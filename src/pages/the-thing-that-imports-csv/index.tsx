import { FileInput } from '@mantine/core';
import { parse } from 'papaparse';
import { savePrograms, saveStudentList } from '@/lib/service';

export default function ImporterPage() {
  const handleFileSelect = async (files: File[]) => {
    const text = await readFileContent(files[0]);
    const results = parse(text);
    const data: any = results.data;

    let currentProg = '';
    let currentStatus = '';
    let currentLevel: string | undefined = '';

    const studentList = [];
    const map = new Map<string, Program>();

    for (const row of data) {
      const col1 = formatName(row[0]);
      const surname = formatName(row[1]);
      const names = formatName(row[2]);
      const candidateNum = row[3];

      let program: Program | undefined;

      if (col1 && /^\d+$/.test(col1)) {
        studentList.push({
          surname,
          names,
          candidateNum,
          programName: currentProg,
          level: currentLevel,
          status: currentStatus,
        });
      } else if (col1) {
        if (col1.toLocaleUpperCase().includes('COURSE')) {
          currentProg = col1.split(':').at(-1)?.trim() as string;
          program = map.get(currentProg);
          if (!program) {
            program = {
              name: currentProg,
            };
            currentLevel = currentProg
              .split(' ')
              .filter((it) => it)
              .at(0);
            if (currentLevel?.toLocaleUpperCase().startsWith('B')) {
              currentLevel = 'Degree';
            }
            program.level = currentLevel;
            map.set(currentProg, program);
          }
        }
        if (program && col1.toUpperCase().includes('TOTAL')) {
          program.total = Number(col1.split(' ').at(-1));
        } else if (col1.toUpperCase().includes('STATUS')) {
          currentStatus = col1.split(' ').at(-1);
        }
      }
    }

    await saveStudentList(studentList);
    await savePrograms(Array.from(map.values()));
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

const formatName = (str: any) => {
  if (!str) return str;
  let newStr = str as string;

  newStr = newStr.trim().toLocaleLowerCase();
  const sentenceCaseWords = newStr.split(' ').map((word: string) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter + restOfWord;
  });
  return sentenceCaseWords.join(' ');
};
