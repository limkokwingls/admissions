import { FileInput } from '@mantine/core';
import { parse } from 'papaparse';
import { savePrograms, saveStudentList } from '@/lib/service';

interface Record {
  program: Program;
  students?: Student[];
}

export default function ImporterPage() {
  const handleFileSelect = async (files: File[]) => {
    const text = await readFileContent(files[0]);
    const results = parse(text);
    const data: any = results.data;

    let currentProg = '';
    const map = new Map<string, Record>();
    let admission: Record | undefined = { program: { name: '' } };
    for (const row of data) {
      const col1 = formatName(row[0]);
      const surname = formatName(row[1]);
      const names = formatName(row[2]);
      const candidateNum = row[3];

      if (col1 && /^\d+$/.test(col1)) {
        map.get(currentProg)?.students?.push({
          surname,
          names,
          candidateNum,
        });
      } else if (col1) {
        if (col1.toLocaleUpperCase().includes('COURSE')) {
          currentProg = col1.split(':').at(-1)?.trim() as string;
          admission = map.get(currentProg);
          if (!admission) {
            admission = {
              program: {
                name: currentProg,
                level: currentProg
                  .split(' ')
                  .filter((it) => it)
                  .at(0),
              },
              students: [],
            };
            map.set(currentProg, admission);
          }
        }
        if (col1.toLocaleUpperCase().includes('TOTAL')) {
          admission.program.total = Number(col1.split(' ').at(-1));
        } else if (col1.toLocaleUpperCase().includes('STATUS')) {
          admission.program.status = col1.split(' ').at(-1) as
            | 'admitted'
            | 'waiting';
        }
      }
    }

    const studentList = [];
    const programList = [];
    for (const item of Array.from(map.values())) {
      const { name, level, status, total } = item.program;
      programList.push({
        name,
        level,
        status,
        total,
      });
      for (const it of item.students ?? []) {
        const { candidateNum, names, surname } = it;
        studentList.push({
          surname,
          names,
          candidateNum,
          programName: name,
          level,
          status,
        });
      }
    }
    await saveStudentList(studentList);
    await savePrograms(programList);
    console.log('Done!');
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
