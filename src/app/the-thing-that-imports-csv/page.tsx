'use client';
import { saveStudentList } from '@/lib/service';
import { parse } from 'papaparse';

export default function ImporterPage() {
  const handleFileSelect = async (files: File[]) => {
    const text = await readFileContent(files[0]);
    const results = parse(text);
    // skip the first row
    results.data.shift();
    const data: any = results.data;

    const studentList: Student[] = [];
    const programMap = new Map<string, Program>();

    for (const row of data) {
      const student: Student = {
        position: row[0],
        surname: row[1],
        names: row[2],
        candidateNum: row[3],
        programName: row[6],
        status: row[8],
      };

      const program: Program = {
        name: row[6],
        level: row[7],
      };
      if (program.level) {
        program.level = program.level.toUpperCase();
      }
      programMap.set(program.name, program);
      studentList.push(student);
    }

    // console.log(Array.from(programMap.values()));

    await saveStudentList(studentList);
    // await savePrograms(Array.from(programMap.values()));
  };
  return (
    <>
      <input
        type='file'
        multiple
        onChange={(event) => {
          const files = Array.from(event.target.files || []);
          handleFileSelect(files);
        }}
      />
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

// const formatName = (str: any) => {
//   if (!str) return str;
//   let newStr = str as string;

//   newStr = newStr.trim().toLocaleLowerCase();
//   const sentenceCaseWords = newStr.split(' ').map((word: string) => {
//     const firstLetter = word.charAt(0).toUpperCase();
//     const restOfWord = word.slice(1);
//     return firstLetter + restOfWord;
//   });
//   return sentenceCaseWords.join(' ');
// };
